const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./config/db");
const router = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Ensure this is defined in your .env file
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Middleware setup
app.use(express.json());
app.use(cookieParser()); // Move before the routes to ensure cookies are parsed correctly

// API routes
app.use("/api", router);

// Port configuration
const PORT = process.env.PORT || 3001; // Corrected order to prioritize the environment variable

// Connect to the database and start the server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
