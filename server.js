import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();

// CORS Configuration to allow specific origins
const corsOptions = {
  origin: ['http://localhost:5174', 'http://localhost:5173','https://frontendtask-ten-virid.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust methods as per your needs
  credentials: true, // If you need to allow cookies or other credentials
};

// Middlewares
app.use(cors(corsOptions)); // Apply CORS middleware with the specific options
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server Listen
const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
