const express = require('express');
const productsRouter = require('./products');
const cartRouter     = require('./cart');

const app = express();
app.use(express.json());

//Rutas sin duplicar /api —Vercel ya las servirá bajo /api
app.use('/products', productsRouter);
app.use('/cart',     cartRouter);

// ---------- Simple health-check route ---------------
app.get('/api', (_, res) => res.send('Sports Shoes API - OK'));

// (Optional) root path → redirect to /api
app.get('/', (_, res) => res.redirect('/api'));


module.exports = app;               // <-- imprescindible para Vercel

// Solo levanta el puerto si estás en desarrollo local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Local API on http://localhost:${PORT}`));
}