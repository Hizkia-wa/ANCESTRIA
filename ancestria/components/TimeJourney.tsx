"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TimeJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".journey-panel");

      sections.forEach((section) => {
        const image = section.querySelector(".journey-image");
        const content = section.querySelector(".journey-content");

        gsap.fromTo(
          image,
          {
            scale: 1.12,
          },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          content,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="journey" className="bg-black text-white">
      {/* FUTURE */}
      <section className="journey-panel relative flex min-h-screen items-center overflow-hidden">
        <img
          src="/images/future.png"
          alt="The Future"
          className="journey-image absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="journey-content relative z-10 px-6 sm:px-10 md:px-16 lg:px-20">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-white/60">
            01
          </p>

          <h2 className="text-4xl font-light tracking-[0.2em] sm:text-5xl md:text-6xl lg:text-7xl">
            FUTURE
          </h2>

          <p className="mt-5 text-sm uppercase tracking-[0.3em] text-white/70">
            Year 20XX
          </p>

          <p className="mt-5 max-w-sm font-serif text-base italic text-white/70 md:text-lg">
            A world that forgot...
          </p>
        </div>
      </section>

      {/* TIME RIFT */}
      <section className="journey-panel relative flex min-h-screen items-center overflow-hidden">
        <img
          src="/images/time-rift.png"
          alt="Time Rift"
          className="journey-image absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="journey-content relative z-10 px-6 sm:px-10 md:px-16 lg:px-20">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-white/60">
            02
          </p>

          <h2 className="text-4xl font-light tracking-[0.2em] sm:text-5xl md:text-6xl lg:text-7xl">
            TIME RIFT
          </h2>

          <p className="mt-5 max-w-sm font-serif text-base italic text-white/75 md:text-lg">
            A portal between two worlds.
          </p>
        </div>

        <div className="absolute bottom-10 right-8 hidden md:block">
          <p className="text-[9px] uppercase tracking-[0.35em] text-white/60">
            Scroll down
          </p>

          <div className="mx-auto mt-4 h-12 w-px bg-white/40" />
        </div>
      </section>

      {/* THE PAST */}
      <section className="journey-panel relative flex min-h-screen items-center overflow-hidden">
        <img
          src="/images/past.png"
          alt="The Past - Tanah Batak"
          className="journey-image absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="journey-content relative z-10 px-6 sm:px-10 md:px-16 lg:px-20">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-white/60">
            03
          </p>

          <h2 className="text-4xl font-light tracking-[0.2em] sm:text-5xl md:text-6xl lg:text-7xl">
            THE PAST
          </h2>

          <div className="mt-6 space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">
              Tanah Batak
            </p>

            <p className="text-xs uppercase tracking-[0.3em] text-white/80">
              The Village
            </p>
          </div>

          <p className="mt-5 max-w-sm font-serif text-base italic text-white/80 md:text-lg">
            Where the roots still live.
          </p>
        </div>

        <div className="absolute bottom-10 right-8 hidden items-center gap-4 md:flex">
          <span className="text-[9px] uppercase tracking-[0.3em]">
            Explore
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50">
            →
          </span>
        </div>
      </section>
    </section>
  );
}