import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// ✅ Reconnect if DB disconnects
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
  setTimeout(connectDB, 5000);
});

// ✅ Middleware
app.use(cors({
  origin: 'https://booking-app-frontend-8bnl.onrender.com', // change if frontend URL is different
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

// ✅ Basic test route
app.get('/api', (req, res) => {
  res.send('Hello, backend is working!');
});

// ✅ Global Error Handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// ✅ Start Server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
