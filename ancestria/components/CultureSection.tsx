"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, BookOpen, X, ChevronRight, Award, Info } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface CulturalItem {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDesc: string;
  definition: string;
  materials: string;
  functionContext: string;
  meaningPhilosophy: string;
  whenUsed: string;
  didYouKnow: string;
  kinshipGlossary?: { term: string; meaning: string }[];
}

const cultures: CulturalItem[] = [
  {
    id: "ulos",
    number: "01",
    title: "ULOS — Kain Sakral Batak",
    category: "Tekstil & Simbolisme Adat",
    shortDesc: "Temukan Ulos sebagai lambang restu, kehangatan, dan ikatan kasih sayang antarsesama.",
    definition: "Kain tenun tradisional masyarakat Batak berbentuk selendang/sarung yang secara harfiah melambangkan selimut kehangatan perlindungan jiwa.",
    materials: "Ditenun dari benang khusus berwarna dominan Merah (Rara), Hitam (Birong), dan Putih (Nabontar) yang mewakili tiga kosmologi dunia Batak (Banua Ginjang, Banua Tonga, Banua Toru).",
    functionContext: "Digunakan sebagai pakaian adat, penghangat tubuh pegunungan, serta kain sakral dalam ritual kelahiran, pernikahan, hingga duka cita.",
    meaningPhilosophy: "Falsafah Batak: “ijuk pangihot ni hodong, ulos pangihot ni holong” — jika ijuk pengikat pelepah pada batangnya, maka Ulos adalah pengikat kasih sayang antarsesama.",
    whenUsed: "Diberikan dalam ritual 'Mangulosi' yang hanya boleh dilakukan oleh senior/orang tua kepada yang lebih muda.",
    didYouKnow: "Masyarakat Batak percaya ada 3 sumber kehangatan utama bagi manusia: Matahari, Api, dan Ulos."
  },
  {
    id: "kekerabatan",
    number: "02",
    title: "KEKERABATAN & BAHASA",
    category: "Sistem Social & Kinship",
    shortDesc: "Sistem kekerabatan Batak (Dalihan Na Tolu) yang mengatur tutur sapa dan rasa hormat.",
    definition: "Sistem struktur hubungan sosial masyarakat Batak berbasis pertalian darah dan ikatan perkawinan yang membentuk kesantunan berbahasa.",
    materials: "Tiga pilar utama (*Dalihan Na Tolu*): Somba Marhula-hula (Hormat pada keluarga istri), Elek Marboru (Bujuk/sayang pada keluarga wanita), Manat Mardongan Tubu (Hati-hati dengan sesama marga).",
    functionContext: "Diwujudkan dalam dialog NPC game di mana warga memanggil pemain dengan sapaan hormat berdasarkan silsilah.",
    meaningPhilosophy: "Membawa nilai saling menghargai, menjaga sopan santun, dan menghindari konflik antar-warga.",
    whenUsed: "Setiap kali berinteraksi dalam kehidupan sehari-hari, musyawarah adat, dan pertukaran barang.",
    didYouKnow: "Setiap marga Batak memiliki garis silsilah (*Tarombo*) yang terikat hingga puluhan generasi ke atas.",
    kinshipGlossary: [
      { term: "Amang", meaning: "Sapaan hormat untuk ayah atau pria senior sepantaran ayah." },
      { term: "Inang", meaning: "Sapaan hormat untuk ibu atau wanita senior sepantaran ibu." },
      { term: "Tulang", meaning: "Saudara laki-laki dari pihak ibu (sangat dihormati)." },
      { term: "Namboru", meaning: "Saudara perempuan dari pihak ayah." },
      { term: "Amangboru", meaning: "Suami dari Namboru." },
      { term: "Boru", meaning: "Anak perempuan / keluarga penerima wanita." }
    ]
  },
  {
    id: "ruma-bolon",
    number: "03",
    title: "RUMAH BOLON & GORGA",
    category: "Arsitektur & Seni Ukir",
    shortDesc: "Rumah panggung kayu megah dengan ukiran seni Gorga berfilosofi tinggi.",
    definition: "Rumah adat Batak bertiang kayu besar berpanggung yang dihiasi ukiran seni Gorga berwarna merah, hitam, dan putih.",
    materials: "Kayu keras alami, ijuk kelapa untuk atap melengkung, pasak kayu tanpa paku besi, dan cat pewarna alami.",
    functionContext: "Tempat musyawarah desa, kediaman keluarga, dan ruang perlindungan dari cuaca pegunungan.",
    meaningPhilosophy: "Pintu masuk yang rendah memaksa siapapun menundukkan kepala saat masuk sebagai simbol rasa hormat pada tuan rumah.",
    whenUsed: "Tempat utama musyawarah adat dan pusat kenaikan level Town Hall (TH Level) desa.",
    didYouKnow: "Motif Gorga Desa Naualu (delapan mata angin) diukir di bagian depan Ruma Bolon untuk menangkal marabahaya."
  },
  {
    id: "kuliner",
    number: "04",
    title: "KULINER TRADISIONAL",
    category: "Gastronomi & Pangan",
    shortDesc: "Masakan olahan berbumbu rempah lokal seperti Andaliman yang kaya cita rasa.",
    definition: "Sistem pangan tradisional berbasis bahan alami pegunungan dan danau seperti bumbu rempah Andaliman (merica Batak).",
    materials: "Daging air tawar, Andaliman, kunyit, bawang merah, beras ketan untuk kue Lapet.",
    functionContext: "Memulihkan stamina warga, menjadi pakan bergizi, dan syarat sajian pesta adat.",
    meaningPhilosophy: "Makanan tradisional disajikan bersama untuk mempererat tali persaudaraan desa.",
    whenUsed: "Setelah kerja bakti panen atau pesta syukuran desa.",
    didYouKnow: "Rempah Andaliman memberikan efek getar penggetar lidah yang unik dan khas di seluruh dunia."
  },
  {
    id: "gotong-royong",
    number: "05",
    title: "MARSIADAPARI — Gotong Royong",
    category: "Nilai Komunitas & Kerja Sama",
    shortDesc: "Tradisi kerja bakti bergantian mengerjakan sawah dan pembangunan fasilitas desa.",
    definition: "Falsafah gotong royong tradisional Batak di mana kelompok warga saling membantu menanam dan memanen sawah secara bergantian.",
    materials: "Tenaga kerja kolektif, semangat kebersamaan, dan sajian makanan bersama.",
    functionContext: "Mempercepat pembangunan fasilitas desa di game dan memperkuat meteran Kepercayaan warga.",
    meaningPhilosophy: "“Sisolhot tu na dao, jonok tu na parjonok” — Gotong royong mendekatkan persaudaraan dan menyatu dalam beban bersama.",
    whenUsed: "Saat membuka lahan sawah baru, mendirikan Ruma Bolon, atau memperbaiki bendungan irigasi.",
    didYouKnow: "Marsiadapari memastikan tidak ada keluarga di desa yang ketinggalan panen meskipun kekurangan tenaga kerja."
  }
];

