import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

// Connect to MongoDB if URI is provided
try {
   if(process.env.MONGO_URI) {
       connectDB();
   } else {
       console.log('No MONGO_URI in .env file. Running without MongoDB connection for now.');
   }
} catch (error) {
   console.log('Error connecting to database:', error);
}

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Masaliya Di Hatti API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
