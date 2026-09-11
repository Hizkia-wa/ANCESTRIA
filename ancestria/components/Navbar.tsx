"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Volume2, VolumeX, BookOpen, Scroll, Music } from "lucide-react";
import Link from "next/link";
import { soundFx } from "@/lib/soundEffects";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Story", href: "/#journey" },
  { label: "World", href: "/#world" },
  { label: "Codex Artefak", href: "/codex" },
  { label: "Pohon Misi", href: "/quests" },
  { label: "Musik Batak", href: "/instruments" },
  { label: "Characters", href: "/#characters" },
  { label: "Gameplay", href: "/#game" },
  { label: "Culture", href: "/#culture" },
  { label: "News", href: "/#news" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current?.currentTime || 0, 0.1);
      }
      setTimeout(() => {
        if (oscillatorRef.current) {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
          oscillatorRef.current = null;
        }
        setIsPlayingAudio(false);
      }, 150);
    } else {
      try {
        soundFx.playGong(110);
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Pentatonic Batak ambient synth chord (E4 - G#4 - B4)
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 2);
        gain.connect(ctx.destination);
        gainNodeRef.current = gain;

        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
        osc.connect(gain);
        osc.start();
        oscillatorRef.current = osc;

        setIsPlayingAudio(true);
      } catch (e) {
        console.error("Web Audio API error", e);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`
          mx-auto flex h-16 w-full items-center justify-between px-5
          transition-all duration-300
          sm:h-18 sm:px-6
          md:h-20 md:px-8
          lg:max-w-7xl lg:px-10
          ${isOpen ? "bg-black/90 backdrop-blur-xl" : "bg-black/50 backdrop-blur-md border-b border-white/10"}
        `}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => {
            closeMenu();
            soundFx.playClick();
          }}
          className="
            relative z-10 flex items-center gap-2
            text-base font-bold tracking-[0.2em] text-white
            sm:text-lg
            md:tracking-[0.25em]
          "
        >
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse shadow-lg shadow-amber-500/50" />
          ANCESTRIA
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-4 lg:gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => soundFx.playClick()}
              className="
                text-[11px] uppercase tracking-[0.12em] text-white/70
                transition duration-300
                hover:text-amber-400
                lg:text-xs lg:tracking-[0.14em]
              "
            >
              {item.label}
            </Link>
          ))}

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleAudio}
            title={isPlayingAudio ? "Mute Ambient Sound" : "Play Ambient Sound"}
            className="
              flex items-center gap-2 rounded-full border border-white/20
              px-3 py-1.5 text-[10px] uppercase tracking-wider text-white/80
              transition hover:border-amber-500 hover:text-amber-400
            "
          >
            {isPlayingAudio ? (
              <>
                <Volume2 size={14} className="text-amber-400 animate-bounce" />
                <span className="hidden xl:inline text-amber-400">Audio ON</span>
              </>
            ) : (
              <>
                <VolumeX size={14} />
                <span className="hidden xl:inline">Audio OFF</span>
              </>
            )}
          </button>

          {/* Play Now CTA */}
          <Link
            href="/#play"
            onClick={() => soundFx.playClick()}
            className="
              rounded-full
              border border-amber-500/50
              bg-amber-500/10
              px-5 py-2
              text-xs font-medium uppercase tracking-[0.12em] text-amber-300
              transition duration-300
              hover:border-amber-400
              hover:bg-amber-500
              hover:text-black
              lg:px-6 lg:py-2.5
            "
          >
            Play Demo
          </Link>
        </div>

        {/* Mobile / Tablet Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggleAudio}
            className="
              flex h-9 w-9 items-center justify-center rounded-full
              border border-white/20 text-white
            "
          >
            {isPlayingAudio ? <Volume2 size={16} className="text-amber-400" /> : <VolumeX size={16} />}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
              soundFx.playClick();
            }}
            className="
              relative z-10
              flex h-10 w-10
              items-center justify-center
              rounded-full
              border border-white/20
              text-white
              transition
              hover:bg-white/10
            "
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <X size={19} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`
          overflow-hidden
          border-t border-white/10
          bg-black/95
          backdrop-blur-2xl
          transition-all duration-300
          md:hidden
          ${
            isOpen
              ? "max-h-[600px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }
        `}
      >
        <div className="px-5 py-6 sm:px-6">
          <div className="flex flex-col">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="
                  border-b border-white/10
                  py-3
                  text-xs uppercase
                  tracking-[0.15em]
                  text-white/70
                  transition
                  hover:text-amber-400
                "
              >
                <span className="mr-3 text-[10px] text-white/30">
                  0{index + 1}
                </span>
                {item.label}
              </Link>
            ))}

            <Link
              href="/#play"
              onClick={closeMenu}
              className="
                mt-6
                w-full
                rounded-full
                border border-amber-500
                bg-amber-500
                px-6 py-3.5
                text-center
                text-xs font-semibold uppercase
                tracking-[0.2em]
                text-black
                transition duration-300
                hover:bg-amber-400
              "
            >
              Play Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}