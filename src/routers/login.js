const express = require('express');
const router = express.Router();

const { authController } = require('../controllers');

router.route('/login-request-otp').post(authController.requestOTP);
router.route('/login-varify-otp').post(authController.varifyOTP);

module.exports = router;
