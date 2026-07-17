import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - ARCHITEXTRUE",
  description: "Syarat dan Ketentuan (Terms of Service) penggunaan layanan dan situs web ARCHITEXTRUE.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop max-w-4xl">
        <h1 className="font-display text-display-md md:text-display-lg text-on-background mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary max-w-none text-on-background-variant">
          <p>Terakhir Diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2>1. Penerimaan Syarat dan Ketentuan</h2>
          <p>
            Dengan mengakses dan menggunakan situs web ARCHITEXTRUE, Anda menyetujui
            untuk mematuhi dan terikat oleh Syarat dan Ketentuan (Terms of Service) ini.
            Jika Anda tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan situs
            web atau layanan kami.
          </p>

          <h2>2. Layanan Kami</h2>
          <p>
            ARCHITEXTRUE menyediakan layanan konstruksi, renovasi, dan konsultasi
            arsitektur khusus untuk rumah mewah di area Yogyakarta dan sekitarnya. Segala
            detail spesifik mengenai proyek, timeline, dan biaya akan diatur dalam kontrak
            kerja sama (Surat Perintah Kerja / SPK) terpisah yang mengikat secara hukum
            antara pihak ARCHITEXTRUE dan Klien.
          </p>

          <h2>3. Informasi Situs Web</h2>
          <p>
            Kami berusaha keras untuk memastikan bahwa semua informasi, gambar (portfolio),
            dan deskripsi layanan di situs web ini akurat dan terkini. Namun, kami tidak
            menjamin bahwa situs web sepenuhnya bebas dari kesalahan. Gambar portfolio
            merupakan hasil kerja nyata kami, namun hasil proyek masa depan dapat bervariasi
            tergantung spesifikasi dan kondisi lapangan.
          </p>

          <h2>4. Hak Kekayaan Intelektual</h2>
          <p>
            Semua konten di situs web ini, termasuk teks, grafis, logo, gambar, dan
            kompilasi data adalah milik ARCHITEXTRUE atau penyedia kontennya dan
            dilindungi oleh hukum hak cipta yang berlaku. Anda tidak diperkenankan untuk
            mereproduksi, mendistribusikan, atau menggunakan konten kami untuk tujuan
            komersial tanpa izin tertulis dari kami.
          </p>

          <h2>5. Tautan ke Pihak Ketiga</h2>
          <p>
            Situs web kami mungkin berisi tautan ke situs web pihak ketiga (seperti media sosial).
            Tautan tersebut disediakan hanya untuk kenyamanan Anda. Kami tidak memiliki
            kendali atas konten situs tersebut dan tidak bertanggung jawab atas kerugian
            atau kerusakan yang mungkin timbul dari penggunaannya.
          </p>

          <h2>6. Batasan Tanggung Jawab</h2>
          <p>
            Dalam batas yang diizinkan oleh hukum, ARCHITEXTRUE tidak bertanggung jawab atas
            kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari
            penggunaan atau ketidakmampuan untuk menggunakan situs web ini. Tanggung jawab
            kami terkait layanan konstruksi dan renovasi dibatasi pada garansi pengerjaan
            (retensi) yang disepakati secara tertulis dalam kontrak kerja.
          </p>

          <h2>7. Perubahan Ketentuan</h2>
          <p>
            Kami berhak untuk memperbarui atau mengubah Syarat dan Ketentuan ini
            kapan saja tanpa pemberitahuan sebelumnya. Perubahan akan berlaku segera
            setelah diposting di halaman ini. Penggunaan berkelanjutan Anda atas situs web
            ini setelah modifikasi merupakan penerimaan Anda terhadap perubahan tersebut.
          </p>

          <h2>8. Hukum yang Berlaku</h2>
          <p>
            Syarat dan Ketentuan ini tunduk pada dan ditafsirkan sesuai dengan hukum Republik
            Indonesia. Segala sengketa yang timbul akan diselesaikan di yurisdiksi pengadilan
            yang berwenang di wilayah Yogyakarta.
          </p>

          <h2>9. Kontak</h2>
          <p>
            Jika Anda memiliki pertanyaan mengenai Syarat dan Ketentuan ini, hubungi kami di:
            info@architextrue.com
          </p>
        </div>
      </div>
    </div>
  );
}
