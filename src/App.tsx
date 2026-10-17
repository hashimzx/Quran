/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PrayerBar } from './components/PrayerBar';
import { HomeHero } from './components/HomeHero';
import { QuranReader } from './components/QuranReader';
import { MyVoiceStudio } from './components/MyVoiceStudio';
import { MediaLibrary } from './components/MediaLibrary';
import { BooksLibrary } from './components/BooksLibrary';
import { RohaniIlaj } from './components/RohaniIlaj';
import { TasbeehCounter } from './components/TasbeehCounter';
import { PromptHub } from './components/PromptHub';
import { MasterAudioPlayer, ActiveAudioTrack } from './components/MasterAudioPlayer';
import { POPULAR_CITIES, DEFAULT_TIMINGS, fetchPrayerTimings, getEstimatedHijriDate } from './services/prayerService';
import { getAllVoiceTracks } from './services/voiceStorage';
import { CityOption, PrayerTimings, VoiceTrack, Ayah, SurahData, MediaItem } from './types';
import { Heart, Sparkles, BookOpen, Mic } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCity, setSelectedCity] = useState<CityOption>(POPULAR_CITIES[0]); // Islamabad
  const [prayerTimings, setPrayerTimings] = useState<PrayerTimings>(DEFAULT_TIMINGS);
  const [hijriDate, setHijriDate] = useState<string>(getEstimatedHijriDate());
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ur' | 'ar'>('en');

  // Custom Voice Tracks from IndexedDB
  const [voiceTracks, setVoiceTracks] = useState<VoiceTrack[]>([]);
  const [preSelectedSurahNumber, setPreSelectedSurahNumber] = useState<number | undefined>(undefined);

  // Audio Player State
  const [currentAudioTrack, setCurrentAudioTrack] = useState<ActiveAudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAyahLocation, setCurrentAyahLocation] = useState<{ surahNumber: number; ayahNumberInSurah: number } | null>(null);

  // Load Voice Tracks on mount
  const refreshTracks = async () => {
    const tracks = await getAllVoiceTracks();
    setVoiceTracks(tracks);
  };

  useEffect(() => {
    refreshTracks();
  }, []);

  // Fetch Prayer timings on city change
  useEffect(() => {
    let isCancelled = false;
    async function loadTimings() {
      const data = await fetchPrayerTimings(selectedCity.name, selectedCity.country);
      if (!isCancelled) {
        setPrayerTimings(data.timings);
        setHijriDate(data.hijri);
      }
    }
    loadTimings();
    return () => { isCancelled = true; };
  }, [selectedCity]);

  // Audio Play Handlers
  const handlePlayAyah = (ayah: Ayah, surah: SurahData, reciterMode: string, customTrack?: VoiceTrack) => {
    // If playing the same ayah, toggle play/pause
    if (
      currentAyahLocation?.surahNumber === surah.number &&
      currentAyahLocation?.ayahNumberInSurah === ayah.numberInSurah
    ) {
      setIsPlaying(!isPlaying);
      return;
    }

    // Determine Audio Source: Priority to My Voice if chosen and available!
    let audioUrl = ayah.audioUrl || `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3`;
    let isMyVoice = false;
    let subtitle = `Surah ${surah.englishName} • Ayah ${ayah.numberInSurah}`;

    if (reciterMode === 'my-voice' && customTrack) {
      audioUrl = customTrack.audioUrl;
      isMyVoice = true;
      subtitle = `Recited in My Voice (${customTrack.reciterName}) • Surah ${surah.englishName}`;
    } else if (reciterMode === 'abdulbasit') {
      audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmurattal/${ayah.number}.mp3`;
      subtitle = `Reciter: Abdul Basit Murattal • Surah ${surah.englishName}`;
    } else {
      subtitle = `Reciter: Mishary Rashid Alafasy • Surah ${surah.englishName}`;
    }

    // Next ayah handler
    const onNextAyah = () => {
      const nextIndex = ayah.numberInSurah;
      if (nextIndex < surah.ayahs.length) {
        const nextAyah = surah.ayahs[nextIndex];
        handlePlayAyah(nextAyah, surah, reciterMode, customTrack);
      }
    };

    const onPrevAyah = () => {
      const prevIndex = ayah.numberInSurah - 2;
      if (prevIndex >= 0) {
        const prevAyah = surah.ayahs[prevIndex];
        handlePlayAyah(prevAyah, surah, reciterMode, customTrack);
      }
    };

    setCurrentAyahLocation({
      surahNumber: surah.number,
      ayahNumberInSurah: ayah.numberInSurah
    });

    setCurrentAudioTrack({
      id: `ayah-${surah.number}-${ayah.numberInSurah}`,
      title: `${surah.englishName} (${surah.name}) - Verse ${ayah.numberInSurah}`,
      subtitle,
      audioUrl,
      isMyVoice,
      onNext: onNextAyah,
      onPrev: onPrevAyah
    });

    setIsPlaying(true);
  };

  const handlePlayVoiceTrack = (track: VoiceTrack) => {
    if (currentAudioTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
      return;
    }

    setCurrentAyahLocation(track.surahNumber ? { surahNumber: track.surahNumber, ayahNumberInSurah: 1 } : null);

    setCurrentAudioTrack({
      id: track.id,
      title: track.title,
      subtitle: `Recorded by ${track.reciterName} • ${track.category}`,
      audioUrl: track.audioUrl,
      isMyVoice: true
    });

    setIsPlaying(true);
  };

  const handlePlayMedia = (media: MediaItem) => {
    if (currentAudioTrack?.id === media.id) {
      setIsPlaying(!isPlaying);
      return;
    }

    setCurrentAyahLocation(null);

    setCurrentAudioTrack({
      id: media.id,
      title: media.title,
      subtitle: `${media.reciter} • ${media.category}`,
      audioUrl: media.audioUrl,
      isMyVoice: media.isMyVoice
    });

    setIsPlaying(true);
  };

  const handleOpenRecorderForSurah = (surahNumber: number) => {
    setPreSelectedSurahNumber(surahNumber);
    setActiveTab('voice-studio');
  };

  const handleRecordDua = (duaTitle: string) => {
    setPreSelectedSurahNumber(undefined);
    setActiveTab('voice-studio');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans pb-28">
      {/* 1. Header with Top Bar and Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        cities={POPULAR_CITIES}
        prayerTimings={prayerTimings}
        hijriDate={hijriDate}
        myVoiceCount={voiceTracks.length}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
      />

      {/* 2. Prayer Bar (Live Times + Countdown) */}
      <PrayerBar
        timings={prayerTimings}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        cities={POPULAR_CITIES}
      />

      {/* 3. Main Views Switched by activeTab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeHero
            onNavigateTab={setActiveTab}
            selectedCity={selectedCity}
            prayerTimings={prayerTimings}
            voiceTracks={voiceTracks}
          />
        )}

        {activeTab === 'quran' && (
          <QuranReader
            onPlayAyah={handlePlayAyah}
            currentPlayingAyah={currentAyahLocation}
            isPlaying={isPlaying}
            voiceTracks={voiceTracks}
            onOpenRecorderForSurah={handleOpenRecorderForSurah}
          />
        )}

        {activeTab === 'voice-studio' && (
          <MyVoiceStudio
            voiceTracks={voiceTracks}
            onRefreshTracks={refreshTracks}
            onPlayTrack={handlePlayVoiceTrack}
            currentlyPlayingId={currentAudioTrack?.id || null}
            isPlaying={isPlaying}
            preSelectedSurahNumber={preSelectedSurahNumber}
            onNavigateToQuranSurah={(surahNum) => {
              setActiveTab('quran');
            }}
          />
        )}

        {activeTab === 'media' && (
          <MediaLibrary
            onPlayMedia={handlePlayMedia}
            currentlyPlayingId={currentAudioTrack?.id || null}
            isPlaying={isPlaying}
            voiceTracks={voiceTracks}
          />
        )}

        {activeTab === 'books' && (
          <BooksLibrary
            onRecordAudioBook={(bookTitle) => {
              setActiveTab('voice-studio');
            }}
          />
        )}

        {activeTab === 'rohani-ilaj' && (
          <RohaniIlaj
            onRecordDua={handleRecordDua}
            voiceTracks={voiceTracks}
            onPlayTrack={handlePlayVoiceTrack}
            currentlyPlayingId={currentAudioTrack?.id || null}
            isPlaying={isPlaying}
          />
        )}

        {activeTab === 'tasbeeh' && (
          <TasbeehCounter />
        )}

        {activeTab === 'prompts' && (
          <PromptHub />
        )}
      </main>

      {/* 4. Sticky Bottom Master Audio Player */}
      <MasterAudioPlayer
        currentTrack={currentAudioTrack}
        isPlaying={isPlaying}
        onPlayPauseToggle={() => setIsPlaying(!isPlaying)}
        onClose={() => {
          setIsPlaying(false);
          setCurrentAudioTrack(null);
          setCurrentAyahLocation(null);
        }}
      />

      {/* 5. Islamic Footer */}
      <footer className="bg-emerald-950 text-white border-t border-emerald-800/80 pt-10 pb-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl text-amber-400 font-bold">☪</span>
              <span className="font-cinzel text-base font-bold text-white tracking-wide">
                DAWAT-E-ISLAMI
              </span>
            </div>
            <p className="font-urdu text-sm text-emerald-300 mb-2">
              دعوتِ اسلامی • ایک عالمی غیر سیاسی تحریکِ تبلیغِ قرآن و سنت
            </p>
            <p className="text-slate-400 leading-relaxed">
              Serving the Ummah worldwide through Quran education, Madani Channel, Rohani Ilaj, and Maktaba-tul-Madina publications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-amber-400 uppercase tracking-wider mb-3">Quran & Voice</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>
                <button onClick={() => setActiveTab('quran')} className="hover:text-amber-300 transition-colors">
                  Al-Quran 114 Surahs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('voice-studio')} className="hover:text-amber-300 transition-colors">
                  Record My Voice Station
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quran')} className="hover:text-amber-300 transition-colors">
                  Kanz-ul-Iman Urdu Translation
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tasbeeh')} className="hover:text-amber-300 transition-colors">
                  Digital Subha Tasbeeh
                </button>
              </li>
            </ul>
          </div>

          {/* Spiritual Literature */}
          <div>
            <h4 className="font-bold text-amber-400 uppercase tracking-wider mb-3">Spiritual Cures</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>
                <button onClick={() => setActiveTab('rohani-ilaj')} className="hover:text-amber-300 transition-colors">
                  Rohani Ilaj for Illness & Shifa
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('rohani-ilaj')} className="hover:text-amber-300 transition-colors">
                  Istikhara Supplication
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('books')} className="hover:text-amber-300 transition-colors">
                  Faizan-e-Sunnat Library
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('media')} className="hover:text-amber-300 transition-colors">
                  Madani Channel Streams
                </button>
              </li>
            </ul>
          </div>

          {/* Developer Prompts */}
          <div>
            <h4 className="font-bold text-amber-400 uppercase tracking-wider mb-3">AI Studio & Code</h4>
            <p className="text-slate-400 mb-2">
              Export the full prompt or Node.js + MongoDB backend code for this application:
            </p>
            <button
              onClick={() => setActiveTab('prompts')}
              className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-3 py-1.5 rounded-lg text-xs shadow-md transition-all"
            >
              Copy AI Studio Prompts
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-emerald-900 text-center text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Dawat-e-Islami Clone & My Voice Studio. Built for educational and spiritual benefit.</p>
          <p className="font-urdu text-xs text-emerald-300">صَلُّوا عَلَى الْحَبِيب! صَلَّى اللهُ عَلَى مُحَمَّد</p>
        </div>
      </footer>
    </div>
  );
}
