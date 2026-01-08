require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const todoRoutes = require("./todoRoutes");
const userRoutes = require("./userRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// Serve static assets (if you place css/js/images under ./public)
app.use(express.static(path.join(__dirname, "public")));

// Root: serve the sign-up page
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "customer_sign_up.html"));
});

const port = process.env.PORT || 3000;
connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
});
