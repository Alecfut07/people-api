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
    host: 'localhost',
    user: 'root',
    password: 'Ortegaalec00',
    database: 'ortega_cruz-pharmacy'
});

connection.connect();

app.get('/products', (req, res) => {
    connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;
        res.json(results)
        //console.log(results[0]);
        //console.log(results[0].nombreProducto);
    });
})

app.get('/products/:id', (req, res) => {
    var id = parseInt(req.params.id, 10)
    // connection.query('SELECT * FROM products WHERE idProducto = ' + id)
    connection.query(`SELECT * FROM products WHERE idProducto = ${id}`, function (error, results, fields) {
        if (error) throw error;
        res.json(results)
    });
})

app.post('/products', (req, res) => {
    connection.query(
        `
                    INSERT INTO products(idProducto, nombreProducto, detallesProducto, stock, idCategoria, precio, stockMax, stockMin)
                    VALUES (${req.body.idProducto}, '${req.body.nombreProducto}', 'Para tratar infecciones bacterianas.', 100, 1, 35.00, 100, 20)
                    `,
        function (error, results, fields) {
            if (error) res.status(500).end();
            res.status(200).end()
        });
    //console.log(req.body.nombreProducto)
    res.end()
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
            if (error) res.status(500).end();
            res.status(200).end()
        });
    res.end()
})

app.delete('/products/:id', (req, res) => {
    var id = parseInt(req.params.id, 10)
    connection.query(
        `
            DELETE FROM products WHERE idProducto = ${id}
        `,
        function (error, results, fields) {
            if (error) res.status(500).end();
            res.status(200).end()
        });
    res.end()
})

//connection.end();