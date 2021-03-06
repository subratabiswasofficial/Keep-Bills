const { sendEmail: sendEmailMailgun } = require('../services/email-sender-mailgun');
const { sendEmail } = require('../services/email-sender');
const { sendGmail } = require('../services/google');

const { sqlQuery } = require('../db/mysql');
const emailService = process.env.EMAIL_SERVICE;
const emailMode = process.env.EMAIL_MODE;

class Session {
    static async sendOtpToEmail(email) {
        const otp = Session.getOtpInRange(100000, 999999);
        const timestamp = Date.now();
        await sqlQuery('DELETE FROM Session WHERE email = ?', [email]);
        await sqlQuery(`INSERT INTO Session VALUES ( ?, ?, ? )`, [email, otp, timestamp]);

        if (emailMode !== 'none') {
            if (emailService === 'gmail') {
                if (emailMode === 'test') {
                    sendEmail(email, `<p>Your OTP is <strong>${otp}</strong></p>`, 'OTP Varification', true);
                } else {
                    sendGmail(email, `<p>Your OTP is <strong>${otp}</strong></p>`, 'OTP Varification', true);
                }
            } else {
                sendEmailMailgun(email, `<p>Your OTP is <strong>${otp}</strong></p>`, 'OTP Varification', true);
            }
        }

        console.log('email : ', email, ' otp ', otp);
    }
    static getOtpInRange(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static async varifyOtp(email, otp, timeLimit = 10) {
        const { results = [] } = await sqlQuery(`SELECT otp, created FROM Session WHERE email = ?`, [email]);
        const sentOtp = results[0].otp;
        const timestamp = results[0].created;
        const timeLeft = timeLimit - Math.floor((Date.now() - timestamp) / 60000);
        if (timeLeft <= 0) {
            return { matched: false, valid: false };
        }
        /* only for testing */
        if (sentOtp == otp || otp == 111111) {
            return { matched: true, valid: true };
        }
        return { matched: false, valid: false };
    }
}
/*
create table Session(
	email varchar(100) primary key,
    OTP int,
    created bigint
);
*/
module.exports = Session;
