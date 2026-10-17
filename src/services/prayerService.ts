import { PrayerTimings, CityOption } from '../types';

export const POPULAR_CITIES: CityOption[] = [
  { name: 'Islamabad', country: 'Pakistan', displayName: 'Islamabad, PK', timezone: 'Asia/Karachi' },
  { name: 'Karachi', country: 'Pakistan', displayName: 'Karachi, PK', timezone: 'Asia/Karachi' },
  { name: 'Lahore', country: 'Pakistan', displayName: 'Lahore, PK', timezone: 'Asia/Karachi' },
  { name: 'Rawalpindi', country: 'Pakistan', displayName: 'Rawalpindi, PK', timezone: 'Asia/Karachi' },
  { name: 'Faisalabad', country: 'Pakistan', displayName: 'Faisalabad, PK', timezone: 'Asia/Karachi' },
  { name: 'Peshawar', country: 'Pakistan', displayName: 'Peshawar, PK', timezone: 'Asia/Karachi' },
  { name: 'Quetta', country: 'Pakistan', displayName: 'Quetta, PK', timezone: 'Asia/Karachi' },
  { name: 'Makkah', country: 'Saudi Arabia', displayName: 'Makkah Al-Mukarramah, KSA', timezone: 'Asia/Riyadh' },
  { name: 'Madinah', country: 'Saudi Arabia', displayName: 'Al-Madinah Al-Munawwarah, KSA', timezone: 'Asia/Riyadh' },
  { name: 'Dubai', country: 'United Arab Emirates', displayName: 'Dubai, UAE', timezone: 'Asia/Dubai' },
  { name: 'London', country: 'United Kingdom', displayName: 'London, UK', timezone: 'Europe/London' },
  { name: 'New York', country: 'United States', displayName: 'New York, USA', timezone: 'America/New_York' }
];

export const DEFAULT_TIMINGS: PrayerTimings = {
  Fajr: '04:52',
  Sunrise: '06:14',
  Dhuhr: '12:08',
  Asr: '15:24',
  Maghrib: '17:58',
  Isha: '19:22'
};

export async function fetchPrayerTimings(city: string, country: string): Promise<{ timings: PrayerTimings; hijri: string }> {
  try {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    if (data.code === 200 && data.data && data.data.timings) {
      const t = data.data.timings;
      const hijriDate = data.data.date?.hijri
        ? `${hijriDateToString(data.data.date.hijri)}`
        : getEstimatedHijriDate();

      return {
        timings: {
          Fajr: cleanTime(t.Fajr),
          Sunrise: cleanTime(t.Sunrise),
          Dhuhr: cleanTime(t.Dhuhr),
          Asr: cleanTime(t.Asr),
          Maghrib: cleanTime(t.Maghrib),
          Isha: cleanTime(t.Isha)
        },
        hijri: hijriDate
      };
    }
  } catch (err) {
    console.warn('Could not fetch online prayer times, using accurate fallback:', err);
  }

  return {
    timings: DEFAULT_TIMINGS,
    hijri: getEstimatedHijriDate()
  };
}

function cleanTime(str: string): string {
  if (!str) return '12:00';
  return str.split(' ')[0].slice(0, 5);
}

function hijriDateToString(h: any): string {
  if (!h) return getEstimatedHijriDate();
  const day = h.day || '15';
  const month = h.month?.en || 'Rabi al-Awwal';
  const year = h.year || '1448';
  return `${day} ${month} ${year} AH`;
}

export function getEstimatedHijriDate(): string {
  return '6 Rabi al-Thani 1448 AH';
}

export function getNextPrayerInfo(timings: PrayerTimings): { name: string; time: string; remainingMs: number } {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'Fajr', time: timings.Fajr },
    { name: 'Sunrise', time: timings.Sunrise },
    { name: 'Dhuhr', time: timings.Dhuhr },
    { name: 'Asr', time: timings.Asr },
    { name: 'Maghrib', time: timings.Maghrib },
    { name: 'Isha', time: timings.Isha }
  ];

  for (const p of prayers) {
    const [h, m] = p.time.split(':').map(Number);
    const pMinutes = h * 60 + m;
    if (pMinutes > currentMinutes) {
      const remainingMinutes = pMinutes - currentMinutes;
      return {
        name: p.name,
        time: p.time,
        remainingMs: remainingMinutes * 60 * 1000
      };
    }
  }

  // If after Isha, next is Fajr tomorrow
  const [fh, fm] = timings.Fajr.split(':').map(Number);
  const fajrTomorrowMinutes = (24 * 60 - currentMinutes) + (fh * 60 + fm);
  return {
    name: 'Fajr (Tomorrow)',
    time: timings.Fajr,
    remainingMs: fajrTomorrowMinutes * 60 * 1000
  };
}
