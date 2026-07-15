"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateFullArticle(topic: string) {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY is not set in environment variables");
    }

    const prompt = `Anda adalah seorang ahli arsitektur dan penulis SEO profesional.
Buatlah sebuah artikel blog lengkap, mewah, dan informatif untuk website kontraktor rumah mewah (ARCHITEXTRUE).
Topik: "${topic}"

Tolong kembalikan respons murni dalam format JSON (tanpa markdown backticks \`\`\`, tanpa penanda json) dengan struktur berikut:
{
  "title": "Judul Artikel Menarik dan SEO Friendly",
  "slug": "judul-artikel-menarik",
  "metaDescription": "Deskripsi singkat yang memancing klik, maksimal 160 karakter.",
  "content": "Konten artikel lengkap dalam format HTML murni. Gunakan <h2>, <h3>, <p>, <ul>, <li>, <strong>. Berikan penjelasan mendalam minimal 5 paragraf. Jangan gunakan <h1> karena judul akan diletakkan secara terpisah."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }

    const data = JSON.parse(text);
    return { success: true, data };
  } catch (error: any) {
    console.error("AI Article Gen Error:", error);
    return { success: false, error: error.message || "Failed to generate article" };
  }
}

export async function generateMetaDesc(content: string) {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY is not set in environment variables");
    }

    const prompt = `Baca konten artikel berikut:
${content.replace(/<[^>]*>?/gm, "").substring(0, 5000)}

Buatlah meta description singkat (maksimal 160 karakter) yang sangat menarik, SEO friendly, dan memancing orang untuk membaca artikel tersebut.
Kembalikan HANYA teks deskripsinya saja, tanpa awalan/akhiran apa pun, tanpa tanda kutip.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }

    return { success: true, text: text.trim() };
  } catch (error: any) {
    console.error("AI Meta Gen Error:", error);
    return { success: false, error: error.message || "Failed to generate meta description" };
  }
}

export async function editWithAI(selectedText: string, instruction: string) {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY is not set in environment variables");
    }

    const prompt = `Anda adalah asisten penulis (editor). Tugas Anda adalah mengubah atau memperbaiki teks yang diberikan sesuai dengan instruksi.

INSTRUKSI:
${instruction}

TEKS ASLI:
${selectedText}

KEMBALIKAN HANYA TEKS HASIL REVISI, tanpa embel-embel, tanpa tanda kutip tambahan, dan tanpa penjelasan apa pun. Jika teks aslinya mengandung HTML, pastikan teks revisi juga berformat HTML yang rapi.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }

    return { success: true, text: text.trim() };
  } catch (error: any) {
    console.error("AI Rewrite Error:", error);
    return { success: false, error: error.message || "Failed to rewrite text" };
  }
}
