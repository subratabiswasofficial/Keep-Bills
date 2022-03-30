const jsonwebtoken = require('jsonwebtoken');

const student = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        const { type, uid } = jsonwebtoken.verify(token, process.env.JWT_KEY);
        if (type == 'student') {
            req.uid = uid;
            next();
        } else {
            return res.status(401).send('Unauthorized');
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send('Unauthorized');
    }
};

const admin = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        const { type, uid } = jsonwebtoken.verify(token, process.env.JWT_KEY);
        if (type == 'admin') {
            req.uid = uid;
            next();
        } else {
            return res.status(401).send('Unauthorized');
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send('Unauthorized');
    }
};

module.exports = { student, admin };
