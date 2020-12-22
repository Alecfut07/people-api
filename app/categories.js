const ApiBody = require('./models/api-body');
const ApiError = require('./models/api-error');
const Category = require('./models/category');

function Categories(connection, app) {
    app.get('/categories', (req, res) => {
        connection.query(
            `
                SELECT *
                FROM categories
            `,
            (error, results) => {
                if (error) {
                    console.log(error);
                    const apiError = new ApiError(500, 'INTERNAL SERVER ERROR');
                    const body = new ApiBody([], [apiError]);
                    res.status(500).json(body);
                } else {
                    const categories = [];
                    results.forEach((row) => {
                        const category = new Category(row.id, row.name);
                        categories.push(category);
                    });
                    const body = new ApiBody(categories);
                    res.json(body);
                }
            },
        );
    });

    app.get('/categories/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        connection.query(
            `
                SELECT *
                FROM categories
                WHERE id = ${id}
            `,
            (error, results) => {
                if (error) {
                    console.log(error);
                    const apiError = new ApiError(500, 'INTERNAL SERVER ERROR');
                    const body = new ApiBody([], [apiError]);
                    res.status(500).json(body);
                } else if (results.length > 0) {
                    const row = results[0];
                    const category = new Category(row.id, row.name);
                    const body = new ApiBody(category);
                    res.json(body);
                } else {
                    const body = new ApiBody([], []);
                    res.json(body);
                }
            },
        );
    });

    app.post('/categories', (req, res) => {
        connection.query(
            `
                INSERT INTO categories(name)
                VALUES ('${req.body.name}')
            `,
            (error) => {
                if (error) {
                    console.log(error);
                    const apiError = new ApiError(500, 'INTERNAL SERVER ERROR');
                    const body = new ApiBody([], [apiError]);
                    res.status(500).json(body);
                } else {
                    const row = req.body;
                    const category = new Category(row.id, row.name);
                    const body = new ApiBody(category);
                    res.status(201).json(body);
                }
            },
        );
    });

    function updateCategoryById(id, category) {
        return new Promise((resolve, reject) => {
            connection.query(
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

    function getCategoryById(id) {
        return new Promise((resolve, reject) => {
            connection.query(
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

    app.put('/categories/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        const categoryToUpdate = req.body;
        updateCategoryById(id, categoryToUpdate)
            .then((categoryId) => getCategoryById(categoryId))
            .then((results) => {
                if (results && results.length > 0) {
                    const row = results[0];
                    const category = new Category(row.id, row.name);
                    const body = new ApiBody(category, []);
                    res.status(200).json(body);
                } else {
                    const body = new ApiBody(null);
                    res.json(body);
                }
            })
            .catch((err) => {
                console.log(err);
                const apiError = new ApiError(500, 'INTERNAL SERVER ERROR');
                const body = new ApiBody([], [apiError]);
                res.status(500).json(body);
            });
    });

    app.delete('/categories/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        connection.query(
            `
                DELETE FROM products WHERE category_id = ${id}
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
                            DELETE FROM categories WHERE id = ${id}
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
    });
}

module.exports = Categories;
