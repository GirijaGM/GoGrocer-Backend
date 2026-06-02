require("dotenv").config();
console.log("URI:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoute");

const app = express();

app.use(
  cors({
    origin: "https://go-grocer.netlify.app",
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

  setInterval(() => {
  console.log("Mongo State:", mongoose.connection.readyState);
}, 10000);

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});