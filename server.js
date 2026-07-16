const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const destinationRoutes = require("./routes/destination.routes");
const authRoutes = require("./routes/auth.routes");

const errorHandler = require("./middleware/error.middleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/destinations", destinationRoutes);
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res, next) => {
  const error = new Error(
    `Route not found: ${req.method} ${req.originalUrl}`
  );

  error.statusCode = 404;

  next(error);
});

// Centralized error handler
app.use(errorHandler);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Egypt Explorer API is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});