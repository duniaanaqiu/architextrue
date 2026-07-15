

const scopes = [
  {
    title: "Perencanaan & Perizinan",
    items: [
      "Pembuatan Desain Arsitektur & Interior 3D",
      "Penyusunan Gambar Kerja Teknis (DED)",
      "Perhitungan Struktur oleh Ahli Bersertifikat",
      "Penyusunan Rencana Anggaran Biaya (RAB)",
      "Pengurusan PBG/IMB (Opsional)"
    ]
  },
  {
    title: "Pekerjaan Struktur",
    items: [
      "Pembersihan dan Pemadatan Lahan",
      "Pekerjaan Pondasi (Batu Kali, Foot Plat, Strauss, Bore Pile)",
      "Pekerjaan Beton Bertulang (Sloof, Kolom, Balok)",
      "Pekerjaan Dinding (Bata Merah/Ringan)",
      "Pekerjaan Atap (Rangka Baja Ringan/Baja Konvensional)"
    ]
  },
  {
    title: "Mekanikal, Elektrikal & Plumbing (MEP)",
    items: [
      "Instalasi Jaringan Listrik Premium (Smart Home Ready)",
      "Instalasi Pipa Air Bersih & Air Kotor (AW Standard)",
      "Pemasangan Toren, Pompa, & Filter Air",
      "Instalasi Titik AC dan Water Heater",
      "Pekerjaan Septic Tank Biofill"
    ]
  },
  {
    title: "Finishing Premium",
    items: [
      "Pemasangan Lantai (Granit Tile, Marmer, Parket)",
      "Pengecatan Interior & Eksterior (Jotun/Dulux Weathershield)",
      "Pemasangan Kusen, Pintu & Jendela (Aluminium Premium/Kayu Solid)",
      "Pemasangan Plafon Gypsum dengan Drop Ceiling",
      "Instalasi Sanitair (Toto/Kohler Standard)"
    ]
  }
];

export function ScopeSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mb-4">
            Ruang Lingkup Pekerjaan
          </h2>
          <p className="text-lg font-body text-on-surface-variant max-w-2xl mx-auto">
            Layanan "All-in-One" dari tanah kosong hingga serah terima kunci. Anda cukup membawa koper untuk pindah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {scopes.map((scope, index) => (
            <div key={index} className="bg-surface p-8 rounded-2xl shadow-sm border border-on-surface/5">
              <h3 className="text-2xl font-display font-medium text-primary mb-6 border-b border-primary/10 pb-4">
                {scope.title}
              </h3>
              <ul className="space-y-3">
                {scope.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-tertiary text-lg mt-0.5">check_circle</span>
                    <span className="text-base font-body text-on-surface-variant">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
