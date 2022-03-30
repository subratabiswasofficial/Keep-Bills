const { requestOTP, varifyOTP } = require('./login');
const authController = { requestOTP, varifyOTP };
module.exports = { authController };
