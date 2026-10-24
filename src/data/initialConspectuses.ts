import { BookConspectus } from '../types';

export const INITIAL_BOOK_CONSPECTUSES: Record<string, BookConspectus> = {
  'Algebra 8-sinf': {
    id: 'conspectus-alg-8',
    book_title: 'Algebra 8-sinf',
    subject: 'Matematika',
    grade: '8-sinf',
    pdf_url: '/books/algebra_8_uzb.pdf',
    overview: "8-sinf Algebra darsligi haqiqiy sonlar, arifmetik kvadrat ildizlar, kvadrat tenglamalar, Viyet teoremasi hamda kvadratik funksiyalar va tengsizliklarni chuqur o'rgatuvchi fundamental qo'llanmadir.",
    chapters: [
      {
        chapter_num: 1,
        chapter_title: '1-bob: Kvadrat ildizlar va haqiqiy sonlar',
        summary_points: [
          'Arifmetik kvadrat ildiz faqat nomanfiy sonlardan olinadi: a ≥ 0 boʻlganda √a ≥ 0.',
          'Ixtiyoriy haqiqiy a soni uchun: √(a²) = |a| tenglik doimo oʻrinli.',
          'Koʻpaytma va kasrning ildizi: √(a · b) = √a · √b va √(a / b) = √a / √b (a ≥ 0, b > 0).',
          'Ratsional va irratsional sonlar birgalikda haqiqiy sonlar toʻplamini (R) tashkil etadi.',
          'Maxrajdagi irratsionallikdan qutulish uchun surat va maxraj qoʻshma ifodaga koʻpaytiriladi: 1 / (√a - √b) = (√a + √b) / (a - b).',
        ],
        formulas: [
          '√(a²) = |a|',
          '√(a · b) = √a · √b',
          '√(a / b) = √a / √b (b > 0)',
        ],
        dtm_facts: [
          'DTM testlarida √(a²) ifodani ochishda modul |a| belgisini hisobga olmaslik eng koʻp tarqalgan xatodir.',
        ],
      },
      {
        chapter_num: 2,
        chapter_title: '2-bob: Kvadrat tenglamalar va Viyet teoremasi',
        summary_points: [
          'Kvadrat tenglamaning umumiy koʻrinishi: ax² + bx + c = 0 (a ≠ 0).',
          'Diskriminant: D = b² - 4ac. Agar D > 0 boʻlsa 2 ta ildiz, D = 0 boʻlsa 1 ta ildiz, D < 0 boʻlsa haqiqiy ildiz mavjud emas.',
          'Ildizlar formulasi: x₁,₂ = (-b ± √D) / (2a).',
          'Viyet teoremasi: x₁ + x₂ = -b / a, x₁ · x₂ = c / a.',
          'Kvadrat uchhadni koʻpaytuvchilarga ajratish: ax² + bx + c = a(x - x₁)(x - x₂).',
        ],
        formulas: [
          'D = b² - 4ac',
          'x₁,₂ = (-b ± √D) / (2a)',
          'x₁ + x₂ = -b/a,  x₁ · x₂ = c/a',
          'ax² + bx + c = a(x - x₁)(x - x₂)',
        ],
        dtm_facts: [
          'DTM savollarida ildizlarni alohida topmasdan x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂ ifoda orqali tezkor hisoblash soʻraladi.',
        ],
      },
      {
        chapter_num: 3,
        chapter_title: '3-bob: Kvadratik funksiya va uning grafigi',
        summary_points: [
          'y = ax² + bx + c (a ≠ 0) funksiyasi grafigi paraboladir.',
          'a > 0 boʻlsa parabola shoxlari yuqoriga, a < 0 boʻlsa pastga yoʻnaladi.',
          'Parabola uchi koordinatalari: x₀ = -b / (2a), y₀ = -D / (4a).',
          'Parabolaning simmetriya oʻqi: x = -b / (2a) toʻgʻri chizigʻidir.',
          'Kvadratik tengsizliklar intervallar usuli orqali nollarini topish bilan yechiladi.',
        ],
        formulas: [
          'x₀ = -b / (2a)',
          'y₀ = y(x₀) = -D / (4a)',
          'y = a(x - x₀)² + y₀',
        ],
        dtm_facts: [
          'Funksiyaning eng katta yoki eng kichik qiymati uning uchi y₀ nuqtasida erishiladi.',
        ],
      },
    ],
    global_formulas: [
      'D = b² - 4ac',
      'x₁,₂ = (-b ± √D) / (2a)',
      'x₁ + x₂ = -b / a,  x₁ · x₂ = c / a',
      'x₀ = -b / (2a),  y₀ = -D / (4a)',
      '√(a²) = |a|',
    ],
    dtm_focus_points: [
      '1. Viyet teoremasidan foydalanib ildizlar simmetrik ifodalarini (x₁³ + x₂³, 1/x₁ + 1/x₂) topish.',
      '2. Modulli ifodalar ostidan kvadrat ildiz chiqarishda manfiy ishorani toʻgʻri inobatga olish.',
      '3. Kvadratik funksiyaning nollari va nollar orasidagi masofani hisoblash.',
      '4. Intervallar usulida qatʼiy (> 0) va noqatʼiy (≥ 0) tengsizliklarda oraliq chegaralarini kiritish.',
      '5. Parametrli kvadrat tenglamalarda yagona ildizga ega boʻlish sharti: D = 0 yoki a = 0 holatini tekshirish.',
    ],
    created_at: new Date().toISOString(),
    model_source: 'Groq API (llama-3.3-70b-versatile)',
  },

  'Geometriya 8-sinf': {
    id: 'conspectus-geom-8',
    book_title: 'Geometriya 8-sinf',
    subject: 'Matematika',
    grade: '8-sinf',
    pdf_url: '/books/geometriya_8_uzb.pdf',
    overview: "8-sinf Geometriya darsligi to'rtburchaklar, parallelogramm, romb, to'g'ri to'rtburchak va kvadrat xossalari, Pifagor teoremasi, uchburchaklar o'xshashligi va yuzalar nazariyasini o'z ichiga oladi.",
    chapters: [
      {
        chapter_num: 1,
        chapter_title: '1-bob: Toʻrtburchaklar va ularning xossalari',
        summary_points: [
          'Parallelogrammning qarama-qarshi tomonlari va burchaklari teng, diagonallari kesishish nuqtasida teng ikkiga boʻlinadi.',
          'Romb — barcha tomonlari teng boʻlgan parallelogramm boʻlib, diagonallari oʻzaro perpendikulyar va burchak bissektrisalaridir.',
          'Toʻgʻri toʻrtburchak diagonallari oʻzaro tengdir (d₁ = d₂).',
          'Kvadrat — toʻgʻri toʻrtburchak va rombning barcha xossalariga ega boʻlgan muntazam shakldir.',
          'Trapetsiya oʻrta chizigʻi asoslariga parallel va ularning yarim yigʻindisiga teng: l = (a + b) / 2.',
        ],
        formulas: [
          'S_parallelogramm = a · h = a · b · sin(α)',
          'S_romb = (d₁ · d₂) / 2 = a · h',
          'l_trapetsiya = (a + b) / 2',
        ],
        dtm_facts: [
          'Romb diagonallari kesishish nuqtasida 4 ta teng toʻgʻri burchakli uchburchak hosil qiladi.',
        ],
      },
      {
        chapter_num: 2,
        chapter_title: '2-bob: Pifagor teoremasi va metrik munosabatlar',
        summary_points: [
          'Pifagor teoremasi: toʻgʻri burchakli uchburchakda c² = a² + b².',
          'Pifagor uchliklari: (3, 4, 5) — Misr uchburchagi, (5, 12, 13), (8, 15, 17), (7, 24, 25).',
          'Gipotenuzaga tushirilgan balandlik: h_c = (a · b) / c va h_c² = a_c · b_c.',
          'Katetlarning proyeksiyalari: a² = c · a_c va b² = c · b_c.',
        ],
        formulas: [
          'c² = a² + b²',
          'h_c = (a · b) / c',
          'h_c² = a_c · b_c',
          'a² = c · a_c',
        ],
        dtm_facts: [
          '30° li burchak qarshisidagi katet gipotenuzaning yarmiga teng: a = c / 2.',
        ],
      },
    ],
    global_formulas: [
      'c² = a² + b²',
      'h_c = (a · b) / c',
      'S_romb = (d₁ · d₂) / 2',
      'S_uchburchak = (a · h) / 2 = (1/2)ab·sin(C) = pr = abc/(4R)',
      'S_trapetsiya = ((a + b) / 2) · h',
    ],
    dtm_focus_points: [
      '1. Ichki va tashqi chizilgan aylanalar radiuslari formulalari.',
      '2. Pifagor sonlaridan foydalanib katet va gipotenuzalarni soniyalarda topish.',
      '3. Toʻgʻri burchakli uchburchak gipotenuzasiga tushirilgan mediana gipotenuzaning yarmiga teng: m = c/2.',
      '4. Oʻxshash koʻpburchaklar yuzalari nisbati oʻxshashlik koeffitsiyenti kvadratiga teng: S₁/S₂ = k².',
      '5. Romb yuzini diagonallar koʻpaytmasi yarmi orqali hisoblash.',
    ],
    created_at: new Date().toISOString(),
    model_source: 'Groq API (llama-3.3-70b-versatile)',
  },

  'Fizika 10-sinf': {
    id: 'conspectus-phys-10',
    book_title: 'Fizika 10-sinf',
    subject: 'Fizika',
    grade: '10-sinf',
    pdf_url: '/books/fizika_10_uzb.pdf',
    overview: "10-sinf Fizika darsligi aylanma harakat kinematikasi, Nyuton mexanikasi, gravitatsiya, molekulyar-kinetik nazariya (MKN) va termodinamika qonuniyatlarini qamrab oladi.",
    chapters: [
      {
        chapter_num: 1,
        chapter_title: '1-bob: Kinematika va Dinamika asoslari',
        summary_points: [
          'Aylanma harakatda chiziqli va burchak tezlik bogʻliqligi: v = ω · R, bunda ω = 2π / T = 2πν.',
          'Markazga intilma tezlanish aylananing markaziga yoʻnaladi: a = v² / R = ω² · R.',
          'Nyutonning ikkinchi qonuni: F = m · a.',
          'Butun olam tortishish qonuni: F = G · (m₁ · m₂) / r² (G = 6.67 · 10⁻¹¹ N·m²/kg²).',
          'Impulsning saqlanish qonuni: yopiq tizimda jismlar impulslarining geometrik yigʻindisi oʻzgarmasdir: m₁v₁ + m₂v₂ = const.',
        ],
        formulas: [
          'v = ω · R',
          'a_m = v² / R = ω² · R',
          'F = m · a',
          'F = G · (m₁ · m₂) / r²',
          'p = m · v',
        ],
        dtm_facts: [
          'Aylanma harakatda tezlik vektori doimo trayektoriyaga urinma boʻlib, tezlanish markazga tik yoʻnaladi.',
        ],
      },
      {
        chapter_num: 2,
        chapter_title: '2-bob: Molekulyar fizika va Termodinamika',
        summary_points: [
          'MKN asosiy tenglamasi: p = (1/3) · n · m₀ · v̄² = (2/3) · n · Ē_k.',
          'Mendeleyev-Klapeyron tenglamasi: p · V = (m / M) · R · T (R = 8.31 J/(mol·K)).',
          'Izojarayonlar: Izotermik (p·V = const), Izobarik (V/T = const), Izoxorik (p/T = const).',
          'Termodinamikaning 1-qonuni: Q = ΔU + A.',
          'Bir atomli ideal gaz ichki energiyasi: U = (3/2) · (m/M) · R · T.',
        ],
        formulas: [
          'p·V = (m/M)·R·T',
          'p = n·k·T',
          'Ē_k = (3/2)·k·T',
          'Q = ΔU + A',
          'η = (T₁ - T₂) / T₁',
        ],
        dtm_facts: [
          'Izoxorik jarayonda gaz tashqi kuchlar ustidan ish bajarmaydi (A = 0, Q = ΔU).',
        ],
      },
    ],
    global_formulas: [
      'p·V = ν·R·T',
      'a_m = v² / R = ω² · R',
      'F = G·(m₁m₂)/r²',
      'Q = ΔU + A',
      'η_karno = (T₁ - T₂) / T₁',
    ],
    dtm_focus_points: [
      '1. Gaz bosimi formulasida molekulalar konsentratsiyasi va harorat bogʻlanishi (p = n·k·T).',
      '2. Karno sikli boʻyicha ishlovchi ideal issiqlik mashinasining maksimal FIK ini topish.',
      '3. Izobarik kengayishda gazning bajargan ishi: A = p·ΔV.',
      '4. Kosmik tezliklar: 1-kosmik tezlik v₁ = √(g·R) ≈ 7.9 km/s.',
      '5. Impuls va kinetik energiya bogʻliqligi: E_k = p² / (2m).',
    ],
    created_at: new Date().toISOString(),
    model_source: 'Groq API (llama-3.3-70b-versatile)',
  },

  'Kimyo 8-sinf': {
    id: 'conspectus-chem-8',
    book_title: 'Kimyo 8-sinf',
    subject: 'Kimyo',
    grade: '8-sinf',
    pdf_url: '/books/kimyo_8_uzb.pdf',
    overview: "8-sinf Kimyo darsligi D.I.Mendeleyev davriy qonuni, atom tuzilishi, kimyoviy bog'lanish turlari, oksidlar, kislotalar, asoslar va tuzlarning sinflari hamda stexiometrik hisoblashlarni tizimli o'rgatadi.",
    chapters: [
      {
        chapter_num: 1,
        chapter_title: '1-bob: D.I.Mendeleyev davriy qonuni va atom tuzilishi',
        summary_points: [
          'Davriy qonun: Kimyoviy elementlar va ularning birikmalari xossalari atom yadrosi zaryadiga davriy ravishda bogʻliqdir.',
          'Atom yadrosi musbat zaryadlangan protonlar (p⁺) va neytral neytronlar (n⁰) dan, qobigʻi elektronlar (e⁻) dan iborat.',
          'Guruh boʻyicha yuqoridan pastga metallik xossasi va atom radiusi ortadi, ionlanish energiyasi va elektromanfiylik kamayadi.',
          'Davr boʻyicha chapdan oʻngga nometallik xossasi, elektromanfiylik va ionlanish energiyasi ortadi, atom radiusi kichrayadi.',
        ],
        formulas: [
          'Z = p⁺ = e⁻ (yadro zaryadi)',
          'A = Z + N (massa soni)',
          'N = A - Z (neytronlar soni)',
        ],
        dtm_facts: [
          'Eng kuchli nometall Ftor (F), eng kuchli barqaror metall Seziy (Cs) hisoblanadi.',
        ],
      },
      {
        chapter_num: 2,
        chapter_title: '2-bob: Kimyoviy bogʻlanish turlari va modda tuzilishi',
        summary_points: [
          'Kovalent qutbsiz bogʻlanish: bir xil nometall atomlari oʻrtasida (H₂, O₂, N₂, Cl₂).',
          'Kovalent qutbli bogʻlanish: elektromanfiyligi har xil boʻlgan nometall atomlari oʻrtasida (HCl, H₂O, NH₃).',
          'Ionli bogʻlanish: elektromanfiyligi keskin farq qiluvchi metall va nometall ionlari oʻrtasida (NaCl, CaO, K₂SO₄).',
          'Metall bogʻlanish: metall ionlari va erkin elektron gazi oʻrtasida boʻladi.',
        ],
        formulas: [
          'ΔEM ≥ 1.7 => Ion bogʻlanish',
          '0 < ΔEM < 1.7 => Kovalent qutbli',
          'ΔEM = 0 => Kovalent qutbsiz',
        ],
        dtm_facts: [
          'Ammoniy ioni (NH₄⁺) da donor-akseptor mexanizmi orqali hosil boʻlgan kovalent bogʻlanish mavjud.',
        ],
      },
    ],
    global_formulas: [
      'n = m / M = V / V_m = N / N_A',
      'V_m = 22.4 l/mol (n.sh.)',
      'N_A = 6.02 · 10²³ ta/mol',
      'w(modda) = (m_modda / m_eritma) · 100%',
      'C_M = n / V_eritma',
    ],
    dtm_focus_points: [
      '1. Davriy sistemadagi qonuniyatlar: chapdan oʻngga va yuqoridan pastga xossalar oʻzgarishi.',
      '2. Gazlarning havoga yoki vodorodga nisbiy zichligini topish: D_havo = M / 29.',
      '3. Stexiometrik tenglamalar boʻyicha unum va ortiqcha-kam modda masalalarini yechish.',
      '4. Kristall panjara turlari (atom, molekulyar, ion, metall) va ularning qattiqlik/erish harorati xossalari.',
      '5. Oksidlanish-qaytarilish reaksiyalarida elektron balans usuli orqali koeffitsiyentlarni tenglashtirish.',
    ],
    created_at: new Date().toISOString(),
    model_source: 'Groq API (llama-3.3-70b-versatile)',
  },

  'Biologiya 10-sinf': {
    id: 'conspectus-bio-10',
    book_title: 'Biologiya 10-sinf',
    subject: 'Biologiya',
    grade: '10-sinf',
    pdf_url: '/books/biologiya_10_uzb.pdf',
    overview: "10-sinf Biologiya darsligi sitologiya, hujayraning kimyoviy tarkibi, oqsillar biosintezi, fotosintez, xemosintez hamda irsiyat va o'zgaruvchanlikning asosiy qonunlarini qamrab oladi.",
    chapters: [
      {
        chapter_num: 1,
        chapter_title: '1-bob: Sitologiya va hujayraning kimyoviy tarkibi',
        summary_points: [
          'Hujayradagi anorganik moddalar: suv (70-80%) va mineral tuzlar.',
          'Biopolimerlar: oqsillar (monomeri — aminokislotalar), nuklein kislotalar (monomeri — nukleotidlar), polisaxaridlar (glyukoza).',
          'DNK tuzilishi: Chargaff qoidasi boʻyicha A = T va G = S. Nukleotidlar oʻzaro fosfodiefir bogʻlari bilan bogʻlanadi.',
          'Oqsillarning toʻrt xil strukturasi: birlamchi (peptid bogʻlar), ikkilamchi (vodorod bogʻlar), uchlamchi (disulfid -S-S-), toʻrtlamchi (gemoglobin).',
        ],
        formulas: [
          'A = T,  G = S (Chargaff qoidasi)',
          'A + T + G + S = 100%',
          'DNK uzunligi: l = n · 0.34 nm',
          'Oʻrtacha nukleotid massasi = 345 Da',
        ],
        dtm_facts: [
          'A va T oʻrtasida 2 ta, G va S oʻrtasida 3 ta vodorod bogʻi hosil boʻladi.',
        ],
      },
      {
        chapter_num: 2,
        chapter_title: '2-bob: Genetika asoslari va Mendel qonunlari',
        summary_points: [
          'Mendelning 1-qonuni (Bir xillik qonuni): Birinchi avlod duragaylari fenotip va genotip boʻyicha bir xil boʻladi (Aa).',
          'Mendelning 2-qonuni (Belgilarning ajralish qonuni): F2 da fenotip boʻyicha 3:1, genotip boʻyicha 1:2:1 nisbatda ajralish roʻy beradi.',
          'Mendelning 3-qonuni (Erkin kombinatsiyalanish): Digeterozigotalar chatishtirilganda (AaBb x AaBb) fenotipik ajralish 9:3:3:1 boʻladi.',
          'T.Morgan qonuni: Bitta xromosomada joylashgan genlar birikkan holda nasldan naslga oʻtadi (Krossingover bundan mustasno).',
        ],
        formulas: [
          'F2 (monoduragay): Fenotip 3:1, Genotip 1:2:1',
          'F2 (diduragay): Fenotip 9:3:3:1',
          'Krossingover foizi = (rekombinantlar / jami) · 100%',
        ],
        dtm_facts: [
          'Jins bilan birikkan holda irsiylanuvchi kasalliklar: gemofiliya va daltonizm X-xromosoma retsessiv geniga bogʻliq.',
        ],
      },
    ],
    global_formulas: [
      'A = T,  G = S',
      'l_DNK = N/2 · 0.34 nm',
      'M_DNK = N · 345 Da',
      'Jami vodorod bogʻlari = 2·(A) + 3·(G)',
      'Digeterozigota ajralishi: 9:3:3:1',
    ],
    dtm_focus_points: [
      '1. DNK va RNK nukleotidlari soni, uzunligi va vodorod bogʻlarini hisoblash masalalari.',
      '2. Oqsil biosintezi: transkripsiya va translatsiya bosqichlari hamda genetik kod xususiyatlari (tripletlilik, universallik).',
      '3. Mitoz va meyoz bosqichlarida xromosomalar (n) va DNK (c) toʻplami: 2n2c -> 2n4c -> 1n2c -> 1n1c.',
      '4. Qon guruhlari irsiylanishi (I^0, I^A, I^B) boʻyicha masalalar.',
      '5. Oʻzgaruvchanlik turlari: modifikatsion (irsiy emas) va mutatsion/kombinativ (irsiy).',
    ],
    created_at: new Date().toISOString(),
    model_source: 'Groq API (llama-3.3-70b-versatile)',
  },

  'Özbekiston tarixi 10-sinf': {
    id: 'conspectus-hist-10',
    book_title: 'Özbekiston tarixi 10-sinf',
    subject: 'Tarix',
    grade: '10-sinf',
    pdf_url: '/books/ozbekiston_tarixi_10_uzb.pdf',
    overview: "10-sinf O'zbekiston tarixi darsligi XIV-XVI asrlardagi Amir Temur va Temuriylar davlati, davlat boshqaruvi, iqtisodiy-madaniy yuksalish, ilm-fan rivoji hamda Shayboniylar sulolasi davrini chuqur yoritadi.",
    chapters: [
      {
        chapter_num: 1,
        chapter_title: '1-bob: Amir Temur va Temuriylar davlati',
        summary_points: [
          'Amir Temur 1336-yil 9-aprelda Kesh (Shahrisabz) yaqinidagi Xoʻja Ilgʻor qishlogʻida tavallud topgan.',
          '1370-yil 10-aprelda Balx qurultoyida Amir Temur Movarounnahrning oliy hukmdori deb eʼlon qilindi va Samarqand poytaxt etib belgilandi.',
          '"Temur tuzuklari" — buyuk sohibqironning davlat boshqaruvi, harbiy sanʼati va qonun-qoidalari mujassamlangan muhim tarixiy asardir.',
          '1402-yil 20-iyuldagi Anqara jangida Amir Temur Usmonli turk sultoni Boyazid I Yildirim ustidan gʻalaba qozondi.',
          'Mirzo Ulugʻbek (1409-1449) davrida Samarqand jahon ilmiy markaziga aylandi; 1018 ta yulduz harakatini oʻz ichiga olgan "Ziji jadidi Koʻragoniy" yaratildi.',
        ],
        formulas: [
          '1336-yil 9-aprel — Amir Temur tavalludi',
          '1370-yil 10-aprel — Balx qurultoyi, taxtga oʻtirishi',
          '1402-yil 20-iyul — Anqara jangi',
          '1444-yil — Ulugʻbek rasadxonasi va Ziji jadidi Koʻragoniy',
        ],
        dtm_facts: [
          'Amir Temurning davlat shiori: "Kuch — adolatdadir" ("Rosti rusti").',
        ],
      },
    ],
    global_formulas: [
      '1370-1507 yillar — Movarounnahrda Temuriylar sulolasi hukmronligi',
      '1449-yil — Mirzo Ulugʻbek fojiasi',
      '1469-1506 yillar — Xurosonda Husayn Boyqaro va Alisher Navoiy davri',
      '1500-yil — Muhammad Shayboniyxon tomonidan Samarqand egallanishi',
    ],
    dtm_focus_points: [
      '1. Amir Temur yurishlari ketma-ketligi (Xorazm, Eron, Oltin Oʻrda, Hindiston, Anqara).',
      '2. Temuriylar davri meʼmoriy yodgorliklari (Goʻri Amir, Bibixonim, Shohi Zinda, Ulugʻbek madrasasi).',
      '3. Alisher Navoiyning hayoti, lavozimlari (muhrdor, vazir) va "Xamsa" dostoni yaratilgan yillar (1483-1485).',
      '4. Boburning hayoti, "Boburnoma" asari va 1526-yil Panipat jangida Boburiylar saltanatiga asos solishi.',
      '5. Movarounnahr va Xuroson ijtimoiy tabaqalari hamda soliq tizimi (xiroj, zakot, jizya, tamgʻa).',
    ],
    created_at: new Date().toISOString(),
    model_source: 'Groq API (llama-3.3-70b-versatile)',
  },

  'Ona tili 8-sinf': {
    id: 'conspectus-lang-8',
    book_title: 'Ona tili 8-sinf',
    subject: 'Ona tili va adabiyot',
    grade: '8-sinf',
    pdf_url: '/books/ona_tili_8_uzb.pdf',
    overview: "8-sinf Ona tili darsligi sintaksis bo'limi, so'z birikmalari turlari, sodda gap va uning turlari, gap bo'laklari (bosh va ikkinchi darajali), shuningdek tinish belgilarining ishlatilish me'yorlarini qamrab oladi.",
    chapters: [
      {
        chapter_num: 1,
        chapter_title: '1-bob: Sintaksis va soʻz birikmalari',
        summary_points: [
          'Sintaksis soʻz birikmasi va gap qurilishini oʻrganadi. Soʻz birikmasi tobe va hokim soʻzdan tashkil topadi.',
          'Tobe bogʻlanish turlari: boshqaruv (kelishik yoki koʻmakchi orqali), moslashuv (shaxs-son qoʻshimchalari orqali), bitishuv (ohang va soʻz tartibi orqali).',
          'Soʻz birikmasi hisoblanmaydi: ega va kesim birikmasi (gap), teng bogʻlangan soʻzlar (kitob va daftar), frazeologizmlar, yordamchi va mustaqil soʻz birikmasi.',
        ],
        formulas: [
          'Boshqaruv: kitobni oʻqimoq (tushum), maktabga bormoq (joʻnalish)',
          'Moslashuv: mening kitobim (qaratqich - egalik)',
          'Bitishuv: tez yugurmoq, chiroyli bino (hech qanday qoʻshimchasiz)',
        ],
        dtm_facts: [
          'DTM testlarida "tobe bogʻlanish qatnashmagan qatorni toping" savolida doimo ega-kesim yoki teng bogʻlangan soʻzlar beriladi.',
        ],
      },
      {
        chapter_num: 2,
        chapter_title: '2-bob: Gap boʻlaklari va gap turlari',
        summary_points: [
          'Bosh boʻlaklar: Ega (kim? nima? qayer?) va Kesim (nima qildi? kimdir?). Kesim gapning markaziy oʻqidir.',
          'Ikkinchi darajali boʻlaklar: Toʻldiruvchi (vositali va vositasiz), Aniqlovchi (sifatlovchi va qaratqich), Hol (oʻrin, payt, sabab, maqsad, ravish).',
          'Bir sostavli gaplar: Shaxsi maʼlum, shaxsi nomaʼlum, shaxsi umumiy, umumlashgan va atov gaplar.',
        ],
        formulas: [
          'Vositasiz toʻldiruvchi: Tushum kelishigidagi soʻz (-ni)',
          'Qaratqich aniqlovchi: Qaratqich kelishigidagi soʻz (-ning)',
          'Sifatlovchi aniqlovchi: qanday? qaysi? qancha?',
        ],
        dtm_facts: [
          'Atov gaplarda kesim boʻlmaydi, faqat bosh kelishikdagi ega ishtirok etadi (Bahor. Tunning sokinligi.).',
        ],
      },
    ],
    global_formulas: [
      'Tobe bogʻlanish = Moslashuv + Boshqaruv + Bitishuv',
      'Bir bosh boʻlakli gaplar = Shaxsi maʼlum / nomaʼlum / umumiy + Atov gap',
      'Qoʻshma gaplar = Bogʻlangan + Ergashgan + Bogʻlovchisiz',
    ],
    dtm_focus_points: [
      '1. Bogʻlanish usullarini soʻz qoʻshimchalariga koʻra aniq ajratish (moslashuv, boshqaruv, bitishuv).',
      '2. Bir sostavli gap turlari: shaxsi nomaʼlum (kesim 3-shaxs koʻplikda) va umumlashgan gaplar (maqollar).',
      '3. Ergash gapli qoʻshma gaplarda bosh va ergash gap chegarasi hamda tinish belgilari.',
      '4. Ajratilgan boʻlaklar, kiritmalar va undalmalarda vergul qoʻyilish qoidalari.',
      '5. Omonim, sinonim, antonim va paronim soʻzlarning toʻgʻri maʼno qoʻllanilishi.',
    ],
    created_at: new Date().toISOString(),
    model_source: 'Groq API (llama-3.3-70b-versatile)',
  },
};
