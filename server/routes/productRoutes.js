import express from 'express';

const router = express.Router();

// Sample product data
const products = [
    {
        _id: '1',
        name: 'Wireless Mouse',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'High quality wireless mouse with ergonomic design.',
        brand: 'Logitech',
        category: 'Electronics',
        price: 29.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
    },
    {
        _id: '2',
        name: 'Mechanical Keyboard',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'RGB mechanical keyboard with cherry MX switches.',
        brand: 'Corsair',
        category: 'Electronics',
        price: 129.99,
        countInStock: 5,
        rating: 4.8,
        numReviews: 8,
    },
    {
        _id: '3',
        name: 'Noise Cancelling Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Over-ear headphones with active noise cancellation.',
        brand: 'Sony',
        category: 'Electronics',
        price: 199.99,
        countInStock: 0,
        rating: 4.7,
        numReviews: 24,
    }
];

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', (req, res) => {
    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

export default router;
