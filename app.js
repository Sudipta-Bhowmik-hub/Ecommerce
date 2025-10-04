// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ecommerceCatalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
// Product Schema with nested variants
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  variants: [
    {
      color: String,
      size: String,
      stock: Number,
    }
  ]
});
const Product = mongoose.model('Product', productSchema);

// Sample insertion route
app.post('/insert-sample', async (req, res) => {
  const sampleProducts = [
    {
      name: "T-Shirt",
      price: 499,
      category: "Apparel",
      variants: [
        { color: "Red", size: "M", stock: 10 },
        { color: "Blue", size: "L", stock: 5 }
      ]
    },
    {
      name: "Sneakers",
      price: 2999,
      category: "Footwear",
      variants: [
        { color: "White", size: "9", stock: 8 },
        { color: "Black", size: "10", stock: 3 }
      ]
    }
  ];
  await Product.insertMany(sampleProducts);
  res.send("Sample products inserted");
});

// Get all products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Filter by category
app.get('/products/category/:category', async (req, res) => {
  const category = req.params.category;
  const products = await Product.find({ category });
  res.json(products);
});

// Project variant details only
app.get('/products/variants', async (req, res) => {
  const products = await Product.find({}, { name: 1, variants: 1 });
  res.json(products);
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});

