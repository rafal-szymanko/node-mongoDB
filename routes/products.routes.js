// post.routes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find())
  }
  catch(err) {
    res.status(500).json({message: err})
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Product.findOne().skip(rand);

    if(dep) {
      res.json(dep)
    } else {
      res.status(404).json({message: 'Not found'})
    }
  }
  catch(err) {
    res.status(500).json({message: err})
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const dep = await Product.findById(req.params.id);
    if(dep) {
      res.json(dep)
    } else {
      res.status(404).json({message: 'Not found'})
    }
  }
  catch(err) {
    res.status(500).json({message: err})
  }
});

router.post('/products', async (req, res) => {
  const { name, client } = req.body;
  
  try {
    const newProduct = new Product({name: name, client: client});
    await newProduct.save();
    res.json(await Product.find())
  }
  catch(err) {
    res.status(500).json({message: err})
  }
});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;
  try {
    const product = Product.findById(req.params.id);
    if(product) {
      await Product.updateOne({_id: req.params.id}, {$set: {name: name, client: client}});
      res.json(await Product.find())
    } else {
      res.json({message: 'Not found'})
    }
  }
  catch(err) {
    res.status(500).json({message: err})
  }
});

router.delete('/products/:id', async(req, res) => {
  try {
    const product = Product.findById(req.params.id);
    if(product) {
      await Product.deleteOne({_id: req.params.id});
      res.json(await Product.find())
    } else {
      res.json({message: 'Not found'})
    }
  }
  catch(err) {
    res.status(500).json({message: err})
  }
});

module.exports = router;
