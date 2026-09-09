"use client";

import { X } from "lucide-react";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrailerModal({ isOpen, onClose }: TrailerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/20 bg-[#0c1017] p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-amber-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400">Cinematic Trailer</p>
          <h3 className="text-2xl font-light tracking-wide text-white">ANCESTRIA: Legacy Beyond Time</h3>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-white/10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
          
          <img
            src="/images/past.png"
            alt="Trailer Preview"
            className="absolute inset-0 h-full w-full object-cover opacity-40 blur-xs"
          />

          <div className="relative z-20 text-center px-6 py-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-400/80 bg-amber-500/20 text-amber-300 backdrop-blur-sm animate-pulse">
              <span className="text-2xl ml-1">▶</span>
            </div>
            <p className="text-sm font-light text-white/90 uppercase tracking-widest">
              Official Game Trailer
            </p>
            <p className="mt-2 text-xs text-white/60 max-w-md mx-auto">
              Saksikan perjalanan waktu dari masa depan 20XX menuju Tanah Batak abad lampau, membangun desa dan mewarisi budaya leluhur.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold text-black uppercase tracking-wider">
              Teaser HD Available (1080p)
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-white/40">
          <span>Target Release: 2026</span>
          <span>Genre: Village Management × RPG × Batak Heritage</span>
        </div>
      </div>
    </div>
  );
}
