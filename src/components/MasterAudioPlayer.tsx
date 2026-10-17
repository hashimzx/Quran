import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Download,
  Repeat,
  Radio,
  X
} from 'lucide-react';
import { VoiceTrack } from '../types';

export interface ActiveAudioTrack {
  id: string;
  title: string;
  subtitle: string;
  audioUrl: string;
  isMyVoice?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

interface MasterAudioPlayerProps {
  currentTrack: ActiveAudioTrack | null;
  isPlaying: boolean;
  onPlayPauseToggle: () => void;
  onClose: () => void;
}

export const MasterAudioPlayer: React.FC<MasterAudioPlayerProps> = ({
  currentTrack,
  isPlaying,
  onPlayPauseToggle,
  onClose
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isLooping, setIsLooping] = useState(false);

  // Play/pause sync with prop
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.play().catch(err => console.warn('Audio play failed:', err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Track change sync
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    audioRef.current.src = currentTrack.audioUrl;
    audioRef.current.playbackRate = playbackSpeed;
    if (isPlaying) {
      audioRef.current.play().catch(err => console.warn('Audio play failed:', err));
    }
  }, [currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleEnded = () => {
    if (isLooping && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (currentTrack?.onNext) {
      currentTrack.onNext();
    } else {
      onPlayPauseToggle(); // pause
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.85;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const toggleSpeed = () => {
    const speeds = [0.75, 1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-emerald-950/95 backdrop-blur-md text-white border-t border-emerald-700/80 shadow-2xl px-4 py-2.5 animate-in slide-in-from-bottom duration-200">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Track Info */}
        <div className="flex items-center gap-3 w-full md:w-1/4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 flex-shrink-0">
            {currentTrack.isMyVoice ? (
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            ) : (
              <Radio className="w-5 h-5" />
            )}
          </div>

          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs md:text-sm text-white truncate block">
                {currentTrack.title}
              </span>
              {currentTrack.isMyVoice && (
                <span className="text-[10px] bg-amber-400 text-emerald-950 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider flex-shrink-0">
                  🎙️ My Voice
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-300 truncate block">
              {currentTrack.subtitle}
            </span>
          </div>
        </div>

        {/* Player Controls & Scrubber */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-2/4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`p-1.5 rounded-lg transition-colors ${
                isLooping ? 'text-amber-400 bg-emerald-900' : 'text-emerald-300 hover:text-white'
              }`}
              title="Toggle repeat loop"
            >
              <Repeat className="w-4 h-4" />
            </button>

            {currentTrack.onPrev && (
              <button
                onClick={currentTrack.onPrev}
                className="text-emerald-300 hover:text-white transition-colors"
                title="Previous Ayah"
              >
                <SkipBack className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onPlayPauseToggle}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-lg transition-transform active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {currentTrack.onNext && (
              <button
                onClick={currentTrack.onNext}
                className="text-emerald-300 hover:text-white transition-colors"
                title="Next Ayah"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={toggleSpeed}
              className="text-xs font-mono font-bold bg-emerald-900 border border-emerald-700 px-2 py-0.5 rounded text-amber-300 hover:text-white"
              title="Playback speed"
            >
              {playbackSpeed}x
            </button>
          </div>

          {/* Time Scrubber */}
          <div className="flex items-center gap-2 w-full max-w-md text-[11px] text-emerald-300 font-mono">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Close */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="text-emerald-300 hover:text-white">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {currentTrack.audioUrl && (
            <a
              href={currentTrack.audioUrl}
              download={`${currentTrack.title}.mp3`}
              className="p-1.5 text-emerald-300 hover:text-white"
              title="Download Audio"
            >
              <Download className="w-4 h-4" />
            </a>
          )}

          <button
            onClick={onClose}
            className="p-1.5 text-emerald-400 hover:text-white"
            title="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
