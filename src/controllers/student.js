const { Student } = require('../models');
const path = require('path');
const aws = require('aws-sdk');
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const createOrUpdateProfile = async (req, res) => {
    try {
        const { name, roll, department, semester } = req.body;
        console.log(req.body);
        if (req.files != null) {
            const avatar = req.files.avatar;
            await avatar.mv(path.join(__dirname, '..', '..', 'avatars', avatar.name));
            console.log(path.join(__dirname, '..', '..', 'avatars', avatar.name));
            const result = await s3
                .upload({
                    Body: avatar.data,
                    Bucket: 'keep-bills',
                    Key: avatar.name
                })
                .promise();
            console.log('s3 result ', result);
        }
        const uid = req.uid;
        const student = new Student({ uid, name, roll, department, semester });
        const result = await student.saveOrUpdate();
        console.log(result);
        return res.status(201).send('hello mf');
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
        return res.status(500).send(result);
    }
};

module.exports = { createOrUpdateProfile, getProfile };
