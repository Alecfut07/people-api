const ApiError = require('../models/api-error');
const ApiBody = require('../models/api-body');
const Address = require('../models/address');
const District = require('../models/district');
const User = require('../models/user');
const Employee = require('../models/employee');
const employeesRepository = require('../repositories/employees');

function isTypeValid(type) {
    return type && type.length > 0;
}

function isNameValid(name) {
    return name && name.length > 0;
}

function isAgeValid(age) {
    return age > 0;
}

function isCellphoneValid(cellphone) {
    return cellphone > 0;
}

function isBirthdateValid(birthdate) {
    return birthdate && birthdate.length > 0;
}

function isEmailValid(email) {
    return email && email.length > 0;
}

function isSalaryValid(salary) {
    return salary > 0;
}

function isEmployeeValid(employee) {
    return isTypeValid(employee.type) && isNameValid(employee.name) && isAgeValid(employee.age)
           && isCellphoneValid(employee.cellphone) && isBirthdateValid(employee.birthdate)
           && isEmailValid(employee.email) && isSalaryValid(employee.salary);
}

function getEmployees(req, res) {
    employeesRepository.getEmployees()
        .then((results) => {
            const employees = [];
            results.forEach((row) => {
                const address = new Address(row.id, row.street, row.number, row.postal_code);
                const district = new District(row.id, row.name, row.phone_number, row.address, row.email);
                const user = new User(row.id, district, row.username, row.password);
                const employee = new Employee(user, district, address, row.type, row.name, row.age,
                    row.cellphone, row.birthdate, row.email, row.salary);
                employees.push(employee);
            });
            const body = new ApiBody(employees);
            res.json(body);
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function getEmployeeById(req, res) {
    const id = parseInt(req.params.id, 10);
    employeesRepository.getEmployeeById(id)
        .then((results) => {
            if (results && results.length > 0) {
                const row = results[0];
                const address = new Address(row.id, row.street, row.number, row.postal_code);
                const district = new District(row.id, row.name, row.phone_number, row.address, row.email);
                const user = new User(row.id, district, row.username, row.password);
                const employee = new Employee(user, district, address, row.type, row.name, row.age,
                    row.cellphone, row.birthdate, row.email, row.salary);
                const body = new ApiBody(employee);
                res.json(body);
            } else {
                const body = new ApiBody(null);
                res.json(body);
            }
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function insertEmployee(req, res) {
    const employeeToInsert = req.body;
    if (!isEmployeeValid(req.body)) {
        const error = new ApiError(400, 'BAD REQUEST ERROR');
        const body = new ApiBody([], [error]);
        res.status(400).json(body);
        return;
    }
    employeesRepository.insertEmployee(employeeToInsert)
        .then((employee) => {
            const body = new ApiBody(employee);
            res.status(201).json(body);
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function updateEmployeeById(req, res) {
    const id = parseInt(req.params.id, 10);
    const employeeToUpdate = req.body;
    employeesRepository.updateEmployeeById(id, employeeToUpdate)
        .then((employeeId) => employeesRepository.getEmployeeById(employeeId))
        .then((results) => {
            if (results && results.length > 0) {
                const row = results[0];
                const address = new Address(row.id, row.street, row.number, row.postal_code);
                const district = new District(row.id, row.name, row.phone_number, row.address, row.email);
                const user = new User(row.id, district, row.username, row.password);
                const employee = new Employee(user, district, address, row.type, row.name, row.age,
                    row.cellphone, row.birthdate, row.email, row.salary);
                const body = new ApiBody(employee);
                res.status(200).json(body);
            } else {
                const body = new ApiBody(null);
                res.json(body);
            }
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function deleteEmployeeById(req, res) {
    const id = parseInt(req.params.id, 10);
    employeesRepository.deleteDistrict(id)
        .then((employeeId) => employeesRepository.deleteAddress(employeeId))
        .then((employeeId) => employeesRepository.deleteUser(employeeId))
        .then((employeeId) => employeesRepository.deleteEmployeeById(employeeId))
        .then((results) => {
            res.status(204).json(results);
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

module.exports = {
    getEmployees,
    getEmployeeById,
    insertEmployee,
    updateEmployeeById,
    deleteEmployeeById,
};
