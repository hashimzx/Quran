import React from 'react';
import { 
  BookOpen, 
  Mic, 
  Video, 
  Sparkles, 
  Compass, 
  Clock, 
  ChevronRight, 
  Award, 
  Heart,
  Radio,
  FileText
} from 'lucide-react';
import { MADANI_PEARL_OF_THE_DAY, FIVE_PILLARS } from '../data/islamicContent';
import { CityOption, PrayerTimings, VoiceTrack } from '../types';

interface HomeHeroProps {
  onNavigateTab: (tab: string) => void;
  selectedCity: CityOption;
  prayerTimings: PrayerTimings;
  voiceTracks: VoiceTrack[];
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onNavigateTab,
  selectedCity,
  prayerTimings,
  voiceTracks
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* 1. Grand Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-8 md:p-12 border border-emerald-800 shadow-2xl overflow-hidden">
        {/* Subtle Islamic geometric glow effect */}
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 top-6 text-7xl md:text-9xl font-arabic text-amber-400/10 pointer-events-none select-none">
          اقْرَأْ
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spiritual Portal Inspired by dawateislami.net</span>
          </div>

          <p className="font-arabic text-2xl md:text-3xl text-amber-300 mb-2 font-bold">
            بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold font-cinzel tracking-tight text-white leading-tight">
            Al-Quran ul Kareem & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
              My Voice Studio
            </span>
          </h1>

          <p className="font-urdu text-lg md:text-xl text-emerald-200 mt-2 font-normal leading-relaxed">
            قرآنِ پاک پڑھیں، کنز الایمان سنیں اور اپنی آواز میں تلاوت، نعت و بیانات محفوظ فرمائیں
          </p>

