var express = require("express")
var bodyParser = require("body-parser")
var Sequelize = require("sequelize")
var nodeadmin = require("nodeadmin")

var sequelize = new Sequelize('materii', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

var app = express()
app.use('/admin', express.static('admin'))

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use('/nodeadmin', nodeadmin(app))

//accesez fisiere statice incluse in directorul public
app.use(express.static('public'))

app.get('/hello', function(request, response){
    response.status(200).send("Hello word")
})

var Categories = sequelize.define('categories', {
    numeCategorie: Sequelize.STRING
})

var Objects = sequelize.define('objects', {
    numeMaterie: Sequelize.STRING,
    idCategorie: Sequelize.INTEGER
})
Objects.belongsTo(Categories, {foreignKey: 'idCategorie', targetKey: 'id'})

app.get('/categories', function(request, response) {
    Categories.findAll({attributes: ['id', 'numeCategorie']}).then(function(categories){
        response.status(200).send(categories)
    })
        
})

app.post('/categories', function(request, response) {
    Categories.create(request.body).then(function(categories) {
        response.status(201).send(categories)
    })
})

app.put('/categories/:id', function(request, response) {
    Categories.findById(request.params.id).then(function(categories) {
        if(categories) {
            categories.update(request.body).then(function(categories){
                response.status(201).send(categories)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})


app.get('/categories/:id', function(request, response) {
    
    Categories.findOne({attributes: ['id', 'numeCategorie'],where: {id:request.params.id}}).then(function(category) {
        if(category) {
            response.status(200).send(category)
        } else {
            response.status(404).send()
        }
    })
        
})


app.delete('/categories/:id', function(request, response) {
    Categories.findById(request.params.id).then(function(category) {
        if(category) {
            category.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})


app.get('/materials', function(request, response) {
    Objects.findAll(
        {
            attributes: ['id', 'numeMaterie','idCategorie'],
          include: [{
                model: Categories,
                attributes: ['id', 'numeCategorie'],
                where: { id: Sequelize.col('objects.idCategorie') }
            }] }
    ).then(
            function(materials) {
                response.status(200).send(materials)
            }
          )
})

app.get('/objects', function(request, response) {
    Objects.findAll({attributes: ['id', 'numeMaterie','idCategorie']}).then(function(categories){
        response.status(200).send(categories)
    })
        
})

app.get('/objects/:id', function(request, response) {
    
    Objects.findOne({attributes: ['id', 'numeMaterie','idCategorie'],where: {id:request.params.id}}).then(function(category) {
        if(category) {
            response.status(200).send(category)
        } else {
            response.status(404).send()
        }
    })
        
})

app.post('/objects', function(request, response) {
    Objects.create(request.body).then(function(objects) {
        response.status(201).send(objects)
    })
})

app.put('/objects/:id', function(request, response) {
    Objects.findById(request.params.id).then(function(objects) {
        if(objects) {
            objects.update(request.body).then(function(objects){
                response.status(201).send(objects)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/objects/:id', function(request, response) {
    Objects.findById(request.params.id).then(function(objects) {
        if(objects) {
            objects.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})



app.listen(8080)