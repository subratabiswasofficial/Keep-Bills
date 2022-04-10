const express = require('express');
const router = express.Router();

const auth = require('../auth');
const { billController } = require('../controllers');

/**
 * @swagger
 * /profile:
 *   get:
 *     description: Noice
 */
router.post('/', auth.student, billController.createBill);

router.get('/', auth.student, billController.getBill);

router.delete('/:bid', auth.student, billController.deleteBill);

module.exports = router;
