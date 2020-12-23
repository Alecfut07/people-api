const ApiError = require('../models/api-error');
const ApiBody = require('../models/api-body');
const Category = require('../models/category');
const InfoStock = require('../models/info-stock');
const Product = require('../models/product');
const productsRepository = require('../repositories/products');

function isProductNameValid(name) {
    return name && name.length > 0;
}

function isProductDetailsValid(details) {
    return details && details.length > 0;
}

function isProductValid(product) {
    return isProductNameValid(product.name) && isProductDetailsValid(product.details);
}

function getProducts(req, res) {
    productsRepository.getProducts()
        .then((results) => {
            const products = [];
            results.forEach((row) => {
                const category = new Category(row.category_id, row.category_name);
                const infoStock = new InfoStock(row.stock, row.stock_min, row.stock_max);
                const product = new Product(row.id, row.name, row.details, category, infoStock, row.price);
                products.push(product);
            });
            const body = new ApiBody(products);
            res.json(body);
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function getProductById(req, res) {
    const id = parseInt(req.params.id, 10);
    productsRepository.getProductById(id)
        .then((results) => {
            if (results && results.length > 0) {
                const row = results[0];
                const infoStock = new InfoStock(row.stock, row.stock_min, row.stock_max);
                const category = new Category(row.category_id, row.category_name);
                const product = new Product(row.id, row.name, row.details, category, infoStock, row.price);
                const body = new ApiBody(product);
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

function insertProduct(req, res) {
    const productToInsert = req.body;
    if (!isProductValid(req.body)) {
        const error = new ApiError(400, 'BAD REQUEST ERROR');
        const body = new ApiBody([], [error]);
        res.status(400).json(body);
        return;
    }
    productsRepository.insertProduct(productToInsert)
        .then((product) => {
            const body = new ApiBody(product);
            res.status(201).json(body);
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function updateProductById(req, res) {
    const id = parseInt(req.params.id, 10);
    const productToUpdate = req.body;
    productsRepository.updateProductById(id, productToUpdate)
        .then((productId) => productsRepository.getProductById(productId))
        .then((results) => {
            if (results && results.length > 0) {
                const row = results[0];
                const infoStock = new InfoStock(row.stock, row.stock_min, row.stock_max);
                const category = new Category(row.category_id, row.category_name);
                const product = new Product(row.id, row.name, row.details, category, infoStock, 
                    row.price);
                const body = new ApiBody(product);
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

function deleteProductById(req, res) {
    const id = parseInt(req.params.id, 10);
    productsRepository.deletePriceHistory(id)
        .then((productId) => productsRepository.deleteOrder(productId))
        .then((productId) => productsRepository.deleteProductById(productId))
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
    getProducts,
    getProductById,
    insertProduct,
    updateProductById,
    deleteProductById,
};
