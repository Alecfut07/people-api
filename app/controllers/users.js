const ApiError = require('../models/api-error');
const ApiBody = require('../models/api-body');
const Address = require('../models/address');
const District = require('../models/district');
const Employee = require('../models/employee');
const User = require('../models/user');
const usersRepository = require('../repositories/users');

function isUserNameValid(username) {
    return username && username.length > 0;
}

function isUserPasswordValid(password) {
    return password && password.length > 0;
}

function isUserValid(user) {
    return isUserNameValid(user.username) && isUserPasswordValid(user.password);
}

function getUsers(req, res) {
    usersRepository.getUsers()
        .then((results) => {
            const users = [];
            results.forEach((row) => {
                const address = new Address(row.id, row.street, row.number, row.postalCode);
                const district = new District(row.id, row.name, row.phoneNumber, row.address, row.email);
                const employee = new Employee(row.id, district, address, row.type, row.name, row.age,
                    row.cellphone, row.birthdate, row.email, row.salary);
                const user = new User(row.id, employee, district, row.username, row.password);
                users.push(user);
            });
            const body = new ApiBody(users);
            res.json(body);
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function getUserById(req, res) {
    const id = parseInt(req.params.id, 10);
    usersRepository.getUserById(id)
        .then((results) => {
            if (results && results.length > 0) {
                const row = results[0];
                const address = new Address(row.id, row.street, row.number, row.postalCode);
                const district = new District(row.id, row.name, row.phoneNumber, row.address, row.email);
                const employee = new Employee(row.id, district, address, row.type, row.name, row.age,
                    row.cellphone, row.birthdate, row.email, row.salary);
                const user = new User(row.id, employee, district, row.username, row.password);
                const body = new ApiBody(user);
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

function insertUser(req, res) {
    const userToInsert = req.body;
    if (!isUserValid(req.body)) {
        const error = new ApiError(400, 'BAD REQUEST ERROR');
        const body = new ApiBody([], [error]);
        res.status(400).json(body);
        return;
    }
    usersRepository.insertUser(userToInsert)
        .then((user) => {
            const body = new ApiBody(user);
            res.status(201).json(body);
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function updateUserById(req, res) {
    const id = parseInt(req.params.id, 10);
    const userToUpdate = req.body;
    usersRepository.updateUserById(id, userToUpdate)
        .then((userId) => usersRepository.getUserById(userId))
        .then((results) => {
            if (results && results.length > 0) {
                const row = results[0];
                const user = new User(row.id, row.username, row.password);
                const body = new ApiBody(user);
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

function deleteUserById(req, res) {
    const id = parseInt(req.params.id, 10);
    usersRepository.deleteUserById(id)
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
    getUsers,
    getUserById,
    insertUser,
    updateUserById,
    deleteUserById,
};
