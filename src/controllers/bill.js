const { sqlQuery } = require('../db/mysql');
const { Bill, AwsFile } = require('../models');

const createBill = async (req, res) => {
    try {
        if (req.files == null) return res.status(400).send('Screenshot required');

        const { amount, ref, semester } = req.body;
        const uid = req.uid;
        const screenshot = req.files.screenshot;

        await Bill.deleteExistingBillByUidAndSemester(uid, semester);

        const file = new AwsFile(screenshot);
        const { fid } = await file.save();

        const bill = new Bill({ uid, amount, fid, ref, semester });
        const result = await bill.save();

        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

const getBill = async (req, res) => {
    try {
        const uid = req.uid;
        const result = await Bill.getBillsByUid(uid);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = { createBill, getBill };
