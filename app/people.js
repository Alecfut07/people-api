function People(app) {
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
}

module.exports = People