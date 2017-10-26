// app/models/product.js

const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, default: 0},
    list_price: {type: Number, default: 0},
    brand: {type: String},
    category_id: {type: Number},
    virtual: {type: Boolean, default:false}
})
ProductSchema.plugin(timestamps)
ProductSchema.plugin(mongooseStringQuery)
const Product = mongoose.model('product', ProductSchema)

module.exports = Product
