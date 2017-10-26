// app/routes/products.js
const errors = require('restify-errors')
const Product = require('../models/product')

module.exports = function (server) {
    const prefix = '/products'
    server.get(prefix + '/:productId', (req, res, next) => {
        Product.findOne({_id: req.params.productId}, function (err, doc) {
            if (err) {
                //console.error(err)
                return next(
                    new errors.InvalidContentError(err.message),
                )
            }

            res.send(200,doc)
            next()
        })
    })
    server.put(prefix + '/:productId', (req, res, next) => {
        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'application/json'"),
            )
        }

        let data = req.body || {}

        if (!data._id) {
            data = Object.assign({}, data, {_id: req.params.productId})
        }

        Product.findOne({_id: req.params.productId}, function (err, doc) {
            if (err) {
                //console.error(err)
                return next(new errors.InvalidContentError(err.message),)
            } else if (!doc) {
                return next(new errors.ResourceNotFoundError('The resource you requested could not be found.',),)
            }

            Product.update({_id: data._id}, data, function (err, result) {
                if (err) {
                    //console.error(err)
                    return next(new errors.InvalidContentError(err.message),)
                }

                res.send(200, data)
                next()
            })
        })
    })
    server.patch(prefix + '/:productId', (req, res, next) => {
        //console.log('server.patch')
        res.send({data: "PATCH/products/productId"})
        next()
    })
    server.del(prefix + '/:productId', (req, res, next) => {
        Product.remove({_id: req.params.productId}, function (err) {
            if (err) {
                //console.error(err)
                return next(
                    new errors.InvalidContentError(err.message),
                )
            }

            res.send(204)
            next()
        })
    })

    server.get(prefix + '/', (req, res, next) => {
        Product.apiQuery(req.params, function (err, docs) {
            if (err) {
                //console.error(err)
                return next(
                    new errors.InvalidContentError(err.message),
                )
            }
            res.send(docs)
            next()
        })
    })
    server.post(prefix + '/', (req, res, next)=> {
        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'application/json'"),
            )
        }
        const data = req.body || {}

        const product = new Product(data)
        product.save(function (err, result) {
            if (err) {
                //console.error(err)
                return next(new errors.InternalError(err.message))
                next()
            }
            res.send(201, result)
            next()
        })
    })
}
