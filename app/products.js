const ApiError = require('./models/api-error');
const ApiBody = require('./models/api-body');
const Category = require('./models/category');
const InfoStock = require('./models/info-stock');
const Product = require('./models/product');

function Products(connection, app) {
    app.get('/products', (req, res) => {
        connection.query(
            `
            SELECT p.*, c.id as category_id, c.name as category_name
            FROM products p INNER JOIN categories c ON p.category_id = c.id
            `,
            (error, results) => {
                if (error) {
                    console.log(error);
                    const error = new ApiError(500, 'INTERNAL SERVER ERROR');
                    const body = new ApiBody([], [error]);
                    res.status(500).json(body);
                } else {
                    const products = [];
                    results.forEach((row) => {
                        const category = new Category(row.category_id, row.category_name);
                        const infoStock = new InfoStock(row.stock, row.stock_min, row.stock_max);
                        const product = new Product(row.id, row.name, row.details, category, infoStock, row.price);
                        products.push(product);
                    });
                    const body = new ApiBody(products);
                    res.json(body);
                }
                // console.log(results[0]);
                // console.log(results[0].nombreProducto);
            },
        );
    });

    app.get('/products/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        // connection.query('SELECT * FROM products WHERE idProducto = ' + id)
        const query = `
            SELECT p.*, c.id as category_id, c.name as category_name
            FROM products p INNER JOIN categories c ON p.category_id = c.id
            WHERE p.id = ${id}`
        connection.query(query, (error, results) => {
            if (error) {
                console.log(error);
                const error = new ApiError(500, 'INTERNAL SERVER ERROR');
                const body = new ApiBody([], [error]);
                res.status(500).json(body);
            } else if (results.length > 0) {
                const row = results[0];
                const infoStock = new InfoStock(row.stock, row.stock_min, row.stock_max);
                const category = new Category(row.category_id, row.category_name);
                const product = new Product(row.id, row.name, row.details, category, infoStock, row.price);
                const body = new ApiBody(product);
                res.json(body);
            } else {
                const body = new ApiBody([], []);
                res.json(body);
            }
        });
    });

    function isProductNameValid(name) {
        return name && name.length > 0;
    }

    function isProductDetailsValid(details) {
        return details && details.length > 0;
    }

    function isProductValid(product) {
        return isProductNameValid(product.name) && isProductDetailsValid(product.details);
    }

    app.post('/products', (req, res) => {
        if (!isProductValid(req.body)) {
            const error = new ApiError(400, 'BAD REQUEST ERROR');
            const body = new ApiBody([], [error]);
            res.status(400).json(body);
            return;
        }
        connection.query(
            `
            INSERT INTO products(name, details, stock, category_id, price, stock_max, stock_min)
            VALUES ('${req.body.name}', '${req.body.details}', ${req.body.stock}, 
            ${req.body.category_id}, ${req.body.price}, ${req.body.stock_max}, ${req.body.stock_min})
            `,
            (error) => {
                if (error) {
                    console.log(error);
                    const error = new ApiError(500, 'INTERNAL SERVER ERROR');
                    const body = new ApiBody([], [error]);
                    res.status(500).json(body);
                } else {
                    const row = req.body;
                    const infoStock = new InfoStock(row.stock, row.stock_min, row.stock_max);
                    const category = new Category(row.category_id, row.category_name);
                    const product = new Product(row.id, row.name, row.details, category, infoStock, row.price);
                    const body = new ApiBody(product);
                    res.status(201).json(body);
                }
            },
        );
        // console.log(req.body.nombreProducto)
    });

    app.put('/products/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        const productToUpdate = req.body;

        console.log(productToUpdate);
        connection.query(
            `
                UPDATE products
                SET name = '${productToUpdate.name}', details = '${productToUpdate.details}', category_id = ${productToUpdate.category_id}, price = '${productToUpdate.price}'
                WHERE id = ${id}
            `,
            (error) => {
                if (error) {
                    console.log(error);
                    const error = new ApiError(500, 'INTERNAL SERVER ERROR');
                    const body = new ApiBody([], [error]);
                    res.status(500).json(body);
                } else {
                    connection.query(
                        `
                        SELECT p.*, c.id as category_id, c.name as category_name
                        FROM products p INNER JOIN categories c ON p.category_id = c.id
                        WHERE p.id = ${id}
                        `,
                        (error, results) => {
                            if (error) {
                                console.log(error);
                                const error = new ApiError(500, 'INTERNAL SERVER ERROR');
                                const body = new ApiBody([], [error]);
                                res.status(500).json(body);
                            } else if (results.length > 0) {
                                const row = results[0];
                                const infoStock = new InfoStock(row.stock, row.stock_min, row.stock_max);
                                const category = new Category(row.category_id, row.category_name);
                                const product = new Product(row.id, row.name, row.details, category, infoStock, 
                                    row.price);
                                const body = new ApiBody(product);
                                res.status(200).json(body);
                            } else {
                                const body = new ApiBody([], []);
                                res.json(body);
                            }
                        }
                    )
                }
            }
        );
    })

    app.delete('/products/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        connection.query(
            `
                DELETE FROM price_history WHERE product_id = ${id}
            `,
            (error) => {
                if (error) {
                    console.log(error);
                    const error = new ApiError(500, 'INTERNAL SERVER ERROR');
                    const body = new ApiBody([], [error]);
                    res.status(500).json(body);
                } else {
                    connection.query(
                        `
                            DELETE FROM orders WHERE product_id = ${id}
                        `,
                        (error) => {
                            if (error) {
                                console.log(error);
                                const error = new ApiError(500, 'INTERNAL SERVER ERROR');
                                const body = new ApiBody([], [error]);
                                res.status(500).json(body);
                            } else {
                                connection.query(
                                    `
                                        DELETE FROM products WHERE id = ${id}
                                    `,
                                    (error) => {
                                        if (error) {
                                            console.log(error);
                                            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
                                            const body = new ApiBody([], [error]);
                                            res.status(500).json(body);
                                        }
                                        res.status(204).end();
                                    },
                                );
                            }
                        },
                    );
                }
            },
        );
    });
}

module.exports = Products;
