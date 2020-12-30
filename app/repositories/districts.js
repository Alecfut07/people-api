const District = require('../models/district');
const database = require('../../db');

function getDistricts() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            SELECT *
            FROM districts;
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

function updateDistrictById(id, district) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            UPDATE districts
            SET name = '${district.name}', phone_number = ${district.phone_number}, 
                address = '${district.address}', email = '${district.email}'
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

function insertDistrict(district) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            INSERT INTO districts(name, phone_number, address, email)
            VALUES ('${district.name}', ${district.phone_number}, '${district.address}', '${district.email}')
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new District(results.insertId, district.name));
                }
            },
        );
    });
}

function deleteDistrictById(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            DELETE FROM districts 
            WHERE id = ${id}
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const district = new District(results.insertId, results.name, results.phone_number,
                        results.address, results.email);
                    resolve(district);
                }
            },
        );
    });
}

function getDistrictById(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            SELECT *
            FROM districts
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
    getDistricts,
    updateDistrictById,
    insertDistrict,
    deleteDistrictById,
    getDistrictById,
};
