import { IslamicBook, MediaItem, RohaniDua } from '../types';

export const MADANI_PEARL_OF_THE_DAY = {
  title: 'Madani Pearl (مدنی پھول)',
  urdu: 'فرمانِ مصطفیٰ ﷺ: جس نے مجھ پر ایک بار درودِ پاک پڑھا، اللہ تعالیٰ اس پر دس رحمتیں نازل فرماتا ہے۔ (صحیح مسلم)',
  english: 'The Holy Prophet ﷺ said: "Whoever sends blessings upon me once, Allah sends ten blessings upon him." (Sahih Muslim)',
  reference: 'Sahih Muslim, Hadith 408'
};

export const FIVE_PILLARS = [
  {
    number: '1',
    name: 'Shahadah',
    urdu: 'کلمہ طیبہ',
    arabic: 'لَا إِلٰهَ إِلَّا اللهُ مُحَمَّدٌ رَسُولُ اللهِ',
    desc: 'Declaration of faith in the Oneness of Allah and the Finality of Prophethood.'
  },
  {
    number: '2',
    name: 'Salah (Namaz)',
    urdu: 'نماز پنجگانہ',
    arabic: 'الصَّلَاة',
    desc: 'Performing five daily obligatory prayers on their designated times.'
  },
  {
    number: '3',
    name: 'Zakah',
    urdu: 'زکوٰۃ',
    arabic: 'الزَّكَاة',
    desc: 'Purifying wealth by giving 2.5% annual charity to the poor and needy.'
  },
  {
    number: '4',
    name: 'Sawm (Roza)',
    urdu: 'روزہ رمضان',
    arabic: 'الصَّوْم',
    desc: 'Fasting from dawn till dusk during the blessed month of Ramadan.'
  },
  {
    number: '5',
    name: 'Hajj',
    urdu: 'حج بیت اللہ',
    arabic: 'الحَجّ',
    desc: 'Pilgrimage to the Holy Ka\'abah in Makkah for those who are physically & financially able.'
  }
];

export const ISLAMIC_BOOKS: IslamicBook[] = [
  {
    id: 'book-faizan-sunnat',
    title: 'Faizan-e-Sunnat',
    urduTitle: 'فیضانِ سنت',
    author: 'Ameer-e-Ahl-e-Sunnat Maulana Muhammad Ilyas Attar Qadri',
    category: 'Tasawwuf',
    pages: 1548,
    coverColor: 'from-emerald-800 to-teal-950',
    description: 'A masterwork covering Islamic ethics, Adaab of eating, manners of conversation, blessings of Durood Shareef, and following the blessed Sunnah of the Holy Prophet ﷺ in every sphere of life.',
    urduDescription: 'سنتوں بھری زندگی گزارنے کے لیے ایک جامع کتاب، جس میں آدابِ طعام، درود شریف کے فضائل، اور غیبت کی تباہ کاریاں بیان کی گئی ہیں۔',
    chapters: [
      {
        title: 'Blessings of Bismillah',
        urduTitle: 'بسم اللہ کے فضائل و برکات',
        content: 'Whoever recites Bismillah before starting any permissible task, Allah puts Barakah in it. The Holy Prophet ﷺ said: Any important matter that does not begin with Bismillah remains incomplete.'
      },
      {
        title: 'Manners of Eating (Adaab-e-Taam)',
        urduTitle: 'کھانے کے اسلامی آداب',
        content: 'Wash hands before eating, sit on the Dastarkhwan in a humble manner, eat with the right hand from what is in front of you, and do not waste any morsel of food.'
      },
      {
        title: 'Virtues of Durood Shareef',
        urduTitle: 'درود شریف کی فضیلتیں',
        content: 'Reciting Salawat upon our beloved Master Muhammad ﷺ removes grief, forgives sins, and brings peace in this life and the grave.'
      }
    ]
  },
  {
    id: 'book-sirat-ul-jinan',
    title: 'Sirat-ul-Jinan Fi Tafseer-il-Quran',
    urduTitle: 'صراط الجنان فی تفسیر القرآن',
    author: 'Mufti Muhammad Qasim Attari',
    category: 'Quran-o-Tafseer',
    pages: 2150,
    coverColor: 'from-amber-800 to-amber-950',
    description: 'An eloquent, modern, yet profoundly traditional Quran commentary combining Kanz-ul-Iman translation with life lessons, spiritual insights, and contemporary solutions.',
    urduDescription: 'عصرِ حاضر کے تقاضوں کے مطابق قرآن مجید کی سہل اور جامع تفسیر، جس میں کنز الایمان کا ترجمہ اور عملی زندگی کے رہنماء اصول شامل ہیں۔',
    chapters: [
      {
        title: 'Tafseer Surah Al-Fatihah',
        urduTitle: 'تفسیر سورہ فاتحہ',
        content: 'Surah Al-Fatihah has seven verses and comprises the core essence of all heavenly scriptures: praising Allah, acknowledging servitude, and seeking the Straight Path.'
      },
      {
        title: 'Significance of Tadabbur (Reflection)',
        urduTitle: 'تدبرِ قرآن کی اہمیت',
        content: 'Reciting the Quran with contemplation softens the heart, illuminates the soul, and guides the believer toward righteous actions.'
      }
    ]
  },
  {
    id: 'book-namaz-ahkam',
    title: 'Namaz Ke Ahkam (Laws of Salah)',
    urduTitle: 'نماز کے احکام',
    author: 'Majlis Al-Madina-tul-Ilmiyyah',
    category: 'Fiqh',
    pages: 480,
    coverColor: 'from-cyan-900 to-blue-950',
    description: 'Complete illustrated guide to purification (Wudu, Ghusl, Tayammum), conditions, obligations (Faraidh), Sunnahs, and step-by-step methods of 5 daily prayers.',
    urduDescription: 'وضو، غسل اور پانچوں وقت کی نمازوں کا مکمل، مستند اور تصویری طریقہ کار مع شرائط و فرائض۔',
    chapters: [
      {
        title: 'Method of Wudu with Sunnahs',
        urduTitle: 'وضو کا سنت طریقہ',
        content: 'Face Qiblah on an elevated place, recite Bismillah, wash both hands up to wrists thrice, use Miswak, gargle thrice, inhale water into nostrils thrice, and wash face.'
      },
      {
        title: 'Faraidh (Obligations) of Salah',
        urduTitle: 'نماز کے فرائض',
        content: 'The 6 external conditions (Shurut) and 7 internal obligations (Arkan) that make prayer valid and accepted.'
      }
    ]
  },
  {
    id: 'book-gharelu-ilaj',
    title: 'Gharelu Ilaj (Spiritual Home Remedies)',
    urduTitle: 'گھریلو علاج (روحانی و جسمانی)',
    author: 'Majlis Tibbi & Rohani Ilaj Dawat-e-Islami',
    category: 'Tasawwuf',
    pages: 320,
    coverColor: 'from-green-900 to-emerald-950',
    description: 'Spiritual cures, tested Quranic wazaif, and natural remedies for diseases, mental stress, family harmony, and physical illnesses.',
    urduDescription: 'بیماریوں اور پریشانیوں کے لیے قرآنی وظائف، روحانی تعویذات اور طبِ نبوی کے آزمودہ نسخے۔',
    chapters: [
      {
        title: 'Cure for Anxiety & Restlessness',
        urduTitle: 'بے چینی اور وسوسوں کا روحانی علاج',
        content: 'Recite Ya-Salaamu (یا سلامُ) 111 times with Durood Shareef before and after, blowing on water and drinking it daily.'
      },
      {
        title: 'Relief from Severe Pain',
        urduTitle: 'درد سے نجات کا قرآنی وظیفہ',
        content: 'Place your right hand on the aching spot and recite Surah Al-Fatihah with sincere faith.'
      }
    ]
  }
];

