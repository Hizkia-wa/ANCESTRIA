"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Coins, Apple, Users, Shield, Award, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const gameplaySteps = [
  {
    number: "01",
    title: "EXPLORE",
    description: "Jelajahi lingkungan sekitar desa dan temukan lokasi, sumber daya, serta misteri perjalanan waktu.",
  },
  {
    number: "02",
    title: "GATHER",
    description: "Kumpulkan bahan pangan, kayu bangunan, air bersih, dan tanaman obat dari alam.",
  },
  {
    number: "03",
    title: "DECIDE",
    description: "Ambil keputusan strategis sebagai Raja Nami yang menentukan arah sosial, lingkungan, dan ekonomi desa.",
  },
  {
    number: "04",
    title: "BUILD",
    description: "Bangun tempat tinggal, lumbung, sawah, saluran air, dan fasilitas kesehatan desa.",
  },
  {
    number: "05",
    title: "MANAGE",
    description: "Kelola pekerjaan warga, distribusi makanan, kesehatan masyarakat, dan hubungan kekerabatan.",
  },
  {
    number: "06",
    title: "DEVELOP",
    description: "Tingkatkan level Town Hall (TH 1 ke TH 6+) untuk membuka teknologi, area, dan quest baru.",
  },
  {
    number: "07",
    title: "DISCOVER",
    description: "Temukan kebudayaan, tradisi, istilah kekerabatan, dan warisan leluhur yang tersimpan.",
  },
];

const thLevels = [
  { level: "TH 1", title: "Pemukiman Awal", desc: "Desa sangat sederhana dengan pondok kayu awal dan krisis pangan." },
  { level: "TH 2", title: "Desa Kecil", desc: "Mulai memiliki terrasing sawah irigasi awal dan kandang ternak." },
  { level: "TH 3", title: "Desa Berkembang", desc: "Mulai membuka pasar desa (Onan) dan fasilitas produksi kerajinan." },
  { level: "TH 4", title: "Desa Mapan", desc: "Infrastruktur jembatan, Ruma Bolon utama, dan balai pengobatan warga." },
  { level: "TH 5", title: "Desa Makmur", desc: "Pusat perdagangan antar-wilayah dan workshop tenun kain Ulos." },
  { level: "TH 6+", title: "Pusat Kebudayaan", desc: "Kompleks desa maju yang mandiri dan situs pelestarian warisan budaya." },
];

