const morgan = require('morgan');

const mysql = require('mysql');

const express = require('express');

const bodyParser = require('body-parser');

const peopleApp = require('./app/people');

const productsApp = require('./app/products');

const categoriesApp = require('./app/categories');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const app = express();
const port = 3000;
require('dotenv').config();

app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false,
}));

// parse application/json
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

connection.connect();

peopleApp(app);

productsApp(connection, app);

categoriesApp(connection, app);

// connection.end();
