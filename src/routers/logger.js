const express = require('express');
const router = express.Router();

/*
needed apis
1> is the device online
2> receive the data from device
*/

router.get('/isonline', async (req, res) => {});
router.get('/data', async (req, res) => {
    res.send('whas up');
});

router.get('/test', async (req, res) => {
    console.log('Get Request from esp :: ');
    return res.send('hello World');
});

router.post('/test', async (req, res) => {
    console.log('Post Request from esp :: ');
    console.log(req.body);
    return res.send('hello World');
});

module.exports = router;
