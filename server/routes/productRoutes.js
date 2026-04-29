import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Fallback sample data (used when MongoDB is not connected)
const sampleProducts = [
    { _id: '1', title: 'Shahi Garam Masala', brand: 'Roopak', category: 'Best Sellers', price: '$6.99 AUD', rating: 4.8, tags: ['Royal', 'Aromatic'], image: '', desc: 'Perfect for Sunday paneer & royal curries' },
    { _id: '2', title: 'Kashmiri Lal Mirch', brand: 'Roopak', category: 'All Products', price: '$5.49 AUD', rating: 4.9, tags: ['Mild', 'Rich Color'], image: '', desc: 'Vibrant red hue without the heat.' },
    { _id: '3', title: 'Butter Chicken', brand: 'Shan-e-Delhi', category: 'Best Sellers', price: '$5.99 AUD', rating: 4.9, tags: ['Best Seller', 'Non-Veg'], image: '', desc: 'Restaurant-style creamy curry at home.' },
];

// Helper to check if MongoDB is connected
const isDbConnected = () => {
    try {
        const mongoose = (await import('mongoose')).default;
        return mongoose.connection.readyState === 1;
    } catch {
        return false;
    }
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        // Fallback to sample data if DB not connected
        res.json(sampleProducts);
    }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        const product = sampleProducts.find((p) => p._id === req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Admin
router.post('/', async (req, res) => {
    try {
        const { title, brand, category, price, rating, tags, image, desc } = req.body;
        const product = new Product({ title, brand, category, price, rating, tags, image, desc });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message || 'Failed to create product' });
    }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.title = req.body.title || product.title;
            product.brand = req.body.brand || product.brand;
            product.category = req.body.category || product.category;
            product.price = req.body.price || product.price;
            product.rating = req.body.rating ?? product.rating;
            product.tags = req.body.tags || product.tags;
            product.image = req.body.image ?? product.image;
            product.desc = req.body.desc || product.desc;
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message || 'Failed to update product' });
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message || 'Failed to delete product' });
    }
});

export default router;
