"use client";

import { useState, useEffect } from "react";
import { Music, Volume2, Sparkles, Disc, Play, Keyboard } from "lucide-react";
import { soundFx } from "@/lib/soundEffects";

interface InstrumentNote {
  label: string;
  key: string;
  type: "hasapi" | "taganing" | "ogung" | "sarune";
  freq: number;
  color: string;
}

const notesList: InstrumentNote[] = [
  { label: "Hasapi - Nada E4", key: "A", type: "hasapi", freq: 329.63, color: "from-amber-500 to-amber-700" },
  { label: "Hasapi - Nada G#4", key: "S", type: "hasapi", freq: 415.3, color: "from-amber-400 to-amber-600" },
  { label: "Hasapi - Nada B4", key: "D", type: "hasapi", freq: 493.88, color: "from-amber-300 to-amber-500" },
  { label: "Hasapi - Nada E5", key: "F", type: "hasapi", freq: 659.25, color: "from-amber-200 to-amber-400" },

  { label: "Taganing 1 (Bas)", key: "G", type: "taganing", freq: 160, color: "from-emerald-600 to-emerald-800" },
  { label: "Taganing 2 (Pangalusi)", key: "H", type: "taganing", freq: 210, color: "from-emerald-500 to-emerald-700" },
  { label: "Taganing 3 (Panaikki)", key: "J", type: "taganing", freq: 270, color: "from-emerald-400 to-emerald-600" },
  { label: "Taganing 4 (Dalam)", key: "K", type: "taganing", freq: 330, color: "from-emerald-300 to-emerald-500" },

  { label: "Ogung Oloan (Gong Besar)", key: "Z", type: "ogung", freq: 95, color: "from-rose-600 to-rose-800" },
  { label: "Ogung Ihutan (Gong Sedang)", key: "X", type: "ogung", freq: 135, color: "from-rose-500 to-rose-700" },

  { label: "Sarune Bolon - Pitch 1", key: "C", type: "sarune", freq: 440, color: "from-sky-500 to-sky-700" },
  { label: "Sarune Bolon - Pitch 2", key: "V", type: "sarune", freq: 554.37, color: "from-sky-400 to-sky-600" },
];

export default function SoundboardSection() {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);

  const triggerNote = (note: InstrumentNote) => {
    setActiveNote(note.label);
    if (note.type === "hasapi") soundFx.playHasapiNote(note.freq);
    else if (note.type === "taganing") soundFx.playTaganingHit(note.freq);
    else if (note.type === "ogung") soundFx.playGong(note.freq);
    else if (note.type === "sarune") soundFx.playSaruneNote(note.freq);

    setTimeout(() => setActiveNote(null), 300);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyUpper = e.key.toUpperCase();
      const matched = notesList.find((n) => n.key === keyUpper);
      if (matched) {
        triggerNote(matched);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Preset Melodic Song
  const playPresetMelody = () => {
    if (isPlayingMelody) return;
    setIsPlayingMelody(true);

    const melodySequence = [
      { note: notesList[8], delay: 0 },    // Ogung
      { note: notesList[0], delay: 300 },  // Hasapi E4
      { note: notesList[1], delay: 600 },  // Hasapi G#4
      { note: notesList[4], delay: 900 },  // Taganing 1
      { note: notesList[2], delay: 1200 }, // Hasapi B4
      { note: notesList[5], delay: 1500 }, // Taganing 2
      { note: notesList[10], delay: 1800 },// Sarune 1
      { note: notesList[3], delay: 2100 }, // Hasapi E5
      { note: notesList[9], delay: 2400 }, // Ogung 2
    ];

    melodySequence.forEach(({ note, delay }) => {
      setTimeout(() => {
        triggerNote(note);
      }, delay);
    });

    setTimeout(() => {
      setIsPlayingMelody(false);
    }, 2800);
  };

  return (
    <section id="instruments" className="relative bg-[#080b0f] py-28 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-[0.3em] mb-3 border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 rounded-full">
            <Music size={14} />
            <span>Interactive Batak Music Soundboard</span>
          </div>

          <h2 className="text-4xl font-light tracking-[0.1em] sm:text-5xl md:text-6xl">
            PLAY TRADITIONAL <br />
            <span className="font-semibold text-white">BATAK INSTRUMENTS</span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm text-white/60 leading-7">
            Mainkan musik tradisional Batak secara langsung dari browsermu! Tekan tombol pad di layar 
            atau gunakan tombol keyboard (A, S, D, F, G, H, J, K, Z, X, C, V) untuk menciptakan alunan irama Gondang.
          </p>
        </div>

        {/* Interactive Soundboard Box */}
        <div className="rounded-3xl border border-amber-500/30 bg-[#0c1017] p-6 sm:p-10 shadow-2xl mb-12">
          {/* Top Bar Status */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <Disc className={`text-amber-400 ${activeNote ? "animate-spin" : ""}`} size={24} />
              <div>
                <span className="text-[10px] uppercase tracking-widest text-white/40 block font-medium">Sound Status</span>
                <span className="text-xs font-bold text-amber-300">
                  {activeNote ? `Playing: ${activeNote}` : "Siap dimainkan • Tekan tombol keyboard!"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[10px] text-white/40 bg-black/50 px-3 py-1.5 rounded-xl border border-white/10">
                <Keyboard size={14} className="text-amber-400" />
                <span>Keyboard Shortcuts Active</span>
              </div>

              <button
                onClick={playPresetMelody}
                disabled={isPlayingMelody}
                className="flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
              >
                <Play size={12} className="fill-current" />
                <span>Play Melodi Gondang Auto</span>
              </button>
            </div>
          </div>

          {/* Pads Grid */}
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {notesList.map((note) => {
              const isActive = activeNote === note.label;
              return (
                <button
                  key={note.label}
                  onClick={() => triggerNote(note)}
                  className={`
                    group relative overflow-hidden rounded-2xl border p-5 text-left transition duration-200 transform active:scale-95
                    ${isActive ? "border-amber-400 bg-amber-500/30 scale-105 shadow-xl shadow-amber-500/20" : "border-white/10 bg-[#0f1420] hover:border-amber-500/40 hover:bg-white/[0.04]"}
                  `}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 border border-white/20 font-mono text-xs font-bold text-amber-400">
                      {note.key}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-white/40">{note.type}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                    {note.label}
                  </h4>
                  <p className="text-[10px] text-white/50 mt-1 font-mono">{note.freq} Hz</p>

                  <div className={`mt-3 h-1 w-full rounded-full bg-gradient-to-r ${note.color} ${isActive ? "opacity-100" : "opacity-30 group-hover:opacity-75"}`} />
                </button>
              );
            })}
          </div>

          {/* Soundwave Visualizer Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-1.5 h-12">
            {[40, 65, 30, 80, 95, 45, 70, 85, 35, 90, 60, 40, 75, 90, 50, 30, 80, 60, 40].map((h, i) => (
              <span
                key={i}
                style={{ height: activeNote ? `${Math.random() * 32 + 10}px` : `${h * 0.3}px` }}
                className="w-1.5 rounded-full bg-gradient-to-t from-amber-600 via-amber-400 to-amber-300 transition-all duration-150 opacity-70"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
