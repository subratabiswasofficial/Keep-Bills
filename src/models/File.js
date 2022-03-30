const { sqlQuery } = require('../db/mysql');
const { v4: uuid } = require('uuid');

class File {
    constructor(url) {
        this.url = url;
        this.fid = uuid();
    }
    async save() {
        const { fid, url } = this;
        await sqlQuery(`INSERT INTO Files VALUES ( ?, ? )`, [fid, url]);
        return { fid, url };
    }
    static async getUrlByFid(fid) {
        const { results } = await sqlQuery(`SELECT url FROM Files WHERE fid = ?`, [fid]);
        if (results.length == 0) {
            return null;
        } else {
            return results[0].url;
        }
    }
}

/*
create table Files( 
    fid varchar(50),
    url varchar(255),
    primary key( fid )
 )
*/

module.exports = File;
