const express = require('express');

const router = express.Router();

const controller = require('../controllers/products');
router
    .post('/', controller.createProduct)
    
    .get("/", controller.getAllProducts)
    
    .get("/:id", controller.getProductById)

    .put('/:id', controller.updateProduct)

    .delete('/:id', controller.deleteProductById)

module.exports = router;