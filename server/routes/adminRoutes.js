import express from 'express';

const router = express.Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
router.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

// @desc    Dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
router.get('/stats', (req, res) => {
    res.json({
        totalProducts: 20,
        totalOrders: 156,
        revenue: 4285,
        visitors: 342,
    });
});

export default router;
