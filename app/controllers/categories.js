const ApiBody = require('../models/api-body');
const ApiError = require('../models/api-error');
const Category = require('../models/category');
const categoriesRepository = require('../repositories/categories');

function getCategories(req, res) {
    categoriesRepository.getCategories()
        .then((results) => {
            const categories = [];
            results.forEach((row) => {
                const category = new Category(row.id, row.name);
                categories.push(category);
            });
            const body = new ApiBody(categories);
            res.json(body);
        })
        .catch((err) => {
            console.log(err);
            const apiError = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [apiError]);
            res.status(500).json(body);
        });
};

function getCategoryById(req, res) {
    const id = parseInt(req.params.id, 10);
    categoriesRepository.getCategoryById(id)
        .then((results) => {
            if (results && results.length > 0) {
                const row = results[0];
                const category = new Category(row.id, row.name);
                const body = new ApiBody(category);
                res.json(body);
            } else { 
                const body = new ApiBody(null);
                res.json(body);
            }
        })
        .catch((err) => {
            console.log(err);
            const apiError = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [apiError]);
            res.status(500).json(body);
        });
}

function insertCategory(req, res) {
    const categoryToInsert = req.body;
    categoriesRepository.insertCategory(categoryToInsert)
        .then((category) => {
            const body = new ApiBody(category);
            res.status(201).json(body);
        })
        .catch((err) => {
            console.log(err);
            const apiError = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [apiError]);
            res.status(500).json(body);
        });
}

function updateCategoryById(req, res) {
    const id = parseInt(req.params.id, 10);
    const categoryToUpdate = req.body;
    categoriesRepository.updateCategoryById(id, categoryToUpdate)
        .then((categoryId) => categoriesRepository.getCategoryById(categoryId))
        .then((results) => {
            if (results && results.length > 0) {
                const row = results[0];
                const category = new Category(row.id, row.name);
                const body = new ApiBody(category, []);
                res.status(200).json(body);
            } else {
                const body = new ApiBody(null);
                res.json(body);
            }
        })
        .catch((err) => {
            console.log(err);
            const apiError = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [apiError]);
            res.status(500).json(body);
        });
}

function deleteCategoryById(req, res) {
    const id = parseInt(req.params.id, 10);
    categoriesRepository.deleteProductByIdOfCategory(id)
        .then((categoryId) => categoriesRepository.deleteCategoryById(categoryId))
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
    getCategories,
    getCategoryById,
    insertCategory,
    updateCategoryById,
    deleteCategoryById,
};
