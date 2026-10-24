import { TestQuestion } from '../../types';

export const MATH_QUESTIONS: TestQuestion[] = [
  {
    id: 'dtm-math-01',
    subject: 'Matematika',
    topic: 'Kvadrat tenglamalar',
    question: 'x² - 7x + 12 = 0 tenglamaning ildizlari yigʻindisi va koʻpaytmasini toping.',
    options: {
      A: "Yigʻindi: 7, Koʻpaytma: 12",
      B: "Yigʻindi: -7, Koʻpaytma: 12",
      C: "Yigʻindi: 12, Koʻpaytma: 7",
      D: "Yigʻindi: -12, Koʻpaytma: -7"
    },
    correct_answer: 'A',
    explanation_reference: "Viyet teoremasiga koʻra: x₁ + x₂ = -p = 7 va x₁ · x₂ = q = 12 boʻladi."
  },
  {
    id: 'dtm-math-02',
    subject: 'Matematika',
    topic: 'Pifagor teoremasi',
    question: 'Toʻgʻri burchakli uchburchakning katetlari 6 cm va 8 cm ga teng. Uning gipotenuzasini hisoblang.',
    options: {
      A: "10 cm",
      B: "9 cm",
      C: "12 cm",
      D: "14 cm"
    },
    correct_answer: 'A',
    explanation_reference: "Pifagor teoremasi boʻyicha: c = √(6² + 8²) = √(36 + 64) = √100 = 10 cm."
  },
  {
    id: 'dtm-math-03',
    subject: 'Matematika',
    topic: 'Arifmetik progressiya',
    question: 'Arifmetik progressiyada a₁ = 3, d = 4 boʻlsa, uning 10-hadi (a₁₀) nechaga teng?',
    options: {
      A: "39",
      B: "37",
      C: "43",
      D: "35"
    },
    correct_answer: 'A',
    explanation_reference: "a_n = a₁ + (n - 1)d formulaga koʻra: a₁₀ = 3 + (10 - 1)·4 = 3 + 36 = 39."
  },
  {
    id: 'dtm-math-04',
    subject: 'Matematika',
    topic: 'Geometrik progressiya',
    question: 'Geometrik progressiyada b₁ = 2, q = 3 boʻlsa, dastlabki 4 ta hadining yigʻindisini toping.',
    options: {
      A: "80",
      B: "78",
      C: "82",
      D: "76"
    },
    correct_answer: 'A',
    explanation_reference: "S₄ = b₁(q⁴ - 1)/(q - 1) = 2·(81 - 1)/(3 - 1) = 2·80/2 = 80."
  },
  {
    id: 'dtm-math-05',
    subject: 'Matematika',
    topic: 'Logarifmik tenglamalar',
    question: 'log₂(x - 3) = 4 tenglamani yeching.',
    options: {
      A: "19",
      B: "13",
      C: "16",
      D: "11"
    },
    correct_answer: 'A',
    explanation_reference: "Logarifm taʼrifiga koʻra: x - 3 = 2⁴ = 16 => x = 16 + 3 = 19."
  },
  {
    id: 'dtm-math-06',
    subject: 'Matematika',
    topic: 'Trigonometriya',
    question: 'sin²(α) + cos²(α) ifodaning qiymati barcha haqiqiy burchaklar uchun nimaga teng?',
    options: {
      A: "1",
      B: "0",
      C: "2",
      D: "tg(α)"
    },
    correct_answer: 'A',
    explanation_reference: "Trigonometriyaning asosiy ayniyati: sin²(α) + cos²(α) = 1."
  },
  {
    id: 'dtm-math-07',
    subject: 'Matematika',
    topic: 'Hosilalar',
    question: 'f(x) = 3x² - 5x + 7 funksiyaning hosilasini toping.',
    options: {
      A: "6x - 5",
      B: "3x - 5",
      C: "6x + 7",
      D: "6x² - 5"
    },
    correct_answer: 'A',
    explanation_reference: "f'(x) = (3x²)' - (5x)' + (7)' = 6x - 5."
  },
  {
    id: 'dtm-math-08',
    subject: 'Matematika',
    topic: 'Aniqmas integral',
    question: '∫ 4x³ dx integralni hisoblang.',
    options: {
      A: "x⁴ + C",
      B: "4x⁴ + C",
      C: "12x² + C",
      D: "x³ + C"
    },
    correct_answer: 'A',
    explanation_reference: "∫ 4x³ dx = 4 · (x⁴ / 4) + C = x⁴ + C."
  },
  {
    id: 'dtm-math-09',
    subject: 'Matematika',
    topic: 'Tenglamalar sistemasi',
    question: '{ 2x + y = 7; x - y = 2 } tenglamalar sistemasidan x va y qiymatlarini toping.',
    options: {
      A: "x = 3, y = 1",
      B: "x = 4, y = -1",
      C: "x = 2, y = 3",
      D: "x = 5, y = 2"
    },
    correct_answer: 'A',
    explanation_reference: "Ikkala tenglamani qoʻshsak: 3x = 9 => x = 3; soʻngra y = x - 2 = 3 - 2 = 1."
  },
  {
    id: 'dtm-math-10',
    subject: 'Matematika',
    topic: 'Kvadratik funksiya uchi',
    question: 'y = x² - 6x + 5 parabolaning uchining koordinatalarini (x₀; y₀) toping.',
    options: {
      A: "(3; -4)",
      B: "(-3; 4)",
      C: "(3; 4)",
      D: "(6; 5)"
    },
    correct_answer: 'A',
    explanation_reference: "x₀ = -b / (2a) = 6 / 2 = 3; y₀ = 3² - 6·3 + 5 = 9 - 18 + 5 = -4. Demak (3; -4)."
  },
  {
    id: 'dtm-math-11',
    subject: 'Matematika',
    topic: 'Modulli tenglama',
    question: '|2x - 6| = 8 tenglamaning barcha ildizlari yigʻindisini toping.',
    options: {
      A: "6",
      B: "8",
      C: "14",
      D: "0"
    },
    correct_answer: 'A',
    explanation_reference: "1) 2x - 6 = 8 => 2x = 14 => x₁ = 7. 2) 2x - 6 = -8 => 2x = -2 => x₂ = -1. Yigʻindi: 7 + (-1) = 6."
  },
  {
    id: 'dtm-math-12',
    subject: 'Matematika',
    topic: 'Korsatkichli tenglama',
    question: '3^(x + 2) = 81 tenglamani yeching.',
    options: {
      A: "2",
      B: "4",
      C: "3",
      D: "1"
    },
    correct_answer: 'A',
    explanation_reference: "81 = 3⁴ boʻlgani sababli: x + 2 = 4 => x = 2."
  },
  {
    id: 'dtm-math-13',
    subject: 'Matematika',
    topic: 'Kombinatorika: Oʻrinlashtirish',
    question: '5 ta kitobni javonga necha xil usulda ketma-ket joylashtirish mumkin (P₅)?',
    options: {
      A: "120",
      B: "24",
      C: "60",
      D: "720"
    },
    correct_answer: 'A',
    explanation_reference: "P₅ = 5! = 5 · 4 · 3 · 2 · 1 = 120."
  },
  {
    id: 'dtm-math-14',
    subject: 'Matematika',
    topic: 'Ehtimollik nazariyasi',
    question: 'Oddiy oʻyin suyagi (zar) tashlanganda toq son (1, 3, 5) tushish ehtimolligini toping.',
    options: {
      A: "1/2",
      B: "1/3",
      C: "1/6",
      D: "2/3"
    },
    correct_answer: 'A',
    explanation_reference: "Jami hollar soni n = 6 ta, qulay hollar m = 3 ta (1, 3, 5). P = 3/6 = 1/2."
  },
  {
    id: 'dtm-math-15',
    subject: 'Matematika',
    topic: 'Uchburchak yuzi',
    question: 'Tomonlari a = 12 cm, balandligi h = 5 cm boʻlgan uchburchakning yuzini hisoblang.',
    options: {
      A: "30 cm²",
      B: "60 cm²",
      C: "24 cm²",
      D: "15 cm²"
    },
    correct_answer: 'A',
    explanation_reference: "S = (a · h) / 2 = (12 · 5) / 2 = 60 / 2 = 30 cm²."
  },
  {
    id: 'dtm-math-16',
    subject: 'Matematika',
    topic: 'Trapetsiya yuzi',
    question: 'Asoslari a = 7 cm, b = 13 cm va balandligi h = 6 cm boʻlgan trapetsiyaning yuzini toping.',
    options: {
      A: "60 cm²",
      B: "120 cm²",
      C: "45 cm²",
      D: "78 cm²"
    },
    correct_answer: 'A',
    explanation_reference: "S = ((a + b) / 2) · h = ((7 + 13) / 2) · 6 = (20 / 2) · 6 = 10 · 6 = 60 cm²."
  },
  {
    id: 'dtm-math-17',
    subject: 'Matematika',
    topic: 'Aylana uzunligi va doira yuzi',
    question: 'Radiusi R = 4 cm boʻlgan doiraning yuzini toping.',
    options: {
      A: "16π cm²",
      B: "8π cm²",
      C: "4π cm²",
      D: "32π cm²"
    },
    correct_answer: 'A',
    explanation_reference: "Doira yuzi S = π · R² = π · 4² = 16π cm²."
  },
  {
    id: 'dtm-math-18',
    subject: 'Matematika',
    topic: 'Trigonometrik burchaklar',
    question: 'sin(30°) + cos(60°) ifodaning qiymatini hisoblang.',
    options: {
      A: "1",
      B: "√3",
      C: "1/2",
      D: "0"
    },
    correct_answer: 'A',
    explanation_reference: "sin(30°) = 1/2 va cos(60°) = 1/2 boʻlgani uchun: 1/2 + 1/2 = 1."
  },
  {
    id: 'dtm-math-19',
    subject: 'Matematika',
    topic: 'Keltirish formulalari',
    question: 'sin(90° + α) nimaga teng?',
    options: {
      A: "cos(α)",
      B: "-cos(α)",
      C: "sin(α)",
      D: "-sin(α)"
    },
    correct_answer: 'A',
    explanation_reference: "Keltirish formulasiga koʻra 90° da nom oʻzgaradi va II chorakda sinus musbat: sin(90° + α) = cos(α)."
  },
  {
    id: 'dtm-math-20',
    subject: 'Matematika',
    topic: 'Sodda tengsizliklar',
    question: '3x - 5 < 7 tengsizlikning eng katta butun yechimini toping.',
    options: {
      A: "3",
      B: "4",
      C: "2",
      D: "5"
    },
    correct_answer: 'A',
    explanation_reference: "3x < 12 => x < 4. 4 dan kichik eng katta butun son 3 ga teng."
  },
  {
    id: 'dtm-math-21',
    subject: 'Matematika',
    topic: 'Kasrli tenglama',
    question: '6 / (x - 2) = 2 tenglamaning ildizini toping.',
    options: {
      A: "5",
      B: "4",
      C: "3",
      D: "6"
    },
    correct_answer: 'A',
    explanation_reference: "x - 2 = 6 / 2 = 3 => x = 3 + 2 = 5."
  },
  {
    id: 'dtm-math-22',
    subject: 'Matematika',
    topic: 'Vektorlar skalyar koʻpaytmasi',
    question: 'a(3; 4) va b(2; -1) vektorlarning skalyar koʻpaytmasini (a · b) hisoblang.',
    options: {
      A: "2",
      B: "10",
      C: "-2",
      D: "6"
    },
    correct_answer: 'A',
    explanation_reference: "a · b = x₁x₂ + y₁y₂ = 3·2 + 4·(-1) = 6 - 4 = 2."
  },
  {
    id: 'dtm-math-23',
    subject: 'Matematika',
    topic: 'Vektor uzunligi',
    question: 'a(6; 8) vektorning uzunligini (modulini) toping.',
    options: {
      A: "10",
      B: "14",
      C: "12",
      D: "8"
    },
    correct_answer: 'A',
    explanation_reference: "|a| = √(6² + 8²) = √(36 + 64) = √100 = 10."
  },
  {
    id: 'dtm-math-24',
    subject: 'Matematika',
    topic: 'Kubning hajmi',
    question: 'Qirrasi a = 5 cm boʻlgan kubning hajmini (V) hisoblang.',
    options: {
      A: "125 cm³",
      B: "25 cm³",
      C: "150 cm³",
      D: "75 cm³"
    },
    correct_answer: 'A',
    explanation_reference: "V = a³ = 5³ = 125 cm³."
  },
  {
    id: 'dtm-math-25',
    subject: 'Matematika',
    topic: 'Silindr hajmi',
    question: 'Asosining radiusi R = 3 cm, balandligi H = 4 cm boʻlgan silindrning hajmini toping.',
    options: {
      A: "36π cm³",
      B: "12π cm³",
      C: "24π cm³",
      D: "48π cm³"
    },
    correct_answer: 'A',
    explanation_reference: "Silindr hajmi V = π · R² · H = π · 3² · 4 = π · 9 · 4 = 36π cm³."
  },
  {
    id: 'dtm-math-26',
    subject: 'Matematika',
    topic: 'Konus hajmi',
    question: 'Asosining radiusi R = 3 cm, balandligi H = 5 cm boʻlgan konusning hajmini hisoblang.',
    options: {
      A: "15π cm³",
      B: "45π cm³",
      C: "30π cm³",
      D: "9π cm³"
    },
    correct_answer: 'A',
    explanation_reference: "V = (1/3) · π · R² · H = (1/3) · π · 9 · 5 = 15π cm³."
  },
  {
    id: 'dtm-math-27',
    subject: 'Matematika',
    topic: 'Shar hajmi',
    question: 'Radiusi R = 3 cm boʻlgan sharning hajmini toping.',
    options: {
      A: "36π cm³",
      B: "108π cm³",
      C: "27π cm³",
      D: "18π cm³"
    },
    correct_answer: 'A',
    explanation_reference: "V = (4/3) · π · R³ = (4/3) · π · 27 = 36π cm³."
  },
  {
    id: 'dtm-math-28',
    subject: 'Matematika',
    topic: 'Ildizli ifodalarni soddalashtirish',
    question: '√(75) - √(12) ifodaning soddalashtirilgan qiymatini toping.',
    options: {
      A: "3√3",
      B: "√63",
      C: "2√3",
      D: "4√3"
    },
    correct_answer: 'A',
    explanation_reference: "√(75) = √(25·3) = 5√3; √(12) = √(4·3) = 2√3. Demak: 5√3 - 2√3 = 3√3."
  },
  {
    id: 'dtm-math-29',
    subject: 'Matematika',
    topic: 'Koordinatalar tekisligi',
    question: 'A(2; 3) va B(6; 6) nuqtalar orasidagi masofani hisoblang.',
    options: {
      A: "5",
      B: "6",
      C: "7",
      D: "4"
    },
    correct_answer: 'A',
    explanation_reference: "Masofa: d = √((6 - 2)² + (6 - 3)²) = √(4² + 3²) = √(16 + 9) = √25 = 5."
  },
  {
    id: 'dtm-math-30',
    subject: 'Matematika',
    topic: 'Sonli oraliqlar',
    question: '(-2; 5] yarim ochiq oraliqda nechta butun son mavjud?',
    options: {
      A: "7 ta (-1, 0, 1, 2, 3, 4, 5)",
      B: "6 ta",
      C: "8 ta",
      D: "5 ta"
    },
    correct_answer: 'A',
    explanation_reference: "-2 kirmaydi, 5 kiradi. Butun sonlar: -1, 0, 1, 2, 3, 4, 5 (jami 7 ta)."
  },
  {
    id: 'dtm-math-31',
    subject: 'Matematika',
    topic: 'Koʻrsatkichli tengsizlik',
    question: '2^(x - 1) ≥ 16 tengsizlikning eng kichik butun yechimini toping.',
    options: {
      A: "5",
      B: "4",
      C: "3",
      D: "6"
    },
    correct_answer: 'A',
    explanation_reference: "16 = 2⁴ boʻlgani uchun: x - 1 ≥ 4 => x ≥ 5. Eng kichik butun yechim 5 ga teng."
  },
  {
    id: 'dtm-math-32',
    subject: 'Matematika',
    topic: 'Logarifm xossalari',
    question: 'log₃(18) - log₃(2) ifodaning qiymatini hisoblang.',
    options: {
      A: "2",
      B: "3",
      C: "1",
      D: "9"
    },
    correct_answer: 'A',
    explanation_reference: "log₃(18) - log₃(2) = log₃(18 / 2) = log₃(9) = 2."
  },
  {
    id: 'dtm-math-33',
    subject: 'Matematika',
    topic: 'Teng yonli uchburchak burchaklari',
    question: 'Teng yonli uchburchakning uchidagi burchagi 40° ga teng. Uning asosidagi burchaklarini toping.',
    options: {
      A: "70° va 70°",
      B: "60° va 60°",
      C: "50° va 50°",
      D: "80° va 80°"
    },
    correct_answer: 'A',
    explanation_reference: "Uchburchak ichki burchaklari yigʻindisi 180°. Asosidagi har bir burchak: (180° - 40°) / 2 = 140° / 2 = 70°."
  },
  {
    id: 'dtm-math-34',
    subject: 'Matematika',
    topic: 'Foiz masalalari',
    question: 'Tovar narxi 200 000 soʻm edi. Uning narxi ketma-ket 10% dan ikki marta arzonlashtirildi. Tovarning soʻnggi narxi qancha boʻldi?',
    options: {
      A: "162 000 soʻm",
      B: "160 000 soʻm",
      C: "180 000 soʻm",
      D: "170 000 soʻm"
    },
    correct_answer: 'A',
    explanation_reference: "1-arzonlashish: 200 000 · 0.9 = 180 000 soʻm. 2-arzonlashish: 180 000 · 0.9 = 162 000 soʻm."
  },
  {
    id: 'dtm-math-35',
    subject: 'Matematika',
    topic: 'Tezlik masalalari',
    question: 'Avtomobil 240 km masofani 3 soatda bosib oʻtdi. Agar u tezligini 20 km/soatga oshirsa, shu masofani necha soatda bosib oʻtadi?',
    options: {
      A: "2.4 soat (2 soat 24 daqiqa)",
      B: "2 soat",
      C: "2.5 soat",
      D: "1.8 soat"
    },
    correct_answer: 'A',
    explanation_reference: "Boshlangʻich tezlik: v = 240 / 3 = 80 km/soat. Yangi tezlik: 80 + 20 = 100 km/soat. Yangi vaqt: t = 240 / 100 = 2.4 soat."
  }
];
