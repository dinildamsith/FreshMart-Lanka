const express =  require("express")
const CustomerModel = require('../models/customerModel');
const {verifyToken, verifyRole} = require("../config/jwtConfig");
const ResponseDto = require('../dto/responseDto');

const router = express.Router();

//------------- Customer work checked
router.get('/customer', verifyToken, verifyRole(['ADMIN','USER']), async (req, res) => {
    return res.status(200).json({ message: 'Customer work checked' });
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

module.exports = router;
