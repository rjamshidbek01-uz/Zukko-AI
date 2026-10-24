// Vercel Serverless Function Handler
// export const maxDuration = 60; is required to prevent timeout on Vercel AI routes

export const maxDuration = 60;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Faqat POST so\'rovi qabul qilinadi' });
  }

  const {
    question,
    studentAnswer,
    correctAnswer,
    subject,
    topic,
    bookReference,
    bookContext,
  } = req.body;

  const prompt = `Siz O'zbekistondagi nufuzli ta'lim platformasining Aqlli AI Repetitorisiz.
Darslik faktlariga tayangan holda o'quvchiga xatosini o'zbek tilida muloyim, aniq va dalilli tushuntirib bering.

FAN: ${subject}
MAVZU: ${topic}
SAVOL: ${question}
O'QUVCHI BELGILAGAN JAVOB: ${studentAnswer}
TO'G'RI JAVOB: ${correctAnswer}
ADMIN YUKLAGAN DARSLIKDAN FAKT VA QOIDA:
${bookReference || bookContext || 'Umumta\'lim darsligi standart qoidalari'}

Javobni quyidagi tuzilmada bering:
1. ❌ Nega bu javob xato? (O'quvchining tanlagan varianti nima uchun noto'g'riligini tushuntiring)
2. ✅ Nega to'g'ri javob to'g'ri? (Darslikdagi qoida va formulalarga tayangan holda)
3. 📖 Darslikdagi asos (Iqtibos): Darslikdagi qoida yoki ta'rif
4. 💡 AI Repetitor maslahati: Keyingi safar xato qilmaslik uchun qisqa maslahat`;

  // 1. Google Gemini 3.8 Flash (Official Google AI engine)
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (geminiApiKey) {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({
        apiKey: geminiApiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
      const result = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      if (result.text) {
        return res.status(200).json({
          text: result.text,
          model: 'Gemini 3.8 Flash (Google AI)',
        });
      }
    } catch (err) {
      console.error('Gemini API xatosi:', err);
    }
  }

  // 2. Groq API fallback
  const groqApiKey = process.env.GROQ_API_KEY;
  if (groqApiKey) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'Siz o\'quvchilarga darsliklar asosida bilim beruvchi malakali o\'zbek tili AI repetitorisiz.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.3,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        return res.status(200).json({
          text: content,
          model: 'llama-3.3-70b-versatile (Groq)',
        });
      }
    } catch (err) {
      console.error('Groq API xatosi:', err);
    }
  }

  // Fallback response with exact book reference
  return res.status(200).json({
    text: `❌ Siz belgilagan javob: ${studentAnswer} — bu noto'g'ri variant.\n\n✅ To'g'ri javob: ${correctAnswer}.\n\n📖 Darslikdagi fakt: ${bookReference || 'Darslik qoidalariga muvofiq'}\n\n💡 AI Repetitor maslahati: Savolni diqqat bilan o'qib, formulani daftarga yozib hisoblang.`,
    model: 'Zukko Knowledge Engine',
  });
}
