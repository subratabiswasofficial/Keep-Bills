/*
    1> create profile
    2> edit profile
    3> fill the bill
    4> delete form
*/

const Student = require('../models/Student');

const createOrUpdateProfile = async (req, res) => {
    try {
        const { name, roll, department, semester } = req.body;
        const uid = req.uid;
        const student = new Student({ uid, name, roll, department, semester });
        const result = await student.saveOrUpdate();
        console.log(result);
        return res.status(201).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(result);
    }
};

const getProfile = async (req, res) => {
    try {
        const uid = req.uid;
        const student = await Student.getProfileByUid(uid);
        if (student == null) {
            return res.status(400).send('No Profile Found');
        }
        return res.status(200).send(student);
    } catch (error) {
        console.log(error);
        return res.status(500).send(result);
    }
};

module.exports = { createOrUpdateProfile, getProfile };
