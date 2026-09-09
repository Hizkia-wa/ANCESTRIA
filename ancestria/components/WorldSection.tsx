"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, X, Home, Sprout, ShieldAlert, Droplets, ShoppingBag, Trees, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Hotspot {
  id: string;
  name: string;
  category: string;
  icon: typeof Home;
  position: { top: string; left: string };
  summary: string;
  details: string;
  gameplayRole: string;
  culturalInsight: string;
}

const mapHotspots: Hotspot[] = [
  {
    id: "ruma-bolon",
    name: "Ruma Bolon (Pemukiman Adat)",
    category: "Building & Settlement",
    icon: Home,
    position: { top: "32%", left: "56%" },
    summary: "Pusat musyawarah warga dan balai utama tempat keputusan desa diambil.",
    details: "Rumah adat khas Batak berpanggung kayu dengan atap melengkung seperti tanduk kerbau. Menjadi tempat musyawarah adat dan tempat tinggal pemimpin desa.",
    gameplayRole: "Tempat meningkatkan level Town Hall (TH Level), menentukan alokasi tugas warga, dan mengelola meteran Kepercayaan (Trust Meter).",
    culturalInsight: "Ruma Bolon dibangun tanpa paku besi, mengandalkan pasak kayu dan ikatan rotan yang kokoh melambangkan keharmonisan dengan alam."
  },
  {
    id: "sawah",
    name: "Sawah Terraces (Pertanian)",
    category: "Farming System",
    icon: Sprout,
    position: { top: "45%", left: "30%" },
    summary: "Area pertanian berundak untuk menghasilkan padi dan tanaman pangan desa.",
    details: "Terasering sawah di lereng pegunungan Batak yang memanfaatkan sistem irigasi alami dari mata air sungai.",
    gameplayRole: "Farming loop: Membuka lahan → menanam → merawat → memanen → menyimpan stok pangan warga.",
    culturalInsight: "Pertanian tradisional Batak menjunjung semangat gotong royong 'Marsiadapari' di mana tetangga saling membantu saat panen."
  },
  {
    id: "kandang",
    name: "Sopo & Kandang Ternak",
    category: "Livestock System",
    icon: ShieldAlert,
    position: { top: "65%", left: "75%" },
    summary: "Fasilitas pemeliharaan kerbau, babi, dan ayam untuk kebutuhan gizi dan adat.",
    details: "Area peternakan terintegrasi yang menghasilkan pupuk alami, sumber protein, dan kerbau untuk membajak sawah.",
    gameplayRole: "Peternakan memengaruhi produktivitas sawah dan menyediakan stok komoditas berharga untuk perdagangan pasar.",
    culturalInsight: "Kerbau (*Horbo*) memiliki posisi istimewa dalam masyarakat Batak sebagai simbol kekuatan, kemakmuran, dan kehormatan."
  },
  {
    id: "sungei",
    name: "Sungei (Pengelolaan Air)",
    category: "Water & Resource System",
    icon: Droplets,
    position: { top: "82%", left: "35%" },
    summary: "Sumber air jernih untuk irigasi, konsumsi, dan sanitasi desa.",
    details: "Aliran sungai pegunungan yang jernih membelah desa Batak, menyediakan pasokan air vital dan ikan air tawar.",
    gameplayRole: "Pemain membangun bendungan kayu dan salur irigasi sederhana untuk menjaga tingkat Kesehatan (Health Index) warga.",
    culturalInsight: "Kebersihan sumber air dijaga ketat oleh hukum adat lokal agar tidak mencemari lingkungan pemukiman."
  },
  {
    id: "pasar",
    name: "Pasar Adat (Onan)",
    category: "Trade & Economy",
    icon: ShoppingBag,
    position: { top: "54%", left: "82%" },
    summary: "Pusat transaksi ekonomi dan pertukaran komoditas antar-wilayah.",
    details: "Pasar tempat warga barter hasil panen, kain Ulos, rempah-rempah, dan hasil kerajinan dengan pedagang dari desa tetangga.",
    gameplayRole: "Trading system: Jual kelebihan bahan pangan untuk mendapatkan alat pertukaran atau pakan ternak.",
    culturalInsight: "Onan adalah pusat informasi dan penguat tali kekerabatan antar-marga dari berbagai penjuru Tanah Batak."
  },
  {
    id: "hutan",
    name: "Hutan Rimba (Area Eksplorasi)",
    category: "Exploration & Hunting",
    icon: Trees,
    position: { top: "25%", left: "80%" },
    summary: "Hutan rimba tempat berburu dan mengumpulkan kayu serta obat-obatan alami.",
    details: "Wilayah lebat di sekitar pegunungan vulkanik yang menyimpan kayu berkualitas, tanaman obat, dan hewan liar.",
    gameplayRole: "Berburu pasokan daging ekstra. Namun overhunting merusak ekosistem dan menurunkan kepercayaan warga.",
    culturalInsight: "Hutan dianggap sebagai pilar penyangga alam yang harus dijaga keseimbangannya melalui izin tetua adat."
  },
  {
    id: "heritage",
    name: "Sopo Warisan (Cultural Site)",
    category: "Cultural Heritage",
    icon: Sparkles,
    position: { top: "52%", left: "62%" },
    summary: "Situs penemuan dan penyimpanan koleksi Warisan Budaya Batak.",
    details: "Bangunan kayu tempat menyimpan artefak, naskah kuno Laklak, dan ukiran Gorga Batak.",
    gameplayRole: "Setiap penemuan baru di peta akan tersimpan permanen di Pustaka Warisan Budaya milik pemain.",
    culturalInsight: "Gorga Batak memiliki tiga warna dominan (merah, hitam, putih) yang melambangkan kosmologi tiga dunia."
  }
];

