import React, { useState } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles, Check } from 'lucide-react';

export const TasbeehCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [selectedDhikr, setSelectedDhikr] = useState('SubhanAllah');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [laps, setLaps] = useState(0);

  const presets = [
    { name: 'SubhanAllah', arabic: 'سُبْحَانَ اللَّهِ', target: 33, meaning: 'Glory be to Allah' },
    { name: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', target: 33, meaning: 'All praise is for Allah' },
    { name: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ', target: 34, meaning: 'Allah is the Greatest' },
    { name: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', target: 100, meaning: 'I seek forgiveness from Allah' },
    { name: 'Durood Shareef', arabic: 'صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ', target: 100, meaning: 'Blessings upon the Prophet' },
    { name: 'La Ilaha Illallah', arabic: 'لَا إِلٰهَ إِلَّا اللهُ', target: 100, meaning: 'There is no god but Allah' }
  ];

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // AudioContext fallback
    }
  };

  const handleIncrement = () => {
    playClickSound();
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    const nextCount = count + 1;
    if (nextCount >= target) {
      setCount(0);
      setLaps((prev) => prev + 1);
    } else {
      setCount(nextCount);
    }
  };

  const handleReset = () => {
    setCount(0);
    setLaps(0);
  };

  const currentPreset = presets.find((p) => p.name === selectedDhikr) || presets[0];
  const progressPercent = Math.min(100, Math.round((count / target) * 100));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          Digital Subha & Dhikr Counter
        </span>
        <h2 className="text-3xl font-bold font-cinzel text-emerald-950 mt-2">
          Interactive Tasbeeh
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-urdu text-base">
          الذِّكْرُ حَيَاةُ الْقُلُوبِ • ذکرِ الٰہی سے دلوں کو سکون ملتا ہے
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => {
              setSelectedDhikr(p.name);
              setTarget(p.target);
              setCount(0);
            }}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedDhikr === p.name
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-amber-400'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <span className={`block font-arabic text-lg text-right ${selectedDhikr === p.name ? 'text-amber-300' : 'text-emerald-900'}`}>
              {p.arabic}
            </span>
            <span className="block font-semibold text-xs mt-1">{p.name}</span>
            <span className={`block text-[10px] ${selectedDhikr === p.name ? 'text-emerald-200' : 'text-slate-400'}`}>
              Target: {p.target}
            </span>
          </button>
        ))}
      </div>

      {/* Counter Main Display */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 max-w-md mx-auto text-center relative overflow-hidden">
        {/* Sound toggle & reset */}
        <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-700" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
            <span>Sound</span>
          </button>

          <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-semibold">
            Completed Sets (دور): <strong>{laps}</strong>
          </span>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-red-600 transition-colors"
            title="Reset counter"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Selected Dhikr Display */}
        <div className="my-4">
          <p className="font-arabic text-3xl font-bold text-emerald-950 mb-1">
            {currentPreset.arabic}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            {currentPreset.meaning}
          </p>
        </div>

        {/* Big Tap Button with Circular Progress */}
        <div className="relative w-56 h-56 mx-auto my-6 flex items-center justify-center select-none">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-slate-100 fill-transparent"
              strokeWidth="7"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-amber-500 fill-transparent transition-all duration-150"
              strokeWidth="7"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
              strokeLinecap="round"
            />
          </svg>

          <button
            onClick={handleIncrement}
            className="absolute inset-4 rounded-full bg-gradient-to-tr from-emerald-950 via-emerald-900 to-teal-900 text-white shadow-xl hover:scale-102 active:scale-95 transition-all flex flex-col items-center justify-center border-4 border-amber-400/40"
          >
            <span className="text-5xl font-mono font-bold text-amber-300">
              {count}
            </span>
            <span className="text-xs text-emerald-200 mt-1 uppercase tracking-wider font-semibold">
              Goal: {target}
            </span>
            <span className="text-[10px] text-amber-400/80 mt-1 animate-pulse">
              TAP TO COUNT
            </span>
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Click the circle or tap anywhere on phone to increment. Resets when reaching target.
        </p>
      </div>
    </div>
  );
};
