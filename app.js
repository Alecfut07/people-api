const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())


var array = [{
    id: 1,
    name: "alec"
}, {
    id: 2,
    name: "Alexis"
}]

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/people', (req, res) => {
    res.json(array)
})

app.post('/people', (req, res) => {
    var newId = array[array.length - 1].id + 1
    var newPerson = req.body;
    newPerson.id = newId;
    array.push(newPerson)
    res.send(newPerson)
})


app.put('/people/:id', (req, res) => {
    var id = parseInt(req.params.id, 10)
    var personToUpdate = array.find(obj => obj.id === id)

    personToUpdate.name = req.body.name
    res.end();
})

app.delete('/people/:id', (req, res) => {
    var id = parseInt(req.params.id, 10)
    var personToDelete = array.findIndex(obj => obj.id === id)

    // var personToDelete = -1
    // for (var i in array) {
    //     var item = array[i]
    //     if (item.id === id) {
    //         personToDelete = i
    //         break
    //     }
    // }
    console.log(personToDelete)
    if (personToDelete !== -1) {
        array.splice(personToDelete, 1)
    }
    res.end()
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "pharmacy_db"
});

connection.connect();

app.get('/products', (req, res) => {
    connection.query('SELECT * FROM products INNER JOIN categories on products.category_id = categories.id', function (error, results, fields) {
        if (error) {
            res.status(500).json({
                data: [],
                errors: [{
                    code: 500,
                    message: "INTERNAL SERVER ERROR"
                }]
            })
        }
        var products = [];
        for (var row of results) {
            var product = {
                id: row.id,
                name: row.name,
                detail: row.details,
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
            }
            products.push(product);
        }
        res.json({
            data: products,
            errors: []
        })
        //console.log(results[0]);
        //console.log(results[0].nombreProducto);
    });
})

app.get('/products/:id', (req, res) => {
    var id = parseInt(req.params.id, 10)
    // connection.query('SELECT * FROM products WHERE idProducto = ' + id)
    var query = `SELECT * FROM products WHERE id = ${id}`
    connection.query(query, function (error, results, fields) {
        if (error) {
            var body = {
                data: [],
                errors: [{
                    code: 500,
                    message: "INTERNAL SERVER ERROR"
                }]
            }
            res.status(500).json(body)
        } else if (results.length > 0) {
            var row = results[0]
            var product = {
                id: row.id,
                name: row.name,
                detail: row.details,
                category: {
                    id: row.category_id,
                    name: row.category.name
                },
                info_stock: {
                    stock: row.stock,
                    stock_min: row.stock_min,
                    stock_max: row.stock_max
                },
                price: row.price
            }
            res.json({
                data: product,
                errors: []
            })
        } else {
            res.json({
                data: [],
                errors: []
            })
        }
    });
})

app.post('/products', (req, res) => {
    connection.query(
        `
            INSERT INTO products(name, details, stock, category_id, price, stock_max, stock_min)
            VALUES ('${req.body.name}', '${req.body.details}', ${req.body.stock}, 
            1, ${req.body.price}, ${req.body.stock_max}, ${req.body.stock_min})
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
            }
            var row = req.body
            res.status(201).json({
                data: {
                    id: row.id,
                    name: row.name,
                    detail: row.details,
                    category: {
                        id: row.category_id,
                        name: row.category.name
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
        });
    //console.log(req.body.nombreProducto)
})

app.put('/products/:id', (req, res) => {
    var id = parseInt(req.params.id, 10)
    var productToUpdate = req.body;

    //console.log(productToUpdate);
    connection.query(
        `
            UPDATE products set product_name = '${productToUpdate.product_name}', 
            product_details = '${productToUpdate.product_details}' WHERE id = ${id}
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
            }

            connection.query(
                `
                SELECT * FROM products WHERE id = ${id}
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
                    } else if (results.length > 0) {
                        var row = results[0]
                        res.status(200).json({
                            data: {
                                id: row.id,
                                name: row.name,
                                detail: row.details,
                                category: {
                                    id: row.category_id,
                                    name: row.category.name
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
        });
})

app.delete('/products/:id', (req, res) => {
    var id = parseInt(req.params.id, 10)
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
            }
            res.status(204).end()
        }
    );
})

app.get('/categories', (req, res) => {
    connection.query(
        `
            SELECT * FROM categories
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
            }
            var categories = [];
            for (var row of results) {
                var category = {
                    id: row.id,
                    category_name: row.name
                }
                categories.push(category)
            }
            res.json({
                data: categories,
                errors: []
            })
        }
    );
})

app.get('/categories/:id', (req, res) => {
    var id = parseInt(req.params.id, 10)
    connection.query(
        `
            SELECT * FROM categories WHERE id = ${id}
        `,
        function (error, results, fields) {
            if (error) {
                var body = {
                    data: [],
                    errors: [{
                        code: 500,
                        message: "INTERVAL SERVER ERROR"
                    }]
                }
                res.status(500).json(body)
            } else if (results.length > 0) {
                var row = results[0]
                var category = {
                    id: row.id,
                    name: row.name
                }
                res.json({
                    data: category,
                    errors: []
                })
            } else {
                res.json({
                    data: [],
                    errors: []
                })
            }
        }
    );
})

app.post('/categories', (req, res) => {
    connection.query(
        `
            INSERT INTO categories(name) VALUES ('${req.body.name}')
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
            }
            var row = req.body
            res.status(201).json({
                data: {
                    name: row.name
                },
                errors: []
            })
        }
    )
})

app.put('/categories/:id', (req, res) => {
    var id = parseInt(req.params.id, 10)
    var categoryToUpdate = req.body
    connection.query(
        `
            UPDATE categories SET name = '${categoryToUpdate.name}' WHERE id = ${id}
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
            }

            connection.query(
                `
                    SELECT * FROM categories WHERE id = ${id}
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
                    } else if (results.length > 0) {
                        var row = results[0]
                        res.status(200).json({
                            data: {
                                id: row.id,
                                name: row.name
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
    )
})

app.get('/hello', (req, res) => {
    res.send('Hello World!');
})

app.delete('/categories/:id', (req, res) => {
    var id = parseInt(req.params.id, 10)
    connection.query(
        `
            DELETE FROM products WHERE category_id = ${id}
        `,
        function (error, results, fields) {
            if (error) {
                var body = {
                    data: [],
                    errors: [{
                        code: 500,
                        message: "INTERNAL SERVER ERROR products"
                    }]
                }
                res.status(500).json(body)
                console.log(error);
            }

            connection.query(
                `
                    DELETE FROM categories WHERE id = ${id}
                `,
                function (error, results, fields) {
                    if (error) {
                        var body = {
                            data: [],
                            errors: [{
                                code: 500,
                                message: "INTERNAL SERVER ERROR categories"
                            }]
                        }
                        res.status(500).json(body)
                    }
                    res.status(204).end()
                }
            )
        }

    )
})

//connection.end();