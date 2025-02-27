const express =  require('express');
const ResponseDto = require('../dto/responseDto');
const ItemModel = require('../models/itemModel');
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

//--------------Save item----------------
router.post('/item/save', verifyToken, verifyRole(['ADMIN']), async (req, res) => {
    const {itemImageUrl, itemDescription , itemPrice, itemQuantity} = req.body;


    if (!itemImageUrl || !itemDescription || !itemPrice || !itemQuantity) {
        return res.status(400).json(new ResponseDto("BAD_REQUEST", "All fields are required"));
    }


    try {

        const newItemCode = await generateUniqueCode();

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


//-------------- Item Code Generation ----------------
async function generateUniqueCode() {

    const lastItemRecord = await ItemModel.find().sort({x: 1});

    console.log(lastItemRecord[0].itemCode);
    if (lastItemRecord[0].itemCode == null) {
        return "ITEM-000000001";
    } else {
        const lastItemCode = lastItemRecord[0].itemCode;
        const lastItemCodeNumber = lastItemCode.split("-")[1];
        const newCodeNumber = parseInt(lastItemCodeNumber) + 1;
        return "ITEM-" + newCodeNumber.toString().padStart(9, '0');
    }
}


module.exports = router;