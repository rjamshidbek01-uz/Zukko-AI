import { BookChapter } from '../types';

export const COMPREHENSIVE_TEXTBOOKS_KNOWLEDGE: BookChapter[] = [
  // =========================================================================
  // 1. ALGEBRA 8-SINF
  // =========================================================================
  {
    id: 'alg-8-ch1',
    subject: 'Matematika',
    chapter_title: 'Algebra 8-sinf — 1-bob: Kvadrat ildizlar va haqiqiy sonlar',
    section_title: 'Arifmetik kvadrat ildiz xossalari va irratsional sonlar',
    pdf_url: '/books/algebra_8_uzb.pdf',
    pdf_page: 5,
    content: `Kvadrat ildiz tushunchasi elementar algebraning eng muhim tushunchalaridan biridir.
Nomanfiy a sonining arifmetik kvadrat ildizi deb, kvadrati a ga teng boʻlgan nomanfiy b soniga aytiladi va √a shaklida belgilanadi.
Taʼrifga koʻra: (√a)² = a, bunda a ≥ 0, √a ≥ 0.

Haqiqiy sonlar toʻplami:
Ratsional sonlar (chekli yoki davriy oʻnli kasrlar) va irratsional sonlar (cheksiz nodavriy oʻnli kasrlar, masalan: √2, √3, π, e) birgalikda haqiqiy sonlar toʻplamini (R) tashkil etadi.

Arifmetik kvadrat ildizning asosiy xossalari:
1. Koʻpaytmaning ildizi: √(a · b) = √a · √b (a ≥ 0, b ≥ 0). Ikkita nomanfiy son koʻpaytmasining ildizi ularning ildizlari koʻpaytmasiga teng.
2. Kasrning ildizi: √(a / b) = √a / √b (a ≥ 0, b > 0). Kasrning ildizi surat va maxrajning ildizlari nisbatiga teng.
3. Darajaning ildizi: √(a²ⁿ) = aⁿ (a ≥ 0) yoki ixtiyoriy haqiqiy a uchun: √(a²) = |a|.

Koʻpaytuvchini ildiz belgisi ostidan chiqarish va kiritish:
Misol: √(75) = √(25 · 3) = 5√3. Koʻpaytuvchini ildiz ostiga kiritishda: a√b = √(a² · b) (agar a ≥ 0 boʻlsa).
Kasr maxrajidagi irratsionallikdan qutulish: Maxrajni qoʻshmasiga koʻpaytirish orqali irratsionallik yoʻqotiladi: 1 / (√a - √b) = (√a + √b) / (a - b).`,
    summary_points: [
      "Arifmetik kvadrat ildiz faqat nomanfiy sonlardan olinadi va qiymati ham doimo nomanfiy boʻladi.",
      "Ixtiyoriy haqiqiy a soni uchun: √(a²) = |a| tenglik doimo oʻrinli.",
      "√(a · b) = √a · √b va √(a / b) = √a / √b (a ≥ 0, b > 0).",
      "Ratsional va irratsional sonlar birgalikda haqiqiy sonlar toʻplami R ni tashkil etadi.",
      "Maxrajdagi irratsionallikdan qutulish uchun kasrning surat va maxraji qoʻshma ifodaga koʻpaytiriladi."
    ],
    formulas_or_rules: [
      '√(a²) = |a|',
      '√(a · b) = √a · √b (a ≥ 0, b ≥ 0)',
      '√(a / b) = √a / √b (a ≥ 0, b > 0)',
      '1 / (√a - √b) = (√a + √b) / (a - b)'
    ]
  },
  {
    id: 'alg-8-ch2',
    subject: 'Matematika',
    chapter_title: 'Algebra 8-sinf — 2-bob: Kvadrat tenglamalar va Viyet teoremasi',
    section_title: 'Toʻliq va toʻliqsiz kvadrat tenglamalar, diskriminant tahlili',
    pdf_url: '/books/algebra_8_uzb.pdf',
    pdf_page: 42,
    content: `ax² + bx + c = 0 (bu yerda a ≠ 0, a, b, c — berilgan haqiqiy sonlar, x — nomaʼlum) koʻrinishidagi tenglama kvadrat tenglama deyiladi.
Agar b = 0 yoki c = 0 boʻlsa, bunday tenglama toʻliqsiz kvadrat tenglama deb ataladi:
1) ax² = 0 => x = 0;
2) ax² + c = 0 => x² = -c/a (agar -c/a > 0 boʻlsa, x = ±√(-c/a));
3) ax² + bx = 0 => x(ax + b) = 0 => x₁ = 0, x₂ = -b/a.

Diskriminant va ildizlar soni:
D = b² - 4ac ifoda kvadrat tenglamaning diskriminanti deyiladi.
- Agar D > 0 boʻlsa, tenglama ikkita turli haqiqiy ildizga ega: x₁,₂ = (-b ± √D) / (2a);
- Agar D = 0 boʻlsa, tenglama bitta karrali ildizga ega: x = -b / (2a);
- Agar D < 0 boʻlsa, tenglama haqiqiy sonlar toʻplamida ildizga ega emas.

Viyet teoremasi:
Keltirilgan kvadrat tenglamada (x² + px + q = 0) ildizlar yigʻindisi qarama-qarshi ishora bilan olingan ikkinchi koeffitsiyentga, ildizlar koʻpaytmasi esa ozod hadga teng:
x₁ + x₂ = -p va x₁ · x₂ = q.
Umumiy ax² + bx + c = 0 tenglama uchun:
x₁ + x₂ = -b / a, x₁ · x₂ = c / a.
Kvadrat uchhadni chiziqli koʻpaytuvchilarga ajratish:
ax² + bx + c = a(x - x₁)(x - x₂).`,
    summary_points: [
      "Kvadrat tenglamaning umumiy koʻrinishi: ax² + bx + c = 0, a ≠ 0.",
      "Diskriminant formulasi: D = b² - 4ac.",
      "D > 0 da 2 ta ildiz, D = 0 da 1 ta ildiz, D < 0 da haqiqiy ildiz yoʻq.",
      "Viyet formulalari: x₁ + x₂ = -b/a, x₁ · x₂ = c/a.",
      "Kvadrat uchhadni koʻpaytuvchilarga ajratish: ax² + bx + c = a(x - x₁)(x - x₂)."
    ],
    formulas_or_rules: [
      'D = b² - 4ac',
      'x₁,₂ = (-b ± √D) / (2a)',
      'x₁ + x₂ = -b / a',
      'x₁ · x₂ = c / a',
      'ax² + bx + c = a(x - x₁)(x - x₂)'
    ]
  },
  {
    id: 'alg-8-ch3',
    subject: 'Matematika',
    chapter_title: 'Algebra 8-sinf — 3-bob: Kvadratik funksiya va uning grafigi',
    section_title: 'y = ax² + bx + c parabolasi, simmetriya oʻqi va nollari',
    pdf_url: '/books/algebra_8_uzb.pdf',
    pdf_page: 88,
    content: `y = ax² + bx + c (a ≠ 0) koʻrinishidagi funksiya kvadratik funksiya deb ataladi. Uning grafigi parabola deb ataluvchi egri chiziqdir.
Parabola shoxlarining yoʻnalishi:
- Agar a > 0 boʻlsa, parabolaning shoxlari yuqoriga yoʻnalgan boʻladi; funksiya x = x₀ nuqtada oʻzining eng kichik qiymatiga erishadi;
- Agar a < 0 boʻlsa, parabolaning shoxlari pastga yoʻnalgan boʻladi; funksiya x = x₀ nuqtada oʻzining eng katta qiymatiga erishadi.

Parabola uchining koordinatalari:
x₀ = -b / (2a);
y₀ = y(x₀) = (4ac - b²) / (4a) = -D / (4a).
Parabolaning simmetriya oʻqi: x = -b / (2a) toʻgʻri chizigʻidan iborat.

Kvadratik tengsizliklarni intervallar usulida yechish:
ax² + bx + c > 0 yoki < 0 tengsizliklarini yechish uchun avval uning nollari x₁ va x₂ topiladi, sonlar oʻqiga qoʻyilib oraliqlarga ajratiladi va har bir oraliqda ishoralar aniqlanadi.`,
    summary_points: [
      "Kvadratik funksiya grafigi parabola boʻlib, a > 0 da shoxlari yuqoriga, a < 0 da pastga qaraydi.",
      "Parabola uchining absissasi: x₀ = -b / (2a).",
      "Parabolaning simmetriya oʻqi x = x₀ toʻgʻri chizigʻidir.",
      "Kvadratik tengsizliklar nollarini topib, sonlar oʻqida intervallar usuli bilan yechiladi."
    ],
    formulas_or_rules: [
      'x₀ = -b / (2a)',
      'y₀ = -D / (4a)',
      'y = a(x - x₀)² + y₀'
    ]
  },

  // =========================================================================
  // 2. GEOMETRIYA 8-SINF
  // =========================================================================
  {
    id: 'geom-8-ch1',
    subject: 'Matematika',
    chapter_title: 'Geometriya 8-sinf — 1-bob: Toʻrtburchaklar va ularning turlari',
    section_title: 'Parallelogramm, toʻgʻri toʻrtburchak, romb va kvadrat xossalari',
    pdf_url: '/books/geometriya_8_uzb.pdf',
    pdf_page: 8,
    content: `Qarama-qarshi tomonlari juft-jufti bilan parallel boʻlgan toʻrtburchak parallelogramm deyiladi.
Parallelogramm xossalari:
1. Qarama-qarshi tomonlari teng: AB = CD, BC = AD.
2. Qarama-qarshi burchaklari teng: ∠A = ∠C, ∠B = ∠D. Bir tomonga yopishgan burchaklari yigʻindisi 180° ga teng: ∠A + ∠B = 180°.
3. Diagonallari kesishish nuqtasida teng ikkiga boʻlinadi: AO = OC, BO = OD.

Romb va uning xossalari:
Barcha tomonlari teng boʻlgan parallelogramm romb deyiladi.
Romb diagonallari oʻzaro perpendikulyar boʻlib, uning ichki burchaklarining bissektrisalari hisoblanadi (d₁ ⊥ d₂).
Romb yuzi: S = (d₁ · d₂) / 2 = a · h = a² · sin(α).

Toʻgʻri toʻrtburchak va Kvadrat:
Barcha burchaklari toʻgʻri (90°) boʻlgan parallelogramm toʻgʻri toʻrtburchak deyiladi. Uning diagonallari oʻzaro tengdir (d₁ = d₂).
Barcha tomonlari va barcha burchaklari teng boʻlgan toʻrtburchak kvadrat deyiladi.`,
    summary_points: [
      "Parallelogramm diagonallari kesishish nuqtasida teng ikkiga boʻlinadi.",
      "Rombning diagonallari oʻzaro perpendikulyar va burchak bissektrisalari boʻladi.",
      "Toʻgʻri toʻrtburchak diagonallari oʻzaro tengdir.",
      "Kvadrat — toʻgʻri toʻrtburchak va rombning barcha xossalarini oʻzida mujassam etgan shakldir."
    ],
    formulas_or_rules: [
      'S_parallelogramm = a · h = a · b · sin(α)',
      'S_romb = (d₁ · d₂) / 2',
      'd² = a² + b² (toʻgʻri toʻrtburchakda)'
    ]
  },
  {
    id: 'geom-8-ch2',
    subject: 'Matematika',
    chapter_title: 'Geometriya 8-sinf — 2-bob: Pifagor teoremasi va metrik munosabatlar',
    section_title: 'Toʻgʻri burchakli uchburchakda katetlar, gipotenuza va balandlik',
    pdf_url: '/books/geometriya_8_uzb.pdf',
    pdf_page: 54,
    content: `Pifagor teoremasi:
Toʻgʻri burchakli uchburchakda gipotenuzaning kvadrati katetlar kvadratlarining yigʻindisiga teng:
c² = a² + b² (bu yerda c — gipotenuza, a va b — katetlar).
Pifagor teoremasiga teskari teorema: Agar uchburchakning bir tomoni kvadrati qolgan ikki tomoni kvadratlari yigʻindisiga teng boʻlsa, bu uchburchak toʻgʻri burchakli boʻladi.

Pifagor sonlari:
Tomonlari butun sonlardan iborat boʻlgan toʻgʻri burchakli uchburchaklar: (3, 4, 5) — Misr uchburchagi, (5, 12, 13), (8, 15, 17), (7, 24, 25).

Toʻgʻri burchak uchidan tushirilgan balandlik xossalari:
Toʻgʻri burchak uchidan gipotenuzaga tushirilgan h_c balandlik gipotenuzani c_a va c_b proyeksiyalarga ajratadi:
1) h_c² = c_a · c_b => h_c = √(c_a · c_b);
2) a² = c · c_a va b² = c · c_b;
3) h_c = (a · b) / c.`,
    summary_points: [
      "Pifagor teoremasi: c² = a² + b².",
      "Misr uchburchagi tomonlari 3:4:5 nisbatda boʻladi.",
      "Gipotenuzaga tushirilgan balandlik katetlar proyeksiyalarining oʻrta geometrigidir: h² = a_c · b_c.",
      "Toʻgʻri burchakli uchburchak yuzi: S = (a · b) / 2 = (c · h_c) / 2."
    ],
    formulas_or_rules: [
      'c² = a² + b²',
      'h_c = (a · b) / c',
      'h_c² = c_a · c_b',
      'a² = c · c_a'
    ]
  },

  // =========================================================================
  // 3. FIZIKA 10-SINF
  // =========================================================================
  {
    id: 'phys-10-ch1',
    subject: 'Fizika',
    chapter_title: 'Fizika 10-sinf — 1-bob: Kinematika va Dinamika asoslari',
    section_title: 'Egri chiziqli harakat, aylanma harakat va Nyuton mexanikasi',
    pdf_url: '/books/fizika_10_uzb.pdf',
    pdf_page: 12,
    content: `Klassik mexanika makroskopik jismlarning yorugʻlik tezligidan ancha kichik tezliklardagi harakatini oʻrganadi.
Aylanma harakat kinematikasi:
Jism aylanma harakat qilganda uning chiziqli tezligi v va burchak tezligi ω oʻrtasidagi bogʻlanish:
v = ω · R, bunda ω = 2π / T = 2πν.
Markazga intilma tezlanish aylananing markaziga yoʻnalgan boʻlib:
a_m = v² / R = ω² · R.

Nyutonning dinamika qonunlari:
1. Inersiya qonuni: Jismga tashqi kuchlar taʼsir etmasa yoki kuchlar kompensatsiyalansa, u tinch holatini yoki toʻgʻri chiziqli tekis harakatini saqlaydi.
2. Dinamikaning asosiy qonuni: Jism olgan tezlanish unga taʼsir etuvchi barcha kuchlarning teng taʼsir etuvchisiga toʻgʻri mutanosib, massasiga teskari mutanosibdir: a = F / m => F = m · a.
3. Taʼsir va aks taʼsir: Jismlarning bir-biriga taʼsiri doimo kattaligi boʻyicha teng, yoʻnalishi boʻyicha qarama-qarshi boʻlgan kuchlar juftligidan iborat: F₁ = -F₂.

Butun olam tortishish qonuni (Nyuton):
Ikkita nuqtaviy jism bir-birini massalari koʻpaytmasiga toʻgʻri, oralaridagi masofa kvadratiga teskari mutanosib kuch bilan tortadi:
F = G · (m₁ · m₂) / r², bunda G = 6.67 · 10⁻¹¹ N·m²/kg² — gravitatsion doimiy.`,
    summary_points: [
      "Aylanma harakatda markazga intilma tezlanish: a = v² / R = ω² · R.",
      "Nyutonning ikkinchi qonuni dinamikaning asosiy tenglamasidir: F = m · a.",
      "Taʼsir doimo aks taʼsirga teng va qarama-qarshi yoʻnalgan: F₁ = -F₂.",
      "Butun olam tortishish kuchi masofa kvadratiga teskari proporsionaldir: F = G(m₁m₂)/r²."
    ],
    formulas_or_rules: [
      'v = ω · R',
      'a_m = v² / R',
      'F = m · a',
      'F = G · (m₁ · m₂) / r²',
      'G = 6.67 · 10⁻¹¹ N·m²/kg²'
    ]
  },
  {
    id: 'phys-10-ch2',
    subject: 'Fizika',
    chapter_title: 'Fizika 10-sinf — 2-bob: Molekulyar fizika va Termodinamika',
    section_title: 'Ideal gaz qonunlari, izojarayonlar va ichki energiya',
    pdf_url: '/books/fizika_10_uzb.pdf',
    pdf_page: 65,
    content: `Molekulyar-kinetik nazariyaning (MKN) asosiy qoidalari:
1. Barcha moddalar uzluksiz zarrachalar (molekula, atom)lardan tashkil topgan.
2. Bu zarrachalar toʻxtovsiz va tartibsiz (xaotik) issiqlik harakatida boʻladi.
3. Zarrachalar oʻzaro tortishish va itarish kuchlari orqali taʼsirlashadi.

MKN ning asosiy tenglamasi:
p = (1/3) · n · m₀ · v̄² = (2/3) · n · Ē_k, bunda n — molekulalar konsentratsiyasi, Ē_k = (3/2) · k · T — bitta molekulaning oʻrtacha kinetik energiyasi (k = 1.38 · 10⁻²³ J/K — Bolsman doimiysi).

Mendeleyev-Klapeyron tenglamasi:
p · V = (m / M) · R · T = ν · R · T (R = 8.31 J/(mol·K)).
Gaz qonunlari (Izojarayonlar):
- Izotermik jarayon (T = const): Boyl-Mariott qonuni: p · V = const.
- Izobarik jarayon (p = const): Gey-Lyussak qonuni: V / T = const.
- Izoxorik jarayon (V = const): Sharl qonuni: p / T = const.

Termodinamikaning birinchi qonuni:
Tizimga berilgan Q issiqlik miqdori uning ichki energiyasini oʻzgartirishga (ΔU) va tashqi kuchlarga qarshi ish bajarishga (A) sarflanadi:
Q = ΔU + A.
Bir atomli ideal gazning ichki energiyasi: U = (3/2) · (m/M) · R · T.`,
    summary_points: [
      "MKN ning asosiy tenglamasi: p = (1/3)nm₀v̄² = nkT.",
      "Harorat molekulalarning oʻrtacha kinetik energiyasining oʻlchovidir: Ē_k = (3/2)kT.",
      "Mendeleyev-Klapeyron tenglamasi: pV = νRT.",
      "Termodinamikaning 1-qonuni: Q = ΔU + A.",
      "Izoxorik jarayonda ish bajarilmaydi (A = 0), shuning uchun Q = ΔU."
    ],
    formulas_or_rules: [
      'p = n · k · T',
      'pV = (m/M)RT',
      'Q = ΔU + A',
      'U = (3/2)νRT',
      'A = p · ΔV (izobarikda)'
    ]
  },

  // =========================================================================
  // 4. JAHON TARIXI VA OʻZBEKISTON TARIXI (7 & 10-sinflar)
  // =========================================================================
  {
    id: 'hist-uzb-7-ch1',
    subject: 'Tarix',
    chapter_title: 'Oʻzbekiston tarixi 7-sinf — 1-bob: Somoniylar va Qoraxoniylar davri',
    section_title: 'Markazlashgan davlatlarning tashkil topishi va madaniy yuksalish',
    pdf_url: '/books/ozbekiston_tarixi_7_uzb.pdf',
    pdf_page: 15,
    content: `IX asrning ikkinchi yarmida Arab xalifaligi zaiflashishi natijasida Movarounnahrda mustaqil Somoniylar davlati qaror topdi.
Ismoil Somoniy (892–907):
Ismoil Somoniy 888-yilda Movarounnahrni, 900-yilda Balx yaqinida Amr ibn Laysni yengib Xurosonni yagona markazlashgan davlatga birlashtirdi. Buxoro davlat poytaxtiga aylandi va Sharqning ilm-fan, madaniyat markaziga aylandi.
Somoniylar boshqaruv tizimi 10 ta devondan (vazirlikdan) iborat mukammal davlat apparatiga ega boʻlgan. Buxoroda mashhur "Sayvon al-hikmat" (Hikmat xazinasi) saroy kutubxonasi faoliyat yuritgan.

Qoraxoniylar davlati:
999-yilda Qoraxoniylar va Gʻaznaviylar oʻrtasida tuzilgan bitimga koʻra Somoniylar davlati hududi boʻlib olindi. Sirdaryodan shimoldagi yerlar Qoraxoniylarga, janubiy hududlar esa Gʻaznaviylarga oʻtdi.
Qoraxoniylar davrida turkiy yozma adabiyot yuksak rivojlandi: Yusuf Xos Hojib "Qutadgʻu bilig" (1069) va Mahmud Qoshgʻariy "Devonu lugʻatit turk" (1074) asarlarini yaratdilar.`,
    summary_points: [
      "Ismoil Somoniy 892-907 yillarda markazlashgan Somoniylar davlatiga asos soldi, poytaxt Buxoro boʻldi.",
      "Somoniylar davlatida 10 ta devondan iborat maʼmuriy boshqaruv tizimi joriy qilingan.",
      "999-yilda Somoniylar sulolasi qulab, oʻrnini Qoraxoniylar va Gʻaznaviylar egalladi.",
      "Qoraxoniylar davrida turkiy tildagi ilk buyuk yodgorliklar: 'Qutadgʻu bilig' va 'Devonu lugʻatit turk' yaratildi."
    ],
    formulas_or_rules: [
      '892–907-yillar — Ismoil Somoniy hukmronligi',
      '999-yil — Somoniylar davlatining tugatilishi',
      '1069-yil — "Qutadgʻu bilig" yaratilgan sana'
    ]
  },
  {
    id: 'hist-uzb-10-ch1',
    subject: 'Tarix',
    chapter_title: 'Oʻzbekiston tarixi 10-sinf — 1-bob: Amir Temur va Temuriylar saltanati',
    section_title: 'Sohibqiron Amir Temurning davlatchilik siyosati va "Temur tuzuklari"',
    pdf_url: '/books/ozbekiston_tarixi_10_uzb.pdf',
    pdf_page: 25,
    content: `Amir Temur (1336-yil 9-aprel, Kesh — 1405-yil 18-fevral, Oʻtror):
XIV asrning 60-yillarida Movarounnahrda feodal tarqoqlik va moʻgʻul bosqinchilariga qarshi kurash avj oldi. 1365-yildagi mashhur "Loy jangi" va Samarqanddagi Sarbadorlar qoʻzgʻolonidan soʻng, Amir Temur xalq manfaatlarini himoya qilib siyosiy maydonga chiqdi.
1370-yil aprel oyida Balx qurultoyida Amir Temur Movarounnahrning oliy hukmdori deb eʼlon qilindi va Samarqand poytaxt etib belgilandi.

Davlat boshqaruvi va "Temur tuzuklari":
Amir Temur saltanatni "Kuch — adolatdadir" shiori ostida boshqardi. "Temur tuzuklari" asari ikki qismdan iborat boʻlib, davlatni idora qilish, qoʻshin tuzilishi, vazirlar va amirlar burchlari, soliqlarni tartibga solish qoidalarini belgilab bergan.
Amir Temur 27 ta podsholikni birlashtirib, Buyuk Ipak yoʻlida toʻliq xavfsizlikni taʼminladi, karvonsaroylar, madrasalar, bogʻlar barpo ettirdi.

Mirzo Ulugʻbek davri:
Amir Temurning nabirasi Mirzo Ulugʻbek (1409–1449) 40 yil davomida Movarounnahrni tinchlik va ilm-fan asosida boshqardi. Samarqandda, Gʻijduvonda, Buxoroda madrasalar ochdi va jahon ilm-faniga beqiyos hissa qoʻshgan rasadxona barpo qildi.`,
    summary_points: [
      "1370-yilda Amir Temur Balx qurultoyida oliy hukmdor deb eʼlon qilindi va Samarqandni poytaxt qildi.",
      "Davlat boshqaruvi 'Kuch — adolatdadir' shioriga tayangan va 'Temur tuzuklari' qonunlar majmuasida bayon etilgan.",
      "Amir Temur Buyuk Ipak yoʻlida xavfsizlikni toʻla taʼminlab, xalqaro savdoni mislsiz yuksaltirdi.",
      "Mirzo Ulugʻbek 1409-1449 yillarda Movarounnahrda fan va maʼrifatni davlat siyosati darajasiga koʻtardi."
    ],
    formulas_or_rules: [
      '1336-yil 9-aprel — Amir Temur tavalludi',
      '1370-yil — Markazlashgan Temuriylar davlatining tashkil topishi',
      '1402-yil 20-iyul — Anqara jangi (Boyazid ustidan gʻalaba)',
      '1405-yil 18-fevral — Sohibqiron vafoti'
    ]
  },
  {
    id: 'hist-world-10-ch1',
    subject: 'Tarix',
    chapter_title: 'Jahon tarixi 10-sinf — 1-bob: Birinchi va Ikkinchi Jahon Urushlari',
    section_title: 'Xalqaro munosabatlar inqirozi, geosiyosiy toʻqnashuvlar va BMT tuzilishi',
    pdf_url: '/books/jahon_tarixi_10_uzb.pdf',
    pdf_page: 30,
    content: `Birinchi jahon urushi (1914–1918):
Urushning asosiy sababi yetakchi imperialistik davlatlarning dunyoni qayta taqsimlash, yangi bozorlar va xomashyo manbalarini egallash uchun raqobati boʻldi.
Ikki yirik harbiy-siyosiy blok toʻqnashdi:
1) Antanta (Buyuk Britaniya, Fransiya, Rossiya; keyinchalik AQSH va Italiya);
2) Uchlar ittifoqi / Toʻrtlar ittifoqi (Germaniya, Avstriya-Vengriya, Usmonli imperiyasi, Bolgariya).
1918-yil 11-noyabrda Kompyen oʻrmonida sulh imzolanib, urush Antanta gʻalabasi va toʻrtta imperiyaning (Rossiya, Germaniya, Avstriya-Vengriya, Usmonli) qulashi bilan tugadi.

Ikkinchi jahon urushi (1939–1945):
1939-yil 1-sentabrda fashistlar Germaniyasining Polshaga bostirib kirishi bilan insoniyat tarixidagi eng qonli urush boshlandi.
Gitler Germaniyasi, fashistik Italiya va militaristik Yaponiyaga qarshi SSSR, AQSH, Buyuk Britaniya boshchiligidagi Gitlerga qarshi koalitsiya tuzildi.
1945-yil 8-mayda Germaniyaning soʻzsiz taslim boʻlishi toʻgʻrisidagi Akt imzolandi. 1945-yil 2-sentabrda Tokio koʻrfazida 'Missuri' linkorida Yaponiya taslim boʻlish aktiga qoʻl qoʻydi.
1945-yil 24-oktabrda San-Fransiskoda xalqaro tinchlik va xavfsizlikni taʼminlash maqsadida Birlashgan Millatlar Tashkiloti (BMT) tashkil etildi.`,
    summary_points: [
      "Birinchi jahon urushi 1914–1918 yillarda Antanta va Germaniya bloki oʻrtasida kechgan.",
      "Ikkinchi jahon urushi 1939-yil 1-sentabrdan 1945-yil 2-sentabrgacha davom etgan.",
      "Urush fashizm va militarizm ustidan ittifoqchilar gʻalabasi bilan yakunlangan.",
      "1945-yil 24-oktabrda xalqaro xavfsizlikni taʼminlash uchun BMTga asos solingan."
    ],
    formulas_or_rules: [
      '1914-yil 28-iyul – 1918-yil 11-noyabr — Birinchi jahon urushi',
      '1939-yil 1-sentabr – 1945-yil 2-sentabr — Ikkinchi jahon urushi',
      '1945-yil 24-oktabr — BMT Nizomi kuchga kirgan kun'
    ]
  },

  // =========================================================================
  // 5. KIMYO 7, 8 & 9-SINFLAR
  // =========================================================================
  {
    id: 'chem-8-ch1',
    subject: 'Kimyo',
    chapter_title: 'Kimyo 8-sinf — 1-bob: D. I. Mendeleyevning davriy qonuni',
    section_title: 'Atom tuzilishi, elektron konfiguratsiyalar va davriy qonuniyatlar',
    pdf_url: '/books/kimyo_8_uzb.pdf',
    pdf_page: 20,
    content: `1869-yilda D. I. Mendeleyev kimyoning eng buyuk qonunini kashf etdi:
Oddiy moddalar va birikmalarning xossalari elementlarning atom massalariga (zamonaviy taʼrif boʻyicha yadro zaryadlariga) davriy ravishda bogʻliqdir.

Atom tuzilishi:
Atom musbat zaryadlangan yadro va uning atrofida harakatlanuvchi manfiy elektronlardan tashkil topgan.
- Yadro zaryadi Z davriy jadvaldagi elementning tartib raqamiga teng va yadrodagi protonlar sonini bildiradi.
- Massa soni A = Z + N (bu yerda N — neytronlar soni). Demak, N = A - Z.

Elektron qobiqlarning tuzilishi:
Elektronlar energetik pogʻonalarda Pauli prinsipi va Hund qoidasiga koʻra joylashadi:
Har bir pogʻonadagi maksimal elektronlar soni N = 2n² formulasi bilan aniqlanadi (1-pogʻonada 2 ta, 2-pogʻonada 8 ta, 3-pogʻonada 18 ta).
Davriy oʻzgarishlar:
- Davr boʻyicha chapdan oʻngga borgan sari: yadro zaryadi ortadi, atom radiusi kichrayadi, elektromanfiylik va metallmaslik xossalari kuchayadi.
- Guruh boʻyicha yuqoridan pastga borgan sari: energetik pogʻonalar soni ortadi, atom radiusi kattalashadi, metallik va qaytaruvchilik xossalari kuchayadi.`,
    summary_points: [
      "Davriy qonunning zamonaviy ifodasi elementlar yadro zaryadining davriy takrorlanishiga asoslangan.",
      "Yadro zaryadi (protonlar soni) = Tartib raqami = Elektronlar soni.",
      "Neytronlar soni: N = A - Z (massa sonidan protonlar sonini ayirish orqali topiladi).",
      "Davrda chapdan oʻngga elektromanfiylik ortadi, guruhda yuqoridan pastga metallik xossasi kuchayadi."
    ],
    formulas_or_rules: [
      'Z = protonlar soni = elektronlar soni',
      'N = A - Z',
      'N_max = 2n² (pogʻonadagi elektronlar sigʻimi)'
    ]
  },

  // =========================================================================
  // 6. BIOLOGIYA 10-SINF
  // =========================================================================
  {
    id: 'bio-10-ch1',
    subject: 'Biologiya',
    chapter_title: 'Biologiya 10-sinf — 1-bob: Sitologiya va Hujayra biokimyosi',
    section_title: 'Organik moddalar, DNK, RNK, oqsillar biosintezi va energiya almashinuvi',
    pdf_url: '/books/biologiya_10_uzb.pdf',
    pdf_page: 18,
    content: `Hujayra barcha tirik organizmlarning elementar tuzilish, funksional va genetik birligidir.
Biopolimerlar va ularning monomerlari:
1. Oqsillar: Monomerlari 20 xil aminokislotalardir. Ular peptid bogʻlar (-CO-NH-) orqali birlashadi. Funksiyalari: fermentativ (katalitik), transport (gemoglobin), harakat (aktin, miozin), himoya (antitanachalar), qurilish (kollagen).
2. Nuklein kislotalar (DNK va RNK): Monomerlari nukleotidlardir. Har bir nukleotid azotli asos, uglevod (dezoksiriboza yoki riboza) va fosfat kislota qoldigʻidan iborat.
- DNK komplementarlik qoidasi (Chargaff): Adenin doimo Timin bilan ikkita vodorod bogʻ (A=T), Guanin esa Sitozin bilan uchta vodorod bogʻ (G≡S) hosil qiladi.

Fotosintez va Oqsil biosintezi:
Fotosintez xloroplastlarda amalga oshadi:
Yorugʻlik bosqichida suv fotolizga uchrab O₂ ajraladi va ATF, NADF·H toʻplanadi. Qorongʻilik bosqichida (Kalvin sikli) CO₂ birikib glyukoza (C₆H₁₂O₆) sintezlanadi.
Oqsil biosintezi ikki bosqichda kechadi:
1) Transkripsiya — yadroda DNK matritsasi asosida axborot RNK (i-RNK) sintezi;
2) Translyatsiya — sitoplazmadagi ribosomada i-RNK kodonlariga mos aminokislotalarning t-RNK vositasida terilib oqsil polipeptid zanjirining yigʻilishi.`,
    summary_points: [
      "Oqsillarning monomerlari aminokislotalar boʻlib, peptid bogʻlar orqali birikadi.",
      "DNK da komplementarlik qoidasi: A=T (2 ta vodorod bogʻ) va G≡S (3 ta vodorod bogʻ).",
      "Oqsillar biosintezi: Transkripsiya (yadroda i-RNK yozilishi) va Translyatsiya (ribosomada oqsil yigʻilishi).",
      "Fotosintez tenglamasi: 6CO₂ + 6H₂O + yorugʻlik → C₆H₁₂O₆ + 6O₂."
    ],
    formulas_or_rules: [
      'A = T va G ≡ S',
      '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
      'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATF (aerob bosqich)'
    ]
  },

  // =========================================================================
  // 7. ASTRONOMIYA 11-SINF
  // =========================================================================
  {
    id: 'astro-11-ch1',
    subject: 'Astronomiya',
    chapter_title: 'Astronomiya 11-sinf — 1-bob: Osmon sferasi va Quyosh sistemasi',
    section_title: 'Sayyoralar harakati, Kepler qonunlari va kosmik tezliklar',
    pdf_url: '/books/astronomiya_11_uzb.pdf',
    pdf_page: 10,
    content: `Astronomiya koinotdagi osmon jismlari, ularning harakati, tuzilishi, fizik tabiati va evolyutsiyasini oʻrganuvchi fundamental fandir.
Keplerning sayyoralar harakati qonunlari:
1-qonun: Barcha sayyoralar Quyosh atrofida ellips boʻylab harakatlanadi va uning fokuslaridan birida Quyosh joylashadi. Sayyoraning Quyoshga eng yaqin nuqtasi — perigeliy, eng uzoq nuqtasi — afeliy deyiladi.
2-qonun (Yuzalar qonuni): Sayyoraning radius-vektori teng vaqtlar oraligʻida teng yuzalarni chizib oʻtadi. Shuning uchun sayyora perigeliyda eng tez, afeliyda eng sekin harakatlanadi.
3-qonun: Sayyoralarning Quyosh atrofida aylanish davrlarining kvadratlari ularning orbitalarining katta yarim oʻqlari kublariga toʻgʻri proporsionaldir: T₁² / T₂² = a₁³ / a₂³.

Kosmik tezliklar (Yer uchun):
1-kosmik tezlik: v₁ = √(g·R) ≈ 7.9 km/s. Jism Yer atrofida doiraviy orbita boʻylab sunʼiy yoʻldoshga aylanadi.
2-kosmik tezlik: v₂ = v₁ · √2 ≈ 11.2 km/s. Jism Yer tortishish maydonini yengib Quyosh sunʼiy yoʻldoshiga aylanadi.
3-kosmik tezlik: v₃ ≈ 16.7 km/s. Jism Quyosh gravitatsiyasini yengib, Quyosh sistemasidan Somon yoʻli galaktikasiga chiqib ketadi.`,
    summary_points: [
      "Keplerning 1-qonuni boʻyicha orbitalar ellips shaklida boʻladi.",
      "Sayyora perigeliyda maksimal tezlikka, afeliyda minimal tezlikka ega boʻladi.",
      "Keplerning 3-qonuni: T₁²/T₂² = a₁³/a₂³.",
      "Birinchi kosmik tezlik 7.9 km/s, ikkinchi kosmik tezlik 11.2 km/s ga teng."
    ],
    formulas_or_rules: [
      'T₁² / T₂² = a₁³ / a₂³',
      'v₁ = √(g · R) ≈ 7.9 km/s',
      'v₂ = √(2g · R) ≈ 11.2 km/s',
      '1 a.b. ≈ 149.6 mln km'
    ]
  },

  // =========================================================================
  // 8. ONA TILI VA ADABIYOT (7 & 10-sinflar)
  // =========================================================================
  {
    id: 'lit-uzb-7-ch1',
    subject: 'Ona tili va adabiyot',
    chapter_title: 'Ona tili va adabiyot — Alisher Navoiy va oʻzbek mumtoz adabiyoti',
    section_title: 'Nizomiddin Mir Alisher Navoiy hayoti, "Xamsa" dostoni va yangi imlo qoidalari',
    pdf_url: '/books/adabiyot_7_uzb.pdf',
    pdf_page: 22,
    content: `Nizomiddin Mir Alisher Navoiy (1441-yil 9-fevral, Hirot — 1501-yil 3-yanvar, Hirot):
Buyuk oʻzbek shoiri, mutafakkiri va davlat arbobi. U turkiy tilning boyligi, qudrati va nafosatini butun dunyoga isbotlab bergan dahodir.
1483–1485-yillarda Alisher Navoiy bor-yoʻgʻi ikki yil ichida turkiy tilda birinchi boʻlib besh mustaqil dostondan iborat "Xamsa" (Beshlik) yaratdi:
1. "Hayrat ul-abror" (1483) — falsafiy, axloqiy-didaktik doston;
2. "Farhod va Shirin" (1484) — qahramonlik va sevgi dostoni;
3. "Layli va Majnun" (1484) — muhabbat fojiasi va ilohiy ishq talqini;
4. "Sabʼai sayyor" (1484) — Bahrom Goʻr haqidagi yetti sarguzasht qissasi;
5. "Saddi Iskandariy" (1485) — adolatli shoh Iskandar va donishmandlar timsoli.

Yangi takomillashtirilgan oʻzbek lotin alifbosi islohoti:
Oʻzbek yozuvini yanada qulaylashtirish maqsadida:
- Oʻ harfi oʻrniga — Ö / ö;
- Gʻ harfi oʻrniga — Ğ / ğ;
- Sh harfi oʻrniga — Ş / ş;
- Ch harfi oʻrniga — Ç / ç harflari kiritilgan.`,
    summary_points: [
      "Alisher Navoiy 1441-yil 9-fevralda Hirot shahrida tavallud topgan.",
      "1483–1485-yillarda turkiy tilda ilk bor muhtasham 'Xamsa' yaratilgan.",
      "Navoiy 'Muhokamat ul-lugʻatayn' asarida turkiy tilning fors tilidan kam emasligini isbotlagan.",
      "Takomillashtirilgan oʻzbek alifbosida: Gʻ->Ğ, Oʻ->Ö, Sh->Ş, Ch->Ç shakllari qoʻllaniladi."
    ],
    formulas_or_rules: [
      '1441-yil 9-fevral — Navoiy tavalludi',
      '1483–1485-yillar — "Xamsa" yozilgan davr',
      'Yangi harflar: Ğ, Ö, Ş, Ç'
    ]
  },

  // =========================================================================
  // 9. GEOGRAFIYA (6 & 7-sinflar)
  // =========================================================================
  {
    id: 'geo-6-ch1',
    subject: 'Geografiya',
    chapter_title: 'Geografiya 6-sinf — 1-bob: Yer sayyorasining tabiiy qobiqlari',
    section_title: 'Litosfera, Gidrosfera, Atmosfera va Biosferaning oʻzaro aloqadorligi',
    pdf_url: '/books/geografiya_6_uzb.pdf',
    pdf_page: 14,
    content: `Yer sayyorasi toʻrtta asosiy tabiiy qobiqning oʻzaro uygʻun taʼsirlashuvidan iborat geografik qobiqni hosil qiladi:
1. Litosfera — Yerning qattiq tosh qobigʻi. Yer poʻsti va yuqori mantiyaning yuqori qismini oʻz ichiga oladi. Qitʼalarda qalinligi 30–70 km, okeanlar tubida esa 5–10 km ni tashkil etadi.
2. Gidrosfera — Yerning barcha suv qobigʻi (okeanlar, dengizlar, daryolar, koʻllar, yerosti suvlari va muzliklar). Dunyo okeani Yer yuzasining 71% qismini egallaydi.
3. Atmosfera — Yerning havo qobigʻi. Pastdan yuqoriga qarab troposfera, stratosfera, mezosfera, termosfera va ekzosfera qatlamlariga boʻlinadi.
4. Biosfera — Yerning tirik organizmlar tarqalgan hayot qobigʻi.

Oʻzbekistonning tabiiy geografik oʻrni:
Oʻzbekiston Yevrosiyo materigining markazida, Turon pasttekisligi va Tyanshan hamda Pomir-Oloy togʻ tizimlari oraligʻida joylashgan. Maydoni 448.9 ming km². Hududining qariyb 80% ini tekisliklar va choʻllar (Qizilqum), 20% ini esa togʻlar va togʻoldi adirlari tashkil qiladi.`,
    summary_points: [
      "Geografik qobiq litosfera, gidrosfera, atmosfera va biosferaning oʻzaro taʼsiridan iborat.",
      "Dunyo okeani yer yuzasining 71% ini tashkil qiladi.",
      "Oʻzbekiston maydoni 448.9 ming km² boʻlib, 80% tekislik va choʻllardan iborat.",
      "Oʻzbekistonning eng baland nuqtasi Hazrati Sulton choʻqqisi (4643 m)."
    ],
    formulas_or_rules: [
      'Maydoni: 448.9 ming km²',
      'Eng baland nuqta: Hazrati Sulton (4643 m)',
      'Eng past nuqta: Mingbuloq botigʻi (-12.8 m)'
    ]
  },

  // =========================================================================
  // 10. INGLIZ TILI (English Handbook)
  // =========================================================================
  {
    id: 'eng-grammar-ch1',
    subject: 'Ingliz tili',
    chapter_title: 'Ingliz tili — Comprehensive English Grammar & Reading Guide',
    section_title: 'Verb Tenses, Conditionals, Passive Voice and Essential Vocabulary',
    pdf_url: '/books/ona_tili_8_uzb.pdf',
    pdf_page: 1,
    content: `Mastering English Grammar for National and International Tests:
1. The Tense System:
- Present Simple vs Continuous: Habitual actions (She reads books daily) vs actions happening right now (She is reading a book now).
- Present Perfect (have/has + V3): Connects past action to the present moment, experiences, or recent completions: "I have visited Bukhara twice."
- Past Continuous: Action in progress at a specific time in the past: "While we were conducting the physics experiment, the bell rang."

2. Conditionals (Shart mayllari):
- Zero Conditional (General truth): If + Present Simple, Present Simple. "If you heat water to 100°C, it boils."
- First Conditional (Real future possibility): If + Present Simple, will + V1. "If it rains tomorrow, we will stay at home."
- Second Conditional (Unreal present/hypothetical): If + Past Simple, would + V1. "If I were a scientist, I would discover a new energy source."
- Third Conditional (Past regret/impossible condition): If + Past Perfect (had + V3), would have + V3. "If they had trained harder, they would have won the competition."

3. Passive Voice (Majhul nisbat):
Form: Object + to be (conjugated) + Past Participle (V3) + (by agent).
- Active: "Alisher Navoi wrote 'Khamsa'."
- Passive: "'Khamsa' was written by Alisher Navoi."

4. Relative Clauses:
- Who / Whom: for people;
- Which: for things and animals;
- Whose: indicates possession;
- Where: indicates places.`,
    summary_points: [
      "Present Perfect indicates life experiences or actions with visible present results.",
      "First Conditional: If + Present, will + Verb (real possibility).",
      "Second Conditional: If + Past, would + Verb (hypothetical present).",
      "Third Conditional: If + had V3, would have V3 (past unchangeable regret).",
      "Passive voice is formed using appropriate form of 'be' + V3."
    ],
    formulas_or_rules: [
      '1st Cond: If + Present Simple, will + bare infinitive',
      '2nd Cond: If + Past Simple, would + bare infinitive',
      '3rd Cond: If + Past Perfect, would have + past participle',
      'Passive: Subject + be + V3'
    ]
  }
];
