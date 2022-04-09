const { v4: uuid } = require('uuid');
const moment = require('moment');
const aws = require('aws-sdk');
const { sqlQuery } = require('../db/mysql');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

class AwsFile {
    constructor(rawFile) {
        const fileFormat = rawFile.name.split('.')[rawFile.name.split('.').length - 1];
        const id = uuid();
        this.fid = id;
        this.name = `${id}.${fileFormat}`;
        this.rawFile = rawFile;
        this.created = moment()
            .utcOffset(5 * 60 + 30)
            .format('YYYY-MM-DD hh:mm:ss');
    }
    async uploadToAws() {
        const { rawFile, name } = this;
        if (rawFile != null) {
            const { ETag, Location } = await s3
                .upload({
                    Body: rawFile.data,
                    Bucket: 'keep-bills',
                    Key: name
                })
                .promise();
            this.etag = ETag.slice(1, ETag.length - 1); // '""' -> ''
            this.location = Location;
        }
    }
    async save() {
        await this.uploadToAws();
        const { fid, etag, name, location, created } = this;
        await sqlQuery(`INSERT INTO Files VALUE ( ?, ?, ?, ?, ? )`, [fid, etag, name, location, created]);
        return { fid, etag, name, location, created };
    }
    static async deleteFileByFid(fid) {
        const { results } = await sqlQuery(`SELECT * FROM Files WHERE fid = ?`, [fid]);
        const { name } = results[0];
        await s3
            .deleteObject({
                Bucket: 'keep-bills',
                Key: name
            })
            .promise();
        await sqlQuery(`DELETE FROM Files WHERE fid = ?`, [fid]);
    }
    static async getUrlByFid(fid) {
        const { results } = await sqlQuery(`SELECT url FROM Files WHERE fid = ?`, [fid]);
        if (results.length == 0) {
            return null;
        } else {
            return results[0];
        }
    }
}

/*
create table Files( 
    fid varchar(50) not null,
    etag varchar(255) not null,
    name varchar(255) not null,
    location varchar(255) not null,
    created datetime not null,
    primary key( fid )
 )
*/

/*
{
[0]   ETag: '"5405d77c51fb46a0cbf26cb96fe4da4d"',
[0]   Location: 'https://keep-bills.s3.amazonaws.com/avatar.png',
[0]   key: 'avatar.png',
[0]   Key: 'avatar.png',
[0]   Bucket: 'keep-bills'
[0] }

*/

module.exports = AwsFile;
