export interface SurahMeta {
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  paras: number[]; // Which Juz it belongs to
}

export interface Ayah {
  number: number; // overall number in Quran
  numberInSurah: number;
  text: string; // Arabic text
  translationUrdu?: string;
  translationEnglish?: string;
  tafseer?: string;
  audioUrl?: string;
  juz?: number;
}

export interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

export type VoiceCategory = 
  | 'Tilawat' 
  | 'Tarjuma' 
  | 'Tafseer' 
  | 'Naat' 
  | 'Bayan' 
  | 'Dua';

export interface VoiceTrack {
  id: string;
  title: string;
  reciterName: string;
  category: VoiceCategory;
  surahNumber?: number;
  ayahNumber?: number;
  audioBlob?: Blob;
  audioUrl: string;
  duration: number; // in seconds
  createdAt: number;
  fileSize?: number;
  format?: string;
  isSample?: boolean;
}

export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface CityOption {
  name: string;
  country: string;
  displayName: string;
  timezone: string;
}

export interface IslamicBook {
  id: string;
  title: string;
  urduTitle: string;
  author: string;
  category: 'Aqaid' | 'Quran-o-Tafseer' | 'Hadees' | 'Seerat' | 'Tasawwuf' | 'Fiqh';
  pages: number;
  description: string;
  urduDescription: string;
  coverColor: string;
  chapters: { title: string; urduTitle: string; content: string }[];
  audioBookUrl?: string;
  narrator?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  urduTitle: string;
  reciter: string;
  category: 'Tilawat' | 'Hamd-o-Naat' | 'Bayan' | 'Rohani-Ilaj' | 'Madani-Muzakara';
  duration: string;
  audioUrl: string;
  videoUrl?: string;
  date: string;
  views: string;
  isMyVoice?: boolean;
}

export interface RohaniDua {
  id: string;
  title: string;
  urduTitle: string;
  benefit: string;
  urduBenefit: string;
  arabicText: string;
  transliteration: string;
  urduTranslation: string;
  englishTranslation: string;
  reference: string;
  category: 'Shifa' | 'Rizq' | 'Protection' | 'Morning-Evening' | 'Istikhara';
  customVoiceTrackId?: string;
}
