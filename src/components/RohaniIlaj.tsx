import React, { useState } from 'react';
import { Sparkles, Mic, Play, Pause, Volume2, ShieldCheck, Heart, Compass, Check } from 'lucide-react';
import { ROHANI_DUAS } from '../data/islamicContent';
import { RohaniDua, VoiceTrack } from '../types';

interface RohaniIlajProps {
  onRecordDua: (duaTitle: string) => void;
  voiceTracks: VoiceTrack[];
  onPlayTrack: (track: VoiceTrack) => void;
  currentlyPlayingId: string | null;
  isPlaying: boolean;
}

export const RohaniIlaj: React.FC<RohaniIlajProps> = ({
  onRecordDua,
  voiceTracks,
  onPlayTrack,
  currentlyPlayingId,
  isPlaying
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Shifa', 'Rizq', 'Protection', 'Istikhara', 'Morning-Evening'];

  const filteredDuas = ROHANI_DUAS.filter(
    (d) => selectedCategory === 'All' || d.category === selectedCategory
  );

  const copyDua = (dua: RohaniDua) => {
    const text = `${dua.arabicText}\n\n${dua.transliteration}\n\nUrdu: ${dua.urduTranslation}\n\nEnglish: ${dua.englishTranslation}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-2xl p-6 text-white border border-emerald-800 shadow-xl mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Spiritual Cures & Masnoon Duas</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-cinzel text-white">
            Rohani Ilaj & Istikhara Portal
          </h2>
          <p className="text-emerald-200/90 text-xs md:text-sm mt-1 max-w-2xl">
            Quranic wazaif, Sunnah supplications, and spiritual treatments for anxiety, diseases, evil eye, and sustenance. Record your own voice recitation for each prayer to practice perfect Makharij.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {cat === 'Morning-Evening' ? 'Morning & Evening Duas' : cat}
          </button>
        ))}
      </div>

      {/* Duas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDuas.map((dua) => {
          // Check if user has recorded a voice track for this Dua
          const userDuaTrack = voiceTracks.find(
            (vt) => vt.category === 'Dua' && vt.title.toLowerCase().includes(dua.title.toLowerCase().slice(0, 10))
          );
          const isCurrentPlaying = userDuaTrack && currentlyPlayingId === userDuaTrack.id && isPlaying;

          return (
            <div
              key={dua.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {dua.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-800">{dua.title}</h3>
                    <h4 className="font-urdu text-sm text-emerald-800 font-semibold">{dua.urduTitle}</h4>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded">
                    {dua.reference}
                  </span>
                </div>

                {/* Arabic Supplication */}
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-right mb-4">
                  <p className="font-arabic text-xl sm:text-2xl text-emerald-950 leading-loose">
                    {dua.arabicText}
                  </p>
                </div>

                {/* Transliteration */}
                <p className="text-xs text-slate-500 italic mb-3">
                  "{dua.transliteration}"
                </p>

                {/* Urdu Translation */}
                <p className="font-urdu text-sm text-slate-700 text-right mb-2">
                  ترجمہ: {dua.urduTranslation}
                </p>

                {/* English Translation */}
                <p className="text-xs text-slate-600 mb-4">
                  <strong>English:</strong> {dua.englishTranslation}
                </p>

                {/* Spiritual Benefit / Method */}
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900 mb-4">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Method & Spiritual Benefit:</span>
                  </div>
                  <p className="font-urdu text-sm text-right leading-relaxed">{dua.urduBenefit}</p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <button
                  onClick={() => copyDua(dua)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === dua.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <span>Copy Dua</span>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  {userDuaTrack ? (
                    <button
                      onClick={() => onPlayTrack(userDuaTrack)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold flex items-center gap-1.5 transition-colors"
                    >
                      {isCurrentPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Pause My Voice</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Play My Voice</span>
                        </>
                      )}
                    </button>
                  ) : null}

                  <button
                    onClick={() => onRecordDua(dua.title)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Mic className="w-3.5 h-3.5 text-amber-400" />
                    <span>Record in My Voice</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
