const { Session, User } = require('../models');

const requestOTP = async (req, res) => {
    try {
        const { email } = req.body;
        Session.sendOtpToEmail(email);
        return res.status(200).send('OTP has been sent to your email. Valid for 10 min');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

const varifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const otpStatus = await Session.varifyOtp(email, otp, 100000);
        if (otpStatus.valid == false) {
            return res.status(400).send('OTP expired. Try Again');
        }
        if (otpStatus.matched == true) {
            const user = new User(email);
            await user.createOrUpdate();
            const token = user.genJwtAndType();
            return res.status(200).json(token);
        }
        return res.status(400).send('OTP mismatched. Try again');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = { requestOTP, varifyOTP };

/*

admin
{
    "email": "subrataemail1999@gmail.com",
    "otp": 275957
}

student
{
    "email": "subratabiswasofficial@gmail.com",
    "otp": 554760
}

*/