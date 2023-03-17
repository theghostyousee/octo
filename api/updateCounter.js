// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");

const app = express();

// Parse JSON body requests
app.use(express.json());

// Enable CORS for all origins
const corsOptions = {
  origin: "*",
  methods: "POST",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


// Connect to MongoDB database
const MONGODB_URI =
  "mongodb+srv://topezmario8:koussi@cluster0.bdkhw0v.mongodb.net/test?retryWrites=true&w=majority";
const DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(MONGODB_URI, DB_OPTIONS)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define Counter schema
const CounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

// Create Counter model
const Counter = mongoose.model("Counter", CounterSchema);

// Handle POST requests to /api/updateCounter
app.post("/api/updateCounter", async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { new: true }
    );
    console.log("New count value:", counter.count);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = app;
