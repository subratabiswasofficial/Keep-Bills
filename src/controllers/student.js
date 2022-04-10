const { Student, AwsFile } = require('../models');

const createOrUpdateProfile = async (req, res) => {
    try {
        const { name, roll, department, semester } = req.body;
        const uid = req.uid;
        let avatarId = null;

        if (req.files != null) {
            const avatar = req.files.avatar;
            const file = new AwsFile(avatar);
            const { fid } = await file.save();
            avatarId = fid;
        }

        const student = new Student({ uid, name, roll, department, semester, avatarId });
        const result = await student.saveOrUpdate();

        console.log(result);
        return res.status(201).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
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
        return res.status(500).send('Internal server error');
    }
};

module.exports = { createOrUpdateProfile, getProfile };
