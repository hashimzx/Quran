import React, { useEffect, useState } from 'react';
import { Clock, MapPin, Bell } from 'lucide-react';
import { PrayerTimings, CityOption } from '../types';
import { getNextPrayerInfo } from '../services/prayerService';

interface PrayerBarProps {
  timings: PrayerTimings;
  selectedCity: CityOption;
  onSelectCity: (city: CityOption) => void;
  cities: CityOption[];
}

export const PrayerBar: React.FC<PrayerBarProps> = ({
  timings,
  selectedCity,
  onSelectCity,
  cities
}) => {
  const [countdown, setCountdown] = useState<string>('');
  const [nextPrayerName, setNextPrayerName] = useState<string>('Maghrib');

  useEffect(() => {
    const updateCountdown = () => {
      const next = getNextPrayerInfo(timings);
      setNextPrayerName(next.name);

      const totalSeconds = Math.max(0, Math.floor(next.remainingMs / 1000));
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (n: number) => n.toString().padStart(2, '0');
      setCountdown(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [timings]);

  const prayerCards = [
    { name: 'Fajr', urdu: 'فجر', time: timings.Fajr },
    { name: 'Sunrise', urdu: 'طلوعِ آفتاب', time: timings.Sunrise, isSunrise: true },
    { name: 'Dhuhr', urdu: 'ظہر', time: timings.Dhuhr },
    { name: 'Asr', urdu: 'عصر', time: timings.Asr },
    { name: 'Maghrib', urdu: 'مغرب', time: timings.Maghrib },
    { name: 'Isha', urdu: 'عشاء', time: timings.Isha }
  ];

  return (
    <div className="bg-emerald-900/40 border-y border-emerald-800/60 py-3 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: City & Next Prayer Countdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-200 bg-emerald-950/70 border border-emerald-700/60 px-3 py-1.5 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">{selectedCity.displayName}</span>
          </div>

          <div className="flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-emerald-100 font-medium">Next: <strong className="text-amber-300">{nextPrayerName}</strong></span>
            <span className="font-mono text-amber-300 font-bold bg-emerald-950/70 px-2 py-0.5 rounded">
              {countdown || '00:00:00'}
            </span>
          </div>
        </div>

        {/* Right: 6 Prayers Row */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full md:w-auto">
          {prayerCards.map((p) => {
            const isNext = p.name === nextPrayerName || (nextPrayerName.startsWith('Fajr') && p.name === 'Fajr');
            return (
              <div
                key={p.name}
                className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-lg border text-center transition-all ${
                  isNext
                    ? 'bg-amber-500 text-emerald-950 border-amber-400 shadow-md font-bold scale-105'
                    : p.isSunrise
                    ? 'bg-emerald-950/40 text-emerald-300/80 border-emerald-800/40'
                    : 'bg-emerald-950/80 text-emerald-100 border-emerald-700/60 hover:border-amber-400/50'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-[11px] uppercase tracking-wider">{p.name}</span>
                  <span className="text-[10px] font-urdu opacity-75 hidden sm:inline">({p.urdu})</span>
                </div>
                <span className={`text-xs font-mono font-bold mt-0.5 ${isNext ? 'text-emerald-950' : 'text-amber-300'}`}>
                  {p.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
