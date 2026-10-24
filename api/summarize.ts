// Vercel Serverless Function for generating concise summaries (Konspektlar)
export const maxDuration = 60;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Faqat POST so\'rovi qabul qilinadi' });
  }

  const { chapterTitle, content, subject } = req.body;

  const groqApiKey = process.env.GROQ_API_KEY;
  const prompt = `Quyidagi darslik matnidan o'quvchi uchun eng muhim qisqa va londa konspekt (bullet points) va qoidalar tuzib bering:
FAN: ${subject}
BOB: ${chapterTitle}
MATN:
${content}

Javobingiz faqat punktma-punkt (•) londa xulosalar va muhim formulalardan iborat bo'lsin. O'zbek tilida yozing.`;

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
          summary: result.text,
          model: 'Gemini 3.8 Flash (Google AI)',
        });
      }
    } catch (err) {
      console.error('Gemini summarize error:', err);
    }
  }

  // 2. Groq fallback
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
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json({
          summary: data.choices?.[0]?.message?.content,
          model: 'llama-3.3-70b-versatile (Groq)',
        });
      }
    } catch (err) {
      console.error('Groq summarize error:', err);
    }
  }

  return res.status(200).json({
    summary: `• ${chapterTitle} bobi bo'yicha asosiy tushunchalar.\n• Darslikdagi qoidalar va ta'riflarni yodda saqlang.\n• Misol va masalalarni mustaqil yechib mustahkamlang.`,
  });
}
