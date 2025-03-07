const express = require('express');
const OrderModel = require('../models/orderModel');
const CustomerModel = require('../models/customerModel');
const ItemModel = require('../models/itemModel');
const ResponseDto = require("../dto/responseDto");
const { verifyToken, verifyRole } = require('../config/jwtConfig');

const router = express.Router();


const generateOrderCode = () => {
    return "ORD-" + Date.now(); // Example: ORD-1712345678901
  };
  

router.post('/order/purchase', async (req, res) => {

       const { customerId, customerName, orderItems } = req.body;

       try {

            const isCustomerExist = await CustomerModel.findOne({ _id: customerId });
            const isItemExist = await ItemModel.find({ _id: { $in: orderItems.map((item) => item.itemId) } });



            //----------- Check customer is exist or not
            if (!isCustomerExist) {
                return res.status(400).send(new ResponseDto(400, "Customer not found"));
            }

            //----------- Check item is exist or not
            if (isItemExist.length !== orderItems.length) {
                return res.status(400).send(new ResponseDto(400, "Item not found"));
            }

            //----------- Check item quantity is enough or not
            if (orderItems.some((item) => item.buyQty > isItemExist.find((i) => i._id == item.itemId).itemQuantity)) {
                return res.status(400).send(new ResponseDto(400, "Item quantity is not enough"));
            }


            let total = 0
            orderItems.forEach(item => {
                total+=item.itemPrice * item.buyQty
            });

           
            const newOrder = new OrderModel();

            newOrder.orderCode = generateOrderCode()
            newOrder.customerId = customerId;
            newOrder.customerName = customerName;
            newOrder.orderItems = orderItems;
            newOrder.orderTotal = total;
            newOrder.orderDate = new Date();
            await newOrder.save();

            //----------- Update item quantity
            for (let i = 0; i < orderItems.length; i++) {
                const item = await ItemModel.findOne({ _id: orderItems[i].itemId });
                item.itemQuantity -= orderItems[i].buyQty;
                await item.save();
            }


            return res.status(200).send(new ResponseDto(200, "Order created successfully"));

       } catch (error) {
              console.log(error)
                return res.status(400).send(new ResponseDto(400, "Error"));
       }
})


router.get('/order/all', verifyToken, verifyRole(['ADMIN','USER']) ,async (req, res) => {
    try {
        const orders = await OrderModel.find();

        if (orders.length === 0) {
            return res.status(404).send(new ResponseDto(404, "No orders found"));
        }

        return res.status(200).send(new ResponseDto(200, "Orders retrieved successfully", orders));
    } catch (error) {
        console.log(error);
        return res.status(500).send(new ResponseDto(500, "Error retrieving orders"));
    }
});


module.exports = router;