export const ROHANI_DUAS: RohaniDua[] = [
  {
    id: 'dua-shifa-fatiha',
    title: 'Spiritual Cure for Illness (Shifa-e-Amraaz)',
    urduTitle: 'بیماریوں سے شفا کا وظیفہ',
    benefit: 'Recite Surah Al-Fatihah 7 times with Bismillah, blow on water, and give to the sick person for divine cure.',
    urduBenefit: 'سورہ فاتحہ کو باوضو 7 مرتبہ پڑھ کر پانی پر دم کر کے مریض کو پلانے سے اللہ تعالیٰ شفا عطا فرماتا ہے۔',
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝',
    transliteration: 'Bismillahir Rahmanir Raheem. Alhamdu lillahi Rabbil Aalameen. Ar-Rahmanir Raheem. Maliki Yawmid-Deen.',
    urduTranslation: 'اللہ کے نام سے شروع جو نہایت مہربان رحم والا۔ تمام تعریفیں اللہ کے لیے ہیں جو سارے جہانوں کا پالنے والا ہے۔',
    englishTranslation: 'In the name of Allah, Most Gracious, Most Merciful. Praise be to Allah, the Lord of all creation.',
    reference: 'Sunan Abu Dawud / Faizan-e-Sunnat',
    category: 'Shifa'
  },
  {
    id: 'dua-istikhara',
    title: 'Dua-e-Istikhara (Divine Guidance)',
    urduTitle: 'دعائے استخارہ (خیر و بھلائی کی طلب)',
    benefit: 'Pray 2 Rakah Nafl before sleeping when facing any major life decision (marriage, travel, business), then recite this Dua.',
    urduBenefit: 'کسی بھی اہم کام (شادی، سفر، کاروبار) سے قبل خیر اور برکت معلوم کرنے کے لیے 2 رکعت نفل کے بعد یہ دعا مانگیں۔',
    arabicText: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ',
    transliteration: 'Allahumma inni astakheeruka bi\'ilmika wa astaqdiruka bi qudratika wa as\'aluka min fadlikal azeem.',
    urduTranslation: 'اے اللہ! میں تیرے علم کی برکت سے تجھ سے خیر طلب کرتا ہوں اور تیری قدرت سے طاقت مانگتا ہوں۔',
    englishTranslation: 'O Allah, I seek Your counsel through Your knowledge, and I seek strength through Your power.',
    reference: 'Sahih Al-Bukhari, Hadith 1162',
    category: 'Istikhara'
  },
  {
    id: 'dua-rizq-barakah',
    title: 'Dua for Wealth & Removal of Debt',
    urduTitle: 'رزق میں برکت اور قرض سے نجات کی دعا',
    benefit: 'Protects against crippling debt, poverty, and opens the doors of Halal sustenance and blessings.',
    urduBenefit: 'قرض سے نجات اور رزق میں وسعت و کشادگی کے لیے صبح و شام اس دعا کا ورد کریں۔',
    arabicText: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    transliteration: 'Allahumma akfini bi halalika \'an haramika wa aghnini bi fadlika \'amman siwak.',
    urduTranslation: 'اے اللہ! مجھے حلال روزی دے کر حرام سے بچا، اور اپنے فضل سے اپنے سوا سب سے بے نیاز کر دے۔',
    englishTranslation: 'O Allah, suffice me with what You have allowed instead of what You have forbidden, and satisfy me with Your bounty.',
    reference: 'Jami\' at-Tirmidhi, Hadith 3563',
    category: 'Rizq'
  },
  {
    id: 'dua-evil-eye-nazar',
    title: 'Protection from Evil Eye (Nazar-e-Bad)',
    urduTitle: 'نظرِ بد اور حاسدین کے شر سے حفاظت',
    benefit: 'Recite 3 times and blow over children, family, or personal home to remove the evil eye and jealousy.',
    urduBenefit: 'بچوں اور اہل و عیال پر تین بار پڑھ کر دم کریں، ہر قسم کی نظرِ بد سے حفاظت رہے گی۔',
    arabicText: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
    transliteration: 'A\'oodhu bi kalimaatillaahit-taammaati min kulli shaytaanin wa haammah, wa min kulli \'aynin laammah.',
    urduTranslation: 'میں اللہ کے مکمل کلمات کی پناہ لیتا ہوں ہر شیطان سے، ہر زہریلے جانور سے اور ہر نقصان پہنچانے والی نظر سے۔',
    englishTranslation: 'I seek protection in the perfect words of Allah from every devil and poisonous reptile, and from every evil eye.',
    reference: 'Sahih Al-Bukhari, Hadith 3371',
    category: 'Protection'
  },
  {
    id: 'dua-morning-evening',
    title: 'Daily Fortress: Bismillahillazi',
    urduTitle: 'صبح و شام کی حفاظت کا حصار',
    benefit: 'Whoever recites this 3 times in morning and evening, nothing will harm them by the will of Allah.',
    urduBenefit: 'جو شخص صبح و شام 3 مرتبہ یہ دعا پڑھے، زمین و آسمان کی کوئی مصیبت اسے نقصان نہیں پہنچا سکتی۔',
    arabicText: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillahillazi la yadurru ma\'as-mihi shay\'un fil-ardi wa la fis-samaa\'i wa Huwas-Samee\'ul \'Aleem.',
    urduTranslation: 'اللہ کے نام کے ساتھ جس کے نام کی برکت سے زمین اور آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی اور وہی خوب سننے والا جاننے والا ہے۔',
    englishTranslation: 'In the Name of Allah, with whose Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing.',
    reference: 'Sunan Abi Dawud, Hadith 5088',
    category: 'Morning-Evening'
  }
];

