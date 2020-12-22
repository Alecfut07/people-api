const ApiBody = require("./models/api-body");
const ApiError = require("./models/api-error");
const Category = require("./models/category");

function Categories(connection, app) {
    app.get('/categories', (req, res) => {
        connection.query(
            `
                SELECT * FROM categories
            `,
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    var error = new ApiError(500, "INTERNAL SERVER ERROR")
                    var body = new ApiBody([], [error])
                    res.status(500).json(body)
                } else {
                    var categories = [];
                    for (var row of results) {
                        var category = new Category(row.id, row.name)
                        categories.push(category)
                    }
                    var body = new ApiBody(categories)
                    res.json(body)
                }
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
                    console.log(error)
                    var error = new ApiError(500, "INTERNAL SERVER ERROR")
                    var body = new ApiBody([], [error])
                    res.status(500).json(body)
                } else if (results.length > 0) {
                    var row = results[0]
                    var category = new Category(row.id, row.name)
                    var body = new ApiBody(category)
                    res.json(body)
                } else {
                    var body = new ApiBody([], [])
                    res.json(body)
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
                    console.log(error)
                    var error = new ApiError(500, "INTERNAL SERVER ERROR")
                    var body = new ApiBody([], [error])
                    res.status(500).json(body)
                } else {
                    var row = req.body
                    var category = new Category(row.id, row.name)
                    var body = new ApiBody(category)
                    res.status(201).json(body)
                }
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
                    console.log(error)
                    var error = new ApiError(500, "INTERNAL SERVER ERROR")
                    var body = new ApiBody([], [error])
                    res.status(500).json(body)
                } else {
                    connection.query(
                        `
                            SELECT * FROM categories WHERE id = ${id}
                        `,
                        function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                var error = new ApiError(500, "INTERNAL SERVER ERROR")
                                var body = new ApiBody([], [error])
                                res.status(500).json(body)
                            } else if (results.length > 0) {
                                var row = results[0]
                                var category = new Category(row.id, row.name)
                                var body = new ApiBody(category, [])
                                res.status(200).json(body)
                            } else {
                                var body = new ApiBody([], [])
                                res.json(body)
                            }
                        }
                    )
                }
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
                    console.log(error)
                    var error = new ApiError(500, "INTERNAL SERVER ERROR")
                    var body = new ApiBody([], [error])
                    res.status(500).json(body)
                } else {
                    connection.query(
                        `
                            DELETE FROM categories WHERE id = ${id}
                        `,
                        function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                var error = new ApiError(500, "INTERNAL SERVER ERROR")
                                var body = new ApiBody([], [error])
                                res.status(500).json(body)
                            }
                            res.status(204).end()
                        }
                    )
                }
            }

        )
    })
}

module.exports = Categories