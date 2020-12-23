const ApiBody = require('../models/api-body');
const ApiError = require('../models/api-error');
const Category = require('../models/category');
const database = require('../../db');

// function Categories(app) {
function getCategoriesFromDb() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            SELECT *
            FROM categories
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

function updateCategoryByIdFromDb(id, category) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
                UPDATE categories
                SET name = '${category.name}'
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

function insertCategoryFromDb(category) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            INSERT INTO categories(name)
            VALUES ('${category.name}')
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Category(results.insertId, category.name));
                }
            },
        );
    });
}

function deleteProductByIdOfCategoryFromDb(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
                DELETE FROM products 
                WHERE category_id = ${id}
            `,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(id);
                }
            },
        );
    });
}

function deleteCategoryByIdFromDb(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            DELETE FROM categories 
            WHERE id = ${id}
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Category(results.insertId, results.name));
                }
            },
        );
    });
}

function getCategoryByIdFromDb(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
                SELECT *
                FROM categories
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

function getCategories(req, res) {
    getCategoriesFromDb()
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
    getCategoryByIdFromDb(id)
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
    insertCategoryFromDb(categoryToInsert)
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
    updateCategoryByIdFromDb(id, categoryToUpdate)
        .then((categoryId) => getCategoryByIdFromDb(categoryId))
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
    deleteProductByIdOfCategoryFromDb(id)
        .then((categoryId) => deleteCategoryByIdFromDb(categoryId))
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
