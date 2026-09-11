"use client";

import { useState } from "react";
import { Sparkles, Shield, Award, Info, X, Volume2, Search, Filter } from "lucide-react";
import { soundFx } from "@/lib/soundEffects";

export interface ArtifactItem {
  id: string;
  name: string;
  batakName: string;
  category: "Senjata & Pusaka" | "Ritual & Ilmu Kuno" | "Musik & Seni" | "Arsitektur & Pelayaran";
  rarity: "Legendary" | "Epic" | "Rare" | "Sacred";
  image: string;
  powerScore: number;
  culturalValue: number;
  shortDesc: string;
  fullHistory: string;
  rpgBuff: string;
  culturalInsight: string;
  audioPitch?: number;
}

export const artifactCodex: ArtifactItem[] = [
  {
    id: "piso-halasan",
    name: "Piso Halasan",
    batakName: "Pedang Pusaka Kebesaran Raja",
    category: "Senjata & Pusaka",
    rarity: "Legendary",
    image: "/images/future.png",
    powerScore: 95,
    culturalValue: 98,
    shortDesc: "Pedang pusaka khas Batak Hasundutan bertatahkan tanduk rusam dan ukiran logam mulia.",
    fullHistory: "Piso Halasan merupakan simbol kepemimpinan, kedamaian, dan keadilan bagi pemimpin masyarakat Batak. Tidak hanya berfungsi sebagai senjata pertahanan, pedang ini melambangkan wewenang Raja untuk menegakkan hukum adat tanpa kesewenang-wenangan.",
    rpgBuff: "+25% Leadership Aura, Meningkatkan Kepercayaan (Trust Meter) warga sebesar +15%.",
    culturalInsight: "Gagang Piso Halasan berbentuk kepala singa atau rusam yang diukir sangat detail melambangkan keberanian dan kewibawaan.",
    audioPitch: 180
  },
  {
    id: "tunggal-panaluan",
    name: "Tunggal Panaluan",
    batakName: "Tongkat Sakral Datu / Shaman",
    category: "Ritual & Ilmu Kuno",
    rarity: "Sacred",
    image: "/images/time-rift.png",
    powerScore: 98,
    culturalValue: 100,
    shortDesc: "Tongkat kayu sakral bermotif ukiran figur manusia dan hewan bertingkat pelindung desa.",
    fullHistory: "Dibuat dari kayu pohon pilihan yang diukir dengan sosok leluhur dan hewan mitologi. Tongkat ini dipegang oleh Datu (tetua spiritual) untuk memohon hujan, mengusir penyakit, dan memberikan perlindungan gaib bagi Huta.",
    rpgBuff: "Membuka penglihatan aura Time Rift dan menyembuhkan penyakit panen warga desa.",
    culturalInsight: "Kisah Tunggal Panaluan berakar dari legenda tujuh bersaudara yang menyatu dalam pohon sakral demi melindungi negeri.",
    audioPitch: 120
  },
  {
    id: "pustaha-laklak",
    name: "Pustaha Laklak",
    batakName: "Kitab Kuno Kulit Kayu Aksara Batak",
    category: "Ritual & Ilmu Kuno",
    rarity: "Legendary",
    image: "/images/past.png",
    powerScore: 88,
    culturalValue: 99,
    shortDesc: "Naskah kuno lipat dari kulit kayu Alim yang ditulis menggunakan Surat Batak.",
    fullHistory: "Pustaha Laklak berisi catatan ilmu pengobatan herbal (*hadatuon*), kalender kuno Batak (*Porhalaan*), serta ramuan obat alami dari tumbuhan pegunungan Danau Toba.",
    rpgBuff: "+30% Efisiensi Pengobatan Warga & Membuka Resep Herbal Tradisional di Balai Desa.",
    culturalInsight: "Ditulis dengan tinta alami campuran jelaga dan getah tanaman menggunakan pena bambu atau tulang hewan.",
    audioPitch: 220
  },
  {
    id: "serune-taganing",
    name: "Serune Bolon & Taganing",
    batakName: "Set Alat Musik Ritual Pesta Adat",
    category: "Musik & Seni",
    rarity: "Epic",
    image: "/village/village_map.jpg",
    powerScore: 82,
    culturalValue: 94,
    shortDesc: "Kombinasi seruling tiup bernada magis dan 5 drum bernada melodis Gondang Sabangunan.",
    fullHistory: "Alat musik utama dalam ansambel Gondang Sabangunan. Alunan nada Serune Bolon yang melengking menyampaikan doa kepada Sang Creator (*Debata Mulajadi Nabolon*).",
    rpgBuff: "Meningkatkan Moral & Semangat Gotong Royong (Marsiadapari) Warga sebesar +35%.",
    culturalInsight: "Taganing diatur dalam 5 nada khusus yang menirukan tangga nada intonasi bahasa Batak.",
    audioPitch: 350
  },
  {
    id: "solu-bolon",
    name: "Solu Bolon",
    batakName: "Perahu Naga Danau Toba",
    category: "Arsitektur & Pelayaran",
    rarity: "Epic",
    image: "/images/future.png",
    powerScore: 90,
    culturalValue: 92,
    shortDesc: "Perahu kayu besar dengan ukiran Kepala Singa/Naga untuk transportasi dan perdagangan air.",
    fullHistory: "Dipahat dari satu batang kayu utuh yang sangat besar, Solu Bolon digunakan masyarakat Batak pesisir Danau Toba untuk menyeberangi danau, mendistribusikan hasil bumi antar-pulau Samosir dan daratan.",
    rpgBuff: "Membuka Rute Perdagangan Air Laut/Danau & Mempercepat Kapasitas Barter Pasar Onan 2x Lipat.",
    culturalInsight: "Ukiran di haluan perahu (*Singa-singa*) dipercaya menjaga para pendayung dari badai gelombang Danau Toba.",
    audioPitch: 140
  },
  {
    id: "ultop",
    name: "Ultop Batak",
    batakName: "Sumpit Pemburu Pegunungan",
    category: "Senjata & Pusaka",
    rarity: "Rare",
    image: "/images/past.png",
    powerScore: 78,
    culturalValue: 85,
    shortDesc: "Senjata sumpit kayu halus berperekat getah racun alami untuk berburu di hutan rimba.",
    fullHistory: "Senjata tradisional silent hunter yang terbuat dari bambu keras atau kayu pilihan. Menggunakan anak panah kecil (*damak*) bernoda racun alami dari getah pohon Ipoh.",
    rpgBuff: "+20% Hasil Berburu Daging Hutan Tanpa Merusak Keseimbangan Ekosistem Lingkungan.",
    culturalInsight: "Kelurusan rongga Ultop dibuat secara teliti menggunakan bor bambu manual berhari-hari.",
    audioPitch: 280
  },
  {
    id: "gorga-relief",
    name: "Gorga Desa Naualu",
    batakName: "Ukiran Relief Kosmologi Batak",
    category: "Musik & Seni",
    rarity: "Legendary",
    image: "/images/time-rift.png",
    powerScore: 92,
    culturalValue: 97,
    shortDesc: "Seni ukir relief tiga warna (Merah, Hitam, Putih) penolak bala dan pelindung Ruma Bolon.",
    fullHistory: "Gorga adalah seni ragam hias khas Batak yang dipahat pada dinding kayu Ruma Bolon. Motif Desa Naualu mewakili 8 mata angin yang melambangkan perlindungan dan keseimbangan hidup.",
    rpgBuff: "Memperkuat Struktur Ketahanan Bangunan TH Level & Memberikan Bonus Aura Keamanan Desa.",
    culturalInsight: "Tiga warna Gorga melambangkan Tiga Dunia: Banua Ginjang (Atas), Banua Tonga (Tengah), Banua Toru (Bawah).",
    audioPitch: 200
  },
  {
    id: "ulos-ragidup",
    name: "Ulos Ragidup",
    batakName: "Kain Restu Kehidupan Paling Sakral",
    category: "Ritual & Ilmu Kuno",
    rarity: "Sacred",
    image: "/images/past.png",
    powerScore: 96,
    culturalValue: 100,
    shortDesc: "Kain tenun Ulos berstruktur terumit yang melambangkan nafas dan restu kehidupan.",
    fullHistory: "Ulos Ragidup ('Ragi Hidup') dianggap sebagai puncak tertinggi seni tenun Batak. Diberikan oleh orang tua kepada anak saat pernikahan atau ritual besar sebagai lambang doa panjang umur dan kebahagiaan.",
    rpgBuff: "Unlocks Master Achievement: 'Warisan Leluhur Abadi' & Memaksimalkan Trust Meter ke 100%.",
    culturalInsight: "Proses pembuatan satu lembar Ulos Ragidup bisa memakan waktu berbulan-bulan dengan ritual doa khusus sang penenun.",
    audioPitch: 400
  }
];

