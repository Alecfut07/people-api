const express = require('express');
const categoriesController = require('../app/controllers/categories');
const productsController = require('../app/controllers/products');

const categoriesRouter = express.Router();
const productsRouter = express.Router();

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

module.exports = {
    '/categories': categoriesRouter,
    '/products': productsRouter,
};
