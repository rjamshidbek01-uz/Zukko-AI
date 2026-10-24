# PDF Fayllarni Blob URL va pdfjs-dist Orqali Xavfsiz Yuklash Rejasi

## Qisqa Xulosa
Ushbu yangilanishda brauzer (xususan, Google Chrome) xavfsizlik cheklovlari (CORS, CSP va iframe sandboxing) tufayli PDF darsliklar bloklanishini toʻliq bartaraf etish maqsadida, darslik PDF fayllarini `fetch` orqali oqimli (stream) usulda yuklab, `ArrayBuffer`dan xavfsiz `Blob URL` (`blob:http...`) hosil qiluvchi va jonli yuklanish foizini koʻrsatuvchi tizim `SummaryModeView` va `PdfViewer` tarkibiga integratsiya qilinadi.

## Tasdiqlangan Qarorlar (User Review)
> [!IMPORTANT]
> Foydalanuvchi bilan quyidagi muhim texnik va vizual yechimlar kelishib olindi:
- **Blob URL hosil qilish usuli**: `fetch` orqali darslik faylini oqimli (stream) oʻqib, `ArrayBuffer` olib, undan `Blob` va `URL.createObjectURL(blob)` yaratish.
- **Yuklanish indikatori**: Katta hajmli PDF darsliklar yuklanayotganda foydalanuvchiga jonli yuklanish foizi (`0%`dan `100%`gacha) va progress bar koʻrsatish.
- **Xotira boshqaruvi**: Yangi kitob tanlanganda yoki komponent yopilganda eski `blob:` URL-manzillar `URL.revokeObjectURL()` orqali avtomatik tozalanadi.

---

## 1. Umumiy Konsept va Imkoniyatlar
- **Muammo**: Ayrim brauzerlar va iframe muhitida toʻgʻridan-toʻgʻri statik PDF yoʻllarini (`/books/...pdf`) ochishda Content Security Policy (CSP) yoki cross-origin qatʼiy qoidalari sababli fayllar bloklanishi yoki sekin yuklanishi mumkin.
- **Yechim**: Darslik fayli mijoz brauzerida toʻgʻridan-toʻgʻri mahalliy manba sifatida oʻqilib, `Blob URL`ga aylantiriladi. `pdfjs-dist` toʻgʻridan-toʻgʻri ushbu xavfsiz blob URL yoki `Uint8Array`dan foydalanib sahifama-sahifa Canvas renderini amalga oshiradi.
- **Natija**: Hech qanday bloklanishsiz, har qanday brauzer va xavfsizlik rejimida 100% barqaror ishlovchi, yuklanish progressi aniq koʻrinib turuvchi darslik mutolaasi.

---

## 2. Foydalanuvchi Tajribasi va Vizual Dizayn
- **Darslik tanlash**: Oʻquvchi fanni va kitobni tanlagan paytda, sahifada zamonaviy yuklanish kartochkasi paydo boʻladi.
- **Jonli yuklanish foizi**:
  - `Yuklanmoqda: 42% (14.2 MB / 34.0 MB)` koʻrinishidagi aniq raqamli maʼlumot.
  - Silliq animatsiyali progress-bar (indigo rangda).
- **Mutolaa maydoni**:
  - Yuklanish tugashi bilan sahifa bir zumda ochiladi.
  - Sahifalar oʻrtasida tezkor navigatsiya (oldingi/keyingi, toʻgʻridan-toʻgʻri sahifaga oʻtish).
  - Masshtab (+/-), 90° burish va toʻliq ekran rejimi.
  - Xatolik yuz bersa (tarmoq uzilishi va h.k.), xavfsiz qayta yuklash va matnli rejimga bir tugma bilan oʻtish imkoniyati.

---

## 3. Asosiy Texnik Qarorlar va Arxitektura

### Tizim Diagrammasi
```
┌───────────────────────────────────────────────────────────────┐
│                      SummaryModeView                          │
│                                                               │
│   Darslik Tanlash ──► loadPdfAsBlob(url, onProgress)          │
│                              │                                │
│                              ▼                                │
│               fetch() + ReadableStream Reader                 │
│                              │                                │
│                     [ArrayBuffer Chunks]                      │
│                              │                                │
│                              ▼                                │
│                   new Blob(..., 'pdf')                        │
│                              │                                │
│                              ▼                                │
│                   URL.createObjectURL()                       │
│                              │                                │
│                              ▼                                │
│               blob:http://localhost:3000/...                  │
└──────────────────────────────┬────────────────────────────────┘
                               │
                               ▼
┌───────────────────────────────────────────────────────────────┐
│                         PdfViewer                             │
│                                                               │
│   pdfjsLib.getDocument({ url: blobUrl })                      │
│                              │                                │
│                              ▼                                │
│             Canvas Rendering (Page by Page)                   │
│                              │                                │
│            Eski Blobni URL.revokeObjectURL()                  │
└───────────────────────────────────────────────────────────────┘
```

### Texnik Bosqichlar:
1. **Blob Loader Funksiyasi (`loadPdfBlobUrl`)**:
   - `fetch(url)` orqali javob olinadi.
   - `Content-Length` sarlavhasidan umumiy hajm oʻqiladi.
   - `response.body.getReader()` yordamida har bir boʻlak (chunk) hisoblab boriladi va `onProgress(percentage)` chaqiriladi.
   - Yigʻilgan boʻlaklardan `new Blob(chunks, { type: 'application/pdf' })` tuziladi va `URL.createObjectURL(blob)` qaytariladi.
2. **`SummaryModeView.tsx` bilan bogʻlash**:
   - `activeBlobUrl` va `downloadProgress` holatlari qoʻshiladi.
   - Darslik oʻzgarganda eski `blobUrl` bekor qilinadi (`URL.revokeObjectURL(prevBlob)`).
   - Yuklanish vaqtida progress-bar va foiz koʻrsatkichi aks etadi.
3. **`PdfViewer.tsx` moslashuvi**:
   - `PdfViewer`ga `blobUrl` uzatiladi, u toʻgʻridan-toʻgʻri `pdfjsLib.getDocument(blobUrl)` orqali chizadi.
   - Xotira tozalanishi uchun `useEffect` cleanup hookida revoke qilinadi.
4. **Verifikatsiya**:
   - `npm run lint` va `npm run build` orqali toʻliq tekshirish.
