const moment = require('moment');
const { v4: uuid } = require('uuid');
const { sqlQuery } = require('../db/mysql');
const AwsFile = require('./AwsFile');

class Bill {
    constructor({ uid, amount, fid, ref, semester }) {
        this.bid = uuid();
        this.uid = uid;
        this.amount = amount;
        this.fid = fid;
        this.ref = ref;
        this.semester = semester;
        this.created = moment()
            .utcOffset(5 * 60 + 30)
            .format('YYYY-MM-DD hh:mm:ss');
        this.status = 'pending';
    }
    async save() {
        const { uid, amount, fid, ref, bid, created, status, semester } = this;
        await sqlQuery(`INSERT INTO Bills VALUE ( ?, ?, ?, ?, ?, ?, ?, ? )`, [bid, uid, amount, fid, ref, semester, created, status]);
        return { uid, amount, fid, ref, bid, created, status, semester };
    }
    static async getBillsByUid(uid) {
        const { results } = await sqlQuery(
            `select b.bid, b.amount, b.semester, b.ref, b.created, b.status, f.location as screenshot from ( select * from Bills where uid = ? ) b
        left join Files f
        on b.fid = f.fid
        order by b.semester desc`,
            [uid]
        );
        return results;
    }
    static async deleteExistingBillByUidAndSemester(uid, semester) {
        const { results } = await sqlQuery(`SELECT * FROM Bills WHERE uid = ? AND semester = ?`, [uid, Number(semester)]);
        if (results.length > 0) {
            const { bid, fid } = results[0];
            await AwsFile.deleteFileByFid(fid);
            await sqlQuery(`DELETE FROM Bills WHERE bid = ? `, [bid]);
        }
    }
    static async deleteBillByUidAndBid(uid, bid) {
        /* delete aws file before delete */
        const { results } = await sqlQuery(`SELECT * FROM Bills WHERE bid = ? AND uid = ?`, [bid, uid]);
        if (results.length > 0) {
            const { bid, fid } = results[0];
            await AwsFile.deleteFileByFid(fid);
            await sqlQuery(`DELETE FROM Bills WHERE bid = ? AND uid = ?`, [bid, uid]);
        }
    }
    static async getBillsByRoll(roll) {
        const { results } = await sqlQuery(
            `select b.bid, b.amount, b.semester, b.status, s.roll, f.location as screenshot from Bills b 
        left join Students s
        on b.uid = s.uid
        left join Files f
        on f.fid = b.fid
        having s.roll = ?
        order by semester desc`,
            [roll]
        );
        return results;
    }
    static async getBills() {
        const { results } = await sqlQuery(
            `select b.bid, b.amount, b.semester, b.status, s.roll, b.ref, s.department, b.created, f.location as screenshot from Bills b 
        left join Students s
        on b.uid = s.uid
        left join files f
        on f.fid = b.fid`
        );
        return results;
    }
    static async markBillByBid(bid, status) {
        const { results } = await sqlQuery(`UPDATE Bills SET status = ? WHERE bid = ?`, [status, bid]);
        return results;
    }
}

/*
create table Bills(
    bid varchar(50),
    uid varchar(50) not null,
    amount int not null,
    fid varchar(50),
    ref varchar(200) not null,
    semester int not null,
    created datetime not null,
    status varchar(20) default 'pending',
    primary key (bid),
    foreign key (uid)
    references Users(uid)
    on delete cascade
);
*/

module.exports = Bill;
