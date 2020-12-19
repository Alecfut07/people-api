function Categories(connection, app) {
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
                    console.log(error);
                } else {
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
                    console.log(error);
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
                    console.log(error);
                } else {
                    var row = req.body
                    res.status(201).json({
                        data: {
                            name: row.name
                        },
                        errors: []
                    })
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
                                console.log(error);
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
                            message: "INTERNAL SERVER ERROR"
                        }]
                    }
                    res.status(500).json(body)
                    console.log(error);
                } else {
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
                                        message: "INTERNAL SERVER ERROR"
                                    }]
                                }
                                res.status(500).json(body)
                                console.log(error);
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