const Category = require('../models/category');
const database = require('../../db');

function getCategories() {
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

function updateCategoryById(id, category) {
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

function insertCategory(category) {
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

function deleteProductByIdOfCategory(id) {
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

function deleteCategoryById(id) {
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

function getCategoryById(id) {
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

module.exports = {
    getCategories,
    updateCategoryById,
    insertCategory,
    deleteProductByIdOfCategory,
    deleteCategoryById,
    getCategoryById,
};
