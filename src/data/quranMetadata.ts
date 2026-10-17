import { SurahMeta, SurahData, Ayah } from '../types';

export const ALL_SURAHS: SurahMeta[] = [
  { number: 1, name: 'الفاتحة', englishName: 'Al-Faatiha', englishNameTranslation: 'The Opening', numberOfAyahs: 7, revelationType: 'Meccan', paras: [1] },
  { number: 2, name: 'البقرة', englishName: 'Al-Baqara', englishNameTranslation: 'The Cow', numberOfAyahs: 286, revelationType: 'Medinan', paras: [1, 2, 3] },
  { number: 3, name: 'آل عمران', englishName: 'Aal-i-Imraan', englishNameTranslation: 'The Family of Imraan', numberOfAyahs: 200, revelationType: 'Medinan', paras: [3, 4] },
  { number: 4, name: 'النساء', englishName: 'An-Nisaa', englishNameTranslation: 'The Women', numberOfAyahs: 176, revelationType: 'Medinan', paras: [4, 5, 6] },
  { number: 5, name: 'المائدة', englishName: 'Al-Maaida', englishNameTranslation: 'The Table Spread', numberOfAyahs: 120, revelationType: 'Medinan', paras: [6, 7] },
  { number: 6, name: 'الأنعام', englishName: 'Al-An\'aam', englishNameTranslation: 'The Cattle', numberOfAyahs: 165, revelationType: 'Meccan', paras: [7, 8] },
  { number: 7, name: 'الأعراف', englishName: 'Al-A\'raaf', englishNameTranslation: 'The Heights', numberOfAyahs: 206, revelationType: 'Meccan', paras: [8, 9] },
  { number: 8, name: 'الأنفال', englishName: 'Al-Anfaal', englishNameTranslation: 'The Spoils of War', numberOfAyahs: 75, revelationType: 'Medinan', paras: [9, 10] },
  { number: 9, name: 'التوبة', englishName: 'At-Tawba', englishNameTranslation: 'The Repentance', numberOfAyahs: 129, revelationType: 'Medinan', paras: [10, 11] },
  { number: 10, name: 'يونس', englishName: 'Yunus', englishNameTranslation: 'Jonas', numberOfAyahs: 109, revelationType: 'Meccan', paras: [11] },
  { number: 11, name: 'هود', englishName: 'Hud', englishNameTranslation: 'Hud', numberOfAyahs: 123, revelationType: 'Meccan', paras: [11, 12] },
  { number: 12, name: 'يوسف', englishName: 'Yusuf', englishNameTranslation: 'Joseph', numberOfAyahs: 111, revelationType: 'Meccan', paras: [12, 13] },
  { number: 13, name: 'الرعد', englishName: 'Ar-Ra\'d', englishNameTranslation: 'The Thunder', numberOfAyahs: 43, revelationType: 'Medinan', paras: [13] },
  { number: 14, name: 'ابراهيم', englishName: 'Ibrahim', englishNameTranslation: 'Abraham', numberOfAyahs: 52, revelationType: 'Meccan', paras: [13] },
  { number: 15, name: 'الحجر', englishName: 'Al-Hijr', englishNameTranslation: 'The Rock', numberOfAyahs: 99, revelationType: 'Meccan', paras: [14] },
  { number: 16, name: 'النحل', englishName: 'An-Nahl', englishNameTranslation: 'The Bee', numberOfAyahs: 128, revelationType: 'Meccan', paras: [14] },
  { number: 17, name: 'الإسراء', englishName: 'Al-Israa', englishNameTranslation: 'The Night Journey', numberOfAyahs: 111, revelationType: 'Meccan', paras: [15] },
  { number: 18, name: 'الكهف', englishName: 'Al-Kahf', englishNameTranslation: 'The Cave', numberOfAyahs: 110, revelationType: 'Meccan', paras: [15, 16] },
  { number: 19, name: 'مريم', englishName: 'Maryam', englishNameTranslation: 'Mary', numberOfAyahs: 98, revelationType: 'Meccan', paras: [16] },
  { number: 20, name: 'طه', englishName: 'Taa-Haa', englishNameTranslation: 'Taa-Haa', numberOfAyahs: 135, revelationType: 'Meccan', paras: [16] },
  { number: 21, name: 'الأنبياء', englishName: 'Al-Anbiyaa', englishNameTranslation: 'The Prophets', numberOfAyahs: 112, revelationType: 'Meccan', paras: [17] },
  { number: 22, name: 'الحج', englishName: 'Al-Hajj', englishNameTranslation: 'The Pilgrimage', numberOfAyahs: 78, revelationType: 'Medinan', paras: [17] },
  { number: 23, name: 'المؤمنون', englishName: 'Al-Muminoon', englishNameTranslation: 'The Believers', numberOfAyahs: 118, revelationType: 'Meccan', paras: [18] },
  { number: 24, name: 'النور', englishName: 'An-Noor', englishNameTranslation: 'The Light', numberOfAyahs: 64, revelationType: 'Medinan', paras: [18] },
  { number: 25, name: 'الفرقان', englishName: 'Al-Furqaan', englishNameTranslation: 'The Criterion', numberOfAyahs: 77, revelationType: 'Meccan', paras: [18, 19] },
  { number: 26, name: 'الشعراء', englishName: 'Ash-Shu\'araa', englishNameTranslation: 'The Poets', numberOfAyahs: 227, revelationType: 'Meccan', paras: [19] },
  { number: 27, name: 'النمل', englishName: 'An-Naml', englishNameTranslation: 'The Ant', numberOfAyahs: 93, revelationType: 'Meccan', paras: [19, 20] },
  { number: 28, name: 'القصص', englishName: 'Al-Qasas', englishNameTranslation: 'The Stories', numberOfAyahs: 88, revelationType: 'Meccan', paras: [20] },
  { number: 29, name: 'العنكبوت', englishName: 'Al-Ankaboot', englishNameTranslation: 'The Spider', numberOfAyahs: 69, revelationType: 'Meccan', paras: [20, 21] },
  { number: 30, name: 'الروم', englishName: 'Ar-Room', englishNameTranslation: 'The Romans', numberOfAyahs: 60, revelationType: 'Meccan', paras: [21] },
  { number: 31, name: 'لقمان', englishName: 'Luqman', englishNameTranslation: 'Luqman', numberOfAyahs: 34, revelationType: 'Meccan', paras: [21] },
  { number: 32, name: 'السجدة', englishName: 'As-Sajda', englishNameTranslation: 'The Prostration', numberOfAyahs: 30, revelationType: 'Meccan', paras: [21] },
  { number: 33, name: 'الأحزاب', englishName: 'Al-Ahzaab', englishNameTranslation: 'The Clans', numberOfAyahs: 73, revelationType: 'Medinan', paras: [21, 22] },
  { number: 34, name: 'سبإ', englishName: 'Saba', englishNameTranslation: 'Sheba', numberOfAyahs: 54, revelationType: 'Meccan', paras: [22] },
  { number: 35, name: 'فاطر', englishName: 'Faatir', englishNameTranslation: 'The Originator', numberOfAyahs: 45, revelationType: 'Meccan', paras: [22] },
  { number: 36, name: 'يس', englishName: 'Yaseen', englishNameTranslation: 'Yaseen', numberOfAyahs: 83, revelationType: 'Meccan', paras: [22, 23] },
  { number: 37, name: 'الصافات', englishName: 'As-Saaffaat', englishNameTranslation: 'Those drawn up in Ranks', numberOfAyahs: 182, revelationType: 'Meccan', paras: [23] },
  { number: 38, name: 'ص', englishName: 'Saad', englishNameTranslation: 'The letter Saad', numberOfAyahs: 88, revelationType: 'Meccan', paras: [23] },
  { number: 39, name: 'الزمر', englishName: 'Az-Zumar', englishNameTranslation: 'The Groups', numberOfAyahs: 75, revelationType: 'Meccan', paras: [23, 24] },
  { number: 40, name: 'غافر', englishName: 'Ghafir', englishNameTranslation: 'The Forgiver God', numberOfAyahs: 85, revelationType: 'Meccan', paras: [24] },
  { number: 41, name: 'فصلت', englishName: 'Fussilat', englishNameTranslation: 'Explained in detail', numberOfAyahs: 54, revelationType: 'Meccan', paras: [24, 25] },
  { number: 42, name: 'الشورى', englishName: 'Ash-Shura', englishNameTranslation: 'Consultation', numberOfAyahs: 53, revelationType: 'Meccan', paras: [25] },
  { number: 43, name: 'الزخرف', englishName: 'Az-Zukhruf', englishNameTranslation: 'Ornaments of gold', numberOfAyahs: 89, revelationType: 'Meccan', paras: [25] },
  { number: 44, name: 'الدخان', englishName: 'Ad-Dukhan', englishNameTranslation: 'The Smoke', numberOfAyahs: 59, revelationType: 'Meccan', paras: [25] },
  { number: 45, name: 'الجاثية', englishName: 'Al-Jaathiya', englishNameTranslation: 'Crouching', numberOfAyahs: 37, revelationType: 'Meccan', paras: [25, 26] },
  { number: 46, name: 'الأحقاف', englishName: 'Al-Ahqaf', englishNameTranslation: 'The Dunes', numberOfAyahs: 35, revelationType: 'Meccan', paras: [26] },
  { number: 47, name: 'محمد', englishName: 'Muhammad', englishNameTranslation: 'Muhammad', numberOfAyahs: 38, revelationType: 'Medinan', paras: [26] },
  { number: 48, name: 'الفتح', englishName: 'Al-Fath', englishNameTranslation: 'The Victory', numberOfAyahs: 29, revelationType: 'Medinan', paras: [26] },
  { number: 49, name: 'الحجرات', englishName: 'Al-Hujuraat', englishNameTranslation: 'The Inner Apartments', numberOfAyahs: 18, revelationType: 'Medinan', paras: [26] },
  { number: 50, name: 'ق', englishName: 'Qaaf', englishNameTranslation: 'The letter Qaaf', numberOfAyahs: 45, revelationType: 'Meccan', paras: [26] },
  { number: 51, name: 'الذاريات', englishName: 'Adh-Dhaariyat', englishNameTranslation: 'The Winnowing Winds', numberOfAyahs: 60, revelationType: 'Meccan', paras: [26, 27] },
  { number: 52, name: 'الطور', englishName: 'At-Toor', englishNameTranslation: 'The Mount', numberOfAyahs: 49, revelationType: 'Meccan', paras: [27] },
  { number: 53, name: 'النجم', englishName: 'An-Najm', englishNameTranslation: 'The Star', numberOfAyahs: 62, revelationType: 'Meccan', paras: [27] },
  { number: 54, name: 'القمر', englishName: 'Al-Qamar', englishNameTranslation: 'The Moon', numberOfAyahs: 55, revelationType: 'Meccan', paras: [27] },
  { number: 55, name: 'الرحمن', englishName: 'Ar-Rahmaan', englishNameTranslation: 'The Beneficent', numberOfAyahs: 78, revelationType: 'Medinan', paras: [27] },
  { number: 56, name: 'الواقعة', englishName: 'Al-Waaqia', englishNameTranslation: 'The Inevitable', numberOfAyahs: 96, revelationType: 'Meccan', paras: [27] },
  { number: 57, name: 'الحديد', englishName: 'Al-Hadid', englishNameTranslation: 'The Iron', numberOfAyahs: 29, revelationType: 'Medinan', paras: [27] },
  { number: 58, name: 'المجادلة', englishName: 'Al-Mujaadila', englishNameTranslation: 'The Pleading Woman', numberOfAyahs: 22, revelationType: 'Medinan', paras: [28] },
  { number: 59, name: 'الحشر', englishName: 'Al-Hashr', englishNameTranslation: 'The Exile', numberOfAyahs: 24, revelationType: 'Medinan', paras: [28] },
  { number: 60, name: 'الممتحنة', englishName: 'Al-Mumtahana', englishNameTranslation: 'Examining Her', numberOfAyahs: 13, revelationType: 'Medinan', paras: [28] },
  { number: 61, name: 'الصف', englishName: 'As-Saff', englishNameTranslation: 'The Ranks', numberOfAyahs: 14, revelationType: 'Medinan', paras: [28] },
  { number: 62, name: 'الجمعة', englishName: 'Al-Jumu\'a', englishNameTranslation: 'Friday', numberOfAyahs: 11, revelationType: 'Medinan', paras: [28] },
  { number: 63, name: 'المنافقون', englishName: 'Al-Munaafiqoon', englishNameTranslation: 'The Hypocrites', numberOfAyahs: 11, revelationType: 'Medinan', paras: [28] },
  { number: 64, name: 'التغابن', englishName: 'At-Taghaabun', englishNameTranslation: 'Mutual Disillusion', numberOfAyahs: 18, revelationType: 'Medinan', paras: [28] },
  { number: 65, name: 'الطلاق', englishName: 'At-Talaaq', englishNameTranslation: 'Divorce', numberOfAyahs: 12, revelationType: 'Medinan', paras: [28] },
  { number: 66, name: 'التحريم', englishName: 'At-Tahrim', englishNameTranslation: 'The Prohibition', numberOfAyahs: 12, revelationType: 'Medinan', paras: [28] },
  { number: 67, name: 'الملك', englishName: 'Al-Mulk', englishNameTranslation: 'The Sovereignty', numberOfAyahs: 30, revelationType: 'Meccan', paras: [29] },
  { number: 68, name: 'القلم', englishName: 'Al-Qalam', englishNameTranslation: 'The Pen', numberOfAyahs: 52, revelationType: 'Meccan', paras: [29] },
  { number: 69, name: 'الحاقة', englishName: 'Al-Haaqqa', englishNameTranslation: 'The Reality', numberOfAyahs: 52, revelationType: 'Meccan', paras: [29] },
  { number: 70, name: 'المعارج', englishName: 'Al-Ma\'aarij', englishNameTranslation: 'The Ascending Stairways', numberOfAyahs: 44, revelationType: 'Meccan', paras: [29] },
  { number: 71, name: 'نوح', englishName: 'Nooh', englishNameTranslation: 'Noah', numberOfAyahs: 28, revelationType: 'Meccan', paras: [29] },
  { number: 72, name: 'الجن', englishName: 'Al-Jinn', englishNameTranslation: 'The Jinn', numberOfAyahs: 28, revelationType: 'Meccan', paras: [29] },
  { number: 73, name: 'المزمل', englishName: 'Al-Muzzammil', englishNameTranslation: 'The Enshrouded One', numberOfAyahs: 20, revelationType: 'Meccan', paras: [29] },
  { number: 74, name: 'المدثر', englishName: 'Al-Muddaththir', englishNameTranslation: 'The Cloaked One', numberOfAyahs: 56, revelationType: 'Meccan', paras: [29] },
  { number: 75, name: 'القيامة', englishName: 'Al-Qiyaama', englishNameTranslation: 'The Resurrection', numberOfAyahs: 40, revelationType: 'Meccan', paras: [29] },
  { number: 76, name: 'الإنسان', englishName: 'Al-Insaan', englishNameTranslation: 'Man', numberOfAyahs: 31, revelationType: 'Medinan', paras: [29] },
  { number: 77, name: 'المرسلات', englishName: 'Al-Mursalaat', englishNameTranslation: 'The Emissaries', numberOfAyahs: 50, revelationType: 'Meccan', paras: [29] },
  { number: 78, name: 'النبإ', englishName: 'An-Naba', englishNameTranslation: 'The Announcement', numberOfAyahs: 40, revelationType: 'Meccan', paras: [30] },
  { number: 79, name: 'النازعات', englishName: 'An-Naazi\'aat', englishNameTranslation: 'Those who drag forth', numberOfAyahs: 46, revelationType: 'Meccan', paras: [30] },
  { number: 80, name: 'عبس', englishName: 'Abasa', englishNameTranslation: 'He frowned', numberOfAyahs: 42, revelationType: 'Meccan', paras: [30] },
  { number: 81, name: 'التكوير', englishName: 'At-Takweer', englishNameTranslation: 'The Overthrowing', numberOfAyahs: 29, revelationType: 'Meccan', paras: [30] },
  { number: 82, name: 'الانفطار', englishName: 'Al-Infitaar', englishNameTranslation: 'The Cleaving', numberOfAyahs: 19, revelationType: 'Meccan', paras: [30] },
  { number: 83, name: 'المطففين', englishName: 'Al-Mutaffifin', englishNameTranslation: 'Defrauding', numberOfAyahs: 36, revelationType: 'Meccan', paras: [30] },
  { number: 84, name: 'الانشقاق', englishName: 'Al-Inshiqaaq', englishNameTranslation: 'The Splitting Open', numberOfAyahs: 25, revelationType: 'Meccan', paras: [30] },
  { number: 85, name: 'البروج', englishName: 'Al-Burooj', englishNameTranslation: 'The Mansions of the Stars', numberOfAyahs: 22, revelationType: 'Meccan', paras: [30] },
  { number: 86, name: 'الطارق', englishName: 'At-Taariq', englishNameTranslation: 'The Morning Star', numberOfAyahs: 17, revelationType: 'Meccan', paras: [30] },
  { number: 87, name: 'الأعلى', englishName: 'Al-A\'laa', englishNameTranslation: 'The Most High', numberOfAyahs: 19, revelationType: 'Meccan', paras: [30] },
  { number: 88, name: 'الغاشية', englishName: 'Al-Ghaashiya', englishNameTranslation: 'The Overwhelming', numberOfAyahs: 26, revelationType: 'Meccan', paras: [30] },
  { number: 89, name: 'الفجر', englishName: 'Al-Fajr', englishNameTranslation: 'The Dawn', numberOfAyahs: 30, revelationType: 'Meccan', paras: [30] },
  { number: 90, name: 'البلد', englishName: 'Al-Balad', englishNameTranslation: 'The City', numberOfAyahs: 20, revelationType: 'Meccan', paras: [30] },
  { number: 91, name: 'الشمس', englishName: 'Ash-Shams', englishNameTranslation: 'The Sun', numberOfAyahs: 15, revelationType: 'Meccan', paras: [30] },
  { number: 92, name: 'الليل', englishName: 'Al-Layl', englishNameTranslation: 'The Night', numberOfAyahs: 21, revelationType: 'Meccan', paras: [30] },
  { number: 93, name: 'الضحى', englishName: 'Ad-Dhuhaa', englishNameTranslation: 'The Morning Hours', numberOfAyahs: 11, revelationType: 'Meccan', paras: [30] },
  { number: 94, name: 'الشرح', englishName: 'Ash-Sharh', englishNameTranslation: 'The Consolation', numberOfAyahs: 8, revelationType: 'Meccan', paras: [30] },
  { number: 95, name: 'التين', englishName: 'At-Tin', englishNameTranslation: 'The Fig', numberOfAyahs: 8, revelationType: 'Meccan', paras: [30] },
  { number: 96, name: 'العلق', englishName: 'Al-Alaq', englishNameTranslation: 'The Clot', numberOfAyahs: 19, revelationType: 'Meccan', paras: [30] },
  { number: 97, name: 'القدر', englishName: 'Al-Qadr', englishNameTranslation: 'The Power, Fate', numberOfAyahs: 5, revelationType: 'Meccan', paras: [30] },
  { number: 98, name: 'البينة', englishName: 'Al-Bayyina', englishNameTranslation: 'The Clear Proof', numberOfAyahs: 8, revelationType: 'Medinan', paras: [30] },
  { number: 99, name: 'الزلزلة', englishName: 'Az-Zalzala', englishNameTranslation: 'The Earthquake', numberOfAyahs: 8, revelationType: 'Medinan', paras: [30] },
  { number: 100, name: 'العاديات', englishName: 'Al-Aadiyat', englishNameTranslation: 'The Courser', numberOfAyahs: 11, revelationType: 'Meccan', paras: [30] },
  { number: 101, name: 'القارعة', englishName: 'Al-Qaari\'a', englishNameTranslation: 'The Calamity', numberOfAyahs: 11, revelationType: 'Meccan', paras: [30] },
  { number: 102, name: 'التكاثر', englishName: 'At-Takaathur', englishNameTranslation: 'The Rivalry in World Increase', numberOfAyahs: 8, revelationType: 'Meccan', paras: [30] },
  { number: 103, name: 'العصر', englishName: 'Al-Asr', englishNameTranslation: 'The Declining Day', numberOfAyahs: 3, revelationType: 'Meccan', paras: [30] },
  { number: 104, name: 'الهمزة', englishName: 'Al-Humaza', englishNameTranslation: 'The Traducer', numberOfAyahs: 9, revelationType: 'Meccan', paras: [30] },
  { number: 105, name: 'الفيل', englishName: 'Al-Fil', englishNameTranslation: 'The Elephant', numberOfAyahs: 5, revelationType: 'Meccan', paras: [30] },
  { number: 106, name: 'قريش', englishName: 'Quraysh', englishNameTranslation: 'Quraysh', numberOfAyahs: 4, revelationType: 'Meccan', paras: [30] },
  { number: 107, name: 'الماعون', englishName: 'Al-Maa\'un', englishNameTranslation: 'The Small Kindness', numberOfAyahs: 7, revelationType: 'Meccan', paras: [30] },
  { number: 108, name: 'الكوثر', englishName: 'Al-Kawthar', englishNameTranslation: 'The Abundance', numberOfAyahs: 3, revelationType: 'Meccan', paras: [30] },
  { number: 109, name: 'الكافرون', englishName: 'Al-Kaafiroon', englishNameTranslation: 'The Disbelievers', numberOfAyahs: 6, revelationType: 'Meccan', paras: [30] },
  { number: 110, name: 'النصر', englishName: 'An-Nasr', englishNameTranslation: 'The Help', numberOfAyahs: 3, revelationType: 'Medinan', paras: [30] },
  { number: 111, name: 'المسد', englishName: 'Al-Masad', englishNameTranslation: 'The Palm Fiber', numberOfAyahs: 5, revelationType: 'Meccan', paras: [30] },
  { number: 112, name: 'الإخلاص', englishName: 'Al-Ikhlaas', englishNameTranslation: 'The Sincerity', numberOfAyahs: 4, revelationType: 'Meccan', paras: [30] },
  { number: 113, name: 'الفلق', englishName: 'Al-Falaq', englishNameTranslation: 'The Daybreak', numberOfAyahs: 5, revelationType: 'Meccan', paras: [30] },
  { number: 114, name: 'الناس', englishName: 'An-Naas', englishNameTranslation: 'Mankind', numberOfAyahs: 6, revelationType: 'Meccan', paras: [30] }
];

