import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Play, 
  Pause, 
  Volume2, 
  Mic, 
  BookMarked, 
  Share2, 
  Info, 
  ChevronRight, 
  Layers, 
  Sparkles,
  Check,
  BookmarkCheck,
  RotateCcw
} from 'lucide-react';
import { ALL_SURAHS, ALL_PARAS, fetchSurahDetails } from '../data/quranMetadata';
import { SurahMeta, SurahData, Ayah, VoiceTrack } from '../types';

interface QuranReaderProps {
  onPlayAyah: (ayah: Ayah, surah: SurahData, reciterMode: string, customTrack?: VoiceTrack) => void;
  currentPlayingAyah: { surahNumber: number; ayahNumberInSurah: number } | null;
  isPlaying: boolean;
  voiceTracks: VoiceTrack[];
  onOpenRecorderForSurah: (surahNumber: number) => void;
}

export const QuranReader: React.FC<QuranReaderProps> = ({
  onPlayAyah,
  currentPlayingAyah,
  isPlaying,
  voiceTracks,
  onOpenRecorderForSurah
}) => {
  const [activeTab, setActiveTab] = useState<'surahs' | 'paras'>('surahs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [surahData, setSurahData] = useState<SurahData | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState<string>('my-voice');
  const [showUrdu, setShowUrdu] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showTafseer, setShowTafseer] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  // Active Ayah ref for scrolling
  const activeAyahRef = useRef<HTMLDivElement | null>(null);

  // Check if a custom voice track exists for this Surah
  const myVoiceTrack = voiceTracks.find(
    (t) => t.category === 'Tilawat' && t.surahNumber === selectedSurahNumber
  );

  // Load Surah content on number change
  useEffect(() => {
    let isCancelled = false;
    async function loadSurah() {
      setIsLoadingSurah(true);
      try {
        const data = await fetchSurahDetails(selectedSurahNumber);
        if (!isCancelled) {
          setSurahData(data);
        }
      } catch (err) {
        console.error('Error fetching surah:', err);
      } finally {
        if (!isCancelled) setIsLoadingSurah(false);
      }
    }
    loadSurah();
    return () => { isCancelled = true; };
  }, [selectedSurahNumber]);

  // Scroll to active ayah
  useEffect(() => {
    if (activeAyahRef.current) {
      activeAyahRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentPlayingAyah]);

  const toggleBookmark = (ayahNumber: number) => {
    setBookmarks(prev => 
      prev.includes(ayahNumber) ? prev.filter(n => n !== ayahNumber) : [...prev, ayahNumber]
    );
  };

  const copyAyahText = (ayah: Ayah) => {
    const textToCopy = `${ayah.text}\n\nUrdu: ${ayah.translationUrdu || ''}\nEnglish: ${ayah.translationEnglish || ''}\n(Quran ${selectedSurahNumber}:${ayah.numberInSurah})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyah(ayah.numberInSurah);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  const filteredSurahs = ALL_SURAHS.filter(s => 
    s.name.includes(searchQuery) ||
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.number.toString() === searchQuery.trim()
  );

  const filteredParas = ALL_PARAS.filter(p =>
    p.name.includes(searchQuery) ||
    p.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.number.toString() === searchQuery.trim()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Title & Quick Controls Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-2xl p-6 text-white border border-emerald-800 shadow-xl mb-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <span>Al-Quran ul Kareem</span>
              <span>•</span>
              <span className="font-urdu text-sm">القرآن الکریم بالترجمة والتفسیر</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-cinzel text-white">
              The Noble Quran Reader
            </h2>
            <p className="text-emerald-200/90 text-xs md:text-sm mt-1 max-w-2xl">
              Recite with Uthmani script, Kanz-ul-Iman Urdu translation, Sahih International English translation, and listen to authentic recitations or your own voice recorded in the Studio.
            </p>
          </div>

          {/* Voice Integration CTA */}
          <div className="flex flex-wrap items-center gap-3">
            {myVoiceTrack ? (
              <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-400/50 px-3 py-2 rounded-xl text-xs text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>
                  <strong>My Voice Available</strong> for this Surah
                </span>
              </div>
            ) : null}

            <button
              onClick={() => onOpenRecorderForSurah(selectedSurahNumber)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all active:scale-95"
            >
              <Mic className="w-4 h-4" />
              <span>Record Surah #{selectedSurahNumber} in My Voice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Navigator + Reading Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Surah & Para Index (4 Columns) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-[750px] flex flex-col">
          {/* Index Tabs & Search */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl mb-3">
            <button
              onClick={() => setActiveTab('surahs')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'surahs' ? 'bg-emerald-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Surah Index (114)
            </button>
            <button
              onClick={() => setActiveTab('paras')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'paras' ? 'bg-emerald-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Para / Juz Index (30)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={activeTab === 'surahs' ? 'Search by Surah name, number...' : 'Search Para / Juz...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-800"
            />
          </div>

          {/* List of Surahs or Paras */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {activeTab === 'surahs' ? (
              filteredSurahs.map((s) => {
                const isSelected = selectedSurahNumber === s.number;
                const hasMyVoice = voiceTracks.some(
                  t => t.category === 'Tilawat' && t.surahNumber === s.number
                );
                return (
                  <div
                    key={s.number}
                    onClick={() => setSelectedSurahNumber(s.number)}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-900 text-white shadow-md'
                        : 'hover:bg-slate-50 text-slate-700 border border-transparent hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-50 text-emerald-800'
                      }`}>
                        {s.number}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs">{s.englishName}</span>
                          {hasMyVoice && (
                            <span className="text-[10px] bg-amber-400/20 text-amber-500 font-bold px-1.5 py-0.2 rounded border border-amber-400/30">
                              🎙️ My Voice
                            </span>
                          )}
                        </div>
                        <span className={`text-[11px] block ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                          {s.englishNameTranslation} • {s.numberOfAyahs} Ayahs
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`font-arabic text-sm font-bold ${isSelected ? 'text-amber-300' : 'text-emerald-900'}`}>
                        {s.name}
                      </span>
                      <span className={`block text-[10px] capitalize ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                        {s.revelationType}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              filteredParas.map((p) => {
                return (
                  <div
                    key={p.number}
                    onClick={() => {
                      // Map to starting Surah
                      const targetSurah = ALL_SURAHS.find(s => s.englishName.includes(p.startSurah.split('-')[1] || p.startSurah)) || ALL_SURAHS[0];
                      setSelectedSurahNumber(targetSurah.number);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-slate-50 text-slate-700 border border-transparent hover:border-slate-200 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-mono text-xs font-bold">
                        {p.number}
                      </div>
                      <div>
                        <span className="font-semibold text-xs block">{p.englishName}</span>
                        <span className="text-[11px] text-slate-400">
                          Starts at {p.startSurah}
                        </span>
                      </div>
                    </div>
                    <span className="font-arabic text-base font-bold text-emerald-900">
                      {p.name}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Surah Reader & Audio Bar (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Top Audio & Display Controls Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Reciter Selector */}
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-semibold text-slate-700">Reciter Voice:</span>
                <select
                  aria-label="Select Quran Reciter Voice"
                  value={selectedReciter}
                  onChange={(e) => setSelectedReciter(e.target.value)}
                  className="bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs rounded-xl px-3 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="my-voice">
                    🌟 My Voice (Custom Studio Recording) {myVoiceTrack ? '✓ Linked' : '(Record)'}
                  </option>
                  <option value="alafasy">Mishary Rashid Alafasy (العفاسي)</option>
                  <option value="abdulbasit">Abdul Basit Murattal (عبد الباسط)</option>
                </select>
              </div>

              {/* Translation Toggles & Font Size Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowUrdu(!showUrdu)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-urdu transition-all ${
                    showUrdu ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  اردو ترجمہ
                </button>
                <button
                  onClick={() => setShowEnglish(!showEnglish)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                    showEnglish ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  English
                </button>

                <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs text-slate-600">
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-0.5 rounded ${fontSize === 'normal' ? 'bg-white font-bold shadow-xs text-emerald-900' : ''}`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-0.5 rounded ${fontSize === 'large' ? 'bg-white font-bold shadow-xs text-emerald-900' : ''}`}
                  >
                    A+
                  </button>
                  <button
                    onClick={() => setFontSize('xlarge')}
                    className={`px-2 py-0.5 rounded ${fontSize === 'xlarge' ? 'bg-white font-bold shadow-xs text-emerald-900' : ''}`}
                  >
                    A++
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Surah Header Card with Islamic Ornaments */}
          {surahData && (
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-6 text-center relative overflow-hidden border border-emerald-700 shadow-md">
              <div className="absolute top-2 right-3 text-5xl opacity-10 text-amber-300 font-arabic select-none pointer-events-none">
                {surahData.name}
              </div>

              <div className="max-w-md mx-auto">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                  Surah #{surahData.number} • {surahData.revelationType} • {surahData.numberOfAyahs} Verses
                </span>
                <h3 className="text-4xl font-arabic font-bold text-amber-300 mt-2 mb-1">
                  سُورَةُ {surahData.name}
                </h3>
                <p className="text-base font-cinzel tracking-wider text-emerald-100">
                  {surahData.englishName} ({surahData.englishNameTranslation})
                </p>

                {/* Bismillah Calligraphy (except Surah 9) */}
                {surahData.number !== 9 && (
                  <div className="mt-4 pt-4 border-t border-emerald-800/80">
                    <p className="font-arabic text-2xl text-amber-200">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                    <p className="text-[11px] text-emerald-300/80 mt-1 font-urdu">
                      شروع اللہ کے نام سے جو نہایت مہربان رحم والا
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Verses Container */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm min-h-[500px]">
            {isLoadingSurah ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <div className="w-10 h-10 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-sm">Loading Surah Ayahs & Audio streams...</p>
              </div>
            ) : surahData ? (
              <div className="space-y-6">
                {surahData.ayahs.map((ayah) => {
                  const isCurrentActive = 
                    currentPlayingAyah?.surahNumber === surahData.number &&
                    currentPlayingAyah?.ayahNumberInSurah === ayah.numberInSurah;
                  const isBookmarked = bookmarks.includes(ayah.numberInSurah);

                  const fontClass = 
                    fontSize === 'normal' ? 'text-xl leading-relaxed' :
                    fontSize === 'large' ? 'text-2xl leading-loose' :
                    'text-3xl leading-loose';

                  return (
                    <div
                      key={ayah.numberInSurah}
                      ref={isCurrentActive ? activeAyahRef : null}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                        isCurrentActive
                          ? 'bg-amber-50/70 border-amber-400 shadow-md ring-1 ring-amber-400'
                          : 'bg-white border-slate-200 hover:border-emerald-200 hover:shadow-xs'
                      }`}
                    >
                      {/* Ayah Header Bar: Number badge & Action icons */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                            {ayah.numberInSurah}
                          </span>
                          <span className="text-slate-400 text-[11px]">
                            Verse {ayah.numberInSurah} of {surahData.numberOfAyahs}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Play Ayah Audio */}
                          <button
                            onClick={() => onPlayAyah(ayah, surahData, selectedReciter, myVoiceTrack)}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                              isCurrentActive && isPlaying
                                ? 'bg-amber-500 text-emerald-950 font-bold'
                                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                            }`}
                          >
                            {isCurrentActive && isPlaying ? (
                              <>
                                <Pause className="w-3.5 h-3.5 fill-current" />
                                <span>Pause</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span>Play</span>
                              </>
                            )}
                          </button>

                          {/* Bookmark */}
                          <button
                            onClick={() => toggleBookmark(ayah.numberInSurah)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isBookmarked ? 'bg-amber-500 text-emerald-950 border-amber-500' : 'text-slate-400 hover:text-slate-700 border-slate-200'
                            }`}
                            title="Bookmark this verse"
                          >
                            <BookMarked className="w-3.5 h-3.5" />
                          </button>

                          {/* Copy */}
                          <button
                            onClick={() => copyAyahText(ayah)}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
                            title="Copy Verse Text"
                          >
                            {copiedAyah === ayah.numberInSurah ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Share2 className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Tafseer info toggle */}
                          <button
                            onClick={() => setShowTafseer(showTafseer === ayah.numberInSurah ? null : ayah.numberInSurah)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              showTafseer === ayah.numberInSurah ? 'bg-emerald-900 text-white' : 'border-slate-200 text-slate-400 hover:text-slate-700'
                            }`}
                            title="Tafseer & Commentary"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Arabic Quranic Ayah Text */}
                      <p className={`font-arabic text-emerald-950 text-right ${fontClass} my-2`}>
                        {ayah.text}
                        <span className="inline-flex items-center justify-center w-7 h-7 mx-2 rounded-full border border-amber-600/40 text-amber-700 text-xs font-mono select-none">
                          {ayah.numberInSurah}
                        </span>
                      </p>

                      {/* Urdu Kanz-ul-Iman Translation */}
                      {showUrdu && ayah.translationUrdu && (
                        <p className="font-urdu text-sm sm:text-base text-slate-700 text-right mt-3 pt-2 border-t border-slate-100/70">
                          {ayah.translationUrdu}
                        </p>
                      )}

                      {/* English Sahih International Translation */}
                      {showEnglish && ayah.translationEnglish && (
                        <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
                          {ayah.translationEnglish}
                        </p>
                      )}

                      {/* Expandable Tafseer Box */}
                      {showTafseer === ayah.numberInSurah && (
                        <div className="mt-3 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                          <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>Tafseer & Commentary (صراط الجنان):</span>
                          </div>
                          <p className="font-urdu text-sm leading-relaxed text-right">
                            {ayah.tafseer || 'اس آیتِ مبارکہ میں اللہ تعالیٰ کی عظمت، توحید اور مومنین کے لیے دائمی ہدایت کا بیان ہے۔ تدبر کے ساتھ تلاوت ایمان کو جلا بخشتی ہے۔'}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
