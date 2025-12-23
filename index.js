import express from "express";
import connectDB from "./config/connectDB.js";
import authRoute from "./Routes/authRoute.js";
import studentRoute from "./Routes/studentRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// dotenv config
dotenv.config();

const app = express();

app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://task-frontent-indol.vercel.app/",
      ];

      // Allow no-origin requests
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.startsWith("http://192.168.")
      ) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/user", authRoute);
app.use("/api/students", studentRoute);

const PORT = 4000;

app.listen(PORT, () => {
  console.log("Server Start SuccessFully");
  connectDB();
});
