import React, { useState } from 'react';
import { BookOpen, Headphones, X, ChevronRight, Mic, Bookmark, Check } from 'lucide-react';
import { ISLAMIC_BOOKS } from '../data/islamicContent';
import { IslamicBook } from '../types';

interface BooksLibraryProps {
  onRecordAudioBook?: (bookTitle: string) => void;
}

export const BooksLibrary: React.FC<BooksLibraryProps> = ({ onRecordAudioBook }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingBook, setReadingBook] = useState<IslamicBook | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const categories = ['All', 'Tasawwuf', 'Quran-o-Tafseer', 'Fiqh', 'Aqaid', 'Hadees'];

  const filteredBooks = ISLAMIC_BOOKS.filter(
    (b) => selectedCategory === 'All' || b.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-2xl p-6 text-white border border-emerald-800 shadow-xl mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Maktaba-tul-Madina Books Shelf</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-cinzel text-white">
            Islamic Books & Audio Books
          </h2>
          <p className="text-emerald-200/90 text-xs md:text-sm mt-1 max-w-2xl">
            Read world-renowned books of Dawat-e-Islami including Faizan-e-Sunnat, Sirat-ul-Jinan, and Namaz Ke Ahkam. You can also listen to audio chapters or record yourself reading them in My Voice Studio.
          </p>
        </div>
      </div>

      {/* Category Pills */}
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
            {cat}
          </button>
        ))}
      </div>

      {/* Books Shelf Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => {
          return (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Book Spine / Cover Mockup */}
                <div className={`h-52 bg-gradient-to-br ${book.coverColor} p-6 text-white flex flex-col justify-between relative overflow-hidden border-b border-amber-600/30`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-black/40 px-2 py-0.5 rounded text-amber-300">
                      {book.category}
                    </span>
                    <span className="text-[11px] text-amber-200 font-mono">
                      {book.pages} Pages
                    </span>
                  </div>

                  <div className="text-center my-auto">
                    <h3 className="font-arabic text-2xl font-bold text-amber-300 mb-1 leading-snug">
                      {book.urduTitle}
                    </h3>
                    <h4 className="font-cinzel text-sm font-semibold tracking-wide text-white">
                      {book.title}
                    </h4>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] text-emerald-200 truncate">
                      {book.author}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <p className="text-xs text-slate-600 line-clamp-3 mb-3">
                    {book.description}
                  </p>
                  <p className="font-urdu text-xs text-emerald-900 text-right line-clamp-2">
                    {book.urduDescription}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 flex gap-2">
                <button
                  onClick={() => {
                    setReadingBook(book);
                    setActiveChapterIndex(0);
                  }}
                  className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Book</span>
                </button>

                {onRecordAudioBook && (
                  <button
                    onClick={() => onRecordAudioBook(book.title)}
                    className="p-2 border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-700 rounded-xl text-xs transition-colors"
                    title="Record audiobook narration in your voice"
                  >
                    <Mic className="w-4 h-4 text-amber-600" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* In-App Interactive Book Reader Modal */}
      {readingBook && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-emerald-950 text-white p-4 flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-white">{readingBook.title}</h3>
                  <p className="font-urdu text-xs text-amber-300">{readingBook.urduTitle} • {readingBook.author}</p>
                </div>
              </div>

              <button
                onClick={() => setReadingBook(null)}
                className="w-8 h-8 rounded-full bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Sidebar Chapters + Reader Content */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
              {/* Chapters List (4 cols) */}
              <div className="md:col-span-4 bg-slate-50 border-r border-slate-200 p-3 overflow-y-auto max-h-[65vh]">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">
                  Chapters / فصول
                </h4>
                <div className="space-y-1">
                  {readingBook.chapters.map((ch, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveChapterIndex(idx)}
                      className={`w-full text-left p-3 rounded-xl text-xs transition-all flex flex-col gap-1 ${
                        activeChapterIndex === idx
                          ? 'bg-emerald-900 text-white font-semibold shadow-xs'
                          : 'hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="font-medium">{idx + 1}. {ch.title}</span>
                      <span className={`font-urdu text-[11px] text-right ${activeChapterIndex === idx ? 'text-amber-300' : 'text-emerald-800'}`}>
                        {ch.urduTitle}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chapter Content (8 cols) */}
              <div className="md:col-span-8 p-6 overflow-y-auto max-h-[65vh] bg-[#fcfbf7]">
                {readingBook.chapters[activeChapterIndex] && (
                  <div className="space-y-4">
                    <div className="border-b border-amber-900/10 pb-4">
                      <span className="text-[11px] uppercase tracking-widest text-amber-700 font-bold">
                        Chapter #{activeChapterIndex + 1}
                      </span>
                      <h2 className="text-xl font-bold text-emerald-950 font-cinzel mt-1">
                        {readingBook.chapters[activeChapterIndex].title}
                      </h2>
                      <h3 className="font-urdu text-base text-emerald-800 font-bold mt-1 text-right">
                        {readingBook.chapters[activeChapterIndex].urduTitle}
                      </h3>
                    </div>

                    <div className="prose text-slate-800 text-sm leading-relaxed space-y-3 font-serif">
                      <p className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/60 text-slate-700">
                        {readingBook.chapters[activeChapterIndex].content}
                      </p>
                      <p className="font-urdu text-base leading-loose text-emerald-950 text-right bg-white p-4 rounded-xl border border-slate-200">
                        {readingBook.urduDescription}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 p-3 px-6 flex items-center justify-between text-xs text-slate-500">
              <span>Maktaba-tul-Madina Digital Edition</span>
              <button
                onClick={() => setReadingBook(null)}
                className="px-4 py-1.5 bg-emerald-900 text-white font-semibold rounded-lg hover:bg-emerald-800 transition-colors"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
