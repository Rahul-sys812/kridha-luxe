import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// Route Imports
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
// NOTE: Will error if MongoDB is not running locally or URI is wrong.
// We wrap it in a try-catch for the frontend integration phase.
try {
  await connectDB();
} catch(e) {
  console.log("MongoDB connection bypassed for development. Make sure your MONGO_URI is set correctly in .env");
}

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('Kridha Store Full-Stack API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
