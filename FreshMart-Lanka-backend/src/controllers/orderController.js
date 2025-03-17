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


router.get('/order/all/summary', verifyToken, verifyRole(['ADMIN']), async (req, res) => {
    try {

        // const month = {
        //     1: null,
        //     2: null,
        //     3: null,
        //     4: null,
        //     5: null,
        //     6: null,
        //     7: null,
        //     8: null,
        //     9: null,
        //     10: null,
        //     11: null,
        //     12: null
        // };
        const month = new Array(12).fill(0); // Initialize the array with zeros



        const orders = await OrderModel.find();

        if (orders.length === 0) {
            return res.status(404).send(new ResponseDto(404, "No orders found"));
        }

        for(let i = 0; i<=12; i++ ){
            orders.filter((order) => {
                const orderMonth = new Date(order.orderDate).getMonth() + 1
                if(i === orderMonth) {
                    month[i]+=1
                }
            })
        }

        return res.status(200).send(new ResponseDto(200, "Orders count retrieved successfully", 
            {
             orderTotal:  orders.length,
             orderCount: month
            }
        ));

    } catch (error) {
        return res.status(500).send(new ResponseDto(500, "Error retrieving orders"));
    }
})

router.get('/order/most-purchased-item', verifyToken, verifyRole(['ADMIN','USER']) , async (req, res) => {
    try {
        // Aggregate orderItems to find the most purchased item
        const mostPurchasedItem = await OrderModel.aggregate([
            { $unwind: "$orderItems" }, // Flatten orderItems array
            {
                $group: {
                    _id: "$orderItems.itemId",
                    totalPurchased: { $sum: "$orderItems.buyQty" }
                }
            },
            { $sort: { totalPurchased: -1 } }, // Sort by purchase count (descending)
            { $limit: 1 } // Get the top one
        ]);

        if (mostPurchasedItem.length === 0) {
            return res.status(404).json({ message: "No items found in orders." });
        }

        const itemCode = mostPurchasedItem[0]._id;

        console.log(itemCode)
        // Fetch item details from Item collection
        const itemDetails = await ItemModel.findOne({ _id: itemCode });

        if (!itemDetails) {
            return res.status(404).json({ message: "Item details not found." });
        }

        res.json({
            itemCode: itemDetails.itemCode,
            itemImageUrl: itemDetails.itemImageUrl,
            itemDescription: itemDetails.itemDescription,
            itemPrice: itemDetails.itemPrice,
            totalPurchased: mostPurchasedItem[0].totalPurchased
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;