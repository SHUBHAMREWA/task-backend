
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Set mongoose options
    mongoose.set('strictQuery', false);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "miniAssignment",
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    });

    console.log("✅✅✅ Database Connected Successfully!");
    console.log(`📊 MongoDB Host: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected successfully!');
    });

  } catch (error) {
    console.error("❌❌❌ Database Connection Failed!");
    console.error("Error Details:", error.message);
    
    // More specific error messages
    if (error.message.includes('ENOTFOUND')) {
      console.error("🔍 DNS Error: Cannot resolve MongoDB host. Check your internet connection.");
    } else if (error.message.includes('authentication failed')) {
      console.error("🔑 Authentication Error: Check your MongoDB username and password.");
    } else if (error.message.includes('timed out')) {
      console.error("⏱️ Timeout Error: MongoDB Atlas might be unreachable. Check:");
      console.error("   1. Your internet connection");
      console.error("   2. MongoDB Atlas IP whitelist (add 0.0.0.0/0 for testing)");
      console.error("   3. MongoDB cluster status");
    }
    
    // Exit process with failure
    process.exit(1);
  } finally {
    console.log("🔅📊 connectDB function called");
  }
};

export default connectDB;
 