const express = require('express');
const ResponseDto = require('../dto/responseDto');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');


const router = express.Router();

// --------------- SIGNUP ----------------
router.post('/auth/signup', async (req, res) => {
     const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password) {
          return res.status(400).json({ message: 'All fields are required' });
      }


      try {

       //------- Check if user already exists
       const existingUser =  await UserModel.findOne({ email });

       if (existingUser) {
          return res.status(400).json(new ResponseDto("BAD_REQUEST", "User already exists"));
       } else {

        const newUser = new UserModel();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        res.status(201).json(new ResponseDto("SUCCESS", "User created successfully"));

       }

      } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
      }

});


module.exports = router;