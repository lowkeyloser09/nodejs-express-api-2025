const mongoose = require('mongoose');

const warehouse = new mongoose.Schema({
    location: String,
    quantity: Number,
}, {_id: false});

const productSchema = new mongoose.Schema({
    category: {type: String, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    warehouses: [warehouseSchema],
    specs: {type: mongoose.Schema.Types.Mixed},

}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);