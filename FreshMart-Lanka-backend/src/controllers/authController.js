const express = require('express');
const ResponseDto = require('../dto/responseDto');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');
const {generateToken, verifyToken} = require("../config/jwtConfig");


const router = express.Router();

// --------------- SIGNUP ----------------
router.post('/auth/signup', async (req, res) => {
     const { firstName, lastName, email, role , password } = req.body;

      if (!firstName || !lastName || !email || !password || !role) {
          return res.status(400).json(new ResponseDto("BAD_REQUEST", "All fields are required"));
      }


      try {

       //------- Check if user already exists
       const existingUser =  await UserModel.findOne({ email });

       if (existingUser) {
          return res.status(400).json(new ResponseDto("BAD_REQUEST", "User already exists"));
       }

        const newUser = new UserModel();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.role = role;
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        res.status(201).json(new ResponseDto("SUCCESS", "User created successfully"));


      } catch (error) {
        res.status(500).json(new ResponseDto("INTERNAL_SERVER_ERROR", error.message));
      }

});


//----------------- SIGNIN ----------------
router.post('/auth/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json(new ResponseDto("BAD_REQUEST", "All fields are required"));
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json(new ResponseDto("NOT_FOUND", "User not found"));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json(new ResponseDto("BAD_REQUEST", "Invalid credentials"));
        }

        const token = generateToken(user);
        res.status(200).json(new ResponseDto("SUCCESS", "User logged in successfully", { token: token }));

    } catch (error) {
        res.status(500).json(new ResponseDto("INTERNAL_SERVER_ERROR", error.message));
    }
});


//----------------- USER Image Upload
router.put('/user/upload/profile-pic/:email', verifyToken ,async(req, res) => {
    
    const { email } = req.params;
    const { imageUrl } = req.body;

    try {

        const user = await UserModel.findOne({email:email})

        console.log(user)

        if(!user) {
            return res.status(400).json(new ResponseDto("BAD_REQUEST", "User Not Found"));
        }

        user.userImage = imageUrl
        await user.save()

        return res.status(200).send(new ResponseDto('SUCCESS', 'User Image Upload Success...'))

    } catch (error) {
        console.log(error)
        return res.status(400).send(new ResponseDto(400, "Error"));
    }


})

module.exports = router;