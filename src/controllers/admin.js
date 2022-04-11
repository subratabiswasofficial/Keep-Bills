const { Bill } = require('../models');

const getBillsByRoll = async (req, res) => {
    try {
        const { roll } = req.body;
        const result = await Bill.getBillsByRoll(roll);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
};

const getBills = async (req, res) => {
    try {
        const result = await Bill.getBills();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

const markBill = async (req, res) => {
    try {
        const { bid, status } = req.body;
        await Bill.markBillByBid(bid, status);
        return res.status(200).json('Bill Marked');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = { getBillsByRoll, getBills, markBill };
