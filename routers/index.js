const express = require('express');

const router = express.Router();

router.use('/products', require('./products.js'));

module.exports = router;