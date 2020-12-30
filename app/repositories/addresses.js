const Address = require('../models/address');
const database = require('../../db');

function getAddresses() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            SELECT *
            FROM addresses;
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            },
        );
    });
}

function updateAddressById(id, address) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            UPDATE addresses
            SET street = '${address.street}', number = ${address.number}, postal_code = ${address.postal_code}
            WHERE id = ${id}
            `, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(id);
                }
            },
        );
    });
}

function insertAddress(address) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            INSERT INTO addresses(street, number, postal_code)
            VALUES ('${address.street}', ${address.number}, ${address.postal_code})
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Address(results.insertId, address.street));
                }
            },
        );
    });
}

function deleteAddressById(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            DELETE FROM addresses 
            WHERE id = ${id}
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const address = new Address(results.insertId, results.street, results.number, results.postal_code);
                    resolve(address);
                }
            },
        );
    });
}

function getAddressById(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            SELECT *
            FROM addresses
            WHERE id = ${id}
            `,
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
    getAddresses,
    updateAddressById,
    insertAddress,
    deleteAddressById,
    getAddressById,
};
