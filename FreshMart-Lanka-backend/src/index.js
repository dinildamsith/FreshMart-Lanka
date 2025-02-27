require('dotenv').config();
const express = require('express');
const AuthController = require('./controllers/authController');
const CustomerController = require('./controllers/customerController');
const ItemController = require('./controllers/itemController');
const db = require('../src/config/dbConfig');

const app = express();
const port = 3000;

// app.use(bodyParser.json());
app.use(express.json());
app.use('/fresh-mart/api/v1', AuthController, CustomerController, ItemController )

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
