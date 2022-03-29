const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mywork26011999@gmail.com',
        pass: 'subrata.1999'
    }
});

const sendEmail = (to, html) => {
    const mailOptions = {
        from: 'mywork26011999@gmail.com',
        to: to,
        subject: 'Test Mail',
        html: html
    };
    const core = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return reject(error);
            } else {
                return resolve(info.response);
            }
        });
    });
    return core;
};

module.exports = { sendEmail };
