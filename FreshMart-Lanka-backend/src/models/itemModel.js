const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemCode: {type: String, required: true},
    itemImageUrl: {type: String, required: true},
    itemDescription : {type: String, required: true},
    itemPrice : {type: Number, required: true},
    itemQuantity : {type: Number, required: true},
});

module.exports = mongoose.model('Item', itemSchema);