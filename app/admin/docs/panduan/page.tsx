export default function PanduanPenggunaanPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="font-display text-3xl font-semibold text-primary mb-4">Panduan Penggunaan CMS</h1>
      <p className="font-body text-on-surface-variant mb-8">
        Halaman ini berisi panduan lengkap cara mengelola website Architextrue.
      </p>
      
      <div className="bg-surface border border-surface-container rounded-2xl p-8 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-primary mb-4">Cara Menulis Artikel Baru</h2>
        <ul className="list-decimal list-inside space-y-2 text-on-surface-variant font-body">
          <li>Buka menu <strong>Articles</strong> di sidebar.</li>
          <li>Klik tombol <strong>Create New Article</strong>.</li>
          <li>Masukkan Judul Artikel. URL Slug akan otomatis terisi.</li>
          <li>Tulis konten di editor yang tersedia. Anda juga bisa menggunakan fitur <strong>Copilot Rewrite</strong>.</li>
          <li>Jika ingin menulis artikel full menggunakan AI, klik tombol <strong>AI Generate Full Article</strong> di pojok kanan atas.</li>
          <li>Pilih Kategori dan Tags di menu sebelah kanan (pastikan sudah membuatnya di menu Categories & Tags).</li>
          <li>Upload Cover Image dan tulis Meta Description untuk keperluan SEO.</li>
          <li>Klik <strong>Publish Article</strong> jika ingin langsung ditayangkan, atau <strong>Save Draft</strong> jika belum selesai.</li>
        </ul>
      </div>
    </div>
  );
}
