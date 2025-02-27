const express = require('express');
const OrderModel = require('../models/orderModel');
const CustomerModel = require('../models/customerModel');
const ItemModel = require('../models/itemModel');
const ResponseDto = require("../dto/responseDto");

const router = express.Router();


router.post('/order/purchase', async (req, res) => {

       const { customerId, customerName, orderItems, orderTotal } = req.body;

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

            const item = new ItemModel();
            const newOrder = new OrderModel();

            newOrder.customerId = customerId;
            newOrder.customerName = customerName;
            newOrder.orderItems = orderItems;
            newOrder.orderTotal = orderTotal;
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

module.exports = router;