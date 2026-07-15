export default function TopikArtikelPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="font-display text-3xl font-semibold text-primary mb-4">99 List Topik Artikel</h1>
      <p className="font-body text-on-surface-variant mb-8">
        Kumpulan ide dan topik artikel seputar arsitektur, desain interior, dan konstruksi yang bisa Anda gunakan untuk mengisi blog.
      </p>
      
      <div className="bg-surface border border-surface-container rounded-2xl p-8 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-primary mb-4">Arsitektur & Desain Rumah</h2>
        <ul className="list-disc list-inside space-y-2 text-on-surface-variant font-body mb-8">
          <li>Tren Desain Rumah Minimalis di Tahun 2026</li>
          <li>Mengenal Gaya Arsitektur Japandi: Perpaduan Jepang dan Skandinavia</li>
          <li>Tips Memaksimalkan Cahaya Alami di Dalam Rumah</li>
          <li>Material Ramah Lingkungan untuk Fasad Rumah Modern</li>
          <li>Pentingnya Ventilasi Silang untuk Sirkulasi Udara yang Sehat</li>
        </ul>

        <h2 className="font-display text-xl font-semibold text-primary mb-4">Renovasi & Konstruksi</h2>
        <ul className="list-disc list-inside space-y-2 text-on-surface-variant font-body">
          <li>Panduan Lengkap Merencanakan Anggaran Renovasi Rumah</li>
          <li>Kesalahan Umum Saat Memilih Kontraktor Bangunan (dan Cara Menghindarinya)</li>
          <li>Berapa Lama Waktu Ideal untuk Membangun Rumah 2 Lantai?</li>
          <li>Memilih Material Lantai yang Tepat: Keramik vs Granit vs Vinyl</li>
          <li>Tahapan Krusial dalam Pembangunan Pondasi Rumah Tinggal</li>
        </ul>
        
        <div className="mt-8 pt-6 border-t border-surface-container">
          <p className="text-sm text-surface-container-high font-body italic">
            List ini dapat terus diperbarui seiring berjalannya waktu.
          </p>
        </div>
      </div>
    </div>
  );
}
