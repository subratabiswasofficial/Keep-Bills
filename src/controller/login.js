const jsonwebtoken = require('jsonwebtoken');
const { v4: uuidV4 } = require('uuid');
const { sqlQuery } = require('../db/mysql');
const { sendEmail } = require('../services/email-sender');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const requestOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = getRandomInt(100000, 999999);
        const timestamp = Date.now();
        await sqlQuery('DELETE FROM Session WHERE email = ?', [email]);
        await sqlQuery(`INSERT INTO Session VALUES ( ?, ?, ? )`, [email, otp, timestamp]);
        sendEmail(email, `<p>Your OTP is <strong>${otp}</strong></p>`, 'OTP Varification', true);
        return res.status(200).send('ok');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

const varifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const { results = [] } = await sqlQuery(`SELECT otp, created FROM Session WHERE email = ?`, [email]);
        const sentOtp = results[0].otp;
        const timestamp = results[0].created;
        const timeLeft = 1 - Math.floor((Date.now() - timestamp) / 60000);
        console.log(timeLeft);
        if (timeLeft <= 0) {
            return res.status(400).send('OTP Expired');
        }
        if (sentOtp == otp) {
            const { results } = await sqlQuery(`SELECT uid FROM Users WHERE email = ?`, [email]);
            let uid = uuidV4();
            if (results.length == 0) {
                await sqlQuery(`INSERT INTO Users VALUES ( ?, ? )`, [uid, email]);
            } else {
                uid = results[0].uid;
            }
            const token = jsonwebtoken.sign({ uid }, process.env.JWT_KEY);
            return res.status(200).send({ token });
        } else {
            return res.status(400).send('Otp mismatch');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = { requestOTP, varifyOTP };
