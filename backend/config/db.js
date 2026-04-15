const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`MongoDB Connected: ${conn.connection.host} ✅`);
  } catch (err) {
    console.error("MongoDB Connection Failed ❌");
    console.error(err.message);
  }
};

module.exports = connectDB;