const express = require('express');
const router = express.Router();

const auth = require('../auth');
const { adminController } = require('../controllers');

router.get('/bills', auth.admin, adminController.getBills);
router.post('/bills', auth.admin, adminController.getBillsByRoll);
router.post('/markbill', auth.admin, adminController.markBill);

module.exports = router;