export default function WorldSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".world-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".world-heading",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="world"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080b0f] text-white py-28"
    >
      {/* Intro Header */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20 mb-12">
        <div className="world-heading max-w-3xl">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-amber-400 font-medium">
            Interactive World Map
          </p>

          <h2 className="text-4xl font-light tracking-[0.12em] sm:text-5xl md:text-6xl lg:text-7xl">
            EXPLORE THE <br />
            <span className="font-semibold text-white">BATAK VILLAGE</span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            Klik titik-titik interaktif pada peta peta desa untuk mengeksplorasi setiap area, fasilitas pembangunan, 
            sistem sumber daya, dan warisan budaya yang tersembunyi.
          </p>
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/20 bg-[#0c1017] shadow-2xl">
          {/* Map Image */}
          <img
            src="/village/village_map.jpg"
            alt="Ancestria Interactive Village Map"
            className="h-full w-full object-cover filter brightness-90 contrast-105"
          />

          {/* Map Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Map Title Badge */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-3 rounded-full border border-amber-500/40 bg-black/70 backdrop-blur-md px-5 py-2">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
              Interactive Map — Tanah Batak
            </span>
          </div>

          {/* Hotspots */}
          {mapHotspots.map((spot) => {
            const Icon = spot.icon;
            return (
              <button
                key={spot.id}
                onClick={() => setActiveHotspot(spot)}
                style={{ top: spot.position.top, left: spot.position.left }}
                className="
                  group absolute z-20 -translate-x-1/2 -translate-y-1/2
                  flex items-center justify-center transition duration-300 hover:scale-125
                "
                title={spot.name}
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-400 bg-amber-500/80 text-black shadow-lg shadow-amber-500/30 backdrop-blur-sm group-hover:bg-amber-400">
                  <Icon size={18} />
                  <span className="absolute -inset-1 rounded-full border border-amber-400 animate-ping opacity-75 pointer-events-none" />
                </div>

                {/* Tooltip Label */}
                <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap rounded-lg bg-black/90 border border-white/20 px-3 py-1 text-[11px] text-amber-300 shadow-xl">
                  {spot.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend bar below map */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0c1017] p-4 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-amber-400" />
            <span>Petunjuk: Klik sebarang ikon emas pada peta untuk membuka rincian area.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-amber-300">TH Level: 1–6+</span>
            <span>Resource Flow: Food • Water • Trust</span>
          </div>
        </div>
      </div>

      {/* Hotspot Detail Modal */}
      {activeHotspot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-xl rounded-2xl border border-amber-500/40 bg-[#0f1420] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setActiveHotspot(null)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-amber-500 hover:text-black transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-400 bg-amber-500/20 text-amber-300">
                <activeHotspot.icon size={22} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-medium">
                  {activeHotspot.category}
                </p>
                <h3 className="text-2xl font-bold text-white">
                  {activeHotspot.name}
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-xs leading-6 text-white/70">
              <p className="text-sm font-light text-white/90">{activeHotspot.details}</p>

              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <h4 className="text-[10px] uppercase tracking-wider text-amber-300 font-medium">Fungsi Dalam Gameplay</h4>
                <p className="mt-1 text-white/80">{activeHotspot.gameplayRole}</p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <h4 className="text-[10px] uppercase tracking-wider text-amber-400 font-medium">Wawasan Budaya Batak</h4>
                <p className="mt-1 italic text-amber-100/90">{activeHotspot.culturalInsight}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}