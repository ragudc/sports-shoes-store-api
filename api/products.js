const express = require('express');
const fs      = require('fs');
const path    = require('path');

const router = express.Router();

// -------------------- Load product data --------------------
const productsPath = path.join(__dirname, 'data', 'products.json');
let products = [];

try {
  products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
} catch (err) {
  console.error('❌  Failed to load products.json:', err);
  // Keep products as empty array to avoid crashing the function
}

// ---------------------- GET /api/products ------------------
router.get('/', (req, res) => {
  // Accept both ?search and ?ft for flexibility
  const searchRaw = req.query.search || req.query.ft;

  if (searchRaw && typeof searchRaw === 'string') {
    const term = searchRaw.toLowerCase();

    const filtered = products.filter(
      p =>
        p.title.toLowerCase().includes(term)  ||
        p.brand.toLowerCase().includes(term)  ||
        (p.category && p.category.toLowerCase().includes(term))
    );

    return res.json(filtered);
  }

  // No query → full catalogue
  return res.json(products);
});

// ------------ GET /api/products/productId/:id --------------
router.get('/productId/:id', (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Related: same category, exclude current product, pick 3 random
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return res.json({ ...product, relatedProducts });
});

module.exports = router;