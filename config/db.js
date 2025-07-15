import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const ConnectDB = async () => {
  // Check if we already have an active connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.db;
  }

  // Load environment variables
  const DB_USERNAME = process.env.DB_USERNAME;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_NAME = process.env.DB_NAME;
  
  if (!DB_USERNAME || !DB_PASSWORD || !DB_NAME) {
    throw new Error('Missing required database credentials in environment variables');
  }

  const MONGO_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.dfqtt9h.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected.');
    return mongoose.connection.db;
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default ConnectDB;