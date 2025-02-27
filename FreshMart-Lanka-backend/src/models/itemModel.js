const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemImageUrl: {type: String, required: true},
    itemDescription : {type: String, required: true},
    itemPrice : {type: Number, required: true},
    itemQuantity : {type: Number, required: true},
});

module.exports = mongoose.model('Item', itemSchema);