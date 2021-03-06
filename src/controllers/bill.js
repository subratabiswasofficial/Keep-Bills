const { Bill, AwsFile } = require('../models');

const createBill = async (req, res) => {
    try {
        if (req.files == null) return res.status(400).send('Screenshot required');
        const { amount, ref, semester } = req.body;
        const uid = req.uid;
        const screenshot = req.files.screenshot;
        /* temporary */
        // await Bill.deleteExistingBillByUidAndSemester(uid, semester);
        const file = new AwsFile(screenshot);
        const { fid } = await file.save();
        const bill = new Bill({ uid, amount, fid, ref, semester });
        await bill.save();
        return res.status(201).send('Bill Created');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
};

const getBill = async (req, res) => {
    try {
        const uid = req.uid;
        const result = await Bill.getBillsByUid(uid);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
};

const deleteBill = async (req, res) => {
    try {
        const { bid } = req.params;
        const uid = req.uid;
        await Bill.deleteBillByUidAndBid(uid, bid);
        return res.status(200).send('Bill Deleted');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
};

module.exports = { createBill, getBill, deleteBill };
