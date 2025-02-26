const express =  require("express")
const CustomerModel = require('../models/customerModel');
const {verifyToken} = require("../config/jwtConfig");

const router = express.Router();

//------------- Customer work checked
router.get('/customer', verifyToken, async (req, res) => {
    return res.status(200).json({ message: 'Customer work checked' });
});

//--------------Save customer----------------
router.post('/customer/save', async (req, res) => {

    const { name, email, address, birthday } = req.body;

    if (!name || !email || !birthday || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {

        //------- Check if customer already exists
        const existingCustomer = await CustomerModel().findOne({email})

        if (existingCustomer){
            return res.status(400).json({ message: 'Customer already exists' });
        }

        const customer = new CustomerModel();
        customer.customerName = name;
        customer.customerEmail = email;
        customer.customerAddress = address;
        customer.customerBirthDate = birthday;
        await customer.save();

    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }


});

module.exports = router;
