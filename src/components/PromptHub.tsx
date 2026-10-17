import React, { useState } from 'react';
import { Copy, Check, Terminal, Server, FileCode, Sparkles, BookOpen, Mic, Globe, Rocket, ExternalLink } from 'lucide-react';

export const PromptHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prompt1' | 'prompt2' | 'backend-code' | 'netlify'>('netlify');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const PROMPT_1_TEXT = `Act as an expert Full-Stack Web Developer and UI/UX Designer. Build a complete, production-ready, responsive Islamic & Quran web application inspired by the layout, features, and spiritual aesthetic of https://www.dawateislami.net/. 

Deliver the entire working application in a single self-contained HTML file (with embedded CSS using Tailwind CSS CDN, FontAwesome icons, Google Fonts 'Amiri' for Arabic and 'Noto Nastaliq Urdu' / 'Inter' for UI, and modular JavaScript) so I can preview and use it immediately.

### 1. Visual Theme & Design (Dawat-e-Islami Inspired)
- Color Palette: Deep Emerald Islamic Green (#064e3b, #047857), Royal Gold accents (#d97706, #fbbf24), crisp white cards, and soft cream background (#f8fafc). Include a Dark Mode toggle.
- Top Utility Bar: Live Hijri & Gregorian Date, City-based Live Prayer Times (Namaz timings fetched dynamically from https://api.aladhan.com/v1/timingsByCity?city=Islamabad&country=Pakistan&method=1 with a city selector), and a Language switcher (English / Urdu / Arabic with RTL support).
- Navigation Bar: Sticky header with logo, search bar, and tabs for:
  1. Home (Hero banner, 5 Pillars of Islam, Daily Hadith / Madani Pearls, Featured Content)
  2. Al-Quran ul Kareem (Read & Listen with Tarjuma, Tafseer & My Voice)
  3. My Voice Studio (Record & Upload My Own Tilawat, Naat & Bayan)
  4. Media Library (Tilawat, Kalam/Naat, Haftawar Bayanat, Audio/Video filter)
  5. Al-Madina Books Library (Categorized Islamic PDF/eBook reader)
  6. Rohani Ilaj & Wazaif (Spiritual cures, Kalma & Dua cards)

### 2. Core Feature: Al-Quran ul Kareem Portal (With "My Voice" Integration)
- Fetch all 114 Surahs dynamically using the public Al-Quran Cloud API (https://api.alquran.cloud/v1/surah).
- Allow searching by Surah name/number and filtering by Surah Index (1–114) or Para Index (1–30).
- When a Surah is opened, fetch and display:
  - Arabic Uthmani script (quran-uthmani)
  - Urdu Translation (ur.kanzuliman or ur.jalandhri)
  - English Translation (en.sahih)
  - Expandable Tafseer / Commentary notes per Ayah and an Ayah Bookmark button.
- Custom Qari / Voice Selector: In the top audio bar of the Quran reader, provide a Reciter dropdown containing:
  - 🌟 My Voice (Owner's Custom Recitation) (Default priority when a recording exists for the selected Surah/Ayah)
  - Mishary Rashid Alafasy (ar.alafasy)
  - Abdul Basit (ar.abdulbasitmurattal)
- Build a sticky bottom Master Audio Player with play/pause, seek bar, playback speed, auto-scroll to active Ayah, and download button.

### 3. Core Feature: "My Voice Studio" (Record or Upload My Own Voice)
Build a dedicated creator studio and local backend database using IndexedDB so my recordings persist across page reloads:
- In-Browser Voice Recorder: Use the navigator.mediaDevices.getUserMedia and MediaRecorder API with a live HTML5 Canvas audio waveform visualizer. Include Start, Pause, Resume, Stop, and Re-record controls.
- Audio File Uploader: Allow uploading .mp3, .wav, or .m4a files from my computer/phone.
- Assignment & Tagging Form: Before saving a voice track, let me choose:
  - Title (e.g., "Surah Ar-Rahman Tilawat in My Voice" or "My Naat Shareef")
  - Category: Quran Tilawat (Surah Link), Quran Tarjuma/Tafseer, Hamd & Naat (Kalam), Islamic Bayan, or Dua & Wazaif.
  - Target Surah / Ayah Selector: If Quran Tilawat is chosen, let me link the recording to a specific Surah (1–114) or specific Ayah so it automatically plays inside the Al-Quran reader when "My Voice" is selected!
- Manage My Recordings Table: Allow playing, downloading, or deleting my saved voice tracks.

### 4. Islamic Books Library, Media Library & Rohani Ilaj
- Media Library: Display all my recorded/uploaded voice tracks alongside sample Tilawat, Naats, and Bayanat, filterable by Category (Quran, Kalam, Bayanat) and Reciter ("My Voice" vs. Guest Vocalists).
- Books Library: Include category filters (Aqaid, Quran-o-Tafseer, Hadees, Seerat, Tasawwuf, Fiqh), book cover cards, an interactive in-app Book Reader modal, and an option to attach an "Audio Book" narration recorded in my voice.
- Rohani Ilaj & Madani Phool: Grid of spiritual remedies, Masnoon Duas with Arabic text, Urdu/English translation, and a button to attach my voice pronunciation to each Dua.

Write clean, modular, bug-free code with zero placeholders. Ensure all API calls handle loading states and errors gracefully.`;

  const PROMPT_2_TEXT = `Act as a Senior Full-Stack Architect. Generate the complete, modular Frontend and Backend code for a Quran and Islamic Portal inspired by https://www.dawateislami.net/, featuring a custom "My Voice" Audio Recording & Streaming system.

### Tech Stack
- Frontend: HTML5, CSS3 (Tailwind / Bootstrap 5 + Custom Emerald/Gold Islamic Theme), Vanilla JavaScript (ES6+), Web Audio & MediaRecorder API.
- Backend: Node.js with Express.js.
- Database: MongoDB (using Mongoose) to store metadata for Surahs, Custom Voice Recordings, Books, Media Library items, and Rohani Ilaj Duas.
- File Storage: multer middleware configured to accept .mp3, .wav, and .webm voice recordings and store them in /public/uploads/voice/.

### Required Deliverables (Provide Full Code for Each File)

1. server.js (Express Backend & REST API):
   - Setup Express, CORS, static file serving for /public, and MongoDB connection.
   - Configure multer storage engine for uploading audio files from both file inputs and browser MediaRecorder blobs.
   - Create Mongoose Schemas:
     - VoiceTrack: { title, reciterName, category: ['Tilawat', 'Tarjuma', 'Tafseer', 'Naat', 'Bayan', 'Dua'], surahNumber, ayahNumber, audioUrl, duration, createdAt }
     - Book: { title, author, category, language, pdfUrl, audioBookUrl, coverImage }
   - Create REST API Endpoints:
     - GET /api/voice (Fetch all custom voice recordings, filterable by category and surahNumber)
     - POST /api/voice/upload (Protected admin route to upload/save recorded blob or MP3 file + metadata)
     - DELETE /api/voice/:id (Delete a recording and remove file from disk)
     - GET /api/books & POST /api/books (Manage the Islamic Books Library)

2. public/index.html & public/styles.css (Dawat-e-Islami Inspired Frontend UI):
   - Top bar with live Namaz/Prayer timings (Aladhan API) and Hijri date.
   - Main navigation: Home, Al-Quran (Surah & Para index with Arabic, Urdu Kanz-ul-Iman translation, and Tafseer), Media Library, Books Library, Rohani Ilaj, and "My Voice Studio".
   - Persistent bottom audio player supporting playlist queuing, waveform progress, and reciter switching.

3. public/app.js (Frontend Logic & Voice Integration):
   - Fetch Quran text and translations from api.alquran.cloud.
   - Before playing any Surah in the Quran reader, query GET /api/voice?category=Tilawat&surahNumber=X. If a recording in "My Voice" exists on the backend, play my custom audio stream (audioUrl); otherwise, allow fallback to standard Qari audio or let me record it on the spot.
   - Implement the MediaRecorder logic to record microphone audio in the browser, convert it to a FormData audio file, and POST it to /api/voice/upload.
   - Provide package.json and step-by-step terminal commands to run the full-stack project locally.`;

  const BACKEND_CODE_TEXT = `// server.js - Production Node.js & Express Server for Dawat-e-Islami Clone
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

// Multer Storage Configuration for Audio Blobs and MP3s
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
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mongoose Voice Track Schema
const VoiceTrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  reciterName: { type: String, default: 'Owner Custom Vocal' },
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

// 1. Fetch all voice tracks with optional filters
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

// 2. Upload a new voice recording (from mic MediaRecorder or MP3 file)
app.post('/api/voice/upload', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No audio file provided' });
    }

    const audioUrl = '/uploads/voice/' + req.file.filename;
    const { title, reciterName, category, surahNumber, ayahNumber, duration } = req.body;

    const newTrack = new VoiceTrack({
      title: title || 'Untitled Voice Recording',
      reciterName: reciterName || 'Hashim Zafar',
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

// 3. Delete a voice recording
app.delete('/api/voice/:id', async (req, res) => {
  try {
    const track = await VoiceTrack.findById(req.params.id);
    if (!track) return res.status(404).json({ success: false, error: 'Not found' });

    // Remove local file
    const filePath = path.join(__dirname, 'public', track.audioUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await VoiceTrack.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Track deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Connect DB & Start Server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
  })
  .catch(err => console.error('DB Connection error:', err));
`;

  const NETLIFY_TOML_TEXT = `# netlify.toml - Netlify Configuration for Dawat-e-Islami & Quran Portal

[build]
  command = "npm run build"
  publish = "dist"

# Single-Page App (SPA) Redirect Rule
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Security & Feature Permissions (Microphone for My Voice Studio)
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "microphone=(self)"
`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-2xl p-6 text-white border border-emerald-800 shadow-xl mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Studio Prompts & Code Generator</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-cinzel text-white">
            Prompts & Production Code Export Hub
          </h2>
          <p className="text-emerald-200/90 text-xs md:text-sm mt-1 max-w-2xl">
            Copy the exact prompt templates to generate the website anywhere, or export the production Node.js & MongoDB backend code to host your own audio streaming server!
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl mb-6">
        <button
          onClick={() => setActiveTab('netlify')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'netlify' ? 'bg-emerald-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          <Rocket className="w-4 h-4 text-amber-400" />
          <span>🚀 Deploy to Netlify</span>
        </button>

        <button
          onClick={() => setActiveTab('prompt1')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'prompt1' ? 'bg-emerald-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Prompt 1 (AI Studio App)</span>
        </button>

        <button
          onClick={() => setActiveTab('prompt2')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'prompt2' ? 'bg-emerald-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Server className="w-4 h-4 text-amber-400" />
          <span>Prompt 2 (Full-Stack Architecture)</span>
        </button>

        <button
          onClick={() => setActiveTab('backend-code')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'backend-code' ? 'bg-emerald-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCode className="w-4 h-4 text-amber-400" />
          <span>Complete server.js Code</span>
        </button>
      </div>

      {/* Netlify Deployment Tab */}
      {activeTab === 'netlify' && (
        <div className="space-y-6">
          {/* Quick Highlight Banner */}
          <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-6 border border-emerald-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Rocket className="w-4 h-4" />
                <span>Zero-Config Netlify Deployment</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-cinzel text-white">
                Deploy This Islamic Portal to Netlify in Minutes
              </h3>
              <p className="text-xs md:text-sm text-emerald-200 mt-1 max-w-2xl">
                We have already generated <code className="bg-emerald-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">netlify.toml</code> and <code className="bg-emerald-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">public/_redirects</code> in your repository. Follow any of the 3 easy methods below to publish your live website with free HTTPS and microphone permissions!
              </p>
            </div>

            <a
              href="https://app.netlify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all whitespace-nowrap self-end md:self-center"
            >
              <span>Open Netlify Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 3 Deployment Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Method 1: GitHub Continuous Deployment */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm mb-4">
                  1
                </div>
                <h4 className="font-bold text-base text-slate-800 mb-1">
                  Connect GitHub (Recommended)
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Automatic builds whenever you push code changes to your repository.
                </p>

                <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside">
                  <li>Push your project code to a GitHub repository.</li>
                  <li>Log in to <strong className="text-slate-800">app.netlify.com</strong>.</li>
                  <li>Click <strong className="text-emerald-900">Add new site &rarr; Import an existing project</strong>.</li>
                  <li>Select GitHub and choose your repository.</li>
                  <li>Netlify automatically reads <code className="bg-slate-100 px-1 rounded font-mono">netlify.toml</code>:
                    <div className="bg-slate-50 p-2 rounded-lg mt-1 border border-slate-200 text-[11px] font-mono">
                      Build command: <strong>npm run build</strong><br />
                      Publish dir: <strong>dist</strong>
                    </div>
                  </li>
                  <li>Click <strong className="text-emerald-900">Deploy site</strong>. Your site is live!</li>
                </ol>
              </div>
            </div>

            {/* Method 2: Drag & Drop (Netlify Drop) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm mb-4">
                  2
                </div>
                <h4 className="font-bold text-base text-slate-800 mb-1">
                  Netlify Drop (Fastest / No Git)
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Deploy without Git by dragging the build output directly onto Netlify.
                </p>

                <ol className="text-xs text-slate-600 space-y-2.5 list-decimal list-inside">
                  <li>In your project terminal, run:
                    <div className="bg-slate-900 text-amber-300 p-2 rounded-lg mt-1 font-mono text-[11px] flex items-center justify-between">
                      <code>npm run build</code>
                      <button 
                        onClick={() => handleCopy('npm run build', 'build-cmd')}
                        className="text-slate-400 hover:text-white"
                      >
                        {copiedSection === 'build-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </li>
                  <li>This compiles your app into the <code className="bg-slate-100 px-1 rounded font-mono">dist</code> folder.</li>
                  <li>Open <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-semibold">app.netlify.com/drop</a> in your browser.</li>
                  <li>Drag & drop the entire <code className="bg-slate-100 px-1 rounded font-mono font-bold">dist</code> folder into the browser window.</li>
                  <li>Netlify immediately gives you a live HTTPS URL!</li>
                </ol>
              </div>
            </div>

            {/* Method 3: Netlify CLI */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold text-sm mb-4">
                  3
                </div>
                <h4 className="font-bold text-base text-slate-800 mb-1">
                  Netlify CLI (From Terminal)
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Deploy straight from your command line terminal in 3 commands.
                </p>

                <div className="space-y-2">
                  <div className="bg-slate-950 text-emerald-400 p-3 rounded-xl font-mono text-[11px] space-y-1">
                    <p className="text-slate-400"># 1. Install CLI globally</p>
                    <p className="text-white">npm install -g netlify-cli</p>
                    <p className="text-slate-400 mt-2"># 2. Login to your account</p>
                    <p className="text-white">netlify login</p>
                    <p className="text-slate-400 mt-2"># 3. Build & Deploy Production</p>
                    <p className="text-amber-300">npm run build</p>
                    <p className="text-amber-300">netlify deploy --prod --dir=dist</p>
                  </div>

                  <button
                    onClick={() => handleCopy("npm install -g netlify-cli\nnetlify login\nnpm run build\nnetlify deploy --prod --dir=dist", 'cli-cmds')}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedSection === 'cli-cmds' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Commands Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy CLI Commands</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration File Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-700" />
                  <span>Configured File: netlify.toml</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Already present in your project root. Controls build settings, SPA URL redirects, and microphone permissions.
                </p>
              </div>

              <button
                onClick={() => handleCopy(NETLIFY_TOML_TEXT, 'netlify-toml')}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-3 py-1.5 rounded-xl text-xs shadow-md transition-all active:scale-95"
              >
                {copiedSection === 'netlify-toml' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy netlify.toml</span>
                  </>
                )}
              </button>
            </div>

            <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {NETLIFY_TOML_TEXT}
            </pre>
          </div>

          {/* Important Tips for Microphone & IndexedDB on Netlify */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 text-xs text-emerald-950 space-y-2">
            <h5 className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Netlify Audio & Microphone Features</span>
            </h5>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>
                <strong>Free Automatic SSL (HTTPS):</strong> Browsers only allow microphone audio recording (<code className="font-mono bg-white px-1 rounded">getUserMedia</code>) on secure HTTPS connections. Netlify automatically provides free SSL certificates for your custom domain or <code className="font-mono bg-white px-1 rounded">*.netlify.app</code> domain!
              </li>
              <li>
                <strong>Persistent Voice Recordings:</strong> Your recitations in <strong>My Voice Studio</strong> are saved in browser <code className="font-mono bg-white px-1 rounded">IndexedDB</code>, so they will continue to play whenever visitors or you return to your Netlify site.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 1 Content: Prompt 1 */}
      {activeTab === 'prompt1' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-800">
                Prompt 1: Copy-Paste for Live AI Studio App
              </h3>
              <p className="text-xs text-slate-400">
                Frontend + In-Browser Voice Recording + IndexedDB Local Backend
              </p>
            </div>

            <button
              onClick={() => handleCopy(PROMPT_1_TEXT, 'prompt1')}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all active:scale-95"
            >
              {copiedSection === 'prompt1' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Prompt 1</span>
                </>
              )}
            </button>
          </div>

          <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
            {PROMPT_1_TEXT}
          </pre>
        </div>
      )}

      {/* Tab 2 Content: Prompt 2 */}
      {activeTab === 'prompt2' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-800">
                Prompt 2: Copy-Paste for Full-Stack Architecture
              </h3>
              <p className="text-xs text-slate-400">
                Frontend UI + Node.js/Express + Multer Storage + MongoDB Database
              </p>
            </div>

            <button
              onClick={() => handleCopy(PROMPT_2_TEXT, 'prompt2')}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all active:scale-95"
            >
              {copiedSection === 'prompt2' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Prompt 2</span>
                </>
              )}
            </button>
          </div>

          <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
            {PROMPT_2_TEXT}
          </pre>
        </div>
      )}

      {/* Tab 3 Content: Production server.js Code */}
      {activeTab === 'backend-code' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-800">
                Production Backend: server.js
              </h3>
              <p className="text-xs text-slate-400">
                Full working Express code with Multer file streaming & MongoDB models
              </p>
            </div>

            <button
              onClick={() => handleCopy(BACKEND_CODE_TEXT, 'backend-code')}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all active:scale-95"
            >
              {copiedSection === 'backend-code' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied server.js!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy server.js</span>
                </>
              )}
            </button>
          </div>

          <pre className="bg-slate-950 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
            {BACKEND_CODE_TEXT}
          </pre>
        </div>
      )}

      {/* Quick Setup Guide Checklist */}
      <div className="mt-8 bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6">
        <h4 className="font-bold text-sm text-emerald-950 flex items-center gap-2 mb-3">
          <Terminal className="w-4 h-4 text-emerald-800" />
          <span>Local Deployment Instructions (Terminal Run Guide)</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="bg-white p-4 rounded-xl border border-emerald-100">
            <span className="font-bold text-emerald-900 block mb-1">1. Install Dependencies</span>
            <code className="bg-slate-100 p-1 rounded font-mono text-[11px] block">
              npm install express mongoose multer cors dotenv
            </code>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-100">
            <span className="font-bold text-emerald-900 block mb-1">2. Run Local MongoDB</span>
            <code className="bg-slate-100 p-1 rounded font-mono text-[11px] block">
              mongod --dbpath=/data/db
            </code>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-100">
            <span className="font-bold text-emerald-900 block mb-1">3. Start Server</span>
            <code className="bg-slate-100 p-1 rounded font-mono text-[11px] block">
              node server.js
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};
