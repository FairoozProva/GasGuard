const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const PORT = 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/gasDB';

// --- MongoDB Model ---
const gasSchema = new mongoose.Schema({
  value: Number,
  timestamp: { type: Date, default: Date.now }
});
const GasData = mongoose.model('GasData', gasSchema);

// --- Serial Config ---
const SERIAL_PORT = 'COM4';  
const BAUD_RATE = 115200;

const port = new SerialPort({ path: SERIAL_PORT, baudRate: BAUD_RATE });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', async (line) => {
  const value = parseInt(line.trim());
  if (!isNaN(value)) {
    const entry = new GasData({ value });
    await entry.save();
    console.log(`Saved value: ${value}`);
  }
});

// --- Express API ---
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../frontend'));

app.get('/api/gas/latest', async (req, res) => {
  try {
    const latest = await GasData.findOne().sort({ timestamp: -1 });
    res.json(latest || { value: 0, timestamp: new Date() });
  } catch (err) {
    console.error('Error fetching latest gas data:', err);
    res.status(500).json({ value: 0, timestamp: new Date(), error: 'Failed to fetch data' });
  }
});

app.get('/api/gas/all', async (req, res) => {
  const data = await GasData.find().sort({ timestamp: -1 }).limit(50);
  res.send(data);
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error(err));


  let muteState = false;

app.post('/api/mute', (req, res) => {
  muteState = !muteState; // toggle mute
  const command = muteState ? 'MUTE\n' : 'UNMUTE\n';
  port.write(command);
  res.json({ mute: muteState });
});

