import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { text, instruction } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Teks tidak boleh kosong" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const instructionPrompt = instruction 
      ? `Instruksi khusus: ${instruction}` 
      : "Perbaiki tata bahasa, buat lebih profesional, mengalir, dan bernuansa premium ala majalah arsitektur mewah.";

    const prompt = `
      Anda adalah editor majalah arsitektur mewah. 
      Tolong tulis ulang paragraf HTML berikut agar lebih elegan, profesional, dan memikat.
      
      ${instructionPrompt}
      
      Teks Asli (dalam format HTML):
      ${text}

      Kembalikan HANYA teks HTML hasil revisinya, tanpa komentar tambahan, tanpa format markdown backticks.
    `;

    const result = await model.generateContent(prompt);
    let revisedText = result.response.text();
    
    // Clean up
    revisedText = revisedText.replace(/```html/g, "").replace(/```/g, "").trim();

    return NextResponse.json({ revisedText });

  } catch (error) {
    console.error("Error rewriting text:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
