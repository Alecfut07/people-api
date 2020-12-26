const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./db/index');
const peopleApp = require('./app/people');
const routes = require('./routes');

dotenv.config();

const app = express();
const port = 3001;

app.use(morgan('dev'));
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false,
}));

// parse application/json
app.use(bodyParser.json());

Object.keys(routes).forEach((path) => {
    app.use(path, routes[path]);
});

database.connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    }).catch((err) => {
        console.log(err);
    });

peopleApp(app);
