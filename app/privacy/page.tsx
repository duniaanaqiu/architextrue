import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ARCHITEXTRUE",
  description: "Kebijakan Privasi (Privacy Policy) dari ARCHITEXTRUE terkait pengumpulan, penggunaan, dan perlindungan data pribadi Anda.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop max-w-4xl">
        <h1 className="font-display text-display-md md:text-display-lg text-on-background mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary max-w-none text-on-background-variant">
          <p>Terakhir Diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2>1. Pendahuluan</h2>
          <p>
            Selamat datang di ARCHITEXTRUE. Kami sangat menghargai privasi Anda dan berkomitmen
            untuk melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami
            mengumpulkan, menggunakan, menyimpan, dan melindungi informasi Anda saat Anda
            mengunjungi situs web kami dan menggunakan layanan kami.
          </p>

          <h2>2. Informasi yang Kami Kumpulkan</h2>
          <p>
            Kami dapat mengumpulkan beberapa jenis informasi pribadi dari Anda, termasuk namun
            tidak terbatas pada:
          </p>
          <ul>
            <li><strong>Informasi Identifikasi:</strong> Nama lengkap, alamat email, nomor telepon (seperti WhatsApp).</li>
            <li><strong>Informasi Proyek:</strong> Detail mengenai kebutuhan pembangunan atau renovasi rumah Anda, anggaran, dan lokasi proyek.</li>
            <li><strong>Data Teknis:</strong> Alamat IP, jenis browser, dan data interaksi saat Anda menelusuri situs web kami.</li>
          </ul>

          <h2>3. Bagaimana Kami Menggunakan Informasi Anda</h2>
          <p>
            Informasi yang kami kumpulkan digunakan untuk tujuan berikut:
          </p>
          <ul>
            <li>Menyediakan layanan konsultasi dan estimasi biaya proyek (RAB).</li>
            <li>Berkomunikasi dengan Anda mengenai proyek, pembaruan, dan layanan kami.</li>
            <li>Meningkatkan kualitas situs web dan layanan pengguna.</li>
            <li>Memenuhi kewajiban hukum dan administratif.</li>
          </ul>

          <h2>4. Keamanan Data</h2>
          <p>
            ARCHITEXTRUE menerapkan langkah-langkah keamanan teknis dan organisasional
            yang sesuai untuk melindungi data pribadi Anda dari akses tanpa izin, perubahan,
            pengungkapan, atau penghancuran.
          </p>

          <h2>5. Berbagi Informasi</h2>
          <p>
            Kami tidak menjual, memperdagangkan, atau menyewakan data pribadi Anda kepada
            pihak ketiga. Kami mungkin membagikan informasi Anda kepada sub-kontraktor atau
            mitra terpercaya kami hanya sejauh yang diperlukan untuk menyelesaikan proyek
            Anda (misalnya, vendor material atau arsitek eksternal) dan mereka juga
            terikat oleh kewajiban kerahasiaan.
          </p>

          <h2>6. Hak-hak Anda</h2>
          <p>
            Anda memiliki hak untuk meminta akses, koreksi, atau penghapusan data pribadi Anda
            yang kami simpan. Jika Anda ingin melaksanakan hak-hak ini, silakan hubungi kami.
          </p>

          <h2>7. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui:
          </p>
          <ul>
            <li><strong>Email:</strong> info@architextrue.com</li>
            <li><strong>Telepon/WhatsApp:</strong> +62 812 1000 4453</li>
            <li><strong>Alamat:</strong> Jl. Kaliurang KM 8, Yogyakarta</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
