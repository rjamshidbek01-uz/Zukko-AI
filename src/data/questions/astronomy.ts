import { TestQuestion } from '../../types';

export const ASTRONOMY_QUESTIONS: TestQuestion[] = [
  {
    id: 'dtm-astro-01',
    subject: 'Astronomiya',
    topic: 'Quyosh sistemasi',
    question: 'Quyosh sistemasidagi eng katta gigant sayyora qaysi?',
    options: {
      A: "Yupiter",
      B: "Saturn",
      C: "Uran",
      D: "Neptun"
    },
    correct_answer: 'A',
    explanation_reference: "Yupiter — Quyosh sistemasidagi eng ulkan sayyora boʻlib, uning massasi qolgan barcha sayyoralar massasi yigʻindisidan 2.5 baravar koʻp."
  },
  {
    id: 'dtm-astro-02',
    subject: 'Astronomiya',
    topic: 'Quyoshga eng yaqin sayyora',
    question: 'Quyoshga eng yaqin joylashgan sayyora qaysi?',
    options: {
      A: "Merkuriy",
      B: "Venera (Zuhro)",
      C: "Mars (Mirrix)",
      D: "Yer"
    },
    correct_answer: 'A',
    explanation_reference: "Merkuriy Quyoshga eng yaqin sayyora boʻlib, oʻrtacha masofasi taxminan 58 million km ni tashkil etadi."
  },
  {
    id: 'dtm-astro-03',
    subject: 'Astronomiya',
    topic: 'Keplerning I qonuni',
    question: 'Keplerning birinchi qonuniga koʻra barcha sayyoralar Quyosh atrofida qanday orbita boʻylab harakatlanadi?',
    options: {
      A: "Elliptik orbita boʻylab (fokuslaridan birida Quyosh turadi)",
      B: "Aylana boʻylab",
      C: "Parabola boʻylab",
      D: "Giperbola boʻylab"
    },
    correct_answer: 'A',
    explanation_reference: "Iogann Keplerning 1-qonuni: Har bir sayyora Quyosh atrofida ellips boʻylab harakatlanadi va ellipsning fokuslaridan birida Quyosh joylashadi."
  },
  {
    id: 'dtm-astro-04',
    subject: 'Astronomiya',
    topic: 'Keplerning II qonuni',
    question: 'Sayyora Quyoshga eng yaqin kelgan nuqta astronomiyada nima deb ataladi?',
    options: {
      A: "Perigeliy",
      B: "Afeliy",
      C: "Zenit",
      D: "Nadir"
    },
    correct_answer: 'A',
    explanation_reference: "Orbitaning Quyoshga eng yaqin nuqtasi perigeliy, eng uzoq nuqtasi esa afeliy deb ataladi."
  },
  {
    id: 'dtm-astro-05',
    subject: 'Astronomiya',
    topic: 'Keplerning III qonuni',
    question: 'Keplerning uchinchi qonuniga koʻra sayyoralarning Quyosh atrofidagi aylanish davrlari kvadratlarining nisbati nimaga teng?',
    options: {
      A: "Katta yarim oʻqlari kublarining nisbatiga: T₁² / T₂² = a₁³ / a₂³",
      B: "Katta yarim oʻqlari kvadratlari nisbatiga",
      C: "Sayyoralar massalari nisbatiga",
      D: "Radiuslari kvadratlari nisbatiga"
    },
    correct_answer: 'A',
    explanation_reference: "Keplerning garmonik qonuni: Sayyoralarning aylanish davrlari kvadratlari ularning orbitalarining katta yarim oʻqlari kublariga toʻgʻri proporsionaldir."
  },
  {
    id: 'dtm-astro-06',
    subject: 'Astronomiya',
    topic: 'Kosmik tezliklar',
    question: 'Yer sirtidan fazoga sunʼiy yoʻldosh chiqarish uchun talab etiladigan birinchi kosmik tezlik qanchaga teng?',
    options: {
      A: "7.9 km/s",
      B: "11.2 km/s",
      C: "16.7 km/s",
      D: "3.1 km/s"
    },
    correct_answer: 'A',
    explanation_reference: "v₁ = √(g · R) ≈ √(9.8 · 6400000) ≈ 7.9 km/s (aylana boʻylab aylanish tezligi)."
  },
  {
    id: 'dtm-astro-07',
    subject: 'Astronomiya',
    topic: 'Ikkinchi kosmik tezlik',
    question: 'Jism Yerning tortishish maydonini yengib, Quyoshning yoʻldoshiga aylanishi uchun erishishi lozim boʻlgan ikkinchi kosmik tezlik qancha?',
    options: {
      A: "11.2 km/s",
      B: "7.9 km/s",
      C: "16.7 km/s",
      D: "22.4 km/s"
    },
    correct_answer: 'A',
    explanation_reference: "v₂ = v₁ · √2 = 7.9 · 1.414 ≈ 11.2 km/s parabolik qochish tezligidir."
  },
  {
    id: 'dtm-astro-08',
    subject: 'Astronomiya',
    topic: 'Uchinchi kosmik tezlik',
    question: 'Quyosh sistemasidan butunlay chiqib ketish uchun zarur boʻlgan uchinchi kosmik tezlik qiymati qancha?',
    options: {
      A: "16.7 km/s",
      B: "11.2 km/s",
      C: "25.5 km/s",
      D: "42.1 km/s"
    },
    correct_answer: 'A',
    explanation_reference: "Yer sirtidan Quyosh tortishish kuchini yengib Galaktikaga chiqish uchun kerakli tezlik 16.7 km/s ga teng."
  },
  {
    id: 'dtm-astro-09',
    subject: 'Astronomiya',
    topic: 'Astronomik birlik (a.b.)',
    question: 'Astronomiyada 1 astronomik birlik (1 a.b.) qanday masofani ifodalaydi?',
    options: {
      A: "Yer bilan Quyosh orasidagi oʻrtacha masofa (~149.6 mln km)",
      B: "Yer bilan Oy orasidagi masofa",
      C: "Yorugʻlikning 1 yilda bosib oʻtgan yoʻli",
      D: "Quyoshning diametri"
    },
    correct_answer: 'A',
    explanation_reference: "1 a.b. Yer va Quyosh markazlari orasidagi oʻrtacha masofa boʻlib, taxminan 149 597 870 km ga teng."
  },
  {
    id: 'dtm-astro-10',
    subject: 'Astronomiya',
    topic: 'Yorugʻlik yili',
    question: 'Yorugʻlik yili nimaning oʻlchov birligi hisoblanadi?',
    options: {
      A: "Masofa (uzunlik) birligi",
      B: "Vaqt birligi",
      C: "Yorugʻlik kuchi birligi",
      D: "Massa birligi"
    },
    correct_answer: 'A',
    explanation_reference: "Yorugʻlik yili — yorugʻlik nurlarining vakuumda bir Yulian yilida bosib oʻtgan masofasidir (taxminan 9.46 trillion km)."
  },
  {
    id: 'dtm-astro-11',
    subject: 'Astronomiya',
    topic: 'Parsek',
    question: 'Yillik parallaksi 1 burchak soniyasiga (1") teng boʻlgan obʼyektgacha masofa nima deb ataladi?',
    options: {
      A: "Parsek (pk)",
      B: "Yorugʻlik yili",
      C: "Astronomik birlik",
      D: "Kilometr"
    },
    correct_answer: 'A',
    explanation_reference: "1 parsek ≈ 3.26 yorugʻlik yili ≈ 206 265 a.b. ≈ 3.086·10¹³ km ga teng boʻlgan asosiy yulduzlararo masofa birligidir."
  },
  {
    id: 'dtm-astro-12',
    subject: 'Astronomiya',
    topic: 'Quyosh tuzilishi',
    question: 'Quyoshning koʻzga koʻrinadigan yorugʻ sirt qatlami qanday nomlanadi?',
    options: {
      A: "Fotosfera",
      B: "Xromosfera",
      C: "Quyosh toji",
      D: "Konvektiv zona"
    },
    correct_answer: 'A',
    explanation_reference: "Fotosfera — Quyoshning koʻrinadigan sirti boʻlib, uning harorati taxminan 5500-6000 Kelvinni tashkil etadi."
  },
  {
    id: 'dtm-astro-13',
    subject: 'Astronomiya',
    topic: 'Quyosh energiyasi manbai',
    question: 'Quyosh yadrosida kechuvchi va ulkan energiya ajratuvchi asosiy jarayon qaysi?',
    options: {
      A: "Termoyadroviy sintez (Vodorodning Geliyga aylanishi)",
      B: "Uran yadrosining parchalanishi",
      C: "Kimyoviy yonish reaksiyasi",
      D: "Gravitatsion qisqarish"
    },
    correct_answer: 'A',
    explanation_reference: "Quyosh yadrosida 15 million Kelvin harorat va ulkan bosim ostida 4 ta proton birlashib bitta Geliy yadrosini hosil qiladi va energiya ajraladi."
  },
  {
    id: 'dtm-astro-14',
    subject: 'Astronomiya',
    topic: 'Teleskoplar',
    question: '1609-yilda tarixda birinchi boʻlib osmon jismlarini oʻzi yasagan teleskop orqali kuzatgan olim kim?',
    options: {
      A: "Galileo Galiley",
      B: "Isaak Nyuton",
      C: "Iogann Kepler",
      D: "Nikolay Kopernik"
    },
    correct_answer: 'A',
    explanation_reference: "Galileo Galiley 1609-yilda refraktor teleskop yasab, Oydagi kraterlarni, Yupiterning 4 ta yirik yoʻldoshini va Venera fazalarini kashf qildi."
  },
  {
    id: 'dtm-astro-15',
    subject: 'Astronomiya',
    topic: 'Oyna teleskoplari (Reflektor)',
    question: 'Koʻzguli (reflektor) teleskopni ilk bor kim ixtiro qilgan?',
    options: {
      A: "Isaak Nyuton (1668-yil)",
      B: "Galileo Galiley",
      C: "Uilyam Gershel",
      D: "Edvin Xabbl"
    },
    correct_answer: 'A',
    explanation_reference: "Isaak Nyuton linzalardagi xromatik aberratsiyani bartaraf etish maqsadida botiq koʻzguli reflektor teleskopni yaratdi."
  },
  {
    id: 'dtm-astro-16',
    subject: 'Astronomiya',
    topic: 'Oy fazalari',
    question: 'Oy Yer atrofida toʻliq bir marta aylanib chiqish davri (sinodik oy) qancha davom etadi?',
    options: {
      A: "29.5 sutka",
      B: "27.3 sutka",
      C: "31 sutka",
      D: "24 soat"
    },
    correct_answer: 'A',
    explanation_reference: "Sinodik oy — Oy fazalarining toʻliq almashinish davri boʻlib, 29 sutka 12 soat 44 minutga (29.5 kunga) teng."
  },
  {
    id: 'dtm-astro-17',
    subject: 'Astronomiya',
    topic: 'Quyosh tutilishi',
    question: 'Quyosh tutilishi qanday geometrik holatda sodir boʻladi?',
    options: {
      A: "Oy Yer bilan Quyosh oʻrtasiga toʻgʻri kelganda (Yangi oy fazasida)",
      B: "Yer Quyosh va Oy oʻrtasiga kelganda (Toʻlin oy)",
      C: "Faqat birinchi chorakda",
      D: "Quyosh gorizontdan pastga tushganda"
    },
    correct_answer: 'A',
    explanation_reference: "Quyosh tutilishi Oy yangi oy fazasida Yer va Quyosh orasidan oʻtib, Yerga oʻz soyasini tashlaganida sodir boʻladi."
  },
  {
    id: 'dtm-astro-18',
    subject: 'Astronomiya',
    topic: 'Oy tutilishi',
    question: 'Oy tutilishi faqat Oyning qaysi fazasida yuz berishi mumkin?',
    options: {
      A: "Toʻlin oy fazasida",
      B: "Yangi oy fazasida",
      C: "Oxirgi chorakda",
      D: "Barcha fazalarda"
    },
    correct_answer: 'A',
    explanation_reference: "Oy tutilishi Yer Quyosh bilan Oy oʻrtasida toʻgʻri chiziqda turib, Yer soyasi Oy sirtiga tushganda (faqat toʻlin oyda) kuzatiladi."
  },
  {
    id: 'dtm-astro-19',
    subject: 'Astronomiya',
    topic: 'Yer guruhidagi sayyoralar',
    question: 'Quyidagi qatorda faqat Yer guruhiga mansub sayyoralar berilgan variantni toping.',
    options: {
      A: "Merkuriy, Venera, Yer, Mars",
      B: "Yupiter, Saturn, Uran, Neptun",
      C: "Mars, Yupiter, Saturn",
      D: "Venera, Saturn, Pluton"
    },
    correct_answer: 'A',
    explanation_reference: "Yer guruhiga qattiq toshli poʻstloqqa va yuqori zichlikka ega boʻlgan ichki toʻrtta sayyora kiradi: Merkuriy, Venera, Yer, Mars."
  },
  {
    id: 'dtm-astro-20',
    subject: 'Astronomiya',
    topic: 'Gaz gigantlari',
    question: 'Qaysi sayyora oʻzining ajoyib, yorqin va keng halqalari bilan mashhur?',
    options: {
      A: "Saturn (Zuhal)",
      B: "Mars",
      C: "Merkuriy",
      D: "Venera"
    },
    correct_answer: 'A',
    explanation_reference: "Saturnning millionlab muz va tosh zarrachalaridan tashkil topgan ulkan va goʻzal halqa tizimi mavjud."
  },
  {
    id: 'dtm-astro-21',
    subject: 'Astronomiya',
    topic: 'Venera atmosferasi',
    question: 'Venera sayyorasi atmosferasining asosiy qismini (~96%) qaysi gaz tashkil qiladi va kuchli issiqxona effektini vujudga keltiradi?',
    options: {
      A: "Karbonat angidrid (CO₂)",
      B: "Kislorod (O₂)",
      C: "Azot (N₂)",
      D: "Vodorod (H₂)"
    },
    correct_answer: 'A',
    explanation_reference: "Venera atmosferasidagi qalin CO₂ kuchli issiqxona effektini hosil qiladi va sirt harorati +460 °C gacha koʻtariladi."
  },
  {
    id: 'dtm-astro-22',
    subject: 'Astronomiya',
    topic: 'Mars sayyorasi',
    question: 'Mars sayyorasi sirtining qizgʻish rangda koʻrinishiga nima sabab boʻladi?',
    options: {
      A: "Gruntidagi temir oksidi (zang) minerallarining koʻpligi",
      B: "Qizil oʻsimliklar qoplami",
      C: "Atmosferadagi oltingugurt gazlari",
      D: "Quyosh nurlarining sinishi"
    },
    correct_answer: 'A',
    explanation_reference: "Mars tuprogʻida temir (III) oksidi (Fe₂O₃) koʻp boʻlganligi sababli u fazodan 'Qizil sayyora' boʻlib koʻrinadi."
  },
  {
    id: 'dtm-astro-23',
    subject: 'Astronomiya',
    topic: 'Quyosh sistemasining eng baland choʻqqisi',
    question: 'Quyosh sistemasidagi eng baland soʻngan vulqon — Olimp togʻi (balandligi 22 km) qaysi sayyorada joylashgan?',
    options: {
      A: "Mars sayyorasida",
      B: "Venerada",
      C: "Yupiterda",
      D: "Oyda"
    },
    correct_answer: 'A',
    explanation_reference: "Marsdagi Olimp togʻi (Olympus Mons) balandligi 22 km, asosi esa 600 km boʻlgan ulkan vulqondir."
  },
  {
    id: 'dtm-astro-24',
    subject: 'Astronomiya',
    topic: 'Kichik sayyoralar (Asteroidlar)',
    question: 'Asosiy Asteroidlar mintaqasi qaysi ikki sayyora orbitalari oraligʻida joylashgan?',
    options: {
      A: "Mars va Yupiter orbitalari orasida",
      B: "Yer va Mars orasida",
      C: "Yupiter va Saturn orasida",
      D: "Neptundan narida"
    },
    correct_answer: 'A',
    explanation_reference: "Asosiy asteroidlar belbogʻi Mars va Yupiter sayyoralari oʻrtasida joylashgan boʻlib, Serera, Vesta kabi minglab asteroidlarni oʻz ichiga oladi."
  },
  {
    id: 'dtm-astro-25',
    subject: 'Astronomiya',
    topic: 'Kometalar',
    question: 'Quyoshga yaqinlashganda dumi paydo boʻladigan, muz va changdan iborat osmon jismi nima?',
    options: {
      A: "Kometa (dumli yulduz)",
      B: "Meteorit",
      C: "Kvazar",
      D: "Pulsar"
    },
    correct_answer: 'A',
    explanation_reference: "Kometalar Quyoshga yaqinlashganda muzlar bugʻlanib, Quyosh shamoli taʼsirida Quyoshga qarama-qarshi yoʻnalgan uzun gaz va chang dumi hosil boʻladi."
  },
  {
    id: 'dtm-astro-26',
    subject: 'Astronomiya',
    topic: 'Yulduzlar spektri va harorati',
    question: 'Sirt harorati eng yuqori boʻlgan (30 000 K dan yuqori) yulduzlar qanday rangda nurlanadi?',
    options: {
      A: "Moviy va koʻk rangda",
      B: "Qizil rangda",
      C: "Sariq rangda",
      D: "Toʻq sariq rangda"
    },
    correct_answer: 'A',
    explanation_reference: "Vin qonuniga koʻra eng qaynoq yulduzlar (O va B sinflari) koʻk-moviy rangda, sovuq yulduzlar (M sinfi, ~3000 K) esa qizil rangda boʻladi."
  },
  {
    id: 'dtm-astro-27',
    subject: 'Astronomiya',
    topic: 'Quyosh qaysi spektral sinfga kiradi?',
    question: 'Bizning Quyoshimiz Gershprung-Ressel diagrammasida qaysi spektral sinfga mansub sariq mitti yulduz hisoblanadi?',
    options: {
      A: "G2V sinfiga",
      B: "M5III sinfiga",
      C: "B0I sinfiga",
      D: "A0V sinfiga"
    },
    correct_answer: 'A',
    explanation_reference: "Quyosh asosiy ketma-ketlikdagi G2V spektral sinfiga mansub sariq mitti yulduzdir (sirt harorati taxminan 5800 K)."
  },
  {
    id: 'dtm-astro-28',
    subject: 'Astronomiya',
    topic: 'Yulduzlar evolyutsiyasi',
    question: 'Massasi Quyoshnikiga yaqin boʻlgan yulduzlar oʻz umrining soʻnggi bosqichida nimalarga aylanadi?',
    options: {
      A: "Oq mitti yulduzga",
      B: "Qora tuynukka",
      C: "Neytron yulduzga (Pulsarga)",
      D: "Kvazarga"
    },
    correct_answer: 'A',
    explanation_reference: "Quyosh massasidagi yulduzlar qizil gigantga aylanib, gaz qobigʻini tashlagach, zich va qaynoq oq mitti yadroga aylanadi."
  },
  {
    id: 'dtm-astro-29',
    subject: 'Astronomiya',
    topic: 'Superyangi yulduzlar va qora tuynuklar',
    question: 'Massasi Quyoshnikidan 20–30 baravar katta boʻlgan ulkan yulduzlar portlab, gravitatsion kollapsga uchraganda nima hosil boʻladi?',
    options: {
      A: "Qora tuynuk (Black Hole)",
      B: "Oq mitti",
      C: "Sayyoraviy tumanlik",
      D: "Qoʻngʻir mitti"
    },
    correct_answer: 'A',
    explanation_reference: "Juda katta massali yulduzlar superyangi portlashidan soʻng gravitatsion tortishish yorugʻlikni ham chiqarmaydigan Qora tuynukni vujudga keltiradi."
  },
  {
    id: 'dtm-astro-30',
    subject: 'Astronomiya',
    topic: 'Bizning Galaktikamiz',
    question: 'Quyosh sistemasi joylashgan bizning Galaktikamiz qanday nomlanadi va uning shakli qanday?',
    options: {
      A: "Somon yoʻli (Spiral shaklda)",
      B: "Andromeda (Elliptik)",
      C: "Magellan buluti (Notoʻgʻri)",
      D: "Sombrero"
    },
    correct_answer: 'A',
    explanation_reference: "Bizning Somon yoʻli galaktikamiz toʻsiqli spiral (SBb) shaklida boʻlib, diametri 100 000 yorugʻlik yilidan ortiq."
  },
  {
    id: 'dtm-astro-31',
    subject: 'Astronomiya',
    topic: 'Xabbl qonuni va Koinotning kengayishi',
    question: 'Uzoq galaktikalarning bizdan uzoqlashish tezligi ulargacha boʻlgan masofaga toʻgʻri proporsional ekanligini ifodalovchi qonun qaysi?',
    options: {
      A: "Xabbl qonuni: v = H · r",
      B: "Kepler qonuni",
      C: "Nyuton qonuni",
      D: "Stefan-Bolsman qonuni"
    },
    correct_answer: 'A',
    explanation_reference: "Edvin Xabbl 1929-yilda qizil siljishni oʻrganib, Koinot kengayayotganini va v = H·r formulasini kashf etdi."
  },
  {
    id: 'dtm-astro-32',
    subject: 'Astronomiya',
    topic: 'Katta portlash nazariyasi',
    question: 'Zamonaviy astrofizika maʼlumotlariga koʻra bizning Koinotimizning yoshi taxminan qancha?',
    options: {
      A: "13.8 milliard yil",
      B: "4.5 milliard yil",
      C: "100 milliard yil",
      D: "1 million yil"
    },
    correct_answer: 'A',
    explanation_reference: "Plank kosmik observatoriyasi relikt nurlanishni tahlil qilib Koinotning yoshini 13.787 ± 0.020 milliard yil deb aniqladi."
  },
  {
    id: 'dtm-astro-33',
    subject: 'Astronomiya',
    topic: 'Eng yaqin yulduz',
    question: 'Quyoshdan keyin Yerga eng yaqin joylashgan yulduz tizimi qaysi?',
    options: {
      A: "Proksima Sentavr (Alfa Sentavr tizimi)",
      B: "Sirius",
      C: "Vega",
      D: "Polyus yulduzi"
    },
    correct_answer: 'A',
    explanation_reference: "Proksima Sentavr Yerdan 4.24 yorugʻlik yili masofada joylashgan eng yaqin qizil mitti yulduzdir."
  },
  {
    id: 'dtm-astro-34',
    subject: 'Astronomiya',
    topic: 'Mirzo Ulugʻbek astronomik merosi',
    question: 'Mirzo Ulugʻbek oʻz rasadxonasida yulduzlar yilining davomiyligini qanday aniqlikda hisoblab chiqqan edi?',
    options: {
      A: "365 kun, 6 soat, 10 daqiqa, 8 soniya (zamonaviy oʻlchovdan bor-yoʻgʻi 58 soniyaga farq qiladi)",
      B: "365 kun, 5 soat",
      C: "366 kun aniq",
      D: "365 kun 12 soat"
    },
    correct_answer: 'A',
    explanation_reference: "XV asrda Mirzo Ulugʻbek teleskoplarsiz, ulkan sekstant yordamida yulduzlar yilini gʻayritabiiy yuqori aniqlikda hisoblagan."
  },
  {
    id: 'dtm-astro-35',
    subject: 'Astronomiya',
    topic: 'Ekzosayyoralar',
    question: 'Quyosh sistemasidan tashqaridagi, boshqa yulduzlar atrofida aylanuvchi sayyoralar nima deb ataladi?',
    options: {
      A: "Ekzosayyoralar",
      B: "Asteroidlar",
      C: "Kometalar",
      D: "Pulsarlar"
    },
    correct_answer: 'A',
    explanation_reference: "Ekzosayyoralar (extrasolar planets) — bizning Quyosh sistemasidan tashqaridagi boshqa yulduzlar atrofida kashf etilgan sayyoralardir."
  }
];
