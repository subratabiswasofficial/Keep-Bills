const express = require('express');
const router = express.Router();
const auth = require('../auth');
const { sqlQuery } = require('../db/mysql');
const moment = require('moment');
/*
needed apis
1> is the device online
2> receive the data from device
*/

router.get('/data', auth.admin, async (req, res) => {
    try {
        const { results } = await sqlQuery('SELECT sum(amount) AS total FROM Usages GROUP BY hostle HAVING hostle = 1');
        const usage = results.length == 0 ? 'VOID' : results[0].total;
        return res.json({ usage });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
});

router.post('/log', async (req, res) => {
    try {
        console.log('Post Request from esp :: ');
        console.log(req.body);
        const { counter } = req.body;
        if (counter) {
            const created = moment()
                .utcOffset(5 * 60 + 30)
                .format('YYYY-MM-DD hh:mm:ss');
            await sqlQuery('INSERT INTO Usages VALUE( ?, ?, ? )', [1, created, counter]);
            return res.json('uploaded');
        }
        return res.json('null data');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