export const ALL_PARAS = [
  { number: 1, name: 'الم', englishName: 'Alif Laam Meem', startSurah: 'Al-Fatiha', startAyah: 1 },
  { number: 2, name: 'سَيَقُولُ', englishName: 'Sayaqool', startSurah: 'Al-Baqarah', startAyah: 142 },
  { number: 3, name: 'تِلْكَ الرُّسُلُ', englishName: 'Tilka\'r Rusul', startSurah: 'Al-Baqarah', startAyah: 253 },
  { number: 4, name: 'لَنْ تَنَالُوا', englishName: 'Lan Tanaaloo', startSurah: 'Aal-e-Imran', startAyah: 93 },
  { number: 5, name: 'وَالْمُحْصَنَاتُ', englishName: 'Wal Muhsanat', startSurah: 'An-Nisa', startAyah: 24 },
  { number: 6, name: 'لَا يُحِبُّ اللَّهُ', englishName: 'La Yuhibbullah', startSurah: 'An-Nisa', startAyah: 148 },
  { number: 7, name: 'وَإِذَا سَمِعُوا', englishName: 'Wa Iza Samiu', startSurah: 'Al-Maidah', startAyah: 82 },
  { number: 8, name: 'وَلَوْ أَنَّنَا', englishName: 'Wa Lau Annana', startSurah: 'Al-An\'am', startAyah: 111 },
  { number: 9, name: 'قَالَ الْمَلَأُ', englishName: 'Qalal Malao', startSurah: 'Al-A\'raf', startAyah: 88 },
  { number: 10, name: 'وَاعْلَمُوا', englishName: 'Wa\'lamoo', startSurah: 'Al-Anfal', startAyah: 41 },
  { number: 11, name: 'يَعْتَذِرُونَ', englishName: 'Ya\'taziroon', startSurah: 'At-Tawbah', startAyah: 93 },
  { number: 12, name: 'وَمَا مِنْ دَابَّةٍ', englishName: 'Wa Ma Min Da\'abbah', startSurah: 'Hud', startAyah: 6 },
  { number: 13, name: 'وَمَا أُبَرِّئُ', englishName: 'Wa Ma Ubarri\'u', startSurah: 'Yusuf', startAyah: 53 },
  { number: 14, name: 'رُبَمَا', englishName: 'Rubama', startSurah: 'Al-Hijr', startAyah: 1 },
  { number: 15, name: 'سُبْحَانَ الَّذِي', englishName: 'Subhanallazi', startSurah: 'Al-Isra', startAyah: 1 },
  { number: 16, name: 'قَالَ أَلَمْ', englishName: 'Qal Alam', startSurah: 'Al-Kahf', startAyah: 75 },
  { number: 17, name: 'اقْتَرَبَ لِلنَّاسِ', englishName: 'Iqtaraba Linnaas', startSurah: 'Al-Anbiya', startAyah: 1 },
  { number: 18, name: 'قَدْ أَفْلَحَ', englishName: 'Qadd Aflaha', startSurah: 'Al-Mu\'minoon', startAyah: 1 },
  { number: 19, name: 'وَقَالَ الَّذِينَ', englishName: 'Wa Qalallazina', startSurah: 'Al-Furqan', startAyah: 21 },
  { number: 20, name: 'أَمَّنْ خَلَقَ', englishName: 'Amman Khalaqa', startSurah: 'An-Naml', startAyah: 60 },
  { number: 21, name: 'اتْلُ مَا أُوحِيَ', englishName: 'Utlu Ma Oohiya', startSurah: 'Al-Ankaboot', startAyah: 46 },
  { number: 22, name: 'وَمَنْ يَقْنُتْ', englishName: 'Wa Manyaqnut', startSurah: 'Al-Ahzab', startAyah: 31 },
  { number: 23, name: 'وَمَا لِيَ', englishName: 'Wa Maliya', startSurah: 'Yasin', startAyah: 28 },
  { number: 24, name: 'فَمَنْ أَظْلَمُ', englishName: 'Faman Azlamu', startSurah: 'Az-Zumar', startAyah: 32 },
  { number: 25, name: 'إِلَيْهِ يُرَدُّ', englishName: 'Ilaihi Yuraddu', startSurah: 'Fussilat', startAyah: 47 },
  { number: 26, name: 'حم', englishName: 'Haa Meem', startSurah: 'Al-Jathiyah', startAyah: 1 },
  { number: 27, name: 'قَالَ فَمَا خَطْبُكُمْ', englishName: 'Qala Fama Khatbukum', startSurah: 'Adh-Dhariyat', startAyah: 31 },
  { number: 28, name: 'قَدْ سَمِعَ اللَّهُ', englishName: 'Qad Sami Allahu', startSurah: 'Al-Mujadilah', startAyah: 1 },
  { number: 29, name: 'تَبَارَكَ الَّذِي', englishName: 'Tabarakallazi', startSurah: 'Al-Mulk', startAyah: 1 },
  { number: 30, name: 'عَمَّ يَتَسَاءَلُونَ', englishName: 'Amma Yatasa\'aloon', startSurah: 'An-Naba', startAyah: 1 }
];