export default function GameplaySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeStep, setActiveStep] = useState(gameplaySteps[0]);
  const [selectedThLevel, setSelectedThLevel] = useState(thLevels[0]);

  // Interactive Decision Simulator state
  const [metrics, setMetrics] = useState({ trust: 75, food: 120, economy: 50, relationship: 60 });
  const [decisionFeedback, setDecisionFeedback] = useState<string | null>(null);

  const handleDecision = (
    action: string,
    delta: { trust: number; food: number; economy: number; relationship: number },
    msg: string
  ) => {
    setMetrics((prev) => ({
      trust: Math.min(100, Math.max(0, prev.trust + delta.trust)),
      food: Math.min(200, Math.max(0, prev.food + delta.food)),
      economy: Math.min(200, Math.max(0, prev.economy + delta.economy)),
      relationship: Math.min(100, Math.max(0, prev.relationship + delta.relationship)),
    }));
    setDecisionFeedback(msg);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gameplay-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gameplay-heading",
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
      id="game"
      className="relative overflow-hidden bg-black text-white py-28"
    >
      {/* Background glow */}
      <div className="absolute left-1/4 top-1/2 h-96 w-96 rounded-full bg-amber-500/5 blur-[120px]" />

      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20 mb-16">
        <div className="gameplay-heading max-w-4xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-medium">
            Core Mechanics & Systems
          </p>

          <h2 className="mt-4 text-4xl font-light tracking-[0.1em] sm:text-5xl md:text-6xl lg:text-7xl">
            BUILD. LEAD. <br />
            <span className="font-semibold text-white">DECIDE YOUR LEGACY</span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            Gameplay ANCESTRIA menggabungkan 7-tahap loop pembangunan desa dengan simulasi keputusan kepemimpinan nyata.
          </p>
        </div>
      </div>

      {/* 7-Step Gameplay Loop */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20 mb-20">
        <p className="text-[9px] uppercase tracking-[0.35em] text-amber-400 font-medium mb-6">
          01 — Core Gameplay Loop
        </p>

        <div className="grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-7">
          {gameplaySteps.map((step) => {
            const isActive = activeStep.number === step.number;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(step)}
                className={`
                  group relative min-h-[160px] border-b border-r border-white/10 p-5 text-left transition-all duration-300
                  ${isActive ? "bg-amber-500/10 border-amber-500/50" : "hover:bg-white/[0.03]"}
                `}
              >
                <span className={`text-[9px] tracking-[0.3em] ${isActive ? "text-amber-400" : "text-white/30"}`}>
                  {step.number}
                </span>

                <h3 className={`mt-6 text-xs font-semibold tracking-[0.2em] uppercase transition ${isActive ? "text-amber-300" : "text-white/60 group-hover:text-white"}`}>
                  {step.title}
                </h3>

                <div className="mt-auto pt-6">
                  <span className={`block h-0.5 transition-all duration-300 ${isActive ? "w-10 bg-amber-400" : "w-4 bg-white/20 group-hover:w-8"}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Description */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0c1017] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-medium">Focused Element</span>
            <h4 className="text-2xl font-bold text-white mt-1">{activeStep.number}. {activeStep.title}</h4>
            <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-2xl">{activeStep.description}</p>
          </div>
          <a href="#play" className="shrink-0 rounded-full border border-amber-500/50 bg-amber-500/10 px-5 py-2 text-xs text-amber-300 hover:bg-amber-500 hover:text-black transition uppercase tracking-widest font-medium">
            Try in Simulator →
          </a>
        </div>
      </div>

      {/* Town Hall Progression Slider */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20 mb-20">
        <p className="text-[9px] uppercase tracking-[0.35em] text-amber-400 font-medium mb-6">
          02 — Town Hall (TH) Progression
        </p>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6 mb-6">
          {thLevels.map((th) => {
            const isSelected = selectedThLevel.level === th.level;
            return (
              <button
                key={th.level}
                onClick={() => setSelectedThLevel(th)}
                className={`
                  rounded-xl border p-4 text-left transition duration-300
                  ${isSelected ? "border-amber-400 bg-amber-500/15 text-white shadow-lg shadow-amber-500/10" : "border-white/10 bg-[#0c1017] text-white/60 hover:border-white/30"}
                `}
              >
                <p className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">{th.level}</p>
                <h4 className="text-sm font-semibold mt-1 text-white">{th.title}</h4>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-[#0f1420] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-black font-bold text-xs">
              ✓
            </span>
            <div>
              <h4 className="text-lg font-bold text-white">{selectedThLevel.level} — {selectedThLevel.title}</h4>
              <p className="text-xs text-white/60 mt-1">{selectedThLevel.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Leadership Decision Simulator */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20">
        <p className="text-[9px] uppercase tracking-[0.35em] text-amber-400 font-medium mb-6">
          03 — Interactive Leadership Decision Simulator
        </p>

        <div className="rounded-3xl border border-amber-500/30 bg-[#0c1017] p-6 sm:p-10 shadow-2xl">
          {/* Realtime Village Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
              <Heart className="text-amber-400 shrink-0" size={18} />
              <div>
                <span className="text-[9px] uppercase tracking-widest text-white/40 block">Trust Meter</span>
                <span className="text-sm font-bold text-amber-300">{metrics.trust}%</span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
              <Apple className="text-emerald-400 shrink-0" size={18} />
              <div>
                <span className="text-[9px] uppercase tracking-widest text-white/40 block">Stok Pangan</span>
                <span className="text-sm font-bold text-emerald-300">{metrics.food} Unit</span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
              <Coins className="text-amber-400 shrink-0" size={18} />
              <div>
                <span className="text-[9px] uppercase tracking-widest text-white/40 block">Ekonomi Desa</span>
                <span className="text-sm font-bold text-amber-300">{metrics.economy} Gold</span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
              <Users className="text-sky-400 shrink-0" size={18} />
              <div>
                <span className="text-[9px] uppercase tracking-widest text-white/40 block">Relasi Desa</span>
                <span className="text-sm font-bold text-sky-300">{metrics.relationship}%</span>
              </div>
            </div>
          </div>

          {/* Scenario */}
          <div className="mb-6">
            <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[10px] text-amber-300 uppercase tracking-widest font-medium">
              Keputusan Kepemimpinan #01 — Krisis Pangan Desa Tetangga
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-3">
              “Desa tetangga mengutus perwakilan meminta 50 unit persediaan beras akibat cuaca buruk. Apa tindakanmu sebagai Raja Nami?”
            </h3>
          </div>

          {/* Options */}
          <div className="grid gap-3 sm:grid-cols-2 mb-6">
            <button
              onClick={() => handleDecision(
                "A",
                { trust: 15, food: -50, economy: 0, relationship: 30 },
                "Pilihan A: Kamu memberikan pangan secara cuma-cuma. Hubungan diplomatik naik pesat (+30) dan kepercayaan warga meningkat (+15) karena kemurahan hatimu!"
              )}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:border-amber-400 hover:bg-amber-500/10 transition"
            >
              <span className="text-xs font-bold text-amber-400 block">A. Berikan Pangan Secara Gratis</span>
              <span className="text-[11px] text-white/60 mt-1 block">Hubungan ++ | Kepercayaan + | Pangan -50</span>
            </button>

            <button
              onClick={() => handleDecision(
                "B",
                { trust: 10, food: -50, economy: 25, relationship: 15 },
                "Pilihan B: Kamu melakukan barter dengan ternak kerbau. Pangan berkurang tetapi ekonomi dan ternak desa bertambah!"
              )}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:border-amber-400 hover:bg-amber-500/10 transition"
            >
              <span className="text-xs font-bold text-amber-400 block">B. Barter Dengan Ternak Kerbau</span>
              <span className="text-[11px] text-white/60 mt-1 block">Ekonomi +25 | Hubungan +15 | Pangan -50</span>
            </button>

            <button
              onClick={() => handleDecision(
                "C",
                { trust: -15, food: -50, economy: 55, relationship: -20 },
                "Pilihan C: Kamu menjual pangan dengan harga sangat tinggi. Kas desa melimpah (+55), tetapi hubungan diplomatik dan kepercayaan warga menurun!"
              )}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:border-amber-400 hover:bg-amber-500/10 transition"
            >
              <span className="text-xs font-bold text-amber-400 block">C. Jual Pangan Dengan Harga Tinggi</span>
              <span className="text-[11px] text-white/60 mt-1 block">Ekonomi ++55 | Hubungan -20 | Kepercayaan -15</span>
            </button>

            <button
              onClick={() => handleDecision(
                "D",
                { trust: -5, food: 0, economy: 0, relationship: -35 },
                "Pilihan D: Kamu menolak memberikan bantuan. Stok pangan aman, namun desa tetangga kecewa berat (-35 Relasi)!"
              )}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:border-amber-400 hover:bg-amber-500/10 transition"
            >
              <span className="text-xs font-bold text-amber-400 block">D. Tolak Bantuan Secara Tegas</span>
              <span className="text-[11px] text-white/60 mt-1 block">Pangan Tetap | Hubungan -35 | Kepercayaan -5</span>
            </button>
          </div>

          {/* Feedback message */}
          {decisionFeedback && (
            <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-100">{decisionFeedback}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}