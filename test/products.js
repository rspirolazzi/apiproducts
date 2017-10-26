//During the test the env variable is set to test
process.env.NODE_ENV = 'test'
const mongoose = require("mongoose"), Product = require('../app/models/product'), chai = require('chai'),
    chaiHttp = require('chai-http'), server = require('../index'), should = chai.should(), hippie = require('hippie')

chai.use(chaiHttp)
//Our parent block
/*describe('Api', function () {
 describe('/products endpoint', function () {
 it('Devuelve todos los productos', function (done) {
 hippie(server)
 .json()
 .get('/products')
 .expectStatus(200)
 .end(function(err, res, body) {
 if (err) throw err
 done()
 })
 })
 })
 })
 return*/
describe('Api', () => {
    //beforeEach((done) => { //Before each test we empty the database
    before((done) => { //Before each test we empty the database
        Product.remove({}, (err) => {
            done()
        })
    })
    /*
     * Test the /GET route
     */
    describe('Obtener todos los productos realizando un GET a /products', () => {
        it('No debería devolver ningun producto', (done) => {
            chai.request(server)
                .get('/products')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(0)
                    done()
                })
        })
    })
    describe('Dar de alta un producto realizando un POST /product', () => {
        it('Se testea insertar un producto', (done) => {
            let product = {
                name: 'TV 22"'
            }
            chai.request(server)
                .post('/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.have.property('name')
                    res.body.should.have.property('price')
                    res.body.should.have.property('list_price')
                    res.body.should.have.property('updatedAt')
                    res.body.should.have.property('createdAt')
                    res.body.should.have.property('virtual')
                    done()
                })
        })
        it('Se testea insertar un producto sin nombre', (done) => {
            let product = {}
            chai.request(server)
                .post('/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(500)
                    res.body.should.be.a('object')
                    res.body.should.have.property('code')
                    res.body.should.have.property('message').eql('product validation failed: name: Path `name` is required.')
                    done()
                })
        })

    })
    describe('Se testea realizar un POST, GET, PUT y DELETE de un producto dado de alta y luego eliminado', () => {
        let ID = null
        it('Se agrega un nuevo producto', (done) => {
            let product = {
                name: 'Heladera no Frost"'
            }
            chai.request(server)
                .post('/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.have.property('name')
                    res.body.should.have.property('price')
                    res.body.should.have.property('list_price')
                    res.body.should.have.property('updatedAt')
                    res.body.should.have.property('createdAt')
                    res.body.should.have.property('virtual')
                    ID = res.body._id
                    done()
                })
        })
        it('Se realiza una consulta a todos los productos', (done) => {
            chai.request(server)
                .get('/products')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.not.eql(0)
                    done()
                })
        })
        it('Se actualiza el precio del producto', (done) => {
            let product = {
                price: 12300
            }
            chai.request(server)
                .put('/products/' + ID)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('price')
                    res.body.should.have.property('price').eql(12300)
                    done()
                })
        })
        it('Se realiza una consultar del producto', (done) => {
            chai.request(server)
                .get('/products/' + ID)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('price')
                    res.body.should.have.property('price').eql(12300)
                    done()
                })
        })
        it('Se elimina el producto', (done) => {
            chai.request(server)
                .delete('/products/' + ID)
                .end((err, res) => {
                    res.should.have.status(204)
                    done()
                })
        })
        it('Se realiza una consultar del producto pero este no existe', (done) => {
            chai.request(server)
                .get('/products/' + ID)
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })
        it('Se intenta actualizar un producto que no existe', (done) => {
            let product = {
                price: 12300
            }
            chai.request(server)
                .put('/products/' + ID)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('The resource you requested could not be found.')
                    done()
                })
        })
        it('Se intenta actualizar un producto con un id incorrecto', (done) => {
            let product = {
                price: 12300
            }
            chai.request(server)
                .put('/products/1_')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('Cast to ObjectId failed for value "1_" at path "_id" for model "product"')
                    done()
                })
        })
        it('Se intenta recuperar un producto con un ID incorrecto', (done) => {
            chai.request(server)
                .get('/products/1')
                .end((err, res) => {
                    res.should.have.status(400)
                    done()
                })
        })
    })

})