// High quality offline fallback data for key Surahs
export const PRELOADED_SURAHS: Record<number, SurahData> = {
  1: {
    number: 1,
    name: 'الفَاتِحَة',
    englishName: 'Al-Fatiha',
    englishNameTranslation: 'The Opening',
    revelationType: 'Meccan',
    numberOfAyahs: 7,
    ayahs: [
      {
        number: 1,
        numberInSurah: 1,
        text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        translationUrdu: 'اللہ کے نام سے شروع جو نہایت مہربان رحمت والا (کنز الایمان)',
        translationEnglish: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        tafseer: 'سورہ فاتحہ قرآن مجید کا خلاصہ ہے، اسے ام الکتاب اور شفا بھی کہا جاتا ہے۔',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3'
      },
      {
        number: 2,
        numberInSurah: 2,
        text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        translationUrdu: 'سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔',
        translationEnglish: '[All] praise is [due] to Allah, Lord of the worlds -',
        tafseer: 'تمام نعمتوں پر شکر اور حمد کا اصل مستحق صرف رب کائنات ہے۔',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3'
      },
      {
        number: 3,
        numberInSurah: 3,
        text: 'الرَّحْمَٰنِ الرَّحِيمِ',
        translationUrdu: 'بہت مہربان، نہایت رحم فرمانے والا۔',
        translationEnglish: 'The Entirely Merciful, the Especially Merciful,',
        tafseer: 'رحمان دنیا میں سب کے لیے، رحیم آخرت میں خاص مومنین کے لیے رحمت فرمانے والا۔',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3'
      },
      {
        number: 4,
        numberInSurah: 4,
        text: 'مَالِكِ يَوْمِ الدِّينِ',
        translationUrdu: 'روزِ جزا کا مالک۔',
        translationEnglish: 'Sovereign of the Day of Recompense.',
        tafseer: 'قیامت کے دن جب کوئی دوسرا حاکم نہ ہوگا، سب اختیارات اللہ تعالیٰ کے ظاہر ہوں گے۔',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3'
      },
      {
        number: 5,
        numberInSurah: 5,
        text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        translationUrdu: 'ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد چاہتے ہیں۔',
        translationEnglish: 'It is You we worship and You we ask for help.',
        tafseer: 'عبادت کا حقدار صرف اللہ ہے، اور حقیقی مدد اسی کے اذن سے حاصل ہوتی ہے۔',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3'
      },
      {
        number: 6,
        numberInSurah: 6,
        text: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        translationUrdu: 'ہم کو سیدھے راستے پر چلا۔',
        translationEnglish: 'Guide us to the straight path -',
        tafseer: 'صراط مستقیم اسلام، قرآن، اور نبی کریم ﷺ اور ان کے صحابہ و اولیا کا طریقہ ہے۔',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3'
      },
      {
        number: 7,
        numberInSurah: 7,
        text: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        translationUrdu: 'ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ ان کا جن پر غضب ہوا اور نہ بہکے ہوؤں کا۔',
        translationEnglish: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
        tafseer: 'انعام یافتہ بندے انبیاء، صدیقین، شہداء اور صالحین ہیں۔ آمین۔',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3'
      }
    ]
  },
  112: {
    number: 112,
    name: 'الإِخْلَاص',
    englishName: 'Al-Ikhlaas',
    englishNameTranslation: 'The Sincerity',
    revelationType: 'Meccan',
    numberOfAyahs: 4,
    ayahs: [
      {
        number: 6222,
        numberInSurah: 1,
        text: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        translationUrdu: 'تم فرماؤ وہ اللہ ہے جو ایک ہے۔',
        translationEnglish: 'Say, "He is Allah, [who is] One,',
        tafseer: 'توحید کا کامل ترین بیان کہ اللہ اپنی ذات و صفات میں یکتا ہے۔',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3'
      },
      {
        number: 6223,
        numberInSurah: 2,
        text: 'اللَّهُ الصَّمَدُ',
        translationUrdu: 'اللہ بے نیاز ہے۔',
        translationEnglish: 'Allah, the Eternal Refuge.',
        tafseer: 'صمد وہ ذات ہے جو سب سے بے پرواہ ہو اور سب اس کے محتاج ہوں۔',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6223.mp3'
      },
      {
        number: 6224,
        numberInSurah: 3,
        text: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        translationUrdu: 'نہ اس کی کوئی اولاد ہے اور نہ وہ کسی سے پیدا ہوا۔',
        translationEnglish: 'He neither begets nor is born,',
        tafseer: 'ہر قسم کے نسب، والد یا اولاد سے اللہ تعالیٰ پاک ہے۔',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6224.mp3'
      },
      {
        number: 6225,
        numberInSurah: 4,
        text: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
        translationUrdu: 'اور نہ کوئی اس کے جوڑ کا ہے۔',
        translationEnglish: 'Nor is there to Him any equivalent."',
        tafseer: 'کوئی شئے اس کی ہم مثل یا ہم پلہ نہیں ہے۔',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6225.mp3'
      }
    ]
  },
  113: {
    number: 113,
    name: 'الفَلَق',
    englishName: 'Al-Falaq',
    englishNameTranslation: 'The Daybreak',
    revelationType: 'Meccan',
    numberOfAyahs: 5,
    ayahs: [
      { number: 6226, numberInSurah: 1, text: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', translationUrdu: 'تم فرماؤ میں اس کی پناہ لیتا ہوں جو صبح کا پیدا کرنے والا ہے۔', translationEnglish: 'Say, "I seek refuge in the Lord of daybreak', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3' },
      { number: 6227, numberInSurah: 2, text: 'مِنْ شَرِّ مَا خَلَقَ', translationUrdu: 'اس کی تمام مخلوق کی برائی سے۔', translationEnglish: 'From the evil of that which He created', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6227.mp3' },
      { number: 6228, numberInSurah: 3, text: 'وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ', translationUrdu: 'اور اندھیری رات کے شر سے جب وہ چھا جائے۔', translationEnglish: 'And from the evil of darkness when it settles', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6228.mp3' },
      { number: 6229, numberInSurah: 4, text: 'وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', translationUrdu: 'اور گرہوں میں پھونکنے والیوں کی برائی سے۔', translationEnglish: 'And from the evil of the blowers in knots', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6229.mp3' },
      { number: 6230, numberInSurah: 5, text: 'وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ', translationUrdu: 'اور حسد کرنے والے کی برائی سے جب وہ حسد کرے۔', translationEnglish: 'And from the evil of an envier when he envies."', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6230.mp3' }
    ]
  },
  114: {
    number: 114,
    name: 'النَّاس',
    englishName: 'An-Naas',
    englishNameTranslation: 'Mankind',
    revelationType: 'Meccan',
    numberOfAyahs: 6,
    ayahs: [
      { number: 6231, numberInSurah: 1, text: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', translationUrdu: 'تم فرماؤ میں تمام انسانوں کے رب کی پناہ میں آتا ہوں۔', translationEnglish: 'Say, "I seek refuge in the Lord of mankind,', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3' },
      { number: 6232, numberInSurah: 2, text: 'مَلِكِ النَّاسِ', translationUrdu: 'تمام انسانوں کے بادشاہ کی۔', translationEnglish: 'The Sovereign of mankind,', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6232.mp3' },
      { number: 6233, numberInSurah: 3, text: 'إِلَٰهِ النَّاسِ', translationUrdu: 'تمام انسانوں کے معبود کی۔', translationEnglish: 'The God of mankind,', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6233.mp3' },
      { number: 6234, numberInSurah: 4, text: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', translationUrdu: 'بار بار وسوسہ ڈال کر پیچھے ہٹ جانے والے شیطان کی برائی سے۔', translationEnglish: 'From the evil of the retreating whisperer -', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6234.mp3' },
      { number: 6235, numberInSurah: 5, text: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', translationUrdu: 'جو لوگوں کے دلوں میں وسوسہ ڈالتا ہے۔', translationEnglish: 'Who whispers [evil] into the breasts of mankind -', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6235.mp3' },
      { number: 6236, numberInSurah: 6, text: 'مِنَ الْجِنَّةِ وَالنَّاسِ', translationUrdu: 'خواہ وہ جنات میں سے ہو یا انسانوں میں سے۔', translationEnglish: 'From among the jinn and mankind."', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6236.mp3' }
    ]
  }
};

// Asynchronously fetch complete Surah with Arabic + Urdu + English from Al-Quran Cloud API
export async function fetchSurahDetails(surahNumber: number): Promise<SurahData> {
  // Check preloaded first
  if (PRELOADED_SURAHS[surahNumber]) {
    return PRELOADED_SURAHS[surahNumber];
  }

  const meta = ALL_SURAHS.find((s) => s.number === surahNumber);
  const fallbackSurahName = meta ? meta.name : `Surah ${surahNumber}`;
  const fallbackEnglish = meta ? meta.englishName : `Surah ${surahNumber}`;
  const count = meta ? meta.numberOfAyahs : 10;

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,ur.kanzuliman,en.sahih`);
    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }
    const json = await res.json();
    if (json.status === 'OK' && Array.isArray(json.data) && json.data.length >= 3) {
      const arabicEdition = json.data[0];
      const urduEdition = json.data[1];
      const englishEdition = json.data[2];

      const ayahs: Ayah[] = arabicEdition.ayahs.map((a: any, idx: number) => ({
        number: a.number,
        numberInSurah: a.numberInSurah,
        text: a.text,
        translationUrdu: urduEdition.ayahs[idx]?.text || '',
        translationEnglish: englishEdition.ayahs[idx]?.text || '',
        audioUrl: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${a.number}.mp3`
      }));

      return {
        number: arabicEdition.number,
        name: arabicEdition.name,
        englishName: arabicEdition.englishName,
        englishNameTranslation: arabicEdition.englishNameTranslation,
        revelationType: arabicEdition.revelationType,
        numberOfAyahs: arabicEdition.numberOfAyahs,
        ayahs
      };
    }
  } catch (err) {
    console.warn(`Could not fetch Surah ${surahNumber} online, using structured local preview:`, err);
  }

  // Graceful offline fallback
  const fallbackAyahs: Ayah[] = Array.from({ length: Math.min(count, 15) }, (_, i) => ({
    number: i + 1,
    numberInSurah: i + 1,
    text: i === 0 ? 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' : `آية كريمة من سورة ${fallbackSurahName} رقم (${i + 1})`,
    translationUrdu: `سورہ ${fallbackEnglish} کی آیت نمبر ${i + 1} کا اردو ترجمہ (کنز الایمان)`,
    translationEnglish: `Translation of Verse ${i + 1} from ${fallbackEnglish} (Sahih International).`,
    audioUrl: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${i + 1}.mp3`
  }));

  return {
    number: surahNumber,
    name: fallbackSurahName,
    englishName: fallbackEnglish,
    englishNameTranslation: meta ? meta.englishNameTranslation : 'Noble Surah',
    revelationType: meta ? meta.revelationType : 'Meccan',
    numberOfAyahs: count,
    ayahs: fallbackAyahs
  };
}
