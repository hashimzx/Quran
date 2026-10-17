import React from 'react';
import { 
  BookOpen, 
  Mic, 
  Video, 
  Sparkles, 
  Compass, 
  Code, 
  Home, 
  Globe, 
  Clock, 
  Volume2
} from 'lucide-react';
import { CityOption, PrayerTimings } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCity: CityOption;
  setSelectedCity: (city: CityOption) => void;
  cities: CityOption[];
  prayerTimings: PrayerTimings;
  hijriDate: string;
  myVoiceCount: number;
  currentLanguage: 'en' | 'ur' | 'ar';
  setCurrentLanguage: (lang: 'en' | 'ur' | 'ar') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCity,
  setSelectedCity,
  cities,
  prayerTimings,
  hijriDate,
  myVoiceCount,
  currentLanguage,
  setCurrentLanguage
}) => {
  const gregorianDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  const navItems = [
    { id: 'home', label: 'Home', urdu: 'صفحۂ اول', icon: Home },
    { id: 'quran', label: 'Al-Quran ul Kareem', urdu: 'القرآن الکریم', icon: BookOpen, badge: 'With My Voice' },
    { id: 'voice-studio', label: 'My Voice Studio', urdu: 'وائس اسٹوڈیو', icon: Mic, highlight: true, count: myVoiceCount },
    { id: 'media', label: 'Media Library', urdu: 'میڈیا لائبریری', icon: Video },
    { id: 'books', label: 'Maktaba-tul-Madina', urdu: 'مکتبۃ المدینہ', icon: BookOpen },
    { id: 'rohani-ilaj', label: 'Rohani Ilaj & Duas', urdu: 'روحانی علاج و دعائیں', icon: Sparkles },
    { id: 'tasbeeh', label: 'Digital Tasbeeh', urdu: 'تسبیح کاؤنٹر', icon: Compass },
    { id: 'prompts', label: 'Deploy & Prompts', urdu: 'ڈپلائی و پرامپٹس', icon: Code, badge: '🚀 Netlify' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-emerald-950 text-white shadow-xl border-b border-emerald-800">
      {/* 1. Top Utility Header (Date, Prayer Quick-Time, Language) */}
      <div className="bg-emerald-900/90 border-b border-emerald-800/80 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Hijri & Gregorian Dates */}
          <div className="flex items-center space-x-3 text-emerald-100/90 font-medium">
            <span className="flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-700/50">
              <span className="text-amber-400 font-semibold">☪ {hijriDate}</span>
            </span>
            <span className="hidden sm:inline text-emerald-300/80">|</span>
            <span className="hidden sm:inline text-emerald-200/80">{gregorianDate}</span>
          </div>

          {/* Quick Prayer Ticker & City Selector */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-1 text-emerald-200">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline text-emerald-300">Namaz:</span>
              <select
                aria-label="Select City for Prayer Timings"
                value={selectedCity.name}
                onChange={(e) => {
                  const found = cities.find(c => c.name === e.target.value);
                  if (found) setSelectedCity(found);
                }}
                className="bg-emerald-950/80 border border-emerald-700 text-amber-300 text-xs rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                {cities.map((city) => (
                  <option key={city.name} value={city.name} className="bg-emerald-950 text-white">
                    {city.displayName}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden lg:flex items-center space-x-2 text-[11px] font-mono text-emerald-200">
              <span className="px-1.5 py-0.5 bg-emerald-800/60 rounded">Fajr {prayerTimings.Fajr}</span>
              <span className="px-1.5 py-0.5 bg-emerald-800/60 rounded">Dhuhr {prayerTimings.Dhuhr}</span>
              <span className="px-1.5 py-0.5 bg-emerald-800/60 rounded">Asr {prayerTimings.Asr}</span>
              <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded font-semibold">Maghrib {prayerTimings.Maghrib}</span>
              <span className="px-1.5 py-0.5 bg-emerald-800/60 rounded">Isha {prayerTimings.Isha}</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-emerald-950 rounded border border-emerald-700/60 overflow-hidden text-[11px]">
              <button
                onClick={() => setCurrentLanguage('en')}
                className={`px-2 py-0.5 transition-colors ${currentLanguage === 'en' ? 'bg-amber-500 text-emerald-950 font-bold' : 'text-emerald-200 hover:text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => setCurrentLanguage('ur')}
                className={`px-2 py-0.5 transition-colors ${currentLanguage === 'ur' ? 'bg-amber-500 text-emerald-950 font-bold' : 'text-emerald-200 hover:text-white'}`}
              >
                اردو
              </button>
              <button
                onClick={() => setCurrentLanguage('ar')}
                className={`px-2 py-0.5 transition-colors ${currentLanguage === 'ar' ? 'bg-amber-500 text-emerald-950 font-bold' : 'text-emerald-200 hover:text-white'}`}
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Brand / Title Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Ornate Islamic Emblem */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center border border-amber-400/40">
              <span className="text-xl text-amber-300 font-bold">☪</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white font-cinzel">
                DAWAT-E-ISLAMI
              </h1>
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded font-mono font-medium">
                PORTAL
              </span>
            </div>
            <p className="text-xs text-emerald-300 font-urdu tracking-wide">
              دعوتِ اسلامی • القرآن الکریم و وائس اسٹوڈیو
            </p>
          </div>
        </div>

        {/* Right CTA: My Voice Studio button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('voice-studio')}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 px-3.5 py-1.5 rounded-lg font-semibold text-xs md:text-sm shadow-md transition-all active:scale-95"
          >
            <Mic className="w-4 h-4 text-emerald-950 animate-pulse" />
            <span>Record My Voice</span>
            {myVoiceCount > 0 && (
              <span className="bg-emerald-950 text-amber-300 text-[11px] px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                {myVoiceCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. Navigation Tabs Scrollable Bar */}
      <nav className="bg-emerald-900 border-t border-emerald-800/60 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex space-x-1 sm:space-x-2 py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-amber-500 text-emerald-950 font-bold shadow-md'
                    : 'text-emerald-100 hover:bg-emerald-800/70 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-950' : item.highlight ? 'text-amber-400' : 'text-emerald-300'}`} />
                <span>{currentLanguage === 'ur' ? item.urdu : item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-emerald-950 text-amber-300' : 'bg-emerald-950/80 text-amber-400 border border-amber-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && item.count > 0 && (
                  <span className={`text-[10px] px-1.5 rounded-full font-bold ${
                    isActive ? 'bg-emerald-950 text-amber-300' : 'bg-amber-400 text-emerald-950'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
