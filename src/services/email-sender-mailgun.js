const mailgun = require('mailgun-js');
const DOMAIN = process.env.MAILGUN_DOMAIN;
const api_key = process.env.MAILGUN_API_KEY;
const from = process.env.OTP_MAIL_ADDRESS;

const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

const sendEmail = (to, html, subject = '', printStatus = false) => {
    const mailOptions = {
        from: `Keep Bills <${from}>`,
        to,
        subject,
        html
    };
    const core = new Promise((resolve, reject) => {
        mg.messages().send(mailOptions, function (error, body) {
            if (error) {
                console.log(error);
                return reject(error);
            }
            if (printStatus) {
                console.log(body);
            }
            return resolve(body);
        });
    });
    return core;
};

module.exports = { sendEmail };
