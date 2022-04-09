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

module.exports = router;
