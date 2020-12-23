const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const database = require('./db/index');
const peopleApp = require('./app/people');
const productsApp = require('./app/products');
const categoriesApp = require('./app/categories');

dotenv.config();

const app = express();
const port = 3000;

app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false,
}));

// parse application/json
app.use(bodyParser.json());

database.connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    }).catch((err) => {
        console.log(err);
    });

peopleApp(app);

productsApp(database.getConnection(), app);

categoriesApp(database.getConnection(), app);

// connection.end();