export default function CultureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCulture, setActiveCulture] = useState<CulturalItem>(cultures[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".culture-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".culture-heading",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="culture"
      className="relative overflow-hidden bg-[#080b0f] text-white py-28"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/5 blur-[120px]" />

      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20 mb-16">
        <div className="culture-heading max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-medium">
            Cultural Discovery System
          </p>

          <h2 className="mt-4 text-4xl font-light tracking-[0.12em] sm:text-5xl md:text-6xl lg:text-7xl">
            WARISAN <br />
            <span className="font-semibold text-white">BATAK HERITAGE</span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            Setiap kali eksplorasi mengungkap objek baru, kartu Cultural Discovery akan mencatat sejarah, makna, 
            dan falsafah mendalam yang diverifikasi ke dalam Pustaka Warisan pemain.
          </p>
        </div>
      </div>

      {/* Discovery Showcase Cards */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="grid overflow-hidden rounded-3xl border border-white/10 lg:grid-cols-[0.8fr_1.2fr] bg-[#0c1017]">
          {/* Left Column: List selector */}
          <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
            {cultures.map((item) => {
              const isActive = activeCulture.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCulture(item)}
                  className={`
                    flex w-full items-center justify-between border-b border-white/10 p-6 text-left transition duration-300 last:border-b-0
                    ${isActive ? "bg-amber-500/10 border-l-4 border-l-amber-400" : "hover:bg-white/[0.03]"}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-bold tracking-widest ${isActive ? "text-amber-400" : "text-white/30"}`}>
                      {item.number}
                    </span>
                    <div>
                      <h4 className={`text-sm font-semibold tracking-wider ${isActive ? "text-white" : "text-white/60"}`}>
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">{item.category}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className={`transition ${isActive ? "text-amber-400 translate-x-1" : "text-white/20"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Card View */}
          <div className="p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] text-amber-300 uppercase tracking-widest font-medium">
                  {activeCulture.category}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-amber-400">
                  <Sparkles size={12} />
                  <span>Cultural Discovery Card</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-4">{activeCulture.title}</h3>
              <p className="mt-4 text-xs sm:text-sm text-white/70 leading-6">{activeCulture.definition}</p>

              <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-black/40 p-5 text-xs text-white/80">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 block font-medium">Falsafah & Makna</span>
                  <p className="mt-1 italic text-amber-100">{activeCulture.meaningPhilosophy}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Konsep Penggunaan</span>
                  <p className="mt-1 text-white/70">{activeCulture.functionContext}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <div className="text-[11px] text-white/40">
                <span>Did You Know: </span>
                <span className="text-amber-300">{activeCulture.didYouKnow}</span>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="shrink-0 rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold text-black uppercase tracking-wider hover:bg-amber-400 transition"
              >
                Buka Card Lengkap
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cultural Discovery Full Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl border border-amber-500/40 bg-[#0f1420] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-amber-500 hover:text-black transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">
              <BookOpen size={14} />
              <span>Cultural Discovery Archive</span>
            </div>

            <h3 className="text-2xl font-bold text-white">{activeCulture.title}</h3>
            <p className="text-xs text-amber-300/80 mt-1">{activeCulture.category}</p>

            <div className="mt-6 space-y-4 text-xs leading-6 text-white/80 border-t border-white/10 pt-4">
              <div>
                <h4 className="text-[10px] uppercase tracking-wider text-amber-400 font-medium">Pengertian & Bahan</h4>
                <p className="mt-1 text-white/90">{activeCulture.definition}</p>
                <p className="mt-1 text-white/70 italic">{activeCulture.materials}</p>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <h4 className="text-[10px] uppercase tracking-wider text-amber-400 font-medium">Falsafah & Ungkapan Adat</h4>
                <p className="mt-1 italic text-amber-100 font-serif text-sm">{activeCulture.meaningPhilosophy}</p>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-wider text-white/40">Kapan Digunakan & Ritual</h4>
                <p className="mt-1 text-white/80">{activeCulture.whenUsed}</p>
              </div>

              {activeCulture.kinshipGlossary && (
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-amber-400 mb-2 font-medium">Glosarium Istilah Kekerabatan Batak</h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {activeCulture.kinshipGlossary.map((g) => (
                      <div key={g.term} className="rounded-lg border border-white/10 bg-black/40 p-2.5">
                        <span className="font-bold text-amber-300 block">{g.term}</span>
                        <span className="text-[11px] text-white/60">{g.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-white/10 bg-black/60 p-4 flex items-center gap-3">
                <Info size={18} className="text-amber-400 shrink-0" />
                <p className="text-[11px] text-white/70">
                  Tahukah Kamu? {activeCulture.didYouKnow}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}