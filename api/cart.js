// api/cart.js
const express = require('express');
const router = express.Router();
let cart = [];

// GET /api/cart
router.get('/', (req, res) => {
  res.json(cart);
});

// POST /api/cart
router.post('/', (req, res) => {
  const item = req.body;
  if (!item.id || !item.quantity) {
    return res.status(400).json({ message: "Invalid cart item" });
  }
  const index = cart.findIndex(ci => ci.id === item.id);
  if (index > -1) {
    // Update existing item quantity
    cart[index].quantity += item.quantity;
  } else {
    cart.push(item);
  }
  res.status(201).json(cart);
});

// PUT /api/cart
router.put('/', (req, res) => {
  cart = req.body;
  res.json(cart);
});

// DELETE /api/cart
router.delete('/', (req, res) => {
  cart = [];
  res.json({ message: "Cart cleared" });
});

module.exports = router;