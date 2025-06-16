import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import travelroutes from './routes/travel.js';

const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

// Base route for all travel API routes
app.use('/travell', travelroutes);

// MongoDB connection URL
const CONNECTION_URL = 'mongodb+srv://Srimathi:Sri%404253-%40%2F%23@cluster0.pejxjik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas and start server
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
