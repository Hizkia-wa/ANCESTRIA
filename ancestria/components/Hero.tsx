"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TrailerModal from "./TrailerModal";
import { Play, Sparkles, Shield, Compass, Scroll } from "lucide-react";
import { soundFx } from "@/lib/soundEffects";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const buttonGroupRef = useRef<HTMLDivElement>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" },
          "-=0.4"
        )
        .fromTo(
          tagRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          buttonGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white"
      >
        {/* Swirling Portal Aura Rings */}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500/20 animate-[spin_40s_linear_infinite] pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amber-400/30 animate-[spin_25s_linear_infinite_reverse] pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600/10 blur-[120px]" />
        
        {/* Background image overlay */}
        <div className="absolute inset-0 z-0 opacity-35">
          <img
            src="/images/future.png"
            alt="Ancestria Background"
            className="h-full w-full object-cover filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        </div>

        {/* Dynamic Floating Badges in background */}
        <div className="absolute top-28 left-8 sm:left-16 hidden md:flex items-center gap-2 rounded-full border border-amber-500/30 bg-black/60 backdrop-blur-md px-4 py-1.5 text-xs text-amber-300 animate-pulse">
          <Sparkles size={14} className="text-amber-400" />
          <span>Interactive Time Rift RPG Portal</span>
        </div>

        <div className="absolute bottom-24 right-8 sm:right-16 hidden md:flex items-center gap-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md px-4 py-1.5 text-xs text-white/80">
          <Shield size={14} className="text-amber-400" />
          <span>Batak Cultural Heritage Verified</span>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 text-center max-w-4xl mx-auto pt-16">
          <p
            ref={subtitleRef}
            className="mb-4 text-xs uppercase tracking-[0.5em] text-amber-400 font-medium"
          >
            Time Travel × Village Management × RPG × Batak Heritage
          </p>

          <h1
            ref={titleRef}
            className="text-5xl font-extrabold tracking-[0.15em] sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-amber-200 drop-shadow-2xl"
          >
            ANCESTRIA
          </h1>

          <p
            ref={tagRef}
            className="mx-auto mt-6 text-lg sm:text-xl md:text-2xl font-light text-amber-100/90 tracking-wide"
          >
            “Bangun Desamu. Kenali Leluhurmu. Wariskan Budayamu.”
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm leading-6 text-white/60 font-serif italic">
            From the Future to the Past, Through a Journey of Discovery.
          </p>

          {/* Button CTA Group */}
          <div
            ref={buttonGroupRef}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <a
              href="#journey"
              onClick={() => soundFx.playTimeRiftWarp()}
              className="w-full sm:w-auto rounded-full bg-amber-500 px-8 py-3.5 text-xs uppercase font-semibold tracking-[0.2em] text-black transition duration-300 hover:bg-amber-400 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Compass size={16} />
              <span>Enter the Village</span>
            </a>

            <Link
              href="/codex"
              onClick={() => soundFx.playClick()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 backdrop-blur-md px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-amber-300 transition duration-300 hover:bg-amber-500 hover:text-black"
            >
              <Scroll size={14} />
              <span>Explore Codex</span>
            </Link>

            <button
              onClick={() => {
                setIsTrailerOpen(true);
                soundFx.playClick();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-white/30 bg-black/40 backdrop-blur-md px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-white transition duration-300 hover:border-amber-400 hover:text-amber-400"
            >
              <Play size={14} className="fill-current text-amber-400" />
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
            Scroll to discover
          </p>
          <div className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-amber-500 to-transparent animate-pulse" />
        </div>
      </section>

      <TrailerModal isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)} />
    </>
  );
}