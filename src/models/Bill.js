const moment = require('moment');
const { v4: uuid } = require('uuid');
const { sqlQuery } = require('../db/mysql');

class Bill {
    constructor({ uid, amount, fid, ref }) {
        this.bid = uuid();
        this.uid = uid;
        this.amount = amount;
        this.fid = fid;
        this.ref = ref;
        this.created = moment()
            .utcOffset(5 * 60 + 30)
            .format('YYYY-MM-DD hh:mm:ss');
        this.status = 'pending';
    }
    async save() {
        const { uid, amount, fid, ref, bid, created, status } = this;
        await sqlQuery(`INSERT INTO Bills VALUE ( ?, ?, ?, ?, ?, ?, ? )`, [bid, uid, amount, fid, ref, created, status]);
        console.log({ uid, amount, fid, ref, bid, created, status });
    }
    static async getBillsByUid(uid) {
        const { results } = await sqlQuery(`SELECT * FROM Bills WHERE uid = ?`, [uid]);
        return results;
    }
    static async getBillsByRoll(roll) {
        const { results } = await sqlQuery(`SELECT * FROM Bills WHERE uid = ( SELECT uid FROM Students WHERE roll = ? ) `, [roll]);
        return results;
    }
}

/*
create table Bills(
    bid varchar(50),
    uid varchar(50),
    amount int not null,
    fid varchar(50),
    ref varchar(200),
    created datetime,
    status varchar(20) default 'pending',
    primary key (bid),
    foreign key (uid)
    references Users(uid)
    on delete cascade
);
*/

module.exports = Bill;
