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
});

connection.connect();

app.get('/products', (req, res) => {
    connection.query('SELECT * FROM products INNER JOIN category on products.idCategoria = category.idCategoria', function (error, results, fields) {
        if (error) {
            res.status(500).json({
                data: [],
                errors: [{
                    code: 500
                }]
            })
        }
        var products = [];
        for (var row of results) {
            var product = {
                id: row.idProducto,
                name: row.nombreProducto,
                detail: row.detallesProducto,
                category: {
                    id: row.idCategoria,
                    name: row.nombreCategoria
                },
                info_stock: {
                    stock: row.stock,
                    stock_min: row.stockMin,
                    stock_max: row.stockMax
                },
                precio: row.precio
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
    var query = `SELECT * FROM products WHERE idProducto = ${id}`
    connection.query(query, function (error, results, fields) {
        if (error) {
            var body = {
                data: [],
                errors: [{
                    code: 500,
                    message: "Internal server error"
                }]
            }
            res.status(500).json(body)
        } else if (results.length > 0) {
            var row = results[0]
            var product = {
                id: row.idProducto,
                name: row.nombreProducto,
                detail: row.detallesProducto,
                category: {
                    id: row.idCategoria,
                    name: row.nombreCategoria
                },
                info_stock: {
                    stock: row.stock,
                    stock_min: row.stockMin,
                    stock_max: row.stockMax
                },
                precio: row.precio
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
            INSERT INTO products(idProducto, nombreProducto, detallesProducto, stock, idCategoria, precio, stockMax, stockMin)
            VALUES (${req.body.idProducto}, '${req.body.nombreProducto}', '${req.body.detallesProducto}', ${req.body.stock}, 
            1, ${req.body.precio}, ${req.body.stockMax}, ${req.body.stockMin})
        `,
        function (error, results, fields) {
            if (error) {
                var body = {
                    data: [],
                    errors: [{
                        code: 500,
                        message: "Internal server error"
                    }]
                }
                res.status(500).json(body)
            }
            var row = req.body
            res.status(201).json({
                data: {
                    id: row.idProducto,
                    name: row.nombreProducto,
                    detail: row.detallesProducto,
                    category: {
                        id: row.idCategoria,
                        name: row.nombreCategoria
                    },
                    info_stock: {
                        stock: row.stock,
                        stock_min: row.stockMin,
                        stock_max: row.stockMax
                    },
                    precio: row.precio
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
            UPDATE products set nombreProducto = '${productToUpdate.nombreProducto}', 
            detallesProducto = '${productToUpdate.detallesProducto}' WHERE idProducto = ${id}
        `,
        function (error, results, fields) {
            if (error) {
                var body = {
                    data: [],
                    errors: [{
                        code: 500,
                        message: "Internal server error"
                    }]
                }
                res.status(500).json(body)
            }

            connection.query(
                `
                SELECT * FROM products WHERE idProducto = ${id}
                `,
                function (error, results, fields) {
                    if (error) {
                        var body = {
                            data: [],
                            errors: [{
                                code: 500,
                                message: "Internal server error"
                            }]
                        }
                        res.status(500).json(body)
                    } else if (results.length > 0) {
                        var row = results[0]
                        res.status(200).json({
                            data: {
                                id: row.idProducto,
                                name: row.nombreProducto,
                                detail: row.detallesProducto,
                                category: {
                                    id: row.idCategoria,
                                    name: row.nombreCategoria
                                },
                                info_stock: {
                                    stock: row.stock,
                                    stock_min: row.stockMin,
                                    stock_max: row.stockMax
                                },
                                precio: row.precio
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
            DELETE FROM products WHERE idProducto = ${id}
        `,
        function (error, results, fields) {
            if (error) {
                var body = {
                    data: [],
                    errors: [{
                        code: 500,
                        message: "Internal server error"
                    }]
                }
                res.status(500).json(body)
            }
            res.status(204).end()
        });
})

//connection.end();