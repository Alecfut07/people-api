const ApiBody = require('./models/api-body');
const ApiError = require('./models/api-error');
const Category = require('./models/category');

function Categories(connection, app) {
    function getCategories() {
        return new Promise((resolve, reject) => {
            connection.query(
                `
                SELECT *
                FROM categories
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

    function insertCategory(category) {
        return new Promise((resolve, reject) => {
            connection.query(
                `
                INSERT INTO categories(name)
                VALUES ('${category.name}')
                `, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(new Category(results.insertId, category.name));
                    }
                },
            );
        });
    }

    function deleteProductByIdOfCategory(id) {
        return new Promise((resolve, reject) => {
            connection.query(
                `
                    DELETE FROM products 
                    WHERE category_id = ${id}
                `,
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(id);
                    }
                },
            );
        });
    }

    function deleteCategoryById(id) {
        return new Promise((resolve, reject) => {
            connection.query(
                `
                DELETE FROM categories 
                WHERE id = ${id}
                `, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(new Category(results.insertId, results.name));
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

    app.get('/categories', (req, res) => {
        getCategories()
            .then((results) => {
                const categories = [];
                results.forEach((row) => {
                    const category = new Category(row.id, row.name);
                    categories.push(category);
                });
                const body = new ApiBody(categories);
                res.json(body);
            })
            .catch((err) => {
                console.log(err);
                const apiError = new ApiError(500, 'INTERNAL SERVER ERROR');
                const body = new ApiBody([], [apiError]);
                res.status(500).json(body);
            });
    });

    app.get('/categories/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        getCategoryById(id)
            .then((results) => {
                if (results && results.length > 0) {
                    const row = results[0];
                    const category = new Category(row.id, row.name);
                    const body = new ApiBody(category);
                    res.json(body);
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

    app.post('/categories', (req, res) => {
        const categoryToInsert = req.body;
        insertCategory(categoryToInsert)
            .then((category) => {
                const body = new ApiBody(category);
                res.status(201).json(body);
            })
            .catch((err) => {
                console.log(err);
                const apiError = new ApiError(500, 'INTERNAL SERVER ERROR');
                const body = new ApiBody([], [apiError]);
                res.status(500).json(body);
            });
    });

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
        deleteProductByIdOfCategory(id)
            .then((categoryId) => deleteCategoryById(categoryId))
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

module.exports = Categories;
