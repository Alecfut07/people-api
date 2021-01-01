const District = require('../models/district');
const Address = require('../models/address');
const Employee = require('../models/employee');
const database = require('../../db');
const User = require('../models/user');

function getEmployees() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            SELECT e.*, u.id as user_id, u.*, d.id as district_id, d.*, a.id as address_id, a.*
            FROM employees e INNER JOIN districts d ON e.district_id = d.id 
                             INNER JOIN addresses a ON e.address_id = a.id
                             INNER JOIN users u ON e.user_id = u.id;
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

function updateEmployeeById(id, employee) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            UPDATE employees
            SET user_id = ${employee.user_id}, district_id = ${employee.district_id}, 
                address_id = ${employee.address_id}, type = '${employee.type}', name = '${employee.name}'
                age = ${employee.age}, cellphone = '${employee.cellphone}', birthdate = '${employee.birthdate}', 
                email = '${employee.email}', salary = ${employee.salary}
            WHERE user_id = ${id}
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

function insertEmployee(employee) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            INSERT INTO employee(user_id, district_id, address_id, type, name, age, cellphone, birthdate, email, salary)
            VALUES (${employee.user_id}, ${employee.district_id}, ${employee.address_id}, '${employee.type}', 
                    '${employee.name}', ${employee.age}, '${employee.cellphone}', '${employee.birthdate}', 
                    '${employee.email}', ${employee.salary})
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Employee(results.insertId, employee.name));
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

function deleteAddress(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            DELETE FROM addresses 
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

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            DELETE FROM users 
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

function deleteEmployeeById(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            DELETE FROM employees 
            WHERE user_id = ${id}
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const district = new District(results.id, results.name, results.phone_number,
                        results.address, results.email);
                    const address = new Address(results.id, results.street, results.number, results.postal_code);
                    const user = new User(results.id, results.district_id, district, results.username,
                        results.password);
                    const employee = new Employee(user, district, address, results.type, results.name,
                        results.age, results.cellphone, results.birthdate, results.email, results.salary);
                    resolve(employee);
                }
            },
        );
    });
}

function getEmployeeById(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            SELECT *
            FROM employees
            WHERE user_id = ${id}
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
    getEmployees,
    updateEmployeeById,
    insertEmployee,
    deleteDistrict,
    deleteAddress,
    deleteUser,
    deleteEmployeeById,
    getEmployeeById,
};
