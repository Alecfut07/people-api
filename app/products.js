var ApiError = require('./models/api-error');
var ApiBody = require('./models/api-body');
var Category = require('./models/category');
var InfoStock = require('./models/info-stock');
var Product = require('./models/product');

function Products(connection, app) {
    app.get('/products', (req, res) => {
        connection.query(
            `
            SELECT p.*, c.id as category_id, c.name as category_name
            FROM products p INNER JOIN categories c ON p.category_id = c.id
            `,
            function (error, results, fields) {
                if (error) {
                    console.log(error);
                    var error = new ApiError(500, 'INTERNAL SERVER ERROR');
                    var body = new ApiBody([], [error])
                    res.status(500).json(body)
                } else {
                    var products = [];
                    for (var row of results) {
                        var category = new Category(row.category_id, row.category_name);
                        var infoStock = new InfoStock(row.stock, row.stock_min, row.stock_max);
                        var product = new Product(row.id, row.name, row.details, category, infoStock, row.price)
                        products.push(product);
                    }
                    var body = new ApiBody(products)
                    res.json(body)
                }
                //console.log(results[0]);
                //console.log(results[0].nombreProducto);
            });
    })

    app.get('/products/:id', (req, res) => {
        var id = parseInt(req.params.id, 10)
        // connection.query('SELECT * FROM products WHERE idProducto = ' + id)
        var query = `
            SELECT p.*, c.id as category_id, c.name as category_name
            FROM products p INNER JOIN categories c ON p.category_id = c.id
            WHERE p.id = ${id}`
        connection.query(query, function (error, results, fields) {
            if (error) {
                console.log(error);
                var body = {
                    data: [],
                    errors: [
                        new ApiError(500, 'INTERNAL SERVER ERROR')
                    ]
                }
                res.status(500).json(body)
            } else if (results.length > 0) {
                var row = results[0]
                var infoStock = new InfoStock(row.stock, row.stock_min, row.stock_max)
                var category = new Category(row.category_id, row.category_name)
                var product = new Product(row.id, row.name, row.details, category, infoStock, row.price)
                var body = new ApiBody(product)
                res.json(body)
            } else {
                res.json({
                    data: [],
                    errors: []
                })
            }
        });
    })

    function isProductNameValid(name) {
        return name && name.length > 0;
    }

    function isProductDetailsValid(details) {
        return details && details.length > 0;
    }

    function isProductValid(product) {
        return isProductNameValid(product.name) &&
            isProductDetailsValid(product.details);
    }

    app.post('/products', (req, res) => {
        if (!isProductValid(req.body)) {
            var body = {
                data: [],
                errors: [{
                    code: 400,
                    message: "BAD REQUEST ERROR"
                }]
            }
            res.status(400).json(body);
            return;
        }


        connection.query(
            `
            INSERT INTO products(name, details, stock, category_id, price, stock_max, stock_min)
            VALUES ('${req.body.name}', '${req.body.details}', ${req.body.stock}, 
            ${req.body.category_id}, ${req.body.price}, ${req.body.stock_max}, ${req.body.stock_min})
            `,
            function (error, results, fields) {
                if (error) {
                    var body = {
                        data: [],
                        errors: [{
                            code: 500,
                            message: "INTERNAL SERVER ERROR"
                        }]
                    }
                    res.status(500).json(body)
                    console.log(error);
                } else {
                    var row = req.body
                    res.status(201).json({
                        data: {
                            id: results.insertId,
                            name: row.name,
                            details: row.details,
                            category_id: row.category_id,
                            info_stock: {
                                stock: row.stock,
                                stock_min: row.stock_min,
                                stock_max: row.stock_max
                            },
                            price: row.price
                        },
                        errors: []
                    })
                }
            });
        //console.log(req.body.nombreProducto)
    })

    app.put('/products/:id', (req, res) => {
        var id = parseInt(req.params.id, 10)
        var productToUpdate = req.body;

        console.log(productToUpdate);
        connection.query(
            `
                UPDATE products
                SET name = '${productToUpdate.name}', details = '${productToUpdate.details}', category_id = ${productToUpdate.category_id}, price = '${productToUpdate.price}'
                WHERE id = ${id}
            `,
            function (error, results, fields) {
                if (error) {
                    var body = {
                        data: [],
                        errors: [{
                            code: 500,
                            message: "INTERNAL SERVER ERROR"
                        }]
                    }
                    res.status(500).json(body)
                    console.log(error);
                } else {
                    connection.query(
                        `
                        SELECT p.*, c.id as category_id, c.name as category_name
                        FROM products p INNER JOIN categories c ON p.category_id = c.id
                        WHERE p.id = ${id}
                        `,
                        function (error, results, fields) {
                            if (error) {
                                var body = {
                                    data: [],
                                    errors: [{
                                        code: 500,
                                        message: "INTERNAL SERVER ERROR"
                                    }]
                                }
                                res.status(500).json(body)
                                console.log(error);
                            } else if (results.length > 0) {
                                var row = results[0]
                                res.status(200).json({
                                    data: {
                                        id: row.id,
                                        name: row.name,
                                        details: row.details,
                                        category: {
                                            id: row.category_id,
                                            name: row.category_name
                                        },
                                        info_stock: {
                                            stock: row.stock,
                                            stock_min: row.stock_min,
                                            stock_max: row.stock_max
                                        },
                                        price: row.price
                                    },
                                    errors: []
                                })
                            } else {
                                res.json({
                                    data: [],
                                    errors: []
                                })
                            }
                        }
                    )
                }
            }
        );
    })

    app.delete('/products/:id', (req, res) => {
        var id = parseInt(req.params.id, 10)
        connection.query(
            `
                DELETE FROM price_history WHERE product_id = ${id}
            `,
            function (error, results, fields) {
                if (error) {
                    var body = {
                        data: [],
                        errors: [{
                            code: 500,
                            message: "INTERNAL SERVER ERROR"
                        }]
                    }
                    res.status(500).json(body)
                    console.log(error);
                } else {
                    connection.query(
                        `
                            DELETE FROM orders WHERE product_id = ${id}
                        `,
                        function (error, results, fields) {
                            if (error) {
                                var body = {
                                    data: [],
                                    errors: [{
                                        code: 500,
                                        message: "INTERNAL SERVER ERROR"
                                    }]
                                }
                                res.status(500).json(body)
                                console.log(error);
                            } else {
                                connection.query(
                                    `
                                        DELETE FROM products WHERE id = ${id}
                                    `,
                                    function (error, results, fields) {
                                        if (error) {
                                            var body = {
                                                data: [],
                                                errors: [{
                                                    code: 500,
                                                    message: "INTERNAL SERVER ERROR"
                                                }]
                                            }
                                            res.status(500).json(body)
                                            console.log(error);
                                        }
                                        res.status(204).end()
                                    }
                                );
                            }
                        }
                    )
                }
            }
        )
    })
}

module.exports = Products