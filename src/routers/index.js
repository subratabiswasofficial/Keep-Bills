const loginRouter = require('./login');
const studentRouter = require('./student');
const billRouter = require('./bill');
const adminRouter = require('./admin');
const logger = require('./logger');

module.exports = { loginRouter, studentRouter, billRouter, adminRouter, logger };
