const express = require('express');
const router = express.Router();
const Product = require('.../models/product');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get('/:id', async (req, res) => {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({message: 'Not Found'});
    res.json(prod);
});

router.post('/', async (req, res) => {
  const newProd = new Product(req.body);
  const saved = await newProd.save();
  res.status(201).json(saved);
});

router.patch('/:id/specs', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: { specs: req.body } },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});


router.get('/search', async (req, res) => {
  const { title = '', page = 1, limit = 10 } = req.query;
  const filter = { title: { $regex: title, $options: 'i' } };
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Product.find(filter).skip(skip).limit(parseInt(limit)),
    Product.countDocuments(filter)
  ]);

  res.json({
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    items
  });
});

module.exports = router;