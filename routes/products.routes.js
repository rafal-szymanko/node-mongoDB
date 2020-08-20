// post.routes.js

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products.controller');


router.get('/products', ProductController.getAllProducts);
router.get('/products/random', ProductController.getRandomProduct);
router.get('/products/:id', ProductController.geProductByID);
router.post('/products', ProductController.postNewProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;
