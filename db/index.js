const mysql = require('mysql');

let connection = null;

module.exports = {
    connect: () => new Promise((resolve, reject) => {
        const conn = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        connection = conn;
        connection.connect((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }),
    close: () => new Promise((resolve, reject) => {
        connection.end((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }),
    getConnection: () => connection,
};
