// backend/server.js
// Production Node.js & Express REST API for Dawat-e-Islami Clone & Voice Studio
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dawateislami_db';

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'public', 'uploads', 'voice');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage for audio recording uploads (.webm, .wav, .mp3)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.webm';
    cb(null, 'voice-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));
app.use(express.static(path.join(__dirname, 'public')));

// Mongoose Voice Track Model
const VoiceTrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  reciterName: { type: String, default: 'Hashim Zafar' },
  category: {
    type: String,
    enum: ['Tilawat', 'Tarjuma', 'Tafseer', 'Naat', 'Bayan', 'Dua'],
    default: 'Tilawat'
  },
  surahNumber: { type: Number },
  ayahNumber: { type: Number },
  audioUrl: { type: String, required: true },
  duration: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const VoiceTrack = mongoose.model('VoiceTrack', VoiceTrackSchema);

// REST API Endpoints

// GET /api/voice - Get all voice tracks, with optional category or surah filter
app.get('/api/voice', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.surahNumber) filter.surahNumber = Number(req.query.surahNumber);

    const tracks = await VoiceTrack.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: tracks.length, data: tracks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/voice/upload - Upload new audio track (from MediaRecorder Blob or MP3 file)
app.post('/api/voice/upload', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No audio file provided' });
    }

    const audioUrl = '/uploads/' + req.file.filename;
    const { title, reciterName, category, surahNumber, ayahNumber, duration } = req.body;

    const newTrack = new VoiceTrack({
      title: title || 'Untitled Voice Recording',
      reciterName: reciterName || 'Owner Vocalist',
      category: category || 'Tilawat',
      surahNumber: surahNumber ? Number(surahNumber) : undefined,
      ayahNumber: ayahNumber ? Number(ayahNumber) : undefined,
      audioUrl,
      duration: duration ? Number(duration) : 0
    });

    await newTrack.save();
    res.status(201).json({ success: true, data: newTrack });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/voice/:id - Remove track and file from disk
app.delete('/api/voice/:id', async (req, res) => {
  try {
    const track = await VoiceTrack.findById(req.params.id);
    if (!track) return res.status(404).json({ success: false, error: 'Track not found' });

    const filePath = path.join(uploadDir, path.basename(track.audioUrl));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await VoiceTrack.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Track and audio file deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Connect Database & Start Server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected to:', MONGO_URI);
    app.listen(PORT, () => console.log('Backend listening on port ' + PORT));
  })
  .catch(err => console.error('MongoDB connection error:', err));