export const MEDIA_GALLERY: MediaItem[] = [
  {
    id: 'media-1',
    title: 'Surah Ar-Rahman Soul-Stirring Recitation',
    urduTitle: 'تلاوتِ قرآن: سورہ الرحمن دلکش انداز میں',
    reciter: 'Aalami Qari Mishary Rashid Alafasy',
    category: 'Tilawat',
    duration: '14:20',
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/55.mp3',
    date: '15 Oct 2026',
    views: '1.2M'
  },
  {
    id: 'media-2',
    title: 'Naat: Meri Ulfat Madine Se Yun Hi Nahi',
    urduTitle: 'نعتِ رسول: میری الفت مدینے سے یوں ہی نہیں',
    reciter: 'Haji Bilal Raza Attari',
    category: 'Hamd-o-Naat',
    duration: '06:45',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_morning.ogg',
    date: '10 Oct 2026',
    views: '840K'
  },
  {
    id: 'media-3',
    title: 'Bayan: Khauf-e-Khuda Aur Fikr-e-Akhirat',
    urduTitle: 'بیان: خوفِ خدا اور فکرِ آخرت',
    reciter: 'Maulana Muhammad Imran Attari',
    category: 'Bayan',
    duration: '32:10',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/daytime_forest_bonfire.ogg',
    date: '08 Oct 2026',
    views: '450K'
  },
  {
    id: 'media-4',
    title: 'Kalam: Faslon Ko Takalluf Hai Hum Se Agar',
    urduTitle: 'کلام: فاصلوں کو تکلف ہے ہم سے اگر',
    reciter: 'Owner Custom Vocal (My Voice Studio)',
    category: 'Hamd-o-Naat',
    duration: '05:12',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/morning_birds.ogg',
    date: 'Today',
    views: 'Live Preview',
    isMyVoice: true
  }
];
