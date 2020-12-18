const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
require('dotenv').config()

const morgan = require('morgan');

app.use(morgan("dev"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

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

var peopleApp = require('./app/people');
peopleApp(app);

var productsApp = require('./app/products');
productsApp(connection, app);

var categoriesApp = require('./app/categories');
categoriesApp(connection, app);

//connection.end();