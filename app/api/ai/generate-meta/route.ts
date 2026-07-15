import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Konten tidak boleh kosong" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use flash for speed

    const prompt = `
      Baca konten artikel berikut:
      
      ${content}
      
      Buatkan "Meta Description" SEO yang sangat memancing rasa penasaran (clickbait elegan) untuk artikel di atas. 
      Panjang maksimal 150 karakter. 
      Kembalikan HANYA teks meta description tersebut tanpa embel-embel apapun, tanpa tanda kutip di awal/akhir, langsung teksnya saja.
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    
    // Clean up potential quotes
    text = text.replace(/^["']|["']$/g, '');

    return NextResponse.json({ metaDescription: text });

  } catch (error) {
    console.error("Error generating meta desc:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
