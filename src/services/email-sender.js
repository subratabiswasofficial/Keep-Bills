const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.GMAIL_USER_TEST,
        pass: process.env.GMAIL_PASS_TEST
    }
});

const sendEmail = (to, html, subject = '', printStatus = false) => {
    const mailOptions = {
        from: process.env.GMAIL_USER_TEST,
        to,
        subject,
        html
    };
    const core = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return reject(error);
            } else {
                if (printStatus) console.log('Email Sent', info.response);
                return resolve(info.response);
            }
        });
    });
    return core;
};

module.exports = { sendEmail };
