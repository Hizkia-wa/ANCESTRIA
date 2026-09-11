"use client";

import { useState } from "react";
import { Sun, CloudRain, CloudFog, Sparkles, Volume2, VolumeX, Shield, Scroll, BookOpen, Music, Compass, ChevronDown, ChevronUp } from "lucide-react";
import { soundFx } from "@/lib/soundEffects";
import Link from "next/link";

interface GameHUDProps {
  weather: "sun" | "rain" | "fog" | "fireflies";
  onWeatherChange: (w: "sun" | "rain" | "fog" | "fireflies") => void;
}

export default function GameHUD({ weather, onWeatherChange }: GameHUDProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
    if (!isSoundOn) {
      soundFx.playClick();
    }
  };

  const changeWeather = (w: "sun" | "rain" | "fog" | "fireflies") => {
    onWeatherChange(w);
    if (isSoundOn) soundFx.playClick();
  };

  return (
    <aside aria-label="Game HUD Navigation" className="fixed top-20 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 font-sans select-none">
      {/* Main Bar Trigger Button */}
      <div className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-black/80 backdrop-blur-xl px-4 py-2 text-xs text-amber-300 shadow-2xl shadow-amber-500/10">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-bold tracking-wider text-[11px] uppercase">GAME HUD MODE</span>

        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
            if (isSoundOn) soundFx.playClick();
          }}
          className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-black transition"
          title="Toggle HUD Overlay"
        >
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Expanded Panel */}
      {isExpanded && (
        <div className="w-80 rounded-2xl border border-amber-500/30 bg-[#0a0d14]/95 p-4 text-white backdrop-blur-2xl shadow-2xl animate-fade-in space-y-4">
          {/* RPG Player Badge */}
          <div className="rounded-xl border border-white/10 bg-black/50 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400 bg-amber-500/20 text-amber-300 font-bold text-xs">
                RN
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Raja Nami (Protagonis)</h4>
                <p className="text-[10px] text-amber-400">Pemimpin Huta Batak • Year 1420</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-amber-300 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">
              <Shield size={10} />
              <span>92% Trust</span>
            </div>
          </div>

          {/* Active Quest Banner */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-amber-400 font-medium">
              <span>Misi RPG Aktif</span>
              <span>Chapter II</span>
            </div>
            <p className="mt-1 font-semibold text-amber-100 text-[11px]">
              “Bangun Terrasing Sawah & Uji Kepercayaan Warga Desa”
            </p>
          </div>

          {/* Atmosphere & Weather Switcher */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-2 font-medium">
              Atmosfer Cuaca Tanah Batak
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                onClick={() => changeWeather("sun")}
                className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-[10px] transition ${
                  weather === "sun" ? "border-amber-400 bg-amber-500/20 text-amber-300" : "border-white/10 bg-black/40 text-white/50 hover:text-white"
                }`}
                title="Cerah Pegunungan"
              >
                <Sun size={14} />
                <span>Cerah</span>
              </button>

              <button
                onClick={() => changeWeather("rain")}
                className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-[10px] transition ${
                  weather === "rain" ? "border-sky-400 bg-sky-500/20 text-sky-300" : "border-white/10 bg-black/40 text-white/50 hover:text-white"
                }`}
                title="Hujan Tropis"
              >
                <CloudRain size={14} />
                <span>Hujan</span>
              </button>

              <button
                onClick={() => changeWeather("fog")}
                className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-[10px] transition ${
                  weather === "fog" ? "border-slate-300 bg-slate-500/20 text-slate-200" : "border-white/10 bg-black/40 text-white/50 hover:text-white"
                }`}
                title="Kabut Mistik"
              >
                <CloudFog size={14} />
                <span>Kabut</span>
              </button>

              <button
                onClick={() => changeWeather("fireflies")}
                className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-[10px] transition ${
                  weather === "fireflies" ? "border-lime-400 bg-lime-500/20 text-lime-300" : "border-white/10 bg-black/40 text-white/50 hover:text-white"
                }`}
                title="Malam Kunang-kunang"
              >
                <Sparkles size={14} />
                <span>Malam</span>
              </button>
            </div>
          </div>

          {/* Quick RPG Navigation Links */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-2 font-medium">
              Fitur Imersif Utama
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/codex"
                onClick={() => isSoundOn && soundFx.playClick()}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 p-2.5 hover:border-amber-400 hover:text-amber-300 transition"
              >
                <BookOpen size={14} className="text-amber-400 shrink-0" />
                <div className="truncate">
                  <span className="font-semibold block text-[11px]">Codex Artefak</span>
                  <span className="text-[9px] text-white/40 block">8+ Pusaka Batak</span>
                </div>
              </Link>

              <Link
                href="/quests"
                onClick={() => isSoundOn && soundFx.playClick()}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 p-2.5 hover:border-amber-400 hover:text-amber-300 transition"
              >
                <Scroll size={14} className="text-amber-400 shrink-0" />
                <div className="truncate">
                  <span className="font-semibold block text-[11px]">Pohon Misi</span>
                  <span className="text-[9px] text-white/40 block">5 Chapter Story</span>
                </div>
              </Link>

              <Link
                href="/instruments"
                onClick={() => isSoundOn && soundFx.playClick()}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 p-2.5 hover:border-amber-400 hover:text-amber-300 transition"
              >
                <Music size={14} className="text-amber-400 shrink-0" />
                <div className="truncate">
                  <span className="font-semibold block text-[11px]">Soundboard</span>
                  <span className="text-[9px] text-white/40 block">Musik Batak</span>
                </div>
              </Link>

              <a
                href="#play"
                onClick={() => isSoundOn && soundFx.playClick()}
                className="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-2.5 text-amber-300 hover:bg-amber-500 hover:text-black transition"
              >
                <Compass size={14} className="shrink-0" />
                <div className="truncate">
                  <span className="font-semibold block text-[11px]">Play Simulator</span>
                  <span className="text-[9px] opacity-80 block">Coba Demo</span>
                </div>
              </a>
            </div>
          </div>

          {/* Sound FX Toggle */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
            <span className="text-[10px] text-white/50">Efek Suara Game (SFX)</span>
            <button
              onClick={toggleSound}
              className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-[10px] text-amber-300 hover:border-amber-400 transition"
            >
              {isSoundOn ? (
                <>
                  <Volume2 size={12} className="text-amber-400" />
                  <span>SFX ON</span>
                </>
              ) : (
                <>
                  <VolumeX size={12} className="text-white/40" />
                  <span>SFX OFF</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
