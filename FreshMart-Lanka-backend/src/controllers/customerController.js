const express =  require("express")
const CustomerModel = require('../models/customerModel');
const {verifyToken, verifyRole} = require("../config/jwtConfig");
const ResponseDto = require('../dto/responseDto');

const router = express.Router();

//------------- Customer work checked
router.get('/customer', verifyToken, verifyRole(['ADMIN','USER']), async (req, res) => {
    return res.status(200).json({ message: 'Customer work checked' });
});

//--------------Get all customers----------------
router.get('/customer/all', verifyToken, verifyRole(['ADMIN','USER']), async (req, res) => {
    try {
        const customers = await CustomerModel.find();
        res.status(200).json(new ResponseDto("SUCCESS", "All customers fetched successfully",customers));
    } catch (error) {
        res.status(500).json(new ResponseDto("INTERNAL_SERVER_ERROR", error.message));
    }
});

//--------------Save customer----------------
router.post('/customer/save', verifyToken, verifyRole(['ADMIN','USER']), async (req, res) => {


    const {customerName, customerEmail, customerAddress, customerBirthDate} = req.body;

    if (!customerName || !customerEmail || !customerAddress || !customerBirthDate) {
        return res.status(400).json(new ResponseDto("BAD_REQUEST", "All fields are required"));
    }

    try {

        //------- Check if customer already exists
        const existingCustomer = await CustomerModel.findOne({customerEmail})

        if (existingCustomer){
            return res.status(400).json(new ResponseDto("BAD_REQUEST", "Customer already exists"));
        }

        const customer = new CustomerModel();
        customer.customerName = customerName;
        customer.customerEmail = customerEmail;
        customer.customerAddress = customerAddress;
        customer.customerBirthDate = customerBirthDate;
        await customer.save();

        res.status(201).json(new ResponseDto("SUCCESS", "Customer saved successfully"));

    } catch (error) {
        res.status(500).json(new ResponseDto("INTERNAL_SERVER_ERROR", error.message));
    }


});

//--------------Update customer----------------
router.put('/customer/update/:id', verifyToken, verifyRole(['ADMIN']), async (req, res) => {

    const {customerName, customerEmail, customerAddress, customerBirthDate} = req.body;

    if (!customerName || !customerEmail || !customerAddress || !customerBirthDate) {
        return res.status(400).json(new ResponseDto("BAD_REQUEST", "All fields are required"));
    }

    try {

        const customer = await CustomerModel.findById(req.params.id);

        if (!customer){
            return res.status(404).json(new ResponseDto("NOT_FOUND", "Customer not found"));
        }

        customer.customerName = customerName;
        customer.customerEmail = customerEmail;
        customer.customerAddress = customerAddress;
        customer.customerBirthDate = customerBirthDate;
        await customer.save();

        res.status(200).json(new ResponseDto("SUCCESS", "Customer updated successfully"));

    } catch (error) {
        res.status(500).json(new ResponseDto("INTERNAL_SERVER_ERROR", error.message));
    }

});

//--------------Delete customer----------------
router.delete('/customer/delete/:id', verifyToken, verifyRole(['ADMIN']), async (req, res) => {

    try {

        const customer = await CustomerModel.findById(req.params.id);

        if (!customer){
            return res.status(404).json(new ResponseDto("NOT_FOUND", "Customer not found"));
        }

        await customer.deleteOne();

        res.status(200).json(new ResponseDto("SUCCESS", "Customer deleted successfully"));

    } catch (error) {
        res.status(500).json(new ResponseDto("INTERNAL_SERVER_ERROR", error.message));
    }

});

module.exports = router;
