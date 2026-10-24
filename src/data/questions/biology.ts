import { TestQuestion } from '../../types';

export const BIOLOGY_QUESTIONS: TestQuestion[] = [
  {
    id: 'dtm-bio-01',
    subject: 'Biologiya',
    topic: 'Fotosintez jarayoni',
    question: 'Fotosintez jarayonida suv molekulalarining yorugʻlik taʼsirida parchalanishi (fotoliz) natijasida qaysi gaz ajralib chiqadi?',
    options: {
      A: "Kislorod (O₂)",
      B: "Karbonat angidrid (CO₂)",
      C: "Azot (N₂)",
      D: "Metan (CH₄)"
    },
    correct_answer: 'A',
    explanation_reference: "Fotosintezning yorugʻlik bosqichida suv fotolizi sodir boʻlib, erkin molekulyar kislorod (O₂) atmosferaga ajraladi."
  },
  {
    id: 'dtm-bio-02',
    subject: 'Biologiya',
    topic: 'Hujayra organoidlari',
    question: 'Hujayrada oqsillar biosintezi qaysi organoidda amalga oshiriladi?',
    options: {
      A: "Ribosomada",
      B: "Mitoxondriyada",
      C: "Lizosomada",
      D: "Sentriolada"
    },
    correct_answer: 'A',
    explanation_reference: "Ribosomalar i-RNK axboroti asosida aminokislotalardan polipeptid zanjir (oqsil) sintez qiluvchi asosiy organoiddir."
  },
  {
    id: 'dtm-bio-03',
    subject: 'Biologiya',
    topic: 'Energiya almashinuvi',
    question: 'Hujayraning "energiya stansiyasi" hisoblangan va ATF hosil qiluvchi organoid qaysi?',
    options: {
      A: "Mitoxondriya",
      B: "Xloroplast",
      C: "Golji majmuasi",
      D: "Vakuola"
    },
    correct_answer: 'A',
    explanation_reference: "Mitoxondriyalarning ichki kristalarida oksidlanishli fosforillanish orqali ADF dan ATF sintezlanadi."
  },
  {
    id: 'dtm-bio-04',
    subject: 'Biologiya',
    topic: 'Hujayra qobigʻi',
    question: 'Oʻsimlik hujayrasi qobigʻining asosiy tarkibiy qismini qaysi polisaxarid tashkil qiladi?',
    options: {
      A: "Sellyuloza (kletchatka)",
      B: "Xitin",
      C: "Glikogen",
      D: "Kraxmal"
    },
    correct_answer: 'A',
    explanation_reference: "Oʻsimliklar hujayra devori sellyulozadan, zamburugʻlarniki xitindan, bakteriyalarniki esa mureindan iborat."
  },
  {
    id: 'dtm-bio-05',
    subject: 'Biologiya',
    topic: 'Mitoz boʻlinish',
    question: 'Mitoz boʻlinishning qaysi fazasida xromosomalar hujayra ekvatorida tiziladi va "metafaza plastinkasi"ni hosil qiladi?',
    options: {
      A: "Metafaza",
      B: "Profaza",
      C: "Anafaza",
      D: "Telofaza"
    },
    correct_answer: 'A',
    explanation_reference: "Metafaza bosqichida maksimal darajada spiralsimonlashgan xromosomalar ekvator tekisligiga tizilib, mikronaychalar sentromeralarga birikadi."
  },
  {
    id: 'dtm-bio-06',
    subject: 'Biologiya',
    topic: 'Meyoz boʻlinish',
    question: 'Gomologik xromosomalar oʻrtasida genlar almashinuvi (krossingover) meyozning qaysi bosqichida sodir boʻladi?',
    options: {
      A: "Profaza I",
      B: "Metafaza I",
      C: "Profaza II",
      D: "Anafaza II"
    },
    correct_answer: 'A',
    explanation_reference: "Meyoz I ning profaza bosqichida konʼyugatsiya (yaqinlashish) va krossingover (irsiy qismlar almashinuvi) sodir boʻladi."
  },
  {
    id: 'dtm-bio-07',
    subject: 'Biologiya',
    topic: 'Mendelning I qonuni',
    question: 'Mendelning birinchi qonuni — duragaylarning birinchi boʻgʻinda bir xilligi qanday nomlanadi?',
    options: {
      A: "Dominantlik qonuni",
      B: "Ajralish qonuni",
      C: "Mustaqil taqsimlanish qonuni",
      D: "Birlashish qonuni"
    },
    correct_answer: 'A',
    explanation_reference: "Gomozigota dominant (AA) va retsessiv (aa) formalarni chatishtirilganda F1 avlodda 100% bir xil (Aa) dominant fenotip namoyon boʻladi."
  },
  {
    id: 'dtm-bio-08',
    subject: 'Biologiya',
    topic: 'Mendelning II qonuni',
    question: 'Monoduragay chatishtirishda F2 boʻgʻinda fenotip boʻyicha ajralish nisbati qanday boʻladi?',
    options: {
      A: "3 : 1",
      B: "1 : 2 : 1",
      C: "9 : 3 : 3 : 1",
      D: "1 : 1"
    },
    correct_answer: 'A',
    explanation_reference: "Aa x Aa chatishtirilganda fenotipik nisbat 3 qism dominant (AA, Aa, Aa) va 1 qism retsessiv (aa) boʻladi (3:1)."
  },
  {
    id: 'dtm-bio-09',
    subject: 'Biologiya',
    topic: 'Genetika masalalari',
    question: 'Diduragay chatishtirishda (AaBb x AaBb) F2 boʻgʻinda fenotip boʻyicha ajralish nisbati qanday?',
    options: {
      A: "9 : 3 : 3 : 1",
      B: "3 : 1",
      C: "1 : 2 : 1",
      D: "12 : 3 : 1"
    },
    correct_answer: 'A',
    explanation_reference: "Mendelning mustaqil taqsimlanish (III qonuni) boʻyicha diduragay chatishtirishda fenotipik ajralish 9:3:3:1 nisbatda boʻladi."
  },
  {
    id: 'dtm-bio-10',
    subject: 'Biologiya',
    topic: 'DNK tuzilishi',
    question: 'DNK molekulasida Timin (T) nukleotidiga komplementar boʻlgan nukleotid qaysi?',
    options: {
      A: "Adenin (A)",
      B: "Guanin (G)",
      C: "Sitozin (S)",
      D: "Urasil (U)"
    },
    correct_answer: 'A',
    explanation_reference: "Chargaff qoidasi va Uotson-Krik modeliga koʻra DNK da Adenin har doim ikkita vodorod bogʻ orqali Timin bilan bogʻlanadi (A=T, G≡S)."
  },
  {
    id: 'dtm-bio-11',
    subject: 'Biologiya',
    topic: 'Genetik kod',
    question: 'Bitta aminokislotani kodlovchi m-RNK nukleotidlar tripleti nima deb ataladi?',
    options: {
      A: "Kodon",
      B: "Antikodon",
      C: "Genon",
      D: "Ekzon"
    },
    correct_answer: 'A',
    explanation_reference: "Axborot RNKdagi uchta nukleotid ketma-ketligi bitta aminokislotani kodlaydi va u kodon deb ataladi."
  },
  {
    id: 'dtm-bio-12',
    subject: 'Biologiya',
    topic: 'Qon guruhlari',
    question: 'Qonning IV (AB) guruhiga ega insonning qon plazmasida qanday agglyutininlar mavjud?',
    options: {
      A: "Agglyutininlar umuman boʻlmaydi (0)",
      B: "Faqat alfa (α)",
      C: "Faqat betta (β)",
      D: "Ham alfa, ham betta (α va β)"
    },
    correct_answer: 'A',
    explanation_reference: "AB guruh eritrotsitlarida A va B agglyutinogenlari boʻlib, plazmada esa aglyutininlar boʻlmaydi (shuning uchun universal retsipiyent hisoblanadi)."
  },
  {
    id: 'dtm-bio-13',
    subject: 'Biologiya',
    topic: 'Yurak va qon aylanish tizimi',
    question: 'Odam yuragi necha kameradan iborat?',
    options: {
      A: "4 ta (2 ta boʻlmacha va 2 ta qorincha)",
      B: "3 ta (2 ta boʻlmacha va 1 ta qorincha)",
      C: "2 ta",
      D: "3 ta toʻliq boʻlmagan toʻsiqli"
    },
    correct_answer: 'A',
    explanation_reference: "Odam va barcha sutemizuvchilar hamda qushlarning yuragi 4 kameradan (oʻng va chap boʻlmachalar, oʻng va chap qorinchalar) iborat."
  },
  {
    id: 'dtm-bio-14',
    subject: 'Biologiya',
    topic: 'Nerv tizimi',
    question: 'Nerv toʻqimasining asosiy funksional va strukturaviy hujayrasi nima deb ataladi?',
    options: {
      A: "Neyron",
      B: "Neyrogliya",
      C: "Akson",
      D: "Sinaps"
    },
    correct_answer: 'A',
    explanation_reference: "Neyron — tana, qisqa dendritlar va uzun akson oʻsimtasidan iborat boʻlgan nerv toʻqimasi birligidir."
  },
  {
    id: 'dtm-bio-15',
    subject: 'Biologiya',
    topic: 'Gumoral boshqaruv va bezlar',
    question: 'Qondagi qand (glyukoza) miqdorini pasaytiruvchi insulin gormonini qaysi bez ishlab chiqaradi?',
    options: {
      A: "Meʼdaosti bezi",
      B: "Qalqonsimon bez",
      C: "Buyrakusti bezi",
      D: "Gipofiz bezi"
    },
    correct_answer: 'A',
    explanation_reference: "Meʼdaosti bezining Langergans orolchalari beta-hujayralari qonga insulin gormonini ishlab chiqarib, glyukozani glikogenga aylantiradi."
  },
  {
    id: 'dtm-bio-16',
    subject: 'Biologiya',
    topic: 'Botanika: toʻqimalar',
    question: 'Oʻsimliklarda suv va erigan mineral moddalarni ildizdan barglarga qarab (yuqoriga) oʻtkazuvchi toʻqima qaysi?',
    options: {
      A: "Ksilema (naylar)",
      B: "Floema (elaksimon naylar)",
      C: "Kambiy",
      D: "Poʻkak"
    },
    correct_answer: 'A',
    explanation_reference: "Ksilema (yogʻochlik naylari) orqali suv va mineral tuzlar oqimi yuqoriga harakatlanadi; floema esa organik moddalarni bargdan pastga tashiydi."
  },
  {
    id: 'dtm-bio-17',
    subject: 'Biologiya',
    topic: 'Gulli oʻsimliklar',
    question: 'Gulli oʻsimliklarda qoʻsh urugʻlanish hodisasini 1898-yilda kim kashf etgan?',
    options: {
      A: "S. G. Navashin",
      B: "I. V. Michurin",
      C: "K. A. Timiryazev",
      D: "R. Broun"
    },
    correct_answer: 'A',
    explanation_reference: "Rus olimi S. G. Navashin qiyoq va liliya oʻsimliklarida birinchi boʻlib gulli oʻsimliklarga xos qoʻsh urugʻlanishni kashf etdi."
  },
  {
    id: 'dtm-bio-18',
    subject: 'Biologiya',
    topic: 'Zoologiya: bir hujayralilar',
    question: 'Oddiy amyoba qanday harakatlanadi?',
    options: {
      A: "Soxta oyoqlar (psevdopodiyalar) yordamida",
      B: "Xivchinlar yordamida",
      C: "Kiprikchalar orqali",
      D: "Passiv suzib yuradi"
    },
    correct_answer: 'A',
    explanation_reference: "Amyobalar sitoplazmaning oqib oʻtishi hisobiga soxta oyoqlar hosil qilib harakatlanadi va ozuqani fagotsitoz yoʻli bilan qamrab oladi."
  },
  {
    id: 'dtm-bio-19',
    subject: 'Biologiya',
    topic: 'Zoologiya: hasharotlar',
    question: 'Toʻliq oʻzgarish (metamorfoz) bilan rivojlanuvchi hasharotlarning rivojlanish bosqichlari toʻgʻri koʻrsatilgan qatorni toping.',
    options: {
      A: "Tuxum -> Lichinka -> Gʻumbak -> Imago (yetuk zot)",
      B: "Tuxum -> Lichinka -> Imago",
      C: "Tuxum -> Gʻumbak -> Imago",
      D: "Lichinka -> Tuxum -> Imago"
    },
    correct_answer: 'A',
    explanation_reference: "Toʻliq metamorfozda 4 ta bosqich boʻladi: tuxum, lichinka (qurt), gʻumbak va yetuk hasharot (kapalaklar, qoʻngʻizlar, pashshalar)."
  },
  {
    id: 'dtm-bio-20',
    subject: 'Biologiya',
    topic: 'Suvda va quruqlikda yashovchilar',
    question: 'Qurbaqaning lichinkasi (itbaliq) qaysi organlari orqali nafas oladi?',
    options: {
      A: "Jabralar orqali",
      B: "Oʻpka orqali",
      C: "Faqat teri orqali",
      D: "Traxeyalar orqali"
    },
    correct_answer: 'A',
    explanation_reference: "Itbaliqlar dastlab tashqi, soʻngra ichki jabralar bilan suvda nafas oladi; metamorfozdan soʻng oʻpka va teri nafas olishiga oʻtadi."
  },
  {
    id: 'dtm-bio-21',
    subject: 'Biologiya',
    topic: 'Qushlar anatomiyasi',
    question: 'Qushlar suyagida uchish muskullari birikadigan maxsus toʻsh suyagi oʻsigʻi nima deyiladi?',
    options: {
      A: "Kil (qirra toʻsh)",
      B: "Yelka kamari",
      C: "Dumgʻaza",
      D: "Boʻyinturuq"
    },
    correct_answer: 'A',
    explanation_reference: "Qushlarning koʻkrak toʻsh suyagidagi kil oʻsigʻiga qanotlarni harakatga keltiruvchi baquvvat koʻkrak muskullari birikadi."
  },
  {
    id: 'dtm-bio-22',
    subject: 'Biologiya',
    topic: 'Ovqat hazm qilish tizimi',
    question: 'Inson organizmida eng yirik ichki bez qaysi?',
    options: {
      A: "Jigar",
      B: "Meʼdaosti bezi",
      C: "Qalqonsimon bez",
      D: "Gipofiz"
    },
    correct_answer: 'A',
    explanation_reference: "Jigar inson tanasidagi eng yirik bez (ogʻirligi 1.5 kg gacha) boʻlib, oʻt suyuqligi ishlab chiqaradi va tozalash (baryer) vazifasini bajaradi."
  },
  {
    id: 'dtm-bio-23',
    subject: 'Biologiya',
    topic: 'Ayirish tizimi',
    question: 'Buyrakning funksional-morfologik birligi nima deb ataladi?',
    options: {
      A: "Nefron",
      B: "Neyron",
      C: "Alveola",
      D: "Gepatotsit"
    },
    correct_answer: 'A',
    explanation_reference: "Har bir buyrak 1 milliondan ortiq nefronlardan iborat boʻlib, ularda qon filtrlanadi va birlamchi hamda ikkilamchi siydik hosil boʻladi."
  },
  {
    id: 'dtm-bio-24',
    subject: 'Biologiya',
    topic: 'Vitaminlar',
    question: 'Raxit kasalligi bolalarda qaysi vitamin yetishmasligi oqibatida kelib chiqadi?',
    options: {
      A: "D vitamini (kalsiferol)",
      B: "C vitamini (askorbin kislota)",
      C: "A vitamini (retinol)",
      D: "B₁ vitamini (tiamin)"
    },
    correct_answer: 'A',
    explanation_reference: "D vitamini yetishmaganda ichakdan kalsiy va fosforning qonga soʻrilishi buzilib, suyaklar yumshab qiyshayadi (raxit)."
  },
  {
    id: 'dtm-bio-25',
    subject: 'Biologiya',
    topic: 'Evolyutsiya nazariyasi',
    question: 'Turlarning kelib chiqishi va tabiiy tanlanish taʼlimotining asoschisi kim?',
    options: {
      A: "Charlz Darvin",
      B: "Jan Batist Lamark",
      C: "Karl Linney",
      D: "Jorj Kyuvye"
    },
    correct_answer: 'A',
    explanation_reference: "Charlz Darvin 1859-yilda chop etilgan 'Turlarning tabiiy tanlanish yoʻli bilan kelib chiqishi' asarida evolyutsion nazariyani isbotladi."
  },
  {
    id: 'dtm-bio-26',
    subject: 'Biologiya',
    topic: 'Moslanuvchanlik shakllari',
    question: 'Zaharsiz yoki himoyasiz hayvonning zaharli, xavfli turga tashqi koʻrinishdan taqlid qilishi nima deb ataladi?',
    options: {
      A: "Mimikriya",
      B: "Kamuflyaj",
      C: "Ogohlantiruvchi rang",
      D: "Niqoblanish"
    },
    correct_answer: 'A',
    explanation_reference: "Mimikriya — himoyasiz turning yirtqichlardan saqlanish maqsadida zaharli va xavfli turlarga oʻxshash qiyofaga kirishidir."
  },
  {
    id: 'dtm-bio-27',
    subject: 'Biologiya',
    topic: 'Ekologiya va oziq zanjiri',
    question: 'Ekologik piramidada anorganik moddalardan organik moddalar sintezlovchi avtotrof organizmlar qanday ataladi?',
    options: {
      A: "Produtsentlar",
      B: "Konsumentlar",
      C: "Redutsentlar",
      D: "Detritofaglar"
    },
    correct_answer: 'A',
    explanation_reference: "Produtsentlar — fotosintez qiluvchi yashil oʻsimliklar va xemotrof bakteriyalar boʻlib, oziq zanjirining dastlabki boʻgʻinini tashkil etadi."
  },
  {
    id: 'dtm-bio-28',
    subject: 'Biologiya',
    topic: 'Ekologiya',
    question: 'Organik qoldiqlarni chirindigacha va anorganik moddalargacha parchalovchi zamburugʻ va bakteriyalar guruhi nima?',
    options: {
      A: "Redutsentlar",
      B: "Produtsentlar",
      C: "Birlamchi konsumentlar",
      D: "Geterotroflar"
    },
    correct_answer: 'A',
    explanation_reference: "Redutsentlar (destruktorlar) — oʻlik organik moddalarni minerallashtirib, tabiatda moddalar aylanishini taʼminlaydi."
  },
  {
    id: 'dtm-bio-29',
    subject: 'Biologiya',
    topic: 'Seleksiya asoslari',
    question: 'Oʻsimliklarning kelib chiqish markazlari va gomologik qatorlar qonunini yaratgan mashhur genetik olim kim?',
    options: {
      A: "N. I. Vavilov",
      B: "G. Mendel",
      C: "T. Morgan",
      D: "I. V. Michurin"
    },
    correct_answer: 'A',
    explanation_reference: "Nikolay Vavilov butun dunyo boʻylab ekspeditsiyalar oʻtkazib, madaniy oʻsimliklarning kelib chiqishining 7 ta asosiy geografik markazini aniqladi."
  },
  {
    id: 'dtm-bio-30',
    subject: 'Biologiya',
    topic: 'Biotexnologiya',
    question: 'Gen muhandisligida bir organizm DNK qismini boshqa organizmga kiritish uchun qoʻllaniladigan halqasimon bakterial DNK nima deb ataladi?',
    options: {
      A: "Plazmida",
      B: "Kapsid",
      C: "Sentromera",
      D: "Telomera"
    },
    correct_answer: 'A',
    explanation_reference: "Plazmidalar — bakteriyalarda uchraydigan va gen muhandisligida genlarni tashuvchi (vektor) sifatida qoʻllaniladigan halqasimon DNK molekulalaridir."
  },
  {
    id: 'dtm-bio-31',
    subject: 'Biologiya',
    topic: 'Viruslar',
    question: 'Viruslarni 1892-yilda tamaki mozaikasi kasalligini oʻrganish jarayonida kashf etgan olim kim?',
    options: {
      A: "D. I. Ivanovskiy",
      B: "Lui Paster",
      C: "Robert Kox",
      D: "I. I. Mechnikov"
    },
    correct_answer: 'A',
    explanation_reference: "Dmitriy Ivanovskiy tamaki barglari shirasini bakterial filtrdan oʻtkazib, bakteriyalardan ham kichik filtrlanuvchi patogenlarni (viruslarni) kashf qildi."
  },
  {
    id: 'dtm-bio-32',
    subject: 'Biologiya',
    topic: 'Zamburugʻlar',
    question: 'Tibbiyotda ilk antibiotik — penitsillin qaysi zamburugʻ turidan olingan?',
    options: {
      A: "Penitsill zamburugʻidan",
      B: "Mukordan",
      C: "Xamirturushdan",
      D: "Qorakuya zamburugʻidan"
    },
    correct_answer: 'A',
    explanation_reference: "1928-yilda Aleksandr Fleming mogʻor zamburugʻi Penicillium notatum bakteriyalarning oʻsishini toʻxtatuvchi penitsillin moddasini ajratishini aniqladi."
  },
  {
    id: 'dtm-bio-33',
    subject: 'Biologiya',
    topic: 'Immun tizimi',
    question: 'Organizmni yot moddalar va infeksiyalardan himoya qiluvchi antitanachalarni qaysi qon hujayralari ishlab chiqaradi?',
    options: {
      A: "B-limfotsitlar (plazmatik hujayralar)",
      B: "Eritrotsitlar",
      C: "Trombotsitlar",
      D: "Bazofillar"
    },
    correct_answer: 'A',
    explanation_reference: "Leykotsitlarning B-limfotsit guruhi antigen taʼsirida faollashib, oʻziga xos oqsil tabiatli antitanachalarni (immunoglobulinlarni) sintezlaydi."
  },
  {
    id: 'dtm-bio-34',
    subject: 'Biologiya',
    topic: 'Qonning ivishi',
    question: 'Qonning ivish jarayonida qaysi qon plastinkalari va kalsiy ionlari ishtirok etadi?',
    options: {
      A: "Trombotsitlar",
      B: "Eritrotsitlar",
      C: "Leykotsitlar",
      D: "Monotsitlar"
    },
    correct_answer: 'A',
    explanation_reference: "Trombotsitlar shikastlangan tomirda parchalanib, tromboplastin ajratadi va Ca²⁺ ionlari ishtirokida eruvchan fibrinogen erimaydigan fibrin tolasiga aylanadi."
  },
  {
    id: 'dtm-bio-35',
    subject: 'Biologiya',
    topic: 'Tiriklik darajalari',
    question: 'Biologik sistemalarning eng quyi (boshlangʻich) tuzilish darajasi qaysi hisoblanadi?',
    options: {
      A: "Molekula darajasi",
      B: "Hujayra darajasi",
      C: "Toʻqima darajasi",
      D: "Organizm darajasi"
    },
    correct_answer: 'A',
    explanation_reference: "Tiriklikning iyerarxik darajalari eng soddadan boshlanadi: Molekula -> Hujayra -> Toʻqima -> Organ -> Organizm -> Populatsiya-tur -> Biogeotsenoz -> Biosfera."
  }
];
