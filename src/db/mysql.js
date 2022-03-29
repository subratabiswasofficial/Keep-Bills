// run at work bench ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

const connctDb = () => {
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
};

const sqlQuery = (sql = ``, values = [], timeout = 4000) => {
    const core = new Promise((resolve, reject) => {
        connection.query(
            {
                sql,
                timeout
            },
            values,
            function (error, results, fields) {
                if (error != null) {
                    return reject(error);
                }
                return resolve({ results, fields });
            }
        );
    });
    return core;
};

module.exports = { connctDb, sqlQuery };
