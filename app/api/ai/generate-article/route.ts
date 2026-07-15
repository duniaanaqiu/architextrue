import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topik tidak boleh kosong" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      Anda adalah seorang ahli arsitektur dan penulis SEO profesional.
      Buatlah sebuah artikel blog lengkap, mewah, dan informatif untuk website kontraktor rumah mewah (ARCHITEXTRUE).
      Topik: "${topic}"

      Tolong kembalikan respons murni dalam format JSON (tanpa markdown backticks \`\`\`, tanpa penanda json, cukup teks json murni) dengan struktur berikut:
      {
        "title": "Judul Artikel Menarik dan SEO Friendly",
        "slug": "judul-artikel-menarik",
        "metaDescription": "Deskripsi singkat yang memancing klik, maksimal 160 karakter.",
        "content": "Konten artikel lengkap dalam format HTML murni. Gunakan <h2>, <h3>, <p>, <ul>, <li>, <strong>. Berikan penjelasan mendalam minimal 5 paragraf. Jangan gunakan <h1> karena judul akan diletakkan secara terpisah."
      }
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    
    // Clean up potential markdown formatting from gemini
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch (parseError) {
      console.error("Gagal parse JSON dari Gemini:", text);
      return NextResponse.json({ error: "Format respons dari AI tidak valid." }, { status: 500 });
    }

  } catch (error) {
    console.error("Error generating article:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
