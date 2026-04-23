import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";


// Initialize express 
const app = express();

// Set the port or default
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming request
app.use(express.json());
app.use(cors());

// define route handlers for authentication and related requests
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Start server and connect DB
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});

