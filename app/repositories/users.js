const District = require('../models/district');
const Employee = require('../models/employee');
const User = require('../models/user');
const database = require('../../db');

function getUsers() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            SELECT u.*, e.id as employee_id, e.type, e.salary, d.name, d.address
            FROM users u INNER JOIN employees e ON u.employee_id = e.id 
                         INNER JOIN districts d ON u.district_id = d.id;
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

function updateUserById(id, user) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            UPDATE users
            SET username = '${user.username}', password = '${user.password}'
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

function insertUser(user) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            INSERT INTO users(employee_id, district_id, username, password)
            VALUES (${user.employee_id}, ${user.district_id}, '${user.username}', '${user.password}')
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new User(results.insertId, user.username));
                }
            },
        );
    });
}

function deleteEmployee(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            DELETE FROM employees 
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

function deleteDistrict(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            DELETE FROM districts 
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

function deleteUserById(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            DELETE FROM users 
            WHERE id = ${id}
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const employee = new Employee(results.employee_id, results.address_id, results.type, results.name,
                        results.age, results.cellphone, results.birthdate, results.email, results.salary);
                    const district = new District(results.district_id, results.name, results.phoneNumber,
                        results.address, results.email);
                    const user = new User(results.insertId, employee, district, results.username, results.password);
                    resolve(user);
                }
            },
        );
    });
}

function getUserById(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            SELECT id, username, password
            FROM users
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
    getUsers,
    updateUserById,
    insertUser,
    deleteEmployee,
    deleteDistrict,
    deleteUserById,
    getUserById,
};
