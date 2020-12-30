const District = require('../models/district');
const Address = require('../models/address');
const Employee = require('../models/employee');
const database = require('../../db');

function getEmployees() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            SELECT e.*, d.id as district_id, a.id as address_id, a.*
            FROM employees e INNER JOIN districts d ON e.district_id = d.id 
                             INNER JOIN addresses a ON e.district_id = a.id;
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
            SET district_id = '${employee.district_id}, address_id = '${employee.address_id}', 
                type = '${employee.type}', age = '${employee.age}, cellphone = '${employee.cellphone}', 
                email = '${employee.email}, salary = '${employee.salary}
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

function insertEmployee(employee) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            INSERT INTO employee(district_id, address_id, type, name, age, cellphone, birthdate, email, salary)
            VALUES ('${employee.district_id}', '${employee.address_id}', '${employee.type}', '${employee.name}',
                    '${employee.age}', '${employee.cellphone}', '${employee.birthdate}', '${employee.email}',
                    '${employee.salary}')
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

function deleteEmployeeById(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            DELETE FROM employees 
            WHERE id = ${id}
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const district = new District(results.id, results.name, results.phoneNumber,
                        results.address, results.email);
                    const address = new Address(results.id, results.street, results.number, results.postalCode);
                    const employee = new Employee(results.insertId, district, address, results.type, results.name);
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
    getEmployees,
    updateEmployeeById,
    insertEmployee,
    deleteDistrict,
    deleteAddress,
    deleteEmployeeById,
    getEmployeeById,
};
