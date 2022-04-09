const { sqlQuery } = require('../db/mysql');
const AwsFile = require('./AwsFile');

class Student {
    constructor({ uid, name, roll, department, semester, avatarId }) {
        this.uid = uid;
        this.name = name;
        this.roll = roll;
        this.department = department;
        this.semester = semester;
        this.avatarId = avatarId;
    }
    async saveOrUpdate() {
        const { uid, name, roll, department, semester, avatarId } = this;
        const { results } = await sqlQuery(`SELECT * FROM Students WHERE uid = ?`, [uid]);
        if (results.length == 0) {
            await sqlQuery(`INSERT INTO Students VALUES ( ?, ?, ?, ?, ?, ? )`, [uid, name, roll, department, semester, avatarId]);
            return { updated: false, created: true };
        } else {
            const existingAvatarId = results[0].avatarId;
            if (avatarId) {
                if (existingAvatarId) {
                    await AwsFile.deleteFileByFid(existingAvatarId);
                }
                await sqlQuery(`UPDATE Students SET name = ?, roll = ?, department = ?, semester = ?, avatarId = ? WHERE uid = ?`, [name, roll, department, semester, avatarId, uid]);
            } else {
                await sqlQuery(`UPDATE Students SET name = ?, roll = ?, department = ?, semester = ? WHERE uid = ?`, [name, roll, department, semester, uid]);
            }
            return { updated: true, created: false };
        }
    }
    static async getProfileByUid(uid) {
        const { results } = await sqlQuery(
            `select s.uid, s.name, s.roll, s.department, s.semester, f.location as avatar from ( select * from students where uid = ? ) s
        left join files f
        on s.avatarId = f.fid`,
            [uid]
        );
        if (results.length == 0) {
            return null;
        } else {
            const { name, roll, department, semester, avatar } = results[0];
            return { name, roll, department, semester, avatar };
        }
    }
}

module.exports = Student;

/*
-- create table Students(
-- 	   uid varchar(50),
--     name varchar(100) not null,
--     roll bigint not null,
--     department varchar(100),
--     semester int default 1,
--     avatarId varchar(50),
--     primary key (uid),
--     foreign key (uid)
--     references Users(uid)
--     on delete cascade
-- );

-- select s.uid, s.name, s.roll, s.department, s.semester, f.location as avatar from ( select * from students where uid = '9383166a-1218-415b-b06c-a71dfe98c351' ) s
-- left join files f
-- on s.avatarId = f.fid;

*/
