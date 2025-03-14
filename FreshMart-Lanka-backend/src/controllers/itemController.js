const express =  require('express');
const ResponseDto = require('../dto/responseDto');
const ItemModel = require('../models/itemModel');
const UUID = require("uuid")
const {verifyToken, verifyRole} = require('../config/jwtConfig');


const router = express.Router();

//--------------Get all items----------------
router.get('/item/all', verifyToken, verifyRole(['ADMIN','USER']), async (req, res) => {
    try {
        const items = await ItemModel.find();
        res.status(200).json(new ResponseDto("SUCCESS", "All items fetched successfully",items));
    } catch (error) {
        res.status(500).json(new ResponseDto("INTERNAL_SERVER_ERROR", error.message));
    }
});

//--------------Search item by code----------------
router.get('/item/search/:itemCode', verifyToken, verifyRole(['ADMIN','USER']), async (req, res) => {
    const { itemCode } = req.params;

    if (!itemCode) {
        return res.status(400).json(new ResponseDto("BAD_REQUEST", "Item code is required"));
    }

    try {
        // Find item by itemCode
        const item = await ItemModel.findOne({ itemCode: itemCode });

        if (!item) {
            return res.status(404).json(new ResponseDto("NOT_FOUND", "Item not found"));
        }

        res.status(200).json(new ResponseDto("SUCCESS", "Item found", item));

    } catch (error) {
        res.status(500).json(new ResponseDto("INTERNAL_SERVER_ERROR", error.message));
    }
});



//--------------Save item----------------
router.post('/item/save', verifyToken, verifyRole(['ADMIN']), async (req, res) => {
    const {itemImageUrl, itemDescription , itemPrice, itemQuantity} = req.body;


    if (!itemImageUrl || !itemDescription || !itemPrice || !itemQuantity) {
        return res.status(400).json(new ResponseDto("BAD_REQUEST", "All fields are required"));
    }


    try {

        const newItemCode = UUID.v4();
        console.log(newItemCode)
        //------- Check if item already exists
        const existingItem = await ItemModel.findOne({itemCode: newItemCode});

        if (existingItem){
            return res.status(400).json(new ResponseDto("BAD_REQUEST", "Item already exists"));
        }

        const item = new ItemModel();
        item.itemCode = newItemCode;
        item.itemImageUrl = itemImageUrl;
        item.itemDescription = itemDescription;
        item.itemPrice = itemPrice;
        item.itemQuantity = itemQuantity;
        await item.save();

        res.status(201).json(new ResponseDto("SUCCESS", "Item saved successfully"));

    } catch (error) {
        res.status(500).json(new ResponseDto("INTERNAL_SERVER_ERROR", error.message));
    }

});

//--------------Update item----------------
router.put('/item/update/:code', verifyToken, verifyRole(['ADMIN']), async (req, res) => {
    const {itemImageUrl, itemDescription , itemPrice, itemQuantity} = req.body;

    if (!itemImageUrl || !itemDescription || !itemPrice || !itemQuantity) {
        return res.status(400).json(new ResponseDto("BAD_REQUEST", "All fields are required"));
    }

    try {
        const itemCode = req.params.code;
        const item = await ItemModel.findOne({itemCode: itemCode});

        if (!item){
            return res.status(404).json(new ResponseDto("NOT_FOUND", "Item not found"));
        }

        item.itemImageUrl = itemImageUrl;
        item.itemDescription = itemDescription;
        item.itemPrice = itemPrice;
        item.itemQuantity = itemQuantity;
        await item.save();

        res.status(200).json(new ResponseDto("SUCCESS", "Item updated successfully"));

    } catch (error) {
        res.status(500).json(new ResponseDto("INTERNAL_SERVER_ERROR", error.message));
    }

});

//-------------Delete item----------------
router.delete('/item/delete/:code', verifyToken, verifyRole(['ADMIN']), async (req, res) => {
    try {
        const itemCode = req.params.code;
        const item = await ItemModel.findOne({itemCode: itemCode});

        if (!item){
            return res.status(404).json(new ResponseDto("NOT_FOUND", "Item not found"));
        }

        await item.deleteOne();

        res.status(200).json(new ResponseDto("SUCCESS", "Item deleted successfully"));

    } catch (error) {
        res.status(500).json(new ResponseDto("INTERNAL_SERVER_ERROR", error.message));
    }
});


//------------Out of Stock Items Get
router.get('/item/out-of-stock/all',verifyToken, verifyRole(['ADMIN','USER']), async (req, res) => {
    try {

        const outOfStockItems = await ItemModel.find({ itemQuantity: { $lte: 0 } });
           
        res.status(200).json(new ResponseDto("SUCCESS", "Out of stock Items", outOfStockItems));
    } catch(error) {
        res.status(500).json(new ResponseDto("INTERNAL_SERVER_ERROR", error.message));
    }
})

module.exports = router;