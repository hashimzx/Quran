import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Upload, 
  Trash2, 
  Download, 
  Check, 
  Sparkles, 
  Music, 
  Radio, 
  AlertCircle,
  Clock,
  Layers,
  Volume2
} from 'lucide-react';
import { ALL_SURAHS } from '../data/quranMetadata';
import { VoiceTrack, VoiceCategory } from '../types';
import { saveVoiceTrack, deleteVoiceTrack } from '../services/voiceStorage';

interface MyVoiceStudioProps {
  voiceTracks: VoiceTrack[];
  onRefreshTracks: () => void;
  onPlayTrack: (track: VoiceTrack) => void;
  currentlyPlayingId: string | null;
  isPlaying: boolean;
  preSelectedSurahNumber?: number;
  onNavigateToQuranSurah?: (surahNumber: number) => void;
}

export const MyVoiceStudio: React.FC<MyVoiceStudioProps> = ({
  voiceTracks,
  onRefreshTracks,
  onPlayTrack,
  currentlyPlayingId,
  isPlaying,
  preSelectedSurahNumber,
  onNavigateToQuranSurah
}) => {
  // Recorder states
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [previewAudioUrl, setPreviewAudioUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [reciterName, setReciterName] = useState('My Voice (Custom)');
  const [category, setCategory] = useState<VoiceCategory>('Tilawat');
  const [surahNumber, setSurahNumber] = useState<number>(preSelectedSurahNumber || 1);
  const [ayahNumber, setAyahNumber] = useState<string>('All');

  // MediaRecorder and AudioContext refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync if preSelectedSurahNumber changed
  useEffect(() => {
    if (preSelectedSurahNumber) {
      setSurahNumber(preSelectedSurahNumber);
      setTitle(`Surah ${ALL_SURAHS.find(s => s.number === preSelectedSurahNumber)?.englishName || preSelectedSurahNumber} Recitation in My Voice`);
      setCategory('Tilawat');
    }
  }, [preSelectedSurahNumber]);

  // Handle live canvas waveform animation
  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = '#064e3b'; // emerald dark
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#fbbf24'; // amber gold
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    render();
  };

  const startRecording = async () => {
    setErrorMessage(null);
    setAudioBlob(null);
    setPreviewAudioUrl(null);
    setSaveSuccess(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Setup Web Audio Analyser
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Setup MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(recordedBlob);
        const url = URL.createObjectURL(recordedBlob);
        setPreviewAudioUrl(url);

        // Stop all tracks
        stream.getTracks().forEach((t) => t.stop());
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      setIsPaused(false);
      setRecordingDuration(0);

      // Start timer
      timerIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);

      // Start waveform
      drawWaveform();
    } catch (err: any) {
      console.error('Microphone access failed:', err);
      setErrorMessage(
        'Could not access microphone. Please grant microphone permissions in your browser or upload an audio file below.'
      );
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      clearInterval(timerIntervalRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      clearInterval(timerIntervalRef.current);
    }
  };

  // Handle external file upload (.mp3, .wav, .m4a)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setAudioBlob(file);
    const url = URL.createObjectURL(file);
    setPreviewAudioUrl(url);

    // Auto-fill title if empty
    if (!title) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      setTitle(cleanName);
    }
  };

  const handleSaveTrack = async () => {
    if (!audioBlob && !previewAudioUrl) {
      setErrorMessage('Please record or upload an audio track first.');
      return;
    }

    const currentTitle = title.trim() || `My Recording #${voiceTracks.length + 1}`;
    const newTrack: VoiceTrack = {
      id: `voice-${Date.now()}`,
      title: currentTitle,
      reciterName: reciterName.trim() || 'My Voice (Owner)',
      category,
      surahNumber: category === 'Tilawat' ? Number(surahNumber) : undefined,
      ayahNumber: (category === 'Tilawat' && ayahNumber !== 'All') ? Number(ayahNumber) : undefined,
      audioBlob: audioBlob || undefined,
      audioUrl: previewAudioUrl || '',
      duration: recordingDuration || 60,
      createdAt: Date.now()
    };

    await saveVoiceTrack(newTrack);
    onRefreshTracks();
    setSaveSuccess(true);
    setAudioBlob(null);
    setPreviewAudioUrl(null);
    setTitle('');
    setRecordingDuration(0);

    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const handleDelete = async (id: string) => {
    await deleteVoiceTrack(id);
    onRefreshTracks();
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero Studio Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-2xl p-6 text-white border border-emerald-800 shadow-xl mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Dawat-e-Islami Voice Creator Studio</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-cinzel text-white">
              My Voice Studio & Recording Station
            </h2>
            <p className="text-emerald-200/90 text-xs md:text-sm mt-1 max-w-2xl">
              Record your own Quran recitation (Tilawat), Naat, Bayan, or Dua right from your browser or upload existing audio files. Your tracks automatically link to the Quran Reader so you and your audience can listen to your recitation!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-emerald-900/80 border border-emerald-700/60 px-4 py-2 rounded-xl text-center">
              <span className="block text-2xl font-bold text-amber-300 font-mono">
                {voiceTracks.length}
              </span>
              <span className="text-[11px] text-emerald-200 uppercase tracking-wider">
                Saved Tracks
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Audio Recorder & File Uploader (6 Columns) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Live Microphone Recorder Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800">In-Browser Voice Recorder</h3>
                  <p className="text-[11px] text-slate-400">Microphone HD audio capture with live waveform</p>
                </div>
              </div>

              {isRecording && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  <span>{isPaused ? 'Paused' : 'Recording'}</span>
                  <span className="font-mono ml-1 font-bold">{formatSeconds(recordingDuration)}</span>
                </div>
              )}
            </div>

            {/* Live Canvas Waveform */}
            <div className="relative rounded-xl overflow-hidden bg-emerald-950 h-28 border border-emerald-800 mb-4 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={500}
                height={112}
                className="w-full h-full object-cover"
              />
              {!isRecording && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-950/80 text-emerald-200 text-xs text-center p-4">
                  <Mic className="w-8 h-8 text-amber-400 mb-2 opacity-80" />
                  <span>Click <strong>Start Recording</strong> to speak or recite</span>
                </div>
              )}
            </div>

            {/* Recorder Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-2.5 px-4 rounded-xl text-xs shadow-md transition-all active:scale-95"
                >
                  <Mic className="w-4 h-4 text-amber-300" />
                  <span>Start Recording</span>
                </button>
              ) : (
                <>
                  {isPaused ? (
                    <button
                      onClick={resumeRecording}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-all"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Resume</span>
                    </button>
                  ) : (
                    <button
                      onClick={pauseRecording}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-all"
                    >
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause</span>
                    </button>
                  )}

                  <button
                    onClick={stopRecording}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all"
                  >
                    <Square className="w-4 h-4 fill-current" />
                    <span>Stop & Review</span>
                  </button>
                </>
              )}
            </div>

            {errorMessage && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* 2. File Uploader (.mp3, .wav, .m4a) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800">Or Upload Existing Audio File</h3>
                <p className="text-[11px] text-slate-400">Support for .mp3, .wav, .m4a, .webm audio files</p>
              </div>
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 rounded-xl p-6 text-center cursor-pointer transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,.mp3,.wav,.m4a,.ogg,.webm"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">Click to choose audio file from your device</p>
              <p className="text-[11px] text-slate-400 mt-1">MP3, WAV, M4A up to 50MB</p>
            </div>
          </div>
        </div>

        {/* Right Column: Track Assignment & Save Form (6 Columns) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Assign & Save Voice Track</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Link this track to a Surah so it automatically plays in the Al-Quran reader when My Voice is selected!
              </p>
            </div>

            {/* Audio Preview if available */}
            {previewAudioUrl && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-300 rounded-xl">
                <span className="text-[11px] font-bold text-amber-800 block mb-1">
                  Preview Recorded / Uploaded Audio:
                </span>
                <audio controls src={previewAudioUrl} className="w-full h-8" />
              </div>
            )}

            <div className="space-y-4 text-xs">
              {/* Title */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Track Title</label>
                <input
                  type="text"
                  placeholder="e.g. Surah Al-Fatihah Recitation in My Voice"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-800"
                />
              </div>

              {/* Reciter Name */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reciter / Artist Name</label>
                <input
                  type="text"
                  placeholder="e.g. Hashim Zafar (or your name)"
                  value={reciterName}
                  onChange={(e) => setReciterName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-800"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Islamic Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as VoiceCategory)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-800 font-medium"
                >
                  <option value="Tilawat">Quran Tilawat (Linked to Surah)</option>
                  <option value="Tarjuma">Quran Tarjuma / Translation Audio</option>
                  <option value="Tafseer">Tafseer Audio Note</option>
                  <option value="Naat">Hamd & Naat Shareef (Kalam)</option>
                  <option value="Bayan">Islamic Bayan / Dars</option>
                  <option value="Dua">Dua & Wazaif Pronunciation</option>
                </select>
              </div>

              {/* Surah Selector if Tilawat */}
              {category === 'Tilawat' && (
                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs">
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    <span>Target Surah Link in Al-Quran Reader</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Surah (1–114)</label>
                      <select
                        value={surahNumber}
                        onChange={(e) => setSurahNumber(Number(e.target.value))}
                        className="w-full px-2 py-1.5 bg-white border border-emerald-300 rounded-lg text-emerald-950 font-medium"
                      >
                        {ALL_SURAHS.map((s) => (
                          <option key={s.number} value={s.number}>
                            {s.number}. {s.englishName} ({s.name})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Ayah Scope</label>
                      <select
                        value={ayahNumber}
                        onChange={(e) => setAyahNumber(e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-emerald-300 rounded-lg text-emerald-950 font-medium"
                      >
                        <option value="All">Entire Surah</option>
                        <option value="1">Ayah 1</option>
                        <option value="2">Ayah 2</option>
                        <option value="3">Ayah 3</option>
                        <option value="4">Ayah 4</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={handleSaveTrack}
                disabled={!audioBlob && !previewAudioUrl}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                  audioBlob || previewAudioUrl
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 active:scale-98 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Save to My Voice Library (IndexedDB)</span>
              </button>

              {saveSuccess && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Saved successfully! Ready to play in Al-Quran Reader.</span>
                  </div>
                  {category === 'Tilawat' && onNavigateToQuranSurah && (
                    <button
                      onClick={() => onNavigateToQuranSurah(Number(surahNumber))}
                      className="font-bold underline text-emerald-950 text-xs"
                    >
                      Open Surah
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Manage My Recordings Library */}
      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Music className="w-4 h-4 text-emerald-700" />
              <span>My Saved Voice Recordings ({voiceTracks.length})</span>
            </h3>
            <p className="text-xs text-slate-400">
              Permanently stored in your browser's IndexedDB. Click play to listen or jump directly to the Surah.
            </p>
          </div>
        </div>

        {voiceTracks.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Mic className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-xs">No custom voice tracks recorded yet. Use the recorder above!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {voiceTracks.map((track) => {
              const isCurrentPlaying = currentlyPlayingId === track.id && isPlaying;
              const surahInfo = track.surahNumber ? ALL_SURAHS.find(s => s.number === track.surahNumber) : null;

              return (
                <div
                  key={track.id}
                  className={`py-3.5 px-3 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 transition-colors ${
                    isCurrentPlaying ? 'bg-amber-50/80 border border-amber-300' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onPlayTrack(track)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        isCurrentPlaying
                          ? 'bg-amber-500 text-emerald-950 font-bold'
                          : 'bg-emerald-900 text-white hover:bg-emerald-800'
                      }`}
                    >
                      {isCurrentPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs md:text-sm text-slate-800">
                          {track.title}
                        </span>
                        <span className="text-[10px] font-medium bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full">
                          {track.category}
                        </span>
                        {track.isSample && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                            Demo Sample
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                        <span>Reciter: <strong>{track.reciterName}</strong></span>
                        {surahInfo && (
                          <span>
                            Linked: Surah #{track.surahNumber} ({surahInfo.englishName})
                          </span>
                        )}
                        <span>{formatSeconds(track.duration)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    {surahInfo && onNavigateToQuranSurah && (
                      <button
                        onClick={() => onNavigateToQuranSurah(track.surahNumber!)}
                        className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-lg font-medium transition-colors"
                      >
                        Read Surah #{track.surahNumber}
                      </button>
                    )}

                    {track.audioUrl && (
                      <a
                        href={track.audioUrl}
                        download={`${track.title}.wav`}
                        className="p-1.5 text-slate-400 hover:text-slate-700 border border-slate-200 rounded-lg transition-colors"
                        title="Download audio file"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      onClick={() => handleDelete(track.id)}
                      className="p-1.5 text-red-400 hover:text-red-700 border border-slate-200 rounded-lg transition-colors"
                      title="Delete recording"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
