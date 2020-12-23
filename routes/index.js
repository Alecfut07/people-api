const express = require('express');
const categoriesController = require('../app/controllers/categories');

const categoriesRouter = express.Router();

categoriesRouter
    .get('/', (req, res) => categoriesController.getCategories(req, res))
    .get('/:id', (req, res) => categoriesController.getCategoryById(req, res))
    .post('/', (req, res) => categoriesController.insertCategory(req, res))
    .put('/:id', (req, res) => categoriesController.updateCategoryById(req, res))
    .delete('/:id', (req, res) => categoriesController.deleteCategoryById(req, res));

module.exports = {
    '/categories': categoriesRouter,
};
