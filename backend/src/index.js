import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import job from "./lib/cron.js";

// Initialize express 
const app = express();

// Set the port or default
const PORT = process.env.PORT || 5000;

job.start();
// Middleware to parse incoming request
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// define route handlers for authentication and related requests
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Start server and connect DB
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});

