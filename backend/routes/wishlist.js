const express = require('express');
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate('products.product', 'name price originalPrice images brand category');

    if (!wishlist) {
      wishlist = { products: [] };
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add product to wishlist
router.post('/add/:productId', auth, async (req, res) => {
  try {
    const productId = req.params.productId;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      // Create new wishlist
      wishlist = new Wishlist({
        user: req.user._id,
        products: [{ product: productId }]
      });
    } else {
      // Check if product already in wishlist
      const existingProduct = wishlist.products.find(
        item => item.product.toString() === productId
      );

      if (existingProduct) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }

      // Add product to existing wishlist
      wishlist.products.push({ product: productId });
    }

    await wishlist.save();
    await wishlist.populate('products.product', 'name price originalPrice images brand category');

    res.json({ message: 'Product added to wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove product from wishlist
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const productId = req.params.productId;

    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Remove product from wishlist
    wishlist.products = wishlist.products.filter(
      item => item.product.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate('products.product', 'name price originalPrice images brand category');

    res.json({ message: 'Product removed from wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear entire wishlist
router.delete('/clear', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = [];
    await wishlist.save();

    res.json({ message: 'Wishlist cleared successfully', wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check if product is in wishlist
router.get('/check/:productId', auth, async (req, res) => {
  try {
    const productId = req.params.productId;

    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.json({ inWishlist: false });
    }

    const inWishlist = wishlist.products.some(
      item => item.product.toString() === productId
    );

    res.json({ inWishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;