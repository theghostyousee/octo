const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const MONGODB_URI = 'mongodb+srv://topezmario8:koussi@cluster0.bdkhw0v.mongodb.net/?retryWrites=true&w=majority';
const DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(MONGODB_URI, DB_OPTIONS)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const CounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model('Counter', CounterSchema);

app.post('/api/updateCounter', async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true });
    console.log('New count value:', counter.count);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});
