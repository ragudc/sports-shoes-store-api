const express = require('express');
const productsRouter = require('./products');
const cartRouter = require('./cart');

const app = express();
app.use(express.json());  // parse JSON bodies

// Mount the product and cart routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

// A simple home route
app.get('/', (req, res) => {
  res.send('Welcome to Sports Shoes API');
});

// Start the server locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;