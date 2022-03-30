const express = require('express');
const router = express.Router();

const { authController } = require('../controllers');

router.route('/login-request-otp').post(authController.requestOTP);
router.route('/login-varify-otp').post(authController.varifyOTP);

const { student, admin } = require('../auth/index');
router.get('/student', admin, (req, res) => {
    res.send('student');
});

module.exports = router;
