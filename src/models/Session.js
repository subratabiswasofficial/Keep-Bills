const { sendEmail } = require('../services/email-sender');
const { sqlQuery } = require('../db/mysql');

class Session {
    static async sendOtpToEmail(email) {
        const otp = Session.getOtpInRange(100000, 999999);
        const timestamp = Date.now();
        await sqlQuery('DELETE FROM Session WHERE email = ?', [email]);
        await sqlQuery(`INSERT INTO Session VALUES ( ?, ?, ? )`, [email, otp, timestamp]);
        sendEmail(email, `<p>Your OTP is <strong>${otp}</strong></p>`, 'OTP Varification', true);
    }
    static getOtpInRange(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static async varifyOtp(email, otp, timeLimit = 100) {
        const { results = [] } = await sqlQuery(`SELECT otp, created FROM Session WHERE email = ?`, [email]);
        const sentOtp = results[0].otp;
        const timestamp = results[0].created;
        const timeLeft = timeLimit - Math.floor((Date.now() - timestamp) / 60000);
        if (timeLeft <= 0) {
            return { matched: false, valid: false };
        }
        if (sentOtp == otp) {
            return { matched: true, valid: true };
        }
        return { matched: false, valid: false };
    }
}

module.exports = Session;
