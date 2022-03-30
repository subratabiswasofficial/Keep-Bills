const express = require('express');
const router = express.Router();

const auth = require('../auth');
const { studentController } = require('../controllers');

/**
 * @swagger
 * /profile:
 *   get:
 *     description: Noise
 */
router.get('/profile', auth.student, studentController.getProfile);

router.post('/profile', auth.student, studentController.createOrUpdateProfile);

module.exports = router;
