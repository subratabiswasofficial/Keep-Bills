const jsonwebtoken = require('jsonwebtoken');
const { sqlQuery } = require('../db/mysql');
const { v4: uuid } = require('uuid');

class Users {
    constructor(email) {
        this.email = email;
    }
    async createOrUpdate() {
        const { email } = this;
        const { results } = await sqlQuery(`SELECT uid, type FROM Users WHERE email = ?`, [email]);
        let uid = uuid();
        let type = 'student';
        if (results.length == 0) {
            await sqlQuery(`INSERT INTO Users VALUES ( ?, ?, ? )`, [uid, email, 'student']);
        } else {
            uid = results[0].uid;
            type = results[0].type;
        }
        this.uid = uid;
        this.type = type;
    }
    genJwtAndType() {
        const { type, uid } = this;
        const token = jsonwebtoken.sign({ type, uid }, process.env.JWT_KEY);
        return { type, token };
    }
}
/*
    create table Users( 
        uid varchar(50),
        email varchar(100),
        type varchar(20) default 'student',
        primary key( uid, email )
    );
*/
module.exports = Users;
