const Category = require('../models/category');
const InfoStock = require('../models/info-stock');
const Product = require('../models/product');
const database = require('../../db');

function getProducts() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            SELECT p.*, c.id as category_id, c.name as category_name
            FROM products p INNER JOIN categories c ON p.category_id = c.id
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

function updateProductById(id, product) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            UPDATE products
            SET name = '${product.name}', details = '${product.details}', category_id = ${product.category_id}, 
            price = '${product.price}'
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

function insertProduct(product) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            INSERT INTO products(name, details, stock, category_id, price, stock_max, stock_min)
            VALUES ('${product.name}', '${product.details}', ${product.stock}, 
            ${product.category_id}, ${product.price}, ${product.stock_max}, ${product.stock_min})
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Product(results.insertId, product.name));
                }
            },
        );
    });
}

function deletePriceHistory(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            DELETE FROM price_history 
            WHERE product_id = ${id}
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

function deleteOrder(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            DELETE FROM orders 
            WHERE product_id = ${id}
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

function deleteProductById(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            DELETE FROM products 
            WHERE id = ${id}
            `, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const category = new Category(results.category_id, results.category_name);
                    const infoStock = new InfoStock(results.stock, results.stock_min, results.stock_max);
                    const product = new Product(
                        results.insertId, results.name, results.details, category, infoStock, results.price);
                    resolve(product);
                }
            },
        );
    });
}

function getProductById(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(
            `
            SELECT p.*, c.id as category_id, c.name as category_name
            FROM products p INNER JOIN categories c ON p.category_id = c.id
            WHERE p.id = ${id}
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
    getProducts,
    updateProductById,
    insertProduct,
    deletePriceHistory,
    deleteOrder,
    deleteProductById,
    getProductById,
};
