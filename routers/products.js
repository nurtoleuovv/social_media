const express = require('express');

const router = express.Router();

const controller = require('../controllers/products');
router
    .post('/', controller.createProduct)
    
    .get("/", controller.getAllProducts)
    
    .get("/:id", controller.getProductById);

module.exports = router;