const database = require('../../db');

function getUserByUsernameAndPassword(username, password) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT *
        FROM users
        WHERE username = '${username}' AND password = '${password}';
        `;
        database.getConnection().query(
            query,
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            },
        );
    });
}

module.exports = {
    getUserByUsernameAndPassword,
};
