"use client";

import { useState } from "react";
import { Play, Download, Code2, FileText, RefreshCw, Sparkles, CheckCircle } from "lucide-react";
import { soundFx } from "@/lib/soundEffects";

export default function PlaySection() {
  const [gameState, setGameState] = useState({
    food: 50,
    water: 100,
    wood: 20,
    ulos: 1,
    trust: 75,
    thLevel: 1,
  });

  const [floatingText, setFloatingText] = useState<string | null>(null);

  const [logs, setLogs] = useState<string[]>([
    "Selamat datang di Mini-Demo ANCESTRIA! Kamu berperan sebagai Raja Nami di TH Level 1.",
    "Bantu warga mengelola pangan, air, dan kain Ulos untuk meningkatkan kepercayaan desa."
  ]);

  const showFloatingPopup = (text: string) => {
    setFloatingText(text);
    setTimeout(() => setFloatingText(null), 1500);
  };

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 4)]);
  };

  const farmCrops = () => {
    if (gameState.water < 15) {
      addLog("⚠️ Pasokan air kurang untuk irigasi sawah! Kelola irigasi sungai terlebih dahulu.");
      soundFx.playClick();
      return;
    }
    setGameState((prev) => ({
      ...prev,
      food: prev.food + 35,
      water: prev.water - 15,
      trust: Math.min(100, prev.trust + 2),
    }));
    addLog("🌾 Panen Berhasil! +35 Pangan, -15 Air, +2 Trust Warga.");
    showFloatingPopup("+35 Pangan! 🌾");
    soundFx.playDiscoveryChime();
  };

  const gatherWood = () => {
    setGameState((prev) => ({
      ...prev,
      wood: prev.wood + 20,
      trust: Math.max(0, prev.trust - 2),
    }));
    addLog("🪵 Mengambil Kayu Hutan! +20 Kayu. (Perhatian: Jangan overharvesting).");
    showFloatingPopup("+20 Kayu! 🪵");
    soundFx.playClick();
  };

  const manageWater = () => {
    setGameState((prev) => ({
      ...prev,
      water: Math.min(100, prev.water + 30),
      trust: Math.min(100, prev.trust + 3),
    }));
    addLog("💧 Irigasi Sungai Diperbaiki! +30 Air Bersih, +3 Trust Warga.");
    showFloatingPopup("+30 Air Bersih! 💧");
    soundFx.playClick();
  };

  const weaveUlos = () => {
    if (gameState.food < 20) {
      addLog("⚠️ Bahan pangan kurang untuk konsumsi pengrajin tenun!");
      soundFx.playClick();
      return;
    }
    setGameState((prev) => ({
      ...prev,
      food: prev.food - 20,
      ulos: prev.ulos + 1,
      trust: Math.min(100, prev.trust + 10),
    }));
    addLog("🧵 Ulos Baru Selesai Ditenun! +1 Ulos, +10 Trust Warga (Cultural Discovery Unlock!).");
    showFloatingPopup("+1 Kain Ulos & +10 Trust! 🧵");
    soundFx.playHasapiNote(440);
  };

  const upgradeTownHall = () => {
    if (gameState.wood < 40 || gameState.food < 40) {
      addLog("⚠️ Butuh minimal 40 Kayu & 40 Pangan untuk membangun Ruma Bolon TH Level!");
      soundFx.playClick();
      return;
    }
    setGameState((prev) => ({
      ...prev,
      wood: prev.wood - 40,
      food: prev.food - 40,
      thLevel: prev.thLevel + 1,
      trust: Math.min(100, prev.trust + 15),
    }));
    addLog(`🎉 Pembangunan Sukses! Desa naik ke TH Level ${gameState.thLevel + 1}! +15 Trust Warga.`);
    showFloatingPopup(`🎉 TH LEVEL ${gameState.thLevel + 1} UNLOCKED!`);
    soundFx.playGong(110);
  };

  const resetDemo = () => {
    setGameState({ food: 50, water: 100, wood: 20, ulos: 1, trust: 75, thLevel: 1 });
    setLogs(["Mini-Demo di-reset. Selamat mencoba strategi pembangunan desa yang baru!"]);
    soundFx.playClick();
  };

  return (
    <section id="play" className="relative overflow-hidden bg-black py-28 text-white">
      {/* Background ambient glow */}
      <div className="absolute left-1/2 bottom-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 uppercase tracking-widest">
            Playable Web Showcase Prototype
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-wide text-white">
            COBA DEMO INTERAKTIF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              ANCESTRIA DIRECT IN BROWSER
            </span>
          </h2>
          <p className="mt-4 text-sm text-white/60 leading-7">
            Cobalah mengelola desa Tanah Batak langsung melalui mini-demo simulator di bawah ini. 
            Kelola pangan, irigasi air, kain Ulos, dan tingkatkan Town Hall desamu!
          </p>
        </div>

        {/* Mini-Demo Interactive Box */}
        <div className="relative rounded-3xl border border-amber-500/30 bg-[#0c1017] p-6 sm:p-10 shadow-2xl mb-16">
          {/* Animated Floating Resource Gain Popup */}
          {floatingText && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full border border-amber-400 bg-amber-500 px-6 py-2 text-xs font-extrabold text-black shadow-2xl shadow-amber-500/50 animate-bounce z-20">
              {floatingText}
            </div>
          )}

          {/* Dashboard Stats Header */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-8 border-b border-white/10 pb-6">
            <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-center">
              <span className="text-[9px] uppercase tracking-widest text-white/40 block">TH Level</span>
              <span className="text-base font-bold text-amber-400">Level {gameState.thLevel}</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-center">
              <span className="text-[9px] uppercase tracking-widest text-white/40 block">Trust Warga</span>
              <span className="text-base font-bold text-amber-300">{gameState.trust}%</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-center">
              <span className="text-[9px] uppercase tracking-widest text-white/40 block">Pangan (Beras)</span>
              <span className="text-base font-bold text-emerald-400">{gameState.food}</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-center">
              <span className="text-[9px] uppercase tracking-widest text-white/40 block">Air Bersih</span>
              <span className="text-base font-bold text-sky-400">{gameState.water}%</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-center">
              <span className="text-[9px] uppercase tracking-widest text-white/40 block">Kayu Hutan</span>
              <span className="text-base font-bold text-amber-200">{gameState.wood}</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-center">
              <span className="text-[9px] uppercase tracking-widest text-white/40 block">Kain Ulos</span>
              <span className="text-base font-bold text-rose-400">{gameState.ulos}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5 mb-8">
            <button
              onClick={farmCrops}
              className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-300 hover:bg-emerald-500 hover:text-black transition flex flex-col items-center gap-1 transform active:scale-95"
            >
              <span>🌾 Tanam & Panen Padi</span>
              <span className="text-[10px] text-white/50">+35 Pangan (-15 Air)</span>
            </button>

            <button
              onClick={manageWater}
              className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-3 text-xs font-semibold text-sky-300 hover:bg-sky-500 hover:text-black transition flex flex-col items-center gap-1 transform active:scale-95"
            >
              <span>💧 Kelola Irigasi Sungai</span>
              <span className="text-[10px] text-white/50">+30 Air Bersih</span>
            </button>

            <button
              onClick={gatherWood}
              className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs font-semibold text-amber-300 hover:bg-amber-500 hover:text-black transition flex flex-col items-center gap-1 transform active:scale-95"
            >
              <span>🪵 Ambil Kayu Hutan</span>
              <span className="text-[10px] text-white/50">+20 Kayu Bangunan</span>
            </button>

            <button
              onClick={weaveUlos}
              className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs font-semibold text-rose-300 hover:bg-rose-500 hover:text-black transition flex flex-col items-center gap-1 transform active:scale-95"
            >
              <span>🧵 Tenun Kain Ulos</span>
              <span className="text-[10px] text-white/50">+1 Ulos (+10 Trust)</span>
            </button>

            <button
              onClick={upgradeTownHall}
              className="rounded-xl border border-amber-400 bg-amber-500 p-3 text-xs font-bold text-black hover:bg-amber-400 transition flex flex-col items-center gap-1 shadow-lg shadow-amber-500/20 transform active:scale-95"
            >
              <span>🏛️ Upgrade Ruma Bolon</span>
              <span className="text-[10px] text-black/70">Butuh 40 Kayu & 40 Pangan</span>
            </button>
          </div>

          {/* Action Log Box */}
          <div className="rounded-2xl border border-white/10 bg-black/60 p-5">
            <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-widest text-amber-400 font-medium">
              <span>Live Action Log</span>
              <button onClick={resetDemo} className="flex items-center gap-1 text-white/40 hover:text-amber-300 transition">
                <RefreshCw size={10} />
                <span>Reset Demo</span>
              </button>
            </div>
            <div className="space-y-2 text-xs font-mono">
              {logs.map((log, index) => (
                <div key={index} className={`flex items-start gap-2 ${index === 0 ? "text-amber-300 font-bold" : "text-white/60"}`}>
                  <span className="text-amber-500 shrink-0">›</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Links & Downloads */}
        <div className="rounded-3xl border border-white/10 bg-[#0f1420] p-8 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-2">Dokumentasi & Repository Resmi</h3>
          <p className="text-xs text-white/60 max-w-xl mx-auto mb-6">
            Akses source code repository GitHub, file dokumentasi proposal & GDD lengkap, serta akses full prototype untuk penilaian lomba Web Development 2026.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition"
            >
              <FileText size={16} />
              <span>Download Dokumentasi PDF</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:border-amber-400 hover:text-amber-300 transition"
            >
              <Code2 size={16} />
              <span>Source Code GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
