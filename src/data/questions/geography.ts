import { TestQuestion } from '../../types';

export const GEOGRAPHY_QUESTIONS: TestQuestion[] = [
  {
    id: 'dtm-geo-01',
    subject: 'Geografiya',
    topic: 'Oʻzbekiston maydoni',
    question: 'Oʻzbekiston Respublikasining umumiy yer maydoni qanchani tashkil etadi?',
    options: {
      A: "448.9 ming km²",
      B: "500.5 ming km²",
      C: "389.0 ming km²",
      D: "610.2 ming km²"
    },
    correct_answer: 'A',
    explanation_reference: "Oʻzbekiston maydoni 448.978 ming km² boʻlib, gʻarbdan sharqqa 1425 km, shimoldan janubga 925 km choʻzilgan."
  },
  {
    id: 'dtm-geo-02',
    subject: 'Geografiya',
    topic: 'Oʻzbekistonning eng baland nuqtasi',
    question: 'Oʻzbekiston hududidagi eng baland choʻqqi qaysi va uning balandligi qancha?',
    options: {
      A: "Hazrati Sulton choʻqqisi (Gissar tizmasi, 4643 m)",
      B: "Adelunga choʻqqisi (4301 m)",
      C: "Katta Chimyon (3309 m)",
      D: "Bobotogʻ (2292 m)"
    },
    correct_answer: 'A',
    explanation_reference: "Gissar tizmasidagi Hazrati Sulton choʻqqisi dengiz sathidan 4643 metr baland boʻlib, mamlakatimizning eng baland nuqtasidir."
  },
  {
    id: 'dtm-geo-03',
    subject: 'Geografiya',
    topic: 'Oʻzbekistonning eng past nuqtasi',
    question: 'Oʻzbekiston va butun Oʻrta Osiyoning eng chuqur botiqlaridan biri boʻlgan Mingbuloq botigʻi dengiz sathidan necha metr pastda joylashgan?',
    options: {
      A: "-12.8 metr",
      B: "-132 metr",
      C: "-50 metr",
      D: "-28 metr"
    },
    correct_answer: 'A',
    explanation_reference: "Qizilqumdagi Mingbuloq botigʻi mutlaq balandligi -12.8 m boʻlib, Oʻzbekistonning eng past quruqlik nuqtasi hisoblanadi."
  },
  {
    id: 'dtm-geo-04',
    subject: 'Geografiya',
    topic: 'Amudaryo va Sirdaryo',
    question: 'Oʻrta Osiyodagi eng sersuv daryo qaysi?',
    options: {
      A: "Amudaryo",
      B: "Sirdaryo",
      C: "Zarafshon",
      D: "Chirchiq"
    },
    correct_answer: 'A',
    explanation_reference: "Amudaryo Panj va Vaxsh daryolarining qoʻshilishidan hosil boʻlib, mintaqadagi eng sersuv daryodir (oʻrtacha yillik suv sarfi ~2000 m³/s)."
  },
  {
    id: 'dtm-geo-05',
    subject: 'Geografiya',
    topic: 'Sirdaryo uzunligi',
    question: 'Oʻrta Osiyoning eng uzun daryosi qaysi?',
    options: {
      A: "Sirdaryo (uzunligi 3019 km)",
      B: "Amudaryo (2540 km)",
      C: "Ili daryosi",
      D: "Chu daryosi"
    },
    correct_answer: 'A',
    explanation_reference: "Norin daryosi boshidan hisoblaganda Sirdaryo uzunligi 3019 km boʻlib, mintaqadagi eng uzun daryo hisoblanadi."
  },
  {
    id: 'dtm-geo-06',
    subject: 'Geografiya',
    topic: 'Qoʻshni davlatlar',
    question: 'Oʻzbekiston nechta davlat bilan chegaradosh va ularning barchasi qanday davlatlar sirasiga kiradi?',
    options: {
      A: "5 ta davlat (Qozogʻiston, Qirgʻiziston, Tojikiston, Turkmaniston, Afgʻoniston)",
      B: "4 ta davlat",
      C: "6 ta davlat",
      D: "3 ta davlat"
    },
    correct_answer: 'A',
    explanation_reference: "Oʻzbekiston 5 ta davlat bilan chegaradosh va dengizga chiqish uchun kamida ikkita davlat hududidan oʻtishi kerak boʻlgan dunyodagi ikkita 'double landlocked' davlatdan biridir."
  },
  {
    id: 'dtm-geo-07',
    subject: 'Geografiya',
    topic: 'Oʻzbekiston iqlimi',
    question: 'Oʻzbekiston hududi qanday iqlim mintaqasida joylashgan?',
    options: {
      A: "Keskin kontinental subtropik va moʻtadil iqlim",
      B: "Ekvatorial iqlim",
      C: "Dengiz iqlimi",
      D: "Musson iqlimi"
    },
    correct_answer: 'A',
    explanation_reference: "Okeanlardan uzoqda joylashganligi sababli Oʻzbekiston iqlimi keskin kontinental, quruq, quyoshli va yillik/sutkalik harorat tebranishi katta."
  },
  {
    id: 'dtm-geo-08',
    subject: 'Geografiya',
    topic: 'Foydali qazilmalar',
    question: 'Dunyodagi eng yirik ochiq usulda oltin qazib olinadigan konlardan biri boʻlgan Muruntov qaysi viloyatda joylashgan?',
    options: {
      A: "Navoiy viloyatida",
      B: "Buxoro viloyatida",
      C: "Samarqand viloyatida",
      D: "Toshkent viloyatida"
    },
    correct_answer: 'A',
    explanation_reference: "Qizilqum bagʻridagi Muruntov oltin koni Navoiy kon-metallurgiya kombinati tarkibida boʻlib, dunyoda eng yirik ochiq karyerdir."
  },
  {
    id: 'dtm-geo-09',
    subject: 'Geografiya',
    topic: 'Dunyo okeanlari',
    question: 'Yer yuzidagi eng katta va eng chuqur okean qaysi?',
    options: {
      A: "Tinch okeani",
      B: "Atlantika okeani",
      C: "Hind okeani",
      D: "Shimoliy Muz okeani"
    },
    correct_answer: 'A',
    explanation_reference: "Tinch okeani Yer yuzining uchdan bir qismini egallaydi va Mariana botigʻida (11 022 m) eng chuqur nuqtaga ega."
  },
  {
    id: 'dtm-geo-10',
    subject: 'Geografiya',
    topic: 'Dunyoning eng baland choʻqqisi',
    question: 'Yer yuzining eng baland nuqtasi boʻlgan Everest (Jomolungma) choʻqqisining balandligi necha metr?',
    options: {
      A: "8848 metr",
      B: "8611 metr",
      C: "7495 metr",
      D: "6962 metr"
    },
    correct_answer: 'A',
    explanation_reference: "Himoloy togʻlaridagi Jomolungma (Everest) choʻqqisi 8848.86 m balandlikka ega boʻlib, Nepal va Xitoy chegarasida joylashgan."
  },
  {
    id: 'dtm-geo-11',
    subject: 'Geografiya',
    topic: 'Dunyoning eng chuqur koʻli',
    question: 'Yer yuzidagi eng chuqur va eng katta chuchuk suv zaxirasiga ega koʻl qaysi?',
    options: {
      A: "Baykal koʻli (1642 m)",
      B: "Kaspiy dengizi",
      C: "Tanganika koʻli",
      D: "Yuqori koʻl"
    },
    correct_answer: 'A',
    explanation_reference: "Baykal koʻli Rossiya Federatsiyasining Sharqiy Sibir qismida joylashgan boʻlib, chuqurligi 1642 m va dunyo chuchuk suvining 20% ini saqlaydi."
  },
  {
    id: 'dtm-geo-12',
    subject: 'Geografiya',
    topic: 'Dunyoning eng sersuv daryosi',
    question: 'Yer yuzidagi eng sersuv va havzasi eng katta boʻlgan daryo qaysi?',
    options: {
      A: "Amazonka daryosi",
      B: "Nil daryosi",
      C: "Yanszi daryosi",
      D: "Missisipi daryosi"
    },
    correct_answer: 'A',
    explanation_reference: "Janubiy Amerikadagi Amazonka daryosi yiliga taxminan 7000 km³ suvni Atlantika okeaniga quyadi va eng keng havzaga ega."
  },
  {
    id: 'dtm-geo-13',
    subject: 'Geografiya',
    topic: 'Dunyoning eng uzun daryosi',
    question: 'Afrika qitʼasidagi eng uzun daryo qaysi?',
    options: {
      A: "Nil daryosi (uzunligi ~6650 km)",
      B: "Kongo daryosi",
      C: "Niger daryosi",
      D: "Zambezi daryosi"
    },
    correct_answer: 'A',
    explanation_reference: "Nil daryosi Oq Nil va Moviy Nil qoʻshilishidan hosil boʻlib, Oʻrta yer dengiziga quyiladi va qadimiy sivilizatsiyalar beshigi hisoblanadi."
  },
  {
    id: 'dtm-geo-14',
    subject: 'Geografiya',
    topic: 'Dunyoning eng katta choʻli',
    question: 'Yer sharidagi eng ulkan issiq tropik choʻl qaysi?',
    options: {
      A: "Saxroi Kabir (Sahara, maydoni ~9 mln km²)",
      B: "Gobi choʻli",
      C: "Kalahari choʻli",
      D: "Qizilqum choʻli"
    },
    correct_answer: 'A',
    explanation_reference: "Saxroi Kabir Shimoliy Afrikada 9 million kvadrat kilometrdan ziyod maydonni egallaydi."
  },
  {
    id: 'dtm-geo-15',
    subject: 'Geografiya',
    topic: 'Qitʼalar va materiklar',
    question: 'Maydoni boʻyicha eng kichik materik qaysi?',
    options: {
      A: "Avstraliya materigi",
      B: "Antarktida",
      C: "Janubiy Amerika",
      D: "Yevropa"
    },
    correct_answer: 'A',
    explanation_reference: "Avstraliya — yer yuzidagi eng kichik materik boʻlib, maydoni orollari bilan birga taxminan 7.7 mln km² ni tashkil qiladi."
  },
  {
    id: 'dtm-geo-16',
    subject: 'Geografiya',
    topic: 'Antarktida materigi',
    question: 'Antarktida materigining eng oʻziga xos tabiiy xususiyati nima?',
    options: {
      A: "Butunlay muz bilan qoplangan va doimiy aholisi yoʻq eng sovuq qitʼa",
      B: "Tropik oʻrmonlar mavjud",
      C: "Eng koʻp davlatlar joylashgan",
      D: "Muzliklar yoʻq"
    },
    correct_answer: 'A',
    explanation_reference: "Antarktida oʻrtacha 2000 metr qalinlikdagi muz qatlamiga ega, Yerning Janubiy qutbi shu yerda joylashgan va -89.2 °C rekord sovuq qayd etilgan."
  },
  {
    id: 'dtm-geo-17',
    subject: 'Geografiya',
    topic: 'Litosfera plitalari',
    question: 'Litosfera plitalarining gorizontal siljishi va toʻqnashuvi natijasida nimalar hosil boʻladi?',
    options: {
      A: "Bukmali togʻ tizmalari, chuqur okean novlari va zilzilalar",
      B: "Faqat tekisliklar",
      C: "Faqat botqoqliklar",
      D: "Gidrosfera"
    },
    correct_answer: 'A',
    explanation_reference: "Plitalar tektonikasi nazariyasiga koʻra plitalar toʻqnashgan joylarda kuchli seysmik faollik va burmali togʻlar (masalan, Himoloy) paydo boʻladi."
  },
  {
    id: 'dtm-geo-18',
    subject: 'Geografiya',
    topic: 'Atmosfera qatlamlari',
    question: 'Ob-havo hodisalari (bulutlar, yomgʻir, qor, shamol) sodir boʻladigan atmosferaning quyi qatlami nima deyiladi?',
    options: {
      A: "Troposfera",
      B: "Stratosfera",
      C: "Mezosfera",
      D: "Termosfera"
    },
    correct_answer: 'A',
    explanation_reference: "Troposfera atmosferaning 80% dan ortiq massasini va deyarli butun suv bugʻini oʻzida saqlaydi; asosiy ob-havo jarayonlari shu qatlamda kechadi."
  },
  {
    id: 'dtm-geo-19',
    subject: 'Geografiya',
    topic: 'Ozon qatlami',
    question: 'Tirik organizmlarni xavfli quyosh ultrabinafsha nurlaridan himoya qiluvchi Ozon qatlami qaysi atmosferada joylashgan?',
    options: {
      A: "Stratosferada (20–25 km balandlikda)",
      B: "Troposferada",
      C: "Ionosferada",
      D: "Ekzosferada"
    },
    correct_answer: 'A',
    explanation_reference: "O₃ ozon molekulalari stratosferada toʻplanib, biologik xavfli qisqa toʻlqinli ultrabinafsha nurlarini yutadi."
  },
  {
    id: 'dtm-geo-20',
    subject: 'Geografiya',
    topic: 'Geografik koordinatalar',
    question: 'Ekvator chizigʻidan shimolga yoki janubga qarab hisoblanadigan burchak masofasi nima deyiladi?',
    options: {
      A: "Geografik kenglik",
      B: "Geografik uzoqlik",
      C: "Azimut",
      D: "Balandlik"
    },
    correct_answer: 'A',
    explanation_reference: "Geografik kenglik ekvatordan (0°) qutblargacha (90° shimoliy va 90° janubiy kenglik) oʻlchanadi."
  },
  {
    id: 'dtm-geo-21',
    subject: 'Geografiya',
    topic: 'Bosh meridian',
    question: 'Bosh meridian (0° uzunlik) qaysi rasadxona orqali oʻtadi deb qabul qilingan?',
    options: {
      A: "Grinvich rasadxonasi (London yaqinida)",
      B: "Pulkovo rasadxonasi",
      C: "Parij rasadxonasi",
      D: "Samarqand rasadxonasi"
    },
    correct_answer: 'A',
    explanation_reference: "1884-yilgi xalqaro kelishuvga koʻra London yaqinidagi Grinvich rasadxonasi orqali oʻtgan meridian nol meridian deb tan olingan."
  },
  {
    id: 'dtm-geo-22',
    subject: 'Geografiya',
    topic: 'Oʻzbekiston qoriqlari',
    question: 'Oʻzbekistondagi eng qadimgi davlat qoʻriqxonasi qaysi?',
    options: {
      A: "Zomin togʻ-archa davlat qoʻriqxonasi (1926-yil)",
      B: "Chatqol biosfera qoʻriqxonasi",
      C: "Qizilqum qoʻriqxonasi",
      D: "Surxon qoʻriqxonasi"
    },
    correct_answer: 'A',
    explanation_reference: "Zomin davlat togʻ-oʻrmon qoʻriqxonasi 1926-yilda tashkil etilgan boʻlib, Turkiston tizmasining noyob archazorlarini muhofaza qiladi."
  },
  {
    id: 'dtm-geo-23',
    subject: 'Geografiya',
    topic: 'Orol dengizi muammosi',
    question: 'Orol dengizining qurishi asosan qaysi omil sababli yuz berdi?',
    options: {
      A: "Amudaryo va Sirdaryo suvlarining sugʻorishga meʼyordan ortiq olinishi",
      B: "Global tektonik choʻkish",
      C: "Yogʻingarchilikning keskin toʻxtashi",
      D: "Yangi daryoning paydo boʻlishi"
    },
    correct_answer: 'A',
    explanation_reference: "1960-yillardan boshlab paxtachilikni rivojlantirish uchun Amudaryo va Sirdaryo suvlarining kanallarga yoʻnaltirilishi Orol fojiasiga olib keldi."
  },
  {
    id: 'dtm-geo-24',
    subject: 'Geografiya',
    topic: 'Fargʻona vodiysi',
    question: 'Oʻzbekistonning aholi eng zich joylashgan mintaqasi qaysi?',
    options: {
      A: "Fargʻona vodiysi (Andijon, Fargʻona, Namangan)",
      B: "Qoraqalpogʻiston Respublikasi",
      C: "Navoiy viloyati",
      D: "Buxoro viloyati"
    },
    correct_answer: 'A',
    explanation_reference: "Andijon viloyati va butun Fargʻona vodiysida aholi zichligi 1 km² ga 750 kishidan oshib, MDH dagi eng yuqori koʻrsatkichlardan biridir."
  },
  {
    id: 'dtm-geo-25',
    subject: 'Geografiya',
    topic: 'Toshkent shahri',
    question: 'Aholisi 3 milliondan oshgan, Oʻzbekistonning siyosiy, maʼmuriy va iqtisodiy poytaxti qaysi shahar?',
    options: {
      A: "Toshkent shahri",
      B: "Samarqand shahri",
      C: "Namangan shahri",
      D: "Buxoro shahri"
    },
    correct_answer: 'A',
    explanation_reference: "Toshkent — Markaziy Osiyodagi eng yirik megapolis shahar va Oʻzbekiston Respublikasining poytaxtidir."
  },
  {
    id: 'dtm-geo-26',
    subject: 'Geografiya',
    topic: 'Oʻzbekiston gidroenergetikasi',
    question: 'Chirchiq daryosida qurilgan, Oʻzbekistondagi eng yirik suv omborlaridan biri qaysi?',
    options: {
      A: "Chorvoq suv ombori",
      B: "Toʻpalang suv ombori",
      C: "Tuyamoʻyin suv ombori",
      D: "Kattaqoʻrgʻon suv ombori"
    },
    correct_answer: 'A',
    explanation_reference: "Chorvoq suv ombori Piskom, Koʻksuv va Chotqol daryolarining qoʻshilish joyida barpo etilgan yirik gidroenergetik inshootdir."
  },
  {
    id: 'dtm-geo-27',
    subject: 'Geografiya',
    topic: 'Jahon aholisi',
    question: 'Dunyoda aholi soni boʻyicha birinchi oʻrinda turuvchi davlat qaysi?',
    options: {
      A: "Hindiston (1.43 milliarddan ortiq)",
      B: "AQSH",
      C: "Indoneziya",
      D: "Braziliya"
    },
    correct_answer: 'A',
    explanation_reference: "2023-yildan buyon BMT hisob-kitoblariga koʻra Hindiston aholi soni boʻyicha dunyoda 1-oʻringa chiqdi."
  },
  {
    id: 'dtm-geo-28',
    subject: 'Geografiya',
    topic: 'Maydoni boʻyicha eng yirik davlat',
    question: 'Yer yuzida hududi boʻyicha eng katta davlat qaysi?',
    options: {
      A: "Rossiya Federatsiyasi (17.1 mln km²)",
      B: "Kanada",
      C: "Xitoy",
      D: "AQSH"
    },
    correct_answer: 'A',
    explanation_reference: "Rossiya 17.1 million kvadrat kilometr maydoni bilan dunyo quruqligining sakkizdan bir qismini egallaydi."
  },
  {
    id: 'dtm-geo-29',
    subject: 'Geografiya',
    topic: 'Dunyoning eng baland sharsharasi',
    question: 'Janubiy Amerikadagi (Venesuela) balandligi 979 metr boʻlgan dunyodagi eng baland sharshara qaysi?',
    options: {
      A: "Anxel sharsharasi (Angel Falls)",
      B: "Viktoriya sharsharasi",
      C: "Niagara sharsharasi",
      D: "Iguasu sharsharasi"
    },
    correct_answer: 'A',
    explanation_reference: "Churun daryosidagi Anxel sharsharasi 979 metr balandlikdan toʻxtovsiz tushib turuvchi yer yuzidagi eng baland sharsharadir."
  },
  {
    id: 'dtm-geo-30',
    subject: 'Geografiya',
    topic: 'Vulkanlar',
    question: 'Tinch okeanining vulqonlar va zilzilalar koʻp sodir boʻladigan hududi xaritada nima deb ataladi?',
    options: {
      A: "Tinch okeani 'Olovli halqasi'",
      B: "Alp-Himoloy seysmik mintaqasi",
      C: "Atlantika tizmasi",
      D: "Bermud uchburchagi"
    },
    correct_answer: 'A',
    explanation_reference: "Tinch okeani atrofidagi litosfera plitalari chegaralarida yer yuzidagi vulqonlarning 75% i va eng kuchli zilzilalar joylashgan."
  },
  {
    id: 'dtm-geo-31',
    subject: 'Geografiya',
    topic: 'Dengiz oqimlari',
    question: 'Atlantika okeanidagi Shimoliy Yevropa iqlimini yumshatuvchi iliq okean oqimi qaysi?',
    options: {
      A: "Golfstrim (va Shimoliy Atlantika oqimi)",
      B: "Labrador oqimi",
      C: "Kanar oqimi",
      D: "Bengela oqimi"
    },
    correct_answer: 'A',
    explanation_reference: "Golfstrim iliq oqimi Yevropaning shimoli-gʻarbiy qismiga ulkan issiqlik olib keladi va muzlamas portlarni taʼminlaydi."
  },
  {
    id: 'dtm-geo-32',
    subject: 'Geografiya',
    topic: 'Dunyo xaritasi masshtabi',
    question: 'Masshtabi 1 : 100 000 boʻlgan xaritada 1 sm ga necha kilometr toʻgʻri keladi?',
    options: {
      A: "1 km",
      B: "10 km",
      C: "100 km",
      D: "0.1 km"
    },
    correct_answer: 'A',
    explanation_reference: "1 : 100 000 masshtabda 1 sm da 100 000 sm mavjud; 100 000 sm = 1000 m = 1 km."
  },
  {
    id: 'dtm-geo-33',
    subject: 'Geografiya',
    topic: 'Xalqaro sana almashinish chizigʻi',
    question: 'Xalqaro sana oʻzgarish chizigʻi asosan qaysi meridian boʻylab oʻtadi?',
    options: {
      A: "180° meridian boʻylab (Tinch okeani orqali)",
      B: "0° Grinvich meridiani",
      C: "90° sharqiy uzunlik",
      D: "Ekvator boʻylab"
    },
    correct_answer: 'A',
    explanation_reference: "180-meridian boʻylab belgilangan sana almashinish chizigʻini gʻarbdan sharqqa kesib oʻtganlar bir kun oldingi sanaga qaytadi."
  },
  {
    id: 'dtm-geo-34',
    subject: 'Geografiya',
    topic: 'Oʻzbekiston shamollari',
    question: 'Mirzachoʻl va Fargʻona vodiysida yozda esib, ekinlarni quritib yuboradigan kuchli quruq va issiq shamol nima deyiladi?',
    options: {
      A: "Garmsel (qurgʻoqchil issiq shamol)",
      B: "Bekobod shamoli",
      C: "Qoʻqon shamoli",
      D: "Bora"
    },
    correct_answer: 'A',
    explanation_reference: "Garmsel — yoz faslida esadigan oʻta issiq va quruq shamol boʻlib, havo namligini keskin tushirib ekinlarga jiddiy ziyon yetkazadi."
  },
  {
    id: 'dtm-geo-35',
    subject: 'Geografiya',
    topic: 'Qoraqalpogʻiston tabiati',
    question: 'Oʻzbekiston tarkibidagi suveren respublika — Qoraqalpogʻiston Respublikasining maydoni qancha?',
    options: {
      A: "166.6 ming km² (Oʻzbekiston hududining qariyb 37% i)",
      B: "80 ming km²",
      C: "200 ming km²",
      D: "45 ming km²"
    },
    correct_answer: 'A',
    explanation_reference: "Qoraqalpogʻiston Respublikasi 166.6 ming km² maydonni egallab, Ustyurt platosi, Orolqum va Amudaryo deltasini oʻz ichiga oladi."
  }
];
