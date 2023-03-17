const mongoose = require("mongoose");
const Cors = require("micro-cors");

const cors = Cors({
  allowMethods: ["POST"],
  allowHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
});

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

const CounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model("Counter", CounterSchema);

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const counter = await Counter.findOneAndUpdate(
        {},
        { $inc: { count: 1 } },
        { new: true }
      );
      console.log("New count value:", counter.count);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

module.exports = cors(handler);
