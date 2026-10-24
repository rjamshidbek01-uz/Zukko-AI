import { TestQuestion } from '../../types';

export const PHYSICS_QUESTIONS: TestQuestion[] = [
  {
    id: 'dtm-phys-01',
    subject: 'Fizika',
    topic: 'Kinematika',
    question: 'Boshlangʻich tezligi v₀ = 0 boʻlgan jism a = 4 m/s² tezlanish bilan 5 sekund harakatlandi. Jismning bosib oʻtgan yoʻlini hisoblang.',
    options: {
      A: "50 m",
      B: "20 m",
      C: "100 m",
      D: "40 m"
    },
    correct_answer: 'A',
    explanation_reference: "S = v₀t + at²/2 formulasiga koʻra: S = 0 + (4 · 5²)/2 = (4 · 25)/2 = 50 m."
  },
  {
    id: 'dtm-phys-02',
    subject: 'Fizika',
    topic: 'Nyuton qonunlari',
    question: 'Massasi 5 kg boʻlgan jismga 20 N kuch taʼsir etmoqda. Jism qanday tezlanish oladi?',
    options: {
      A: "4 m/s²",
      B: "100 m/s²",
      C: "2 m/s²",
      D: "0.25 m/s²"
    },
    correct_answer: 'A',
    explanation_reference: "Nyutonning ikkinchi qonuni: F = ma => a = F/m = 20 N / 5 kg = 4 m/s²."
  },
  {
    id: 'dtm-phys-03',
    subject: 'Fizika',
    topic: 'Erkin tushish',
    question: 'Erkin tushayotgan jism tushishining 3-sekundida qanday tezlikka erishadi? (g = 10 m/s²)',
    options: {
      A: "30 m/s",
      B: "45 m/s",
      C: "15 m/s",
      D: "20 m/s"
    },
    correct_answer: 'A',
    explanation_reference: "v = gt formulasiga koʻra: v = 10 m/s² · 3 s = 30 m/s."
  },
  {
    id: 'dtm-phys-04',
    subject: 'Fizika',
    topic: 'Ogʻirlik va massa',
    question: 'Oy sirtida erkin tushish tezlanishi Yerikidan taxminan 6 marta kichik. Yerdagi massasi 60 kg boʻlgan fazogirning Oydagi massasi qanchaga teng?',
    options: {
      A: "60 kg",
      B: "10 kg",
      C: "360 kg",
      D: "0 kg"
    },
    correct_answer: 'A',
    explanation_reference: "Massa — jismning inertlik oʻlchovi boʻlib, fazo koordinatasi yoki tortishish kuchiga bogʻliq emas; shuning uchun Oydagi massa ham 60 kg boʻladi."
  },
  {
    id: 'dtm-phys-05',
    subject: 'Fizika',
    topic: 'Impuls va impulsning saqlanish qonuni',
    question: 'Massasi 2 kg boʻlgan jism 6 m/s tezlik bilan harakatlanmoqda. Uning impulsi nimaga teng?',
    options: {
      A: "12 kg·m/s",
      B: "3 kg·m/s",
      C: "36 kg·m/s",
      D: "18 kg·m/s"
    },
    correct_answer: 'A',
    explanation_reference: "Jism impulsi formulasi p = m · v = 2 kg · 6 m/s = 12 kg·m/s."
  },
  {
    id: 'dtm-phys-06',
    subject: 'Fizika',
    topic: 'Kinetik energiya',
    question: 'Massasi 4 kg boʻlgan jismning tezligi 5 m/s boʻlsa, uning kinetik energiyasini toping.',
    options: {
      A: "50 J",
      B: "20 J",
      C: "100 J",
      D: "10 J"
    },
    correct_answer: 'A',
    explanation_reference: "E_k = (m · v²)/2 = (4 · 5²)/2 = (4 · 25)/2 = 50 J."
  },
  {
    id: 'dtm-phys-07',
    subject: 'Fizika',
    topic: 'Potensial energiya',
    question: 'Massasi 3 kg boʻlgan tosh h = 4 m balandlikka koʻtarildi. Uning potensial energiyasi qanchaga ortadi? (g = 10 m/s²)',
    options: {
      A: "120 J",
      B: "70 J",
      C: "12 J",
      D: "60 J"
    },
    correct_answer: 'A',
    explanation_reference: "E_p = mgh = 3 kg · 10 m/s² · 4 m = 120 J."
  },
  {
    id: 'dtm-phys-08',
    subject: 'Fizika',
    topic: 'Mexanik ish',
    question: 'Jismga yoʻnalishi boʻylab 15 N kuch taʼsir qilib, uni 4 metrga koʻchirdi. Bajarilgan ishni toping.',
    options: {
      A: "60 J",
      B: "19 J",
      C: "3.75 J",
      D: "30 J"
    },
    correct_answer: 'A',
    explanation_reference: "A = F · s = 15 N · 4 m = 60 J."
  },
  {
    id: 'dtm-phys-09',
    subject: 'Fizika',
    topic: 'Quvvat',
    question: 'Dvigatel 20 sekundda 4000 J ish bajardi. Uning quvvati qanday?',
    options: {
      A: "200 Vt",
      B: "80000 Vt",
      C: "800 Vt",
      D: "20 Vt"
    },
    correct_answer: 'A',
    explanation_reference: "N = A / t = 4000 J / 20 s = 200 Vt."
  },
  {
    id: 'dtm-phys-10',
    subject: 'Fizika',
    topic: 'Guk qonuni',
    question: 'Bikrligi k = 500 N/m boʻlgan prujina x = 0.02 m ga choʻzildi. Prujinada hosil boʻlgan elastiklik kuchi qancha?',
    options: {
      A: "10 N",
      B: "25 N",
      C: "100 N",
      D: "5 N"
    },
    correct_answer: 'A',
    explanation_reference: "F_elast = k · x = 500 N/m · 0.02 m = 10 N."
  },
  {
    id: 'dtm-phys-11',
    subject: 'Fizika',
    topic: 'Arximed qonuni',
    question: 'Hajmi 0.002 m³ boʻlgan jism suvga toʻliq botirilganda unga qanday Arximed kuchi taʼsir qiladi? (ρ_suv = 1000 kg/m³, g = 10 m/s²)',
    options: {
      A: "20 N",
      B: "2 N",
      C: "200 N",
      D: "10 N"
    },
    correct_answer: 'A',
    explanation_reference: "F_A = ρ_suyuqlik · g · V = 1000 · 10 · 0.002 = 20 N."
  },
  {
    id: 'dtm-phys-12',
    subject: 'Fizika',
    topic: 'Gidrostatik bosim',
    question: 'Chuqurligi h = 5 m boʻlgan suv havzasi tubidagi gidrostatik bosimni hisoblang. (ρ = 1000 kg/m³, g = 10 m/s²)',
    options: {
      A: "50 000 Pa",
      B: "5 000 Pa",
      C: "500 000 Pa",
      D: "25 000 Pa"
    },
    correct_answer: 'A',
    explanation_reference: "p = ρgh = 1000 kg/m³ · 10 m/s² · 5 m = 50 000 Pa = 50 kPa."
  },
  {
    id: 'dtm-phys-13',
    subject: 'Fizika',
    topic: 'Molekulyar fizika',
    question: 'Absolyut nol harorat Selsiy shkalasida qancha darajaga toʻgʻri keladi?',
    options: {
      A: "-273.15 °C",
      B: "0 °C",
      C: "-100 °C",
      D: "100 °C"
    },
    correct_answer: 'A',
    explanation_reference: "Absolyut nol harorat T = 0 K boʻlib, Selsiy shkalasi boʻyicha t = 0 - 273.15 = -273.15 °C ga teng."
  },
  {
    id: 'dtm-phys-14',
    subject: 'Fizika',
    topic: 'Mendeleyev-Klapeyron tenglamasi',
    question: 'Ideal gaz holat tenglamasi qaysi formula bilan ifodalanadi?',
    options: {
      A: "p · V = (m / M) · R · T",
      B: "p · V = const",
      C: "F = m · a",
      D: "p = ρ · g · h"
    },
    correct_answer: 'A',
    explanation_reference: "Mendeleyev-Klapeyron tenglamasi pV = (m/M)RT shaklida yoziladi (R — universal gaz doimiysi)."
  },
  {
    id: 'dtm-phys-15',
    subject: 'Fizika',
    topic: 'Izojarayonlar',
    question: 'Gaz bosimi oʻzgarmasdan (p = const) boradigan jarayon nima deb ataladi?',
    options: {
      A: "Izobarik jarayon",
      B: "Izoxorik jarayon",
      C: "Izotermik jarayon",
      D: "Adiabatik jarayon"
    },
    correct_answer: 'A',
    explanation_reference: "Doimiy bosim ostida kechuvchi termodinamik jarayon — izobarik jarayondir (Gey-Lyussak qonuni: V/T = const)."
  },
  {
    id: 'dtm-phys-16',
    subject: 'Fizika',
    topic: 'Termodinamikaning I qonuni',
    question: 'Tizimga Q = 500 J issiqlik miqdori berildi va tizim tashqi kuchlarga qarshi A = 300 J ish bajardi. Tizim ichki energiyasining oʻzgarishi (ΔU) qanday boʻladi?',
    options: {
      A: "200 J",
      B: "800 J",
      C: "-200 J",
      D: "150 J"
    },
    correct_answer: 'A',
    explanation_reference: "Termodinamikaning 1-qonuni: Q = ΔU + A => ΔU = Q - A = 500 J - 300 J = 200 J."
  },
  {
    id: 'dtm-phys-17',
    subject: 'Fizika',
    topic: 'Kulon qonuni',
    question: 'Vakuumda bir-biridan r = 1 m masofada joylashgan q₁ = 10⁻⁶ C va q₂ = 2·10⁻⁶ C zaryadlar orasidagi taʼsir kuchini hisoblang. (k = 9·10⁹ N·m²/C²)',
    options: {
      A: "0.018 N",
      B: "0.18 N",
      C: "1.8 N",
      D: "18 N"
    },
    correct_answer: 'A',
    explanation_reference: "F = k · |q₁ · q₂| / r² = 9·10⁹ · (10⁻⁶ · 2·10⁻⁶) / 1² = 9·10⁹ · 2·10⁻¹² = 18·10⁻³ N = 0.018 N."
  },
  {
    id: 'dtm-phys-18',
    subject: 'Fizika',
    topic: 'Elektr zaryadi va maydoni',
    question: 'Nuqtaviy zaryad elektr maydonining kuchlanganligi E qaysi formula bilan ifodalanadi?',
    options: {
      A: "E = F / q",
      B: "E = q / F",
      C: "E = F · q",
      D: "E = q · U"
    },
    correct_answer: 'A',
    explanation_reference: "Elektr maydon kuchlanganligi maydonga kiritilgan sinov zaryadiga taʼsir qiluvchi kuchning ushbu zaryad miqdoriga nisbatiga teng: E = F / q."
  },
  {
    id: 'dtm-phys-19',
    subject: 'Fizika',
    topic: 'Kondensator sigʻimi',
    question: 'Kondensatorga q = 6·10⁻⁵ C zaryad berilganda uning qoplamalari orasidagi kuchlanish U = 30 V boʻldi. Uning elektr sigʻimi qanday?',
    options: {
      A: "2 µF",
      B: "0.5 µF",
      C: "5 µF",
      D: "180 µF"
    },
    correct_answer: 'A',
    explanation_reference: "C = q / U = (6·10⁻⁵ C) / 30 V = 2·10⁻⁶ F = 2 µF."
  },
  {
    id: 'dtm-phys-20',
    subject: 'Fizika',
    topic: 'Om qonuni zanjir qismi uchun',
    question: 'Qarshiligi R = 8 Om boʻlgan oʻtkazgichdagi kuchlanish U = 24 V. Oʻtkazgichdan oʻtayotgan tok kuchi qancha?',
    options: {
      A: "3 A",
      B: "192 A",
      C: "0.33 A",
      D: "6 A"
    },
    correct_answer: 'A',
    explanation_reference: "Zanjir qismi uchun Om qonuni: I = U / R = 24 V / 8 Om = 3 A."
  },
  {
    id: 'dtm-phys-21',
    subject: 'Fizika',
    topic: 'Oʻtkazgichlarning ketma-ket ulanishi',
    question: 'Qarshiliklari R₁ = 4 Om va R₂ = 6 Om boʻlgan ikkita rezistor ketma-ket ulanganda umumiy qarshilik qancha boʻladi?',
    options: {
      A: "10 Om",
      B: "2.4 Om",
      C: "24 Om",
      D: "2 Om"
    },
    correct_answer: 'A',
    explanation_reference: "Ketma-ket ulanganda umumiy qarshilik yigʻindiga teng: R_um = R₁ + R₂ = 4 + 6 = 10 Om."
  },
  {
    id: 'dtm-phys-22',
    subject: 'Fizika',
    topic: 'Oʻtkazgichlarning parallel ulanishi',
    question: 'Qarshiliklari R₁ = 6 Om va R₂ = 3 Om boʻlgan rezistorlar parallel ulanganda ekvivalent qarshilikni toping.',
    options: {
      A: "2 Om",
      B: "9 Om",
      C: "18 Om",
      D: "1.5 Om"
    },
    correct_answer: 'A',
    explanation_reference: "Parallel ulanganda: 1/R = 1/R₁ + 1/R₂ => R = (R₁ · R₂) / (R₁ + R₂) = (6 · 3) / (6 + 3) = 18 / 9 = 2 Om."
  },
  {
    id: 'dtm-phys-23',
    subject: 'Fizika',
    topic: 'Joul-Lens qonuni',
    question: 'Qarshiligi 10 Om boʻlgan oʻtkazgichdan I = 2 A tok 5 sekund davomida oʻtganda qancha issiqlik miqdori ajraladi?',
    options: {
      A: "200 J",
      B: "100 J",
      C: "50 J",
      D: "400 J"
    },
    correct_answer: 'A',
    explanation_reference: "Joul-Lens qonuni: Q = I² · R · t = 2² · 10 · 5 = 4 · 10 · 5 = 200 J."
  },
  {
    id: 'dtm-phys-24',
    subject: 'Fizika',
    topic: 'Magnit maydoni va Amper kuchi',
    question: 'Induksiyasi B = 0.5 T boʻlgan bir jinsli magnit maydoniga perpendikulyar joylashgan l = 0.4 m uzunlikdagi oʻtkazgichdan I = 6 A tok oʻtmoqda. Oʻtkazgichga taʼsir qiluvchi Amper kuchini toping.',
    options: {
      A: "1.2 N",
      B: "2.4 N",
      C: "0.6 N",
      D: "12 N"
    },
    correct_answer: 'A',
    explanation_reference: "F_A = I · B · l · sin(90°) = 6 A · 0.5 T · 0.4 m · 1 = 1.2 N."
  },
  {
    id: 'dtm-phys-25',
    subject: 'Fizika',
    topic: 'Lorens kuchi',
    question: 'Magnit maydonida harakatlanayotgan zaryadli zarrachaga taʼsir qiluvchi kuch nima deb ataladi?',
    options: {
      A: "Lorens kuchi",
      B: "Amper kuchi",
      C: "Kulon kuchi",
      D: "Ogʻirlik kuchi"
    },
    correct_answer: 'A',
    explanation_reference: "Magnit maydonida v tezlik bilan harakatlanayotgan q zaryadga taʼsir qiluvchi kuch Lorens kuchi deyiladi: F_L = q · v · B · sin(α)."
  },
  {
    id: 'dtm-phys-26',
    subject: 'Fizika',
    topic: 'Elektromagnit induksiya',
    question: 'Elektromagnit induksiya hodisasi kim tomonidan kashf etilgan?',
    options: {
      A: "Maykl Faradey",
      B: "Jeyms Maksvell",
      C: "Andre Amper",
      D: "Gens Oersted"
    },
    correct_answer: 'A',
    explanation_reference: "Maykl Faradey 1831-yilda magnit maydonining oʻzgarishi orqali oʻtkazgichda induksion tok hosil boʻlishini (elektromagnit induksiya) kashf etdi."
  },
  {
    id: 'dtm-phys-27',
    subject: 'Fizika',
    topic: 'Tebranishlar va toʻlqinlar',
    question: 'Matematik mayatnikning tebranish davri formulasi qanday?',
    options: {
      A: "T = 2π · √(l / g)",
      B: "T = 2π · √(m / k)",
      C: "T = 2π · √(g / l)",
      D: "T = l · g / 2π"
    },
    correct_answer: 'A',
    explanation_reference: "Gyuygens formulasi boʻyicha matematik mayatnik tebranish davri: T = 2π · √(l / g)."
  },
  {
    id: 'dtm-phys-28',
    subject: 'Fizika',
    topic: 'Geometrik optika',
    question: 'Yorugʻlik nuri tekis koʻzguga 30° burchak ostida tushmoqda. Qaytish burchagi necha gradusga teng boʻladi?',
    options: {
      A: "30°",
      B: "60°",
      C: "90°",
      D: "45°"
    },
    correct_answer: 'A',
    explanation_reference: "Yorugʻlikning qaytish qonuniga koʻra: tushish burchagi qaytish burchagiga teng (α = β), demak qaytish burchagi 30° ga teng."
  },
  {
    id: 'dtm-phys-29',
    subject: 'Fizika',
    topic: 'Yorugʻlik tezligi va sindirish koʻrsatkichi',
    question: 'Muhitdagi yorugʻlik tezligi v = 200 000 km/s boʻlsa, ushbu muhitning mutlaq sindirish koʻrsatkichi n nimaga teng? (Vakuumda c = 300 000 km/s)',
    options: {
      A: "1.5",
      B: "1.33",
      C: "2.0",
      D: "0.67"
    },
    correct_answer: 'A',
    explanation_reference: "Sindirish koʻrsatkichi n = c / v = 300 000 / 200 000 = 1.5."
  },
  {
    id: 'dtm-phys-30',
    subject: 'Fizika',
    topic: 'Yupqa linza formulasi',
    question: 'Fokus masofasi F = 0.25 m boʻlgan yigʻuvchi linzaning optik kuchi (D) qanday?',
    options: {
      A: "4 dptr",
      B: "0.25 dptr",
      C: "2.5 dptr",
      D: "5 dptr"
    },
    correct_answer: 'A',
    explanation_reference: "Linzaning optik kuchi D = 1 / F = 1 / 0.25 m = 4 dioptriya (dptr)."
  },
  {
    id: 'dtm-phys-31',
    subject: 'Fizika',
    topic: 'Kvant fizikasi va foton energiyasi',
    question: 'Foton energiyasi Plank formulasi boʻyicha qaysi ifoda bilan aniqlanadi?',
    options: {
      A: "E = h · ν",
      B: "E = m · c",
      C: "E = h / ν",
      D: "E = p · c²"
    },
    correct_answer: 'A',
    explanation_reference: "Maks Plank taklif etgan qonunga koʻra, yorugʻlik kvantining energiyasi E = h · ν (bu yerda h — Plank doimiysi, ν — tebranish chastotasi)."
  },
  {
    id: 'dtm-phys-32',
    subject: 'Fizika',
    topic: 'Fotoeffekt hodisasi',
    question: 'Fotoeffekt uchun Eynshteyn tenglamasi qanday yoziladi?',
    options: {
      A: "hν = A_chiqish + (m·v²)/2",
      B: "hν = A_chiqish - E_k",
      C: "E = mc²",
      D: "F = q·E"
    },
    correct_answer: 'A',
    explanation_reference: "Eynshteynning fotoeffekt tenglamasi: yutilgan foton energiyasi (hν) elektronning metalldan chiqish ishi (A) va uning kinetik energiyasiga sarflanadi."
  },
  {
    id: 'dtm-phys-33',
    subject: 'Fizika',
    topic: 'Atom va yadro fizikasi',
    question: 'Atom yadrosidagi neytronlar soni qaysi formula bilan topiladi? (A — massa soni, Z — tartib raqam)',
    options: {
      A: "N = A - Z",
      B: "N = A + Z",
      C: "N = Z / A",
      D: "N = A · Z"
    },
    correct_answer: 'A',
    explanation_reference: "Massa soni proton va neytronlar yigʻindisi (A = Z + N) boʻlgani uchun: N = A - Z."
  },
  {
    id: 'dtm-phys-34',
    subject: 'Fizika',
    topic: 'Radioaktiv yemirilish',
    question: 'Alfa (α) zarracha nimalardan tashkil topgan?',
    options: {
      A: "Geliy atomi yadrosi (2 proton va 2 neytron)",
      B: "Tez harakatlanuvchi elektronlar oqimi",
      C: "Qisqa toʻlqinli elektromagnit nurlanish",
      D: "Faqat bitta erkin proton"
    },
    correct_answer: 'A',
    explanation_reference: "Alfa yemirilishda ajralib chiqadigan α-zarracha Geliy elementining qoʻsh zaryadlangan yadrosidir (⁴₂He²⁺)."
  },
  {
    id: 'dtm-phys-35',
    subject: 'Fizika',
    topic: 'Nisbiylik nazariyasi',
    question: 'Eynshteynning tinchlikdagi energiya va massa oʻrtasidagi fundamental munosabat formulasi qaysi?',
    options: {
      A: "E = m · c²",
      B: "E = m · v² / 2",
      C: "E = h · c",
      D: "E = F · s"
    },
    correct_answer: 'A',
    explanation_reference: "Maxsus nisbiylik nazariyasiga koʻra jismning tinchlikdagi toʻliq energiyasi uning massasi va yorugʻlik tezligi kvadratining koʻpaytmasiga teng: E = mc²."
  }
];
