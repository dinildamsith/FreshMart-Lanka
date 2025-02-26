const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerName: {type: String, required: true},
    customerEmail: {type: String, required: true, unique: true},
    customerAddress: {type: String, required: true},
    customerBirthDate: {type: Date, required: true},
});

module.exports = mongoose.model('Customer', customerSchema);