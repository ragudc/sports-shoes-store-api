const express = require('express');
const router = express.Router();
const products = require('./data/products.json');

// GET /api/products?search=...
router.get('/', (req, res) => {
  const search = req.query.search || req.query.ft;
  if (search) {
    const term = search.toLowerCase();
    const results = products.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term)
    );
    return res.json(results);
  }
  res.json(products);
});

// GET /api/products/productId/:id
router.get('/productId/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  // Select related products randomly from same category
  const sameCategory = products.filter(p => p.category === product.category && p.id !== id);
  const related = sameCategory.sort(() => 0.5 - Math.random()).slice(0, 3);
  res.json({ ...product, relatedProducts: related });
});

module.exports = router;