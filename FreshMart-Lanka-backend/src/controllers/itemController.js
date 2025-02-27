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



module.exports = router;