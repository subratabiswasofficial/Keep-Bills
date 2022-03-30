const express = require('express');
const router = express.Router();

const { student } = require('../auth/index');
const { studentController } = require('../controllers');

router.get('/test', student, (req, res) => {
    res.send('student test');
});

router.route('/profile').get(student, studentController.getProfile).post(student, studentController.createOrUpdateProfile);

module.exports = router;
