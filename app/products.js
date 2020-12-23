const ApiError = require('./models/api-error');
const ApiBody = require('./models/api-body');
const Category = require('./models/category');
const InfoStock = require('./models/info-stock');
const Product = require('./models/product');

function Products(connection, app) {
    function getProducts() {
        return new Promise((resolve, reject) => {
            connection.query(
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
            connection.query(
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
            connection.query(
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
            connection.query(
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
            connection.query(
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
            connection.query(
                `
                DELETE FROM products 
                WHERE id = ${id}
                `, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        // const category = new Category(results.category_id, results.category_name);
                        // const infoStock = new InfoStock(results.stock, results.stock_min, results.stock_max);
                        resolve(new Product(results.insertId, results.name, results.details, 
                            new Category(results.category_id, results.category_name),
                            new InfoStock(results.stock, results.stock_min, results.stock_max), results.price));
                    }
                },
            );
        });
    }

    function getProductById(id) {
        return new Promise((resolve, reject) => {
            connection.query(
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

    function isProductNameValid(name) {
        return name && name.length > 0;
    }

    function isProductDetailsValid(details) {
        return details && details.length > 0;
    }

    function isProductValid(product) {
        return isProductNameValid(product.name) && isProductDetailsValid(product.details);
    }

    app.get('/products', (req, res) => {
        getProducts()
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
    });

    app.get('/products/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        getProductById(id)
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
    });

    app.post('/products', (req, res) => {
        const productToInsert = req.body;
        if (!isProductValid(req.body)) {
            const error = new ApiError(400, 'BAD REQUEST ERROR');
            const body = new ApiBody([], [error]);
            res.status(400).json(body);
            return;
        }
        insertProduct(productToInsert)
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
    });

    app.put('/products/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        const productToUpdate = req.body;
        updateProductById(id, productToUpdate)
            .then((productId) => getProductById(productId))
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
    });

    app.delete('/products/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        deletePriceHistory(id)
            .then((productId) => deleteOrder(productId))
            .then((productId) => deleteProductById(productId))
            .then((results) => {
                res.status(204).json(results);
            })
            .catch((err) => {
                console.log(err);
                const error = new ApiError(500, 'INTERNAL SERVER ERROR');
                const body = new ApiBody([], [error]);
                res.status(500).json(body);
            });
    });
}

module.exports = Products;
