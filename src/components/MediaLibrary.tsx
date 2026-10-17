import React, { useState } from 'react';
import { Play, Pause, Video, Music, Filter, Sparkles, Mic, Calendar, Eye } from 'lucide-react';
import { MEDIA_GALLERY } from '../data/islamicContent';
import { MediaItem, VoiceTrack } from '../types';

interface MediaLibraryProps {
  onPlayMedia: (item: MediaItem) => void;
  currentlyPlayingId: string | null;
  isPlaying: boolean;
  voiceTracks: VoiceTrack[];
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({
  onPlayMedia,
  currentlyPlayingId,
  isPlaying,
  voiceTracks
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterMyVoiceOnly, setFilterMyVoiceOnly] = useState(false);

  // Convert custom voice tracks to MediaItems
  const customMediaItems: MediaItem[] = voiceTracks.map((vt) => ({
    id: vt.id,
    title: vt.title,
    urduTitle: vt.title,
    reciter: vt.reciterName,
    category: vt.category === 'Tilawat' ? 'Tilawat' : vt.category === 'Naat' ? 'Hamd-o-Naat' : 'Bayan',
    duration: `${Math.floor(vt.duration / 60)}:${(vt.duration % 60).toString().padStart(2, '0')}`,
    audioUrl: vt.audioUrl,
    date: 'Custom Recording',
    views: 'Personal Voice',
    isMyVoice: true
  }));

  const allItems = [...customMediaItems, ...MEDIA_GALLERY];

  const filteredItems = allItems.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesVoice = !filterMyVoiceOnly || item.isMyVoice;
    return matchesCat && matchesVoice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-2xl p-6 text-white border border-emerald-800 shadow-xl mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Video className="w-4 h-4" />
              <span>Madani Media & Audio Streaming</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-cinzel text-white">
              Islamic Media Library
            </h2>
            <p className="text-emerald-200/90 text-xs md:text-sm mt-1 max-w-2xl">
              Listen to Tilawat-e-Quran, spiritual Hamd & Naats, Haftawar Bayanat, and your own recorded vocal tracks.
            </p>
          </div>

          <button
            onClick={() => setFilterMyVoiceOnly(!filterMyVoiceOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterMyVoiceOnly
                ? 'bg-amber-400 text-emerald-950 shadow-md scale-105'
                : 'bg-emerald-900 border border-emerald-700 text-emerald-100 hover:text-white'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Show My Voice Only ({customMediaItems.length})</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {['All', 'Tilawat', 'Hamd-o-Naat', 'Bayan', 'Rohani-Ilaj'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {cat === 'All' ? 'All Content' : cat === 'Hamd-o-Naat' ? 'Hamd & Naat (Kalam)' : cat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isCurrentActive = currentlyPlayingId === item.id && isPlaying;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md ${
                isCurrentActive ? 'border-amber-400 ring-2 ring-amber-300' : 'border-slate-200'
              }`}
            >
              {/* Media Thumbnail with gradient and play button overlay */}
              <div className="relative h-44 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 flex items-center justify-center p-6 text-center text-white">
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-950/80 px-2 py-0.5 rounded text-amber-300 border border-amber-400/30">
                    {item.category}
                  </span>
                  {item.isMyVoice && (
                    <span className="text-[10px] font-bold bg-amber-500 text-emerald-950 px-2 py-0.5 rounded flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      My Voice
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 text-[11px] font-mono bg-black/60 px-2 py-0.5 rounded text-slate-200">
                  {item.duration}
                </div>

                <button
                  onClick={() => onPlayMedia(item)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 ${
                    isCurrentActive
                      ? 'bg-amber-400 text-emerald-950 font-bold'
                      : 'bg-white/90 text-emerald-900 hover:bg-amber-400 hover:text-emerald-950'
                  }`}
                >
                  {isCurrentActive ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                  )}
                </button>
              </div>

              {/* Media Details */}
              <div className="p-5">
                <h4 className="font-bold text-sm text-slate-800 line-clamp-1 mb-1">
                  {item.title}
                </h4>
                <p className="font-urdu text-xs text-emerald-800 line-clamp-1 mb-3">
                  {item.urduTitle}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                  <span className="font-medium text-slate-600 truncate max-w-[150px]">
                    {item.reciter}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {item.views}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
