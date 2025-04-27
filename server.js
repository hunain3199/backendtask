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
  origin: ['http://localhost:5174', 'http://localhost:5173', 'https://frontendtask-ten-virid.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add OPTIONS method here
  credentials: true, 
};

// Apply CORS middleware globally
// app.use(cors(corsOptions)); 
app.use(
  cors({
    origin: [
      "https://frontendtask-ten-virid.vercel.app",
      
     
      "*",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ['X-Total-Count'],
    credentials: true, // allow credentials (cookies, authorization headers )
  })
);


// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.options('*', cors(corsOptions));
// Handle preflight requests
 // Explicitly handle OPTIONS requests

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
