import { TestQuestion } from '../../types';

export const CHEMISTRY_QUESTIONS: TestQuestion[] = [
  {
    id: 'dtm-chem-01',
    subject: 'Kimyo',
    topic: 'Davriy qonun',
    question: 'Kimyoviy elementlar davriy qonunini qaysi buyuk olim 1869-yilda kashf etgan?',
    options: {
      A: "D. I. Mendeleyev",
      B: "A. Lavuazye",
      C: "J. Dalton",
      D: "E. Rezerford"
    },
    correct_answer: 'A',
    explanation_reference: "Dmitriy Ivanovich Mendeleyev 1869-yilda elementlarning atom massalari va xossalari davriy takrorlanishini aniqlab, Davriy jadvalni tuzdi."
  },
  {
    id: 'dtm-chem-02',
    subject: 'Kimyo',
    topic: 'Avogadro doimiysi',
    question: '1 mol har qanday moddadagi zarrachalar (molekulalar, atomlar) soni (Avogadro soni N_A) nechaga teng?',
    options: {
      A: "6.02 · 10²³ mol⁻¹",
      B: "3.14 · 10²³ mol⁻¹",
      C: "1.66 · 10⁻²⁴ mol⁻¹",
      D: "9.8 · 10²³ mol⁻¹"
    },
    correct_answer: 'A',
    explanation_reference: "Avogadro doimiysi N_A = 6.022 · 10²³ mol⁻¹ boʻlib, 1 mol moddadagi strukturaviy birliklar sonini bildiradi."
  },
  {
    id: 'dtm-chem-03',
    subject: 'Kimyo',
    topic: 'Gazlarning molyar hajmi',
    question: 'Normal sharoitda (n.sh., T = 273 K, p = 101.3 kPa) 1 mol ideal gaz qancha hajm (V_m) egallaydi?',
    options: {
      A: "22.4 litr (dm³)",
      B: "24.0 litr",
      C: "11.2 litr",
      D: "44.8 litr"
    },
    correct_answer: 'A',
    explanation_reference: "Avogadro qonuniga koʻra har qanday gazning 1 moli normal sharoitda 22.4 litr hajm egallaydi."
  },
  {
    id: 'dtm-chem-04',
    subject: 'Kimyo',
    topic: 'Oksidlanish darajasi',
    question: 'KMnO₄ (kaliy permanganat) birikmasida marganes (Mn) elementining oksidlanish darajasi nechaga teng?',
    options: {
      A: "+7",
      B: "+6",
      C: "+4",
      D: "+2"
    },
    correct_answer: 'A',
    explanation_reference: "K⁺¹MnˣO₄⁻² => (+1) + x + 4·(-2) = 0 => x - 7 = 0 => x = +7."
  },
  {
    id: 'dtm-chem-05',
    subject: 'Kimyo',
    topic: 'Kislotalar va asoslar',
    question: 'Kislotali muhitda lakmus qogʻozi qanday rangga kiradi?',
    options: {
      A: "Qizil rangga",
      B: "Koʻk rangga",
      C: "Binafsha rangga",
      D: "Sariq rangga"
    },
    correct_answer: 'A',
    explanation_reference: "Kislotali eritmada lakmus indikatori qizil rangga, ishqoriy eritmada koʻk rangga kiradi."
  },
  {
    id: 'dtm-chem-06',
    subject: 'Kimyo',
    topic: 'Suvning dissotsilanishi va pH',
    question: 'Neytral eritmaning vodorod koʻrsatkichi (pH) nechaga teng?',
    options: {
      A: "7",
      B: "0",
      C: "14",
      D: "1"
    },
    correct_answer: 'A',
    explanation_reference: "25 °C da toza suvda [H⁺] = 10⁻⁷ mol/l boʻlganligi uchun pH = -lg[H⁺] = 7 (kislotali pH < 7, ishqoriy pH > 7)."
  },
  {
    id: 'dtm-chem-07',
    subject: 'Kimyo',
    topic: 'Kimyoviy bogʻlanish turlari',
    question: 'Osh tuzi (NaCl) kristall panjarasida qaysi turdagi kimyoviy bogʻlanish mavjud?',
    options: {
      A: "Ionli bogʻlanish",
      B: "Kovalent qutbsiz bogʻlanish",
      C: "Metall bogʻlanish",
      D: "Vodorod bogʻlanish"
    },
    correct_answer: 'A',
    explanation_reference: "Tipik metall (Na) va tipik metallmas (Cl) oʻrtasida elektron oʻtishi orqali elektrostatik ionli bogʻlanish (Na⁺ va Cl⁻) hosil boʻladi."
  },
  {
    id: 'dtm-chem-08',
    subject: 'Kimyo',
    topic: 'Kovalent bogʻlanish',
    question: 'Vodorod molekulasida (H₂) qanday bogʻlanish mavjud?',
    options: {
      A: "Kovalent qutbsiz bogʻlanish",
      B: "Kovalent qutbli bogʻlanish",
      C: "Ionli bogʻlanish",
      D: "Metall bogʻlanish"
    },
    correct_answer: 'A',
    explanation_reference: "Bir xil elektromanfiylikka ega boʻlgan atomlar oʻrtasida umumiy elektron jufti hisobiga kovalent qutbsiz bogʻlanish vujudga keladi."
  },
  {
    id: 'dtm-chem-09',
    subject: 'Kimyo',
    topic: 'Kimyoviy reaksiya tezligi',
    question: 'Vant-Goff qoidasiga koʻra harorat har 10 °C ga koʻtarilganda reaksiya tezligi qancha ortadi?',
    options: {
      A: "2 dan 4 martagacha",
      B: "10 martagacha",
      C: "1.5 marta",
      D: "Oʻzgarmaydi"
    },
    correct_answer: 'A',
    explanation_reference: "Vant-Goff qoidasi: harorat har 10 gradusga oshirilganda kimyoviy reaksiyaning tezligi 2–4 martaga ortadi (γ = 2-4)."
  },
  {
    id: 'dtm-chem-10',
    subject: 'Kimyo',
    topic: 'Kimyoviy muvozanat',
    question: 'Le Shatelye prinsipiga koʻra ekzotermik reaksiya (ΔH < 0) muvozanatida harorat oshirilsa, muvozanat qaysi tomonga siljiydi?',
    options: {
      A: "Boshlangʻich moddalar (chapga, endotermik yoʻnalishga)",
      B: "Mahsulotlar tomoniga (oʻngga)",
      C: "Muvozanat holati oʻzgarmaydi",
      D: "Faqat bosim ortganda siljiydi"
    },
    correct_answer: 'A',
    explanation_reference: "Harorat koʻtarilganda Le Shatelye prinsipiga asosan muvozanat issiqlik yutilishi bilan boruvchi (endotermik, chap) tomonga siljiydi."
  },
  {
    id: 'dtm-chem-11',
    subject: 'Kimyo',
    topic: 'Metallarning faollik qatori',
    question: 'Bekyetovning metallar elektrokimyoviy faollik qatorida vodoroddan (H) oldin turgan metallar suyultirilgan xlorid kislota (HCl) bilan taʼsirlashganda qanday gaz ajraladi?',
    options: {
      A: "Vodorod (H₂)",
      B: "Xlor (Cl₂)",
      C: "Kislorod (O₂)",
      D: "Gaz ajralmaydi"
    },
    correct_answer: 'A',
    explanation_reference: "Vodoroddan chapda joylashgan faol metallar kislotalardan vodorodni siqib chiqaradi: Zn + 2HCl -> ZnCl₂ + H₂↑."
  },
  {
    id: 'dtm-chem-12',
    subject: 'Kimyo',
    topic: 'Elektroliz',
    question: 'Eritma yoki suyuqlanma elektroliz qilinganda manfiy qutbli elektrod (katod)da qanday jarayon yuz beradi?',
    options: {
      A: "Qaytarilish (elektron biriktirib olish)",
      B: "Oksidlanish (elektron berish)",
      C: "Neytrallanish",
      D: "Gidroliz"
    },
    correct_answer: 'A',
    explanation_reference: "Katod manfiy zaryadlangan elektrod boʻlib, unga kationlar boradi va elektron qabul qilib qaytariladi."
  },
  {
    id: 'dtm-chem-13',
    subject: 'Kimyo',
    topic: 'Organik kimyo: Alkanlar',
    question: 'Toʻyingan uglevodorodlar (alkanlar)ning umumiy formulasi qaysi?',
    options: {
      A: "C_n H_(2n+2)",
      B: "C_n H_(2n)",
      C: "C_n H_(2n-2)",
      D: "C_n H_(2n-6)"
    },
    correct_answer: 'A',
    explanation_reference: "Alkanlar (parafinlar) gomologik qatori C_n H_(2n+2) formulasiga boʻysunadi (metan CH₄, etan C₂H₆ va h.k.)."
  },
  {
    id: 'dtm-chem-14',
    subject: 'Kimyo',
    topic: 'Alkenlar',
    question: 'Etilen (C₂H₄) molekulasida uglerod atomlari oʻrtasida qanday bogʻ mavjud?',
    options: {
      A: "Bitta qoʻshbogʻ (1 ta σ va 1 ta π bogʻ)",
      B: "Bitta oddiy bogʻ",
      C: "Bitta uchbogʻ",
      D: "Faqat π bogʻlar"
    },
    correct_answer: 'A',
    explanation_reference: "Alkenlarda uglerodlar oʻrtasida sp² gibridlangan qoʻshbogʻ (CH₂=CH₂) mavjud boʻlib, u 1 ta mustahkam sigma va 1 ta pi bogʻdan iborat."
  },
  {
    id: 'dtm-chem-15',
    subject: 'Kimyo',
    topic: 'Alkinlar',
    question: 'Kalsiy karbid (CaC₂) gidroliz qilinganda qaysi toʻyinmagan gaz hosil boʻladi?',
    options: {
      A: "Asetilen (C₂H₂)",
      B: "Metan (CH₄)",
      C: "Etilen (C₂H₄)",
      D: "Etan (C₂H₆)"
    },
    correct_answer: 'A',
    explanation_reference: "CaC₂ + 2H₂O -> Ca(OH)₂ + C₂H₂↑ (asetilen laboratoriyada shu reaksiyadan olinadi)."
  },
  {
    id: 'dtm-chem-16',
    subject: 'Kimyo',
    topic: 'Benzol va aromatik birikmalar',
    question: 'Benzol (C₆H₆) formulasini halqa shaklida ilk bor taklif qilgan kimyogar olim kim?',
    options: {
      A: "Avtust Kekule (1865-yil)",
      B: "A. M. Butlerov",
      C: "V. V. Markovnikov",
      D: "N. N. Zinin"
    },
    correct_answer: 'A',
    explanation_reference: "Nemis kimyogari Fridrix Avgust Kekule 1865-yilda benzol molekulasining olti burchakli siklik tuzilishini kashf qildi."
  },
  {
    id: 'dtm-chem-17',
    subject: 'Kimyo',
    topic: 'Spirtlar',
    question: 'Tibbiyotda va sanoatda keng qoʻllaniladigan oddiy etil spirtining formulasi qanday?',
    options: {
      A: "C₂H₅OH",
      B: "CH₃OH",
      C: "C₃H₇OH",
      D: "C₂H₄(OH)₂"
    },
    correct_answer: 'A',
    explanation_reference: "Etanol — bir atomli toʻyingan spirt boʻlib, formulasi C₂H₅OH dir."
  },
  {
    id: 'dtm-chem-18',
    subject: 'Kimyo',
    topic: 'Karbon kislotalar',
    question: 'Sirka kislotasining kimyoviy formulasi qaysi?',
    options: {
      A: "CH₃COOH",
      B: "HCOOH",
      C: "C₂H₅COOH",
      D: "C₆H₅COOH"
    },
    correct_answer: 'A',
    explanation_reference: "Sirka (etan) kislotasi CH₃COOH — bir asosli toʻyingan karbon kislotadir."
  },
  {
    id: 'dtm-chem-19',
    subject: 'Kimyo',
    topic: 'Murakkab efirlar va yogʻlar',
    question: 'Yogʻlar qaysi koʻp atomli spirt va yogʻ kislotalarining murakkab efirlari hisoblanadi?',
    options: {
      A: "Glitserin (propan-1,2,3-triol)",
      B: "Etilenglikol",
      C: "Metanol",
      D: "Fenol"
    },
    correct_answer: 'A',
    explanation_reference: "Tabiiy yogʻlar — uch atomli spirt glitserin va yuqori karbon kislotalarining triglitseridlaridir."
  },
  {
    id: 'dtm-chem-20',
    subject: 'Kimyo',
    topic: 'Uglevodlar: Glyukoza',
    question: 'Glyukozaning molekulyar formulasi qanday?',
    options: {
      A: "C₆H₁₂O₆",
      B: "C₁₂H₂₂O₁₁",
      C: "(C₆H₁₀O₅)_n",
      D: "C₅H₁₀O₅"
    },
    correct_answer: 'A',
    explanation_reference: "Glyukoza — aldegidospirt boʻlib, molekulyar formulasi C₆H₁₂O₆ ga teng (monosaxarid)."
  },
  {
    id: 'dtm-chem-21',
    subject: 'Kimyo',
    topic: 'Kumush koʻzgu reaksiyasi',
    question: 'Aldegidlar va glyukozani aniqlashda qaysi reaktivning ammiakdagi eritmasi (kumush koʻzgu) qoʻllaniladi?',
    options: {
      A: "[Ag(NH₃)₂]OH (Tollens reaktivi)",
      B: "Cu(OH)₂",
      C: "FeCl₃",
      D: "KMnO₄"
    },
    correct_answer: 'A',
    explanation_reference: "Aldegid guruhi kumush oksidi ammiakli eritmasi bilan oksidlanib, idish devoriga yupqa sof kumush qatlami choʻkadi."
  },
  {
    id: 'dtm-chem-22',
    subject: 'Kimyo',
    topic: 'Polimerlar',
    question: 'Etilenning polimerlanish reaksiyasi natijasida qaysi keng tarqalgan plastmassa olinadi?',
    options: {
      A: "Polietilen (-CH₂-CH₂-)_n",
      B: "Polipropilen",
      C: "Teflon",
      D: "Kapron"
    },
    correct_answer: 'A',
    explanation_reference: "n CH₂=CH₂ -> (-CH₂-CH₂-)_n yuqori bosim yoki Ziegler-Natta katalizatorlarida polietilen hosil qiladi."
  },
  {
    id: 'dtm-chem-23',
    subject: 'Kimyo',
    topic: 'Molyar massa hisoblash',
    question: 'Sulfat kislotaning (H₂SO₄) molekulyar massasini toping. (Ar: H=1, S=32, O=16)',
    options: {
      A: "98 g/mol",
      B: "96 g/mol",
      C: "80 g/mol",
      D: "100 g/mol"
    },
    correct_answer: 'A',
    explanation_reference: "Mr(H₂SO₄) = 2 · 1 + 32 + 4 · 16 = 2 + 32 + 64 = 98 g/mol."
  },
  {
    id: 'dtm-chem-24',
    subject: 'Kimyo',
    topic: 'Massa ulushi (foiz konsentratsiya)',
    question: '160 g suvda 40 g tuz eritildi. Hosil boʻlgan eritmadagi tuzning massa ulushini (%) hisoblang.',
    options: {
      A: "20%",
      B: "25%",
      C: "15%",
      D: "40%"
    },
    correct_answer: 'A',
    explanation_reference: "Eritma massasi = 160 + 40 = 200 g. Tuzning ulushi w = (40 / 200) · 100% = 20%."
  },
  {
    id: 'dtm-chem-25',
    subject: 'Kimyo',
    topic: 'Ammiak sintezi',
    question: 'Ammiak (NH₃) sanoatda Haber-Bosh usulida qaysi ikki gazning katalitik taʼsirlashuvidan olinadi?',
    options: {
      A: "Azot (N₂) va Vodorod (H₂)",
      B: "Azot va Kislorod",
      C: "Azot oksidi va Suv",
      D: "Metan va Kislorod"
    },
    correct_answer: 'A',
    explanation_reference: "N₂ + 3H₂ ⇄ 2NH₃ + Q temir katalizatori ishtirokida 450 °C va 20-30 MPa bosimda kechadi."
  },
  {
    id: 'dtm-chem-26',
    subject: 'Kimyo',
    topic: 'Allotropiya',
    question: 'Uglerod elementining allotropik shakl oʻzgarishlari toʻgʻri koʻrsatilgan qatorni toping.',
    options: {
      A: "Olmos, grafit, fulleren, grafen",
      B: "Ozon va kislorod",
      C: "Oq fosfor va qizil fosfor",
      D: "Plastik oltingugurt"
    },
    correct_answer: 'A',
    explanation_reference: "Uglerod atomlarining fazoviy joylashuviga koʻra olmos (sp³), grafit (sp²), fulleren va grafen allotropik moddalarini hosil qiladi."
  },
  {
    id: 'dtm-chem-27',
    subject: 'Kimyo',
    topic: 'Noodatiy gazlar (Inert gazlar)',
    question: 'Davriy jadvalning VIII A guruhidagi olijanob (inert) gazlar qatoriga qaysilar kiradi?',
    options: {
      A: "Geliy, Neon, Argon, Kripton, Ksenon",
      B: "Ftor, Xlor, Brom, Yod",
      C: "Litiy, Natriy, Kaliy",
      D: "Azot, Kislorod, Vodorod"
    },
    correct_answer: 'A',
    explanation_reference: "Inert gazlarning tashqi elektron qavati toʻliq toʻlgan (s²p⁶) boʻlib, kimyoviy jihatdan juda passivdir."
  },
  {
    id: 'dtm-chem-28',
    subject: 'Kimyo',
    topic: 'Galogenlar',
    question: 'Oddiy sharoitda qizgʻish-qoʻngʻir rangli suyuqlik boʻlgan yagona metallmas element qaysi?',
    options: {
      A: "Brom (Br₂)",
      B: "Xlor (Cl₂)",
      C: "Yod (I₂)",
      D: "Ftor (F₂)"
    },
    correct_answer: 'A',
    explanation_reference: "Oddiy sharoitda galogenlardan Ftor va Xlor gaz, Brom oʻtkir hidli suyuqlik, Yod esa qattiq kristall moddadir."
  },
  {
    id: 'dtm-chem-29',
    subject: 'Kimyo',
    topic: 'Sublimatsiya hodisasi',
    question: 'Qattiq yod qizdirilganda suyuqlanmasdan toʻgʻridan-toʻgʻri binafsha bugʻga aylanish hodisasi nima deb ataladi?',
    options: {
      A: "Sublimatsiya (haydash)",
      B: "Kondensatsiya",
      C: "Bugʻlanish",
      D: "Eritish"
    },
    correct_answer: 'A',
    explanation_reference: "Moddaning qattiq holatdan suyuqlikka oʻtmasdan toʻgʻridan-toʻgʻri gaz holatga oʻtishi sublimatsiya deyiladi."
  },
  {
    id: 'dtm-chem-30',
    subject: 'Kimyo',
    topic: 'Katalizatorlar',
    question: 'Kimyoviy reaksiyaning tezligini oshirib, oʻzi reaksiya natijasida sarflanmaydigan moddalar nima deyiladi?',
    options: {
      A: "Katalizatorlar",
      B: "Ingibitorlar",
      C: "Indikatorlar",
      D: "Reagentlar"
    },
    correct_answer: 'A',
    explanation_reference: "Katalizator reaksiyaning aktivlanish energiyasini pasaytirib, uning borishini tezlashtiradi."
  },
  {
    id: 'dtm-chem-31',
    subject: 'Kimyo',
    topic: 'Suvning qattiqligi',
    question: 'Tabiiy suvning qattiqligi asosan qaysi kationlarning tuzlari mavjudligiga bogʻliq?',
    options: {
      A: "Kalsiy (Ca²⁺) va Magniy (Mg²⁺)",
      B: "Natriy va Kaliy",
      C: "Temir va Mis",
      D: "Rux va Qoʻrgʻoshin"
    },
    correct_answer: 'A',
    explanation_reference: "Suvning vaqtinchalik (gidrokarbonatli) va doimiy (sulfatli, xloridli) qattiqligini Ca²⁺ va Mg²⁺ tuzlari keltirib chiqaradi."
  },
  {
    id: 'dtm-chem-32',
    subject: 'Kimyo',
    topic: 'Oksidlar tasnifi',
    question: 'Ham kislotalar, ham asoslar bilan reaksiyaga kirishib tuz va suv hosil qiluvchi oksidlar qanday ataladi?',
    options: {
      A: "Amfoter oksidlar (masalan: ZnO, Al₂O₃)",
      B: "Asosli oksidlar",
      C: "Kislotali oksidlar",
      D: "Tuz hosil qilmaydigan oksidlar"
    },
    correct_answer: 'A',
    explanation_reference: "Amfoter oksidlar (va gidroksidlar) ikkala xarakterni ham namoyon etadi: kislota bilan ham, kuchli ishqor bilan ham tuz hosil qiladi."
  },
  {
    id: 'dtm-chem-33',
    subject: 'Kimyo',
    topic: 'Gidroliz jarayoni',
    question: 'Kuchli asos va kuchsiz kislotadan hosil boʻlgan tuz (masalan: Na₂CO₃) eritmasida qanday muhit boʻladi?',
    options: {
      A: "Ishqoriy muhit (pH > 7)",
      B: "Kislotali muhit (pH < 7)",
      C: "Neytral muhit (pH = 7)",
      D: "Oʻta kislotali"
    },
    correct_answer: 'A',
    explanation_reference: "Anion boʻyicha gidrolizlanadi: CO₃²⁻ + H₂O ⇄ HCO₃⁻ + OH⁻, eritmada erkin OH⁻ koʻpayib muhit ishqoriy boʻladi."
  },
  {
    id: 'dtm-chem-34',
    subject: 'Kimyo',
    topic: 'Radioaktivlik va izotoplar',
    question: 'Bitta elementning protonlar soni bir xil, ammo neytronlar soni har xil boʻlgan atomlari qanday ataladi?',
    options: {
      A: "Izotoplar (masalan: ¹H, ²H, ³H)",
      B: "Izobarlar",
      C: "Izotonlar",
      D: "Allotroplar"
    },
    correct_answer: 'A',
    explanation_reference: "Yadro zaryadi bir xil, ammo atom massalari turlicha boʻlgan atomlar izotoplar deyiladi (Protiy, Deyteriy, Tritiy)."
  },
  {
    id: 'dtm-chem-35',
    subject: 'Kimyo',
    topic: 'Oqsil denaturatsiyasi',
    question: 'Yuqori harorat, ogʻir metall tuzlari yoki kislotalar taʼsirida oqsillarning ikkilamchi va uchlamchi tuzilishining qaytmas buzilishi nima deyiladi?',
    options: {
      A: "Denaturatsiya",
      B: "Gidroliz",
      C: "Rennaturatsiya",
      D: "Eritish"
    },
    correct_answer: 'A',
    explanation_reference: "Tashqi omillar taʼsirida oqsil tabiiy konformatsiyasining buzilib, biologik faolligini yoʻqotishi denaturatsiya deyiladi."
  }
];
