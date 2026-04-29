import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true, default: 'All Products' },
    price: { type: String, required: true },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    tags: [{ type: String }],
    image: { type: String, default: '' },
    desc: { type: String, required: true },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
