const express = require('express');
const categoriesController = require('../app/controllers/categories');
const productsController = require('../app/controllers/products');
const addressesController = require('../app/controllers/addresses');
const districtsController = require('../app/controllers/districts');
const employeesController = require('../app/controllers/employees');
const usersController = require('../app/controllers/users');
const authController = require('../app/controllers/auth');

const categoriesRouter = express.Router();
const productsRouter = express.Router();
const addressesRouter = express.Router();
const districtsRouter = express.Router();
const employeesRouter = express.Router();
const usersRouter = express.Router();
const authRouter = express.Router();

categoriesRouter
    .get('/', (req, res) => categoriesController.getCategories(req, res))
    .get('/:id', (req, res) => categoriesController.getCategoryById(req, res))
    .post('/', (req, res) => categoriesController.insertCategory(req, res))
    .put('/:id', (req, res) => categoriesController.updateCategoryById(req, res))
    .delete('/:id', (req, res) => categoriesController.deleteCategoryById(req, res));

productsRouter
    .get('/', (req, res) => productsController.getProducts(req, res))
    .get('/:id', (req, res) => productsController.getProductById(req, res))
    .post('/', (req, res) => productsController.insertProduct(req, res))
    .put('/:id', (req, res) => productsController.updateProductById(req, res))
    .delete('/:id', (req, res) => productsController.deleteProductById(req, res));

addressesRouter
    .get('/', (req, res) => addressesController.getAddresses(req, res))
    .get('/:id', (req, res) => addressesController.getAddressById(req, res))
    .post('/', (req, res) => addressesController.insertAddress(req, res))
    .put('/:id', (req, res) => addressesController.updateAddressById(req, res))
    .delete('/:id', (req, res) => addressesController.deleteAddressById(req, res));

districtsRouter
    .get('/', (req, res) => districtsController.getDistricts(req, res))
    .get('/:id', (req, res) => districtsController.getDistrictById(req, res))
    .post('/', (req, res) => districtsController.insertDistrict(req, res))
    .put('/:id', (req, res) => districtsController.updateDistrictById(req, res))
    .delete('/:id', (req, res) => districtsController.deleteDistrictById(req, res));

employeesRouter
    .get('/', (req, res) => employeesController.getEmployees(req, res))
    .get('/:id', (req, res) => employeesController.getEmployeeById(req, res))
    .post('/', (req, res) => employeesController.insertEmployee(req, res))
    .put('/:id', (req, res) => employeesController.updateEmployeeById(req, res))
    .delete('/:id', (req, res) => employeesController.deleteEmployeeById(req, res));

usersRouter
    .get('/', (req, res) => usersController.getUsers(req, res))
    .get('/:id', (req, res) => usersController.getUserById(req, res))
    .post('/', (req, res) => usersController.insertUser(req, res))
    .put('/:id', (req, res) => usersController.updateUserById(req, res))
    .delete('/:id', (req, res) => usersController.deleteUserById(req, res));

authRouter
    .post('/sign_in', (req, res) => authController.getUserByUsernameAndPassword(req, res));

module.exports = {
    '/categories': categoriesRouter,
    '/products': productsRouter,
    '/addresses': addressesRouter,
    '/districts': districtsRouter,
    '/employees': employeesRouter,
    '/users': usersRouter,
    '/auth': authRouter,
};
