const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required:true},
    customerName : {type:String, required:true},
    orderDate : {type:Date, required:true},
    orderItems : [{}],
    orderTotal : {type:Number, required:true},
})

module.exports = mongoose.model('Order', orderSchema);