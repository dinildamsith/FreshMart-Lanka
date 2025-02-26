require('dotenv').config();
const express = require('express');
const AuthController = require('./controllers/authController');
const db = require('../src/config/dbConfig');

const app = express();
const port = 3000;

// app.use(bodyParser.json());
app.use(express.json());
app.use('/fresh-mart/api/v1', AuthController )

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
