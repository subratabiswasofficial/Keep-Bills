const { sqlQuery } = require('../db/mysql');

class Student {
    constructor({ uid, name, roll, department, semester }) {
        this.uid = uid;
        this.name = name;
        this.roll = roll;
        this.department = department;
        this.semester = semester;
    }
    async saveOrUpdate() {
        const { uid, name, roll, department, semester } = this;
        const { results } = await sqlQuery(`SELECT * FROM Students WHERE uid = ?`, [uid]);
        if (results.length == 0) {
            await sqlQuery(`INSERT INTO Students VALUES ( ?, ?, ?, ?, ? )`, [uid, name, roll, department, semester]);
            return 'Profile Created';
        } else {
            await sqlQuery(`UPDATE Students SET name = ?, roll = ?, department = ?, semester = ? WHERE uid = ?`, [name, roll, department, semester, uid]);
            return 'Profile Updated';
        }
    }
    static async getProfileByUid(uid) {
        const { results } = await sqlQuery(`SELECT * FROM Students WHERE uid = ?`, [uid]);
        if (results.length == 0) {
            return null;
        } else {
            const { name, roll, department, semester } = results[0];
            return { name, roll, department, semester };
        }
    }
}

module.exports = Student;

/*
-- create table Students(
-- 	    uid varchar(50),
--     name varchar(100) not null,
--     roll bigint not null,
--     department varchar(100),
--     semester int default 1,
--     primary key (uid),
--     foreign key (uid)
--     references Users(uid)
--     on delete cascade
-- );
*/