          <p className="text-emerald-100/80 text-xs md:text-sm mt-3 max-w-2xl leading-relaxed">
            A comprehensive Islamic sanctuary featuring all 114 Surahs with Uthmani script, authentic Urdu & English translations, live worldwide prayer timings, Maktaba-tul-Madina books, and a real in-browser recording station to capture and stream your own recitation.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => onNavigateTab('quran')}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-5 py-3 rounded-xl text-xs md:text-sm shadow-lg transition-transform active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Al-Quran Reader</span>
            </button>

            <button
              onClick={() => onNavigateTab('voice-studio')}
              className="flex items-center gap-2 bg-emerald-800/80 hover:bg-emerald-700/80 border border-emerald-600 text-white font-semibold px-5 py-3 rounded-xl text-xs md:text-sm shadow-md transition-all active:scale-95"
            >
              <Mic className="w-4 h-4 text-amber-300" />
              <span>Open My Voice Studio ({voiceTracks.length} Tracks)</span>
            </button>

            <button
              onClick={() => onNavigateTab('prompts')}
              className="flex items-center gap-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-amber-300 font-semibold px-4 py-3 rounded-xl text-xs shadow-sm transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Copy Prompts & Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Madani Pearl of the Day Card */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100/60 rounded-2xl border border-amber-300/80 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-800">
                {MADANI_PEARL_OF_THE_DAY.title}
              </span>
              <p className="font-urdu text-base md:text-lg text-emerald-950 font-semibold mt-0.5">
                {MADANI_PEARL_OF_THE_DAY.urdu}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                {MADANI_PEARL_OF_THE_DAY.english} — <span className="font-mono text-amber-800">{MADANI_PEARL_OF_THE_DAY.reference}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('tasbeeh')}
            className="whitespace-nowrap px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors self-end md:self-center"
          >
            Start Durood Tasbeeh
          </button>
        </div>
      </div>

      {/* 3. Core Feature Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quran Portal Card */}
        <div 
          onClick={() => onNavigateTab('quran')}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-800 group-hover:text-emerald-900 transition-colors">
              Al-Quran ul Kareem
            </h3>
            <p className="font-urdu text-sm text-emerald-800 mt-0.5">
              القرآن الکریم مع ترجمہ کنز الایمان
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              All 114 Surahs and 30 Paras in Uthmani script, Ayah audio recitation, Tafseer notes, and custom reciter selection including your recorded voice.
            </p>
          </div>

          <div className="flex items-center text-xs font-bold text-emerald-800 mt-4 group-hover:translate-x-1 transition-transform">
            <span>Read & Recite</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* My Voice Studio Card */}
        <div 
          onClick={() => onNavigateTab('voice-studio')}
          className="bg-white rounded-2xl border border-amber-300/80 p-6 shadow-sm hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-amber-500 text-emerald-950 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Flagship Feature
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-800 group-hover:text-amber-700 transition-colors">
              My Voice Studio
            </h3>
            <p className="font-urdu text-sm text-emerald-800 mt-0.5">
              اپنی آواز میں تلاوت و نعت ریکارڈ کریں
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              In-browser microphone recording with real-time waveform visualizer, MP3/WAV file uploader, and persistent IndexedDB storage linked directly into the Quran player.
            </p>
          </div>

          <div className="flex items-center text-xs font-bold text-amber-700 mt-4 group-hover:translate-x-1 transition-transform">
            <span>Record Voice Track</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Maktaba-tul-Madina Books Card */}
        <div 
          onClick={() => onNavigateTab('books')}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-800 group-hover:text-teal-900 transition-colors">
              Maktaba-tul-Madina
            </h3>
            <p className="font-urdu text-sm text-emerald-800 mt-0.5">
              مکتبۃ المدینہ کی کتب و رسائل
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Faizan-e-Sunnat, Sirat-ul-Jinan Tafseer, Namaz Ke Ahkam, and spiritual literature with an in-app reader modal and audiobook narration.
            </p>
          </div>

          <div className="flex items-center text-xs font-bold text-teal-800 mt-4 group-hover:translate-x-1 transition-transform">
            <span>Browse Library</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Media Library Card */}
        <div 
          onClick={() => onNavigateTab('media')}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-800 group-hover:text-indigo-900 transition-colors">
              Madani Media Library
            </h3>
            <p className="font-urdu text-sm text-emerald-800 mt-0.5">
              مدنی چینل، نعتیں اور ہفتہ وار بیانات
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Soulful Tilawat, Hamd & Naats, weekly spiritual discourses, and personal audio streams with audio waveforms.
            </p>
          </div>

          <div className="flex items-center text-xs font-bold text-indigo-800 mt-4 group-hover:translate-x-1 transition-transform">
            <span>Listen & Watch</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Rohani Ilaj & Duas Card */}
        <div 
          onClick={() => onNavigateTab('rohani-ilaj')}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-800 group-hover:text-rose-900 transition-colors">
              Rohani Ilaj & Istikhara
            </h3>
            <p className="font-urdu text-sm text-emerald-800 mt-0.5">
              روحانی علاج، استخارہ اور مسنون دعائیں
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Tested Quranic cures for diseases, anxiety, poverty, evil eye, plus Istikhara supplication and recordable pronunciation.
            </p>
          </div>

          <div className="flex items-center text-xs font-bold text-rose-800 mt-4 group-hover:translate-x-1 transition-transform">
            <span>View Spiritual Cures</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Digital Tasbeeh Card */}
        <div 
          onClick={() => onNavigateTab('tasbeeh')}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-800 group-hover:text-amber-900 transition-colors">
              Digital Tasbeeh & Dhikr
            </h3>
            <p className="font-urdu text-sm text-emerald-800 mt-0.5">
              ڈیجیٹل تسبیح کاؤنٹر
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              SubhanAllah, Alhamdulillah, Allahu Akbar, and Durood counters with sound feedback, target laps, and tactile vibration.
            </p>
          </div>

          <div className="flex items-center text-xs font-bold text-amber-800 mt-4 group-hover:translate-x-1 transition-transform">
            <span>Open Counter</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      {/* 4. Five Pillars of Islam Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Foundation of Faith (ارکانِ اسلام)
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-cinzel text-emerald-950 mt-2">
            The Five Pillars of Islam
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Core principles shaping a believer's devotion to Almighty Allah and the Holy Messenger ﷺ.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {FIVE_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 transition-all text-center flex flex-col justify-between"
            >
              <div>
                <span className="w-8 h-8 rounded-full bg-emerald-900 text-amber-300 font-bold font-mono text-xs inline-flex items-center justify-center mb-3">
                  {pillar.number}
                </span>
                <h3 className="font-bold text-sm text-slate-800">{pillar.name}</h3>
                <h4 className="font-arabic text-lg font-bold text-emerald-900 my-1">{pillar.arabic}</h4>
                <p className="font-urdu text-xs text-slate-600 mb-2">{pillar.urdu}</p>
                <p className="text-[11px] text-slate-500 leading-normal">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