export default function CodexSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtifacts = artifactCodex.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.batakName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInspect = (item: ArtifactItem) => {
    setSelectedArtifact(item);
    soundFx.playDiscoveryChime();
  };

  return (
    <section id="codex" className="relative bg-[#080b10] py-28 text-white overflow-hidden">
      {/* Glow effect */}
      <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            <Sparkles size={14} />
            <span>Pustaka Warisan & Pusaka RPG</span>
          </div>

          <h2 className="text-4xl font-light tracking-[0.1em] sm:text-5xl md:text-6xl">
            BATAK ARTIFACT & <br />
            <span className="font-semibold text-white">WEAPON CODEX</span>
          </h2>

          <p className="mt-5 text-xs sm:text-sm text-white/60 leading-7">
            Jelajahi koleksi pusaka sakral, senjata kuno, naskah Laklak, dan instrumen tradisional 
            masyarakat Batak yang dapat ditemukan dalam perjalanan waktu di game **ANCESTRIA**.
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 rounded-2xl border border-white/10 bg-[#0c1017] p-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Senjata & Pusaka", "Ritual & Ilmu Kuno", "Musik & Seni", "Arsitektur & Pelayaran"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  soundFx.playClick();
                }}
                className={`
                  rounded-xl px-4 py-2 text-xs font-medium transition duration-300
                  ${selectedCategory === cat ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"}
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Cari pusaka/senjata..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/50 py-2 left-3 pl-9 pr-4 text-xs text-white placeholder-white/40 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Artifact Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredArtifacts.map((item) => (
            <div
              key={item.id}
              onClick={() => handleInspect(item)}
              className="
                group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#0f1420]
                p-5 transition duration-500 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between
              "
            >
              <div>
                {/* Rarity & Category Header */}
                <div className="flex items-center justify-between text-[9px] uppercase tracking-widest mb-3">
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-amber-300 font-medium">
                    {item.rarity}
                  </span>
                  <span className="text-white/40">{item.category}</span>
                </div>

                {/* Card Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/60 border border-white/5 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110 filter brightness-90 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1420] via-transparent to-transparent opacity-80" />
                  
                  {/* Sound Trigger Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.audioPitch) soundFx.playHasapiNote(item.audioPitch);
                    }}
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 border border-white/20 text-amber-300 hover:bg-amber-500 hover:text-black transition"
                    title="Dengar Nada Resonance Pusaka"
                  >
                    <Volume2 size={12} />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                  {item.name}
                </h3>
                <p className="text-[11px] text-amber-400 font-medium italic mt-0.5">
                  {item.batakName}
                </p>

                <p className="mt-2 text-xs text-white/60 line-clamp-2 leading-5">
                  {item.shortDesc}
                </p>
              </div>

              {/* Stats & CTA */}
              <div className="mt-5 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between text-[10px] text-white/50 mb-3">
                  <span>Power: <strong className="text-amber-300">{item.powerScore}</strong></span>
                  <span>Cultural Value: <strong className="text-emerald-400">{item.culturalValue}</strong></span>
                </div>

                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-amber-400 font-semibold group-hover:translate-x-1 transition">
                  <span>Inspeksi Detail</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Artifact Inspect Modal */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl border border-amber-500/40 bg-[#0f1420] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedArtifact(null)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-amber-500 hover:text-black transition"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative aspect-square w-full sm:w-44 rounded-2xl overflow-hidden border border-amber-500/30 bg-black shrink-0">
                <img
                  src={selectedArtifact.image}
                  alt={selectedArtifact.name}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => {
                    if (selectedArtifact.audioPitch) soundFx.playHasapiNote(selectedArtifact.audioPitch);
                  }}
                  className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-amber-400 bg-amber-500/20 backdrop-blur-md px-3 py-1 text-[10px] text-amber-300 font-semibold"
                >
                  <Volume2 size={12} />
                  <span>Play Resonansi</span>
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-0.5 text-[10px] text-amber-300 uppercase tracking-widest font-semibold">
                    {selectedArtifact.rarity}
                  </span>
                  <span className="text-[10px] text-white/40">{selectedArtifact.category}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mt-2">{selectedArtifact.name}</h3>
                <p className="text-xs text-amber-300/90 font-medium italic mt-0.5">{selectedArtifact.batakName}</p>

                <div className="mt-4 flex items-center gap-4 text-xs">
                  <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-1.5">
                    <span className="text-[9px] uppercase text-white/40 block">Power Score</span>
                    <span className="font-bold text-amber-400">{selectedArtifact.powerScore}/100</span>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-1.5">
                    <span className="text-[9px] uppercase text-white/40 block">Nilai Warisan Budaya</span>
                    <span className="font-bold text-emerald-400">{selectedArtifact.culturalValue}/100</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-xs leading-6 text-white/80 border-t border-white/10 pt-5">
              <div>
                <h4 className="text-[10px] uppercase tracking-wider text-amber-400 font-medium">Sejarah & Asal Usul Pusaka</h4>
                <p className="mt-1 text-white/90">{selectedArtifact.fullHistory}</p>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <h4 className="text-[10px] uppercase tracking-wider text-amber-300 font-medium">Efek Game RPG & Stats Buff</h4>
                <p className="mt-1 font-bold text-amber-100">{selectedArtifact.rpgBuff}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/50 p-4">
                <h4 className="text-[10px] uppercase tracking-wider text-white/40">Makna Kebudayaan Batak</h4>
                <p className="mt-1 italic text-white/70">{selectedArtifact.culturalInsight}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
