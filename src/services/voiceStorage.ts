import { VoiceTrack } from '../types';

const DB_NAME = 'IslamicVoiceStudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'voice_tracks';

// Helper to open IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('category', 'category', { unique: false });
        store.createIndex('surahNumber', 'surahNumber', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Generate a gentle synthetic Islamic tone audio Blob for initial sample tracks
function createSyntheticAudioBlob(frequency = 440, durationSeconds = 5): Blob {
  const sampleRate = 22050;
  const numSamples = sampleRate * durationSeconds;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  // RIFF identifier
  function writeString(offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // ByteRate
  view.setUint16(32, 2, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  // Write subtle harmonic tones
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Harmonic bell/flute like decay
    const envelope = Math.max(0, 1 - t / durationSeconds) * (0.8 + 0.2 * Math.sin(t * 3));
    const sample = (
      Math.sin(2 * Math.PI * frequency * t) * 0.6 +
      Math.sin(2 * Math.PI * (frequency * 1.5) * t) * 0.2 +
      Math.sin(2 * Math.PI * (frequency * 2) * t) * 0.1
    ) * envelope * 0.4;
    
    const intSample = Math.floor(Math.max(-1, Math.min(1, sample)) * 32767);
    view.setInt16(44 + i * 2, intSample, true);
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

// Pre-seeded starter recordings
export const INITIAL_SAMPLE_TRACKS: VoiceTrack[] = [
  {
    id: 'sample-track-surah-1',
    title: 'Surah Al-Fatihah (My First Tilawat Recording)',
    reciterName: 'Hashim Zafar (Owner)',
    category: 'Tilawat',
    surahNumber: 1,
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3', // High quality fallback stream
    duration: 38,
    createdAt: Date.now() - 86400000 * 2,
    isSample: true,
  },
  {
    id: 'sample-track-surah-112',
    title: 'Surah Al-Ikhlas (Recorded in Studio)',
    reciterName: 'Hashim Zafar (Owner)',
    category: 'Tilawat',
    surahNumber: 112,
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3',
    duration: 18,
    createdAt: Date.now() - 86400000,
    isSample: true,
  },
  {
    id: 'sample-track-naat-1',
    title: 'Kalam: Faslon Ko Takalluf Hai Hum Se Agar',
    reciterName: 'Hashim Zafar (Owner)',
    category: 'Naat',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/morning_birds.ogg',
    duration: 145,
    createdAt: Date.now() - 43200000,
    isSample: true,
  },
  {
    id: 'sample-track-dua-1',
    title: 'Durood-e-Ibrahimi with Correct Makharij',
    reciterName: 'Hashim Zafar (Owner)',
    category: 'Dua',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    duration: 25,
    createdAt: Date.now() - 10000000,
    isSample: true,
  }
];

export async function getAllVoiceTracks(): Promise<VoiceTrack[]> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    const storedTracks: VoiceTrack[] = await new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });

    // Revoke previous object URLs and create valid URLs for Blobs if present
    const hydratedStored = storedTracks.map((track) => {
      if (track.audioBlob && (!track.audioUrl || track.audioUrl.startsWith('blob:'))) {
        track.audioUrl = URL.createObjectURL(track.audioBlob);
      }
      return track;
    });

    // Merge with starter samples if none exists
    if (hydratedStored.length === 0) {
      // Save samples into DB for persistence
      for (const sample of INITIAL_SAMPLE_TRACKS) {
        await saveVoiceTrack(sample);
      }
      return INITIAL_SAMPLE_TRACKS;
    }

    return hydratedStored;
  } catch (err) {
    console.warn('Falling back to memory/samples for voice tracks:', err);
    return INITIAL_SAMPLE_TRACKS;
  }
}

export async function saveVoiceTrack(track: VoiceTrack): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    // Keep blobData in IndexedDB
    await new Promise<void>((resolve, reject) => {
      const request = store.put(track);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to save track in IndexedDB:', err);
  }
}

export async function deleteVoiceTrack(id: string): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to delete track in IndexedDB:', err);
  }
}

export function getVoiceTrackForSurah(tracks: VoiceTrack[], surahNumber: number): VoiceTrack | undefined {
  return tracks.find((t) => t.category === 'Tilawat' && t.surahNumber === surahNumber);
}
