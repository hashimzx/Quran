# Dawat-e-Islami Clone - Backend Server & Voice Streaming API

This backend provides real persistence and streaming for your recorded Quran recitations and Naats using **Node.js**, **Express**, **Multer**, and **MongoDB**.

## Setup & Running Locally

1. **Install Dependencies:**
   ```bash
   cd backend
   npm init -y
   npm install express mongoose multer cors dotenv
   ```

2. **Start Local MongoDB:**
   ```bash
   # Make sure MongoDB is installed on your computer
   mongod
   ```

3. **Run the Server:**
   ```bash
   node server.js
   ```
   The backend will start on `http://localhost:5000`.

## Endpoints:
- `GET /api/voice` - List all tracks
- `POST /api/voice/upload` - Multipart form audio upload
- `DELETE /api/voice/:id` - Delete track and audio file
