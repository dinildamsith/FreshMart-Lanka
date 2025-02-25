const express = require('express');


const router = express.Router();


router.post('/auth/signup', (req, res) => {
  res.send('Sign up route');
});


module.exports = router;