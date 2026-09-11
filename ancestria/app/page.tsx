"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TimeJourney from "@/components/TimeJourney";
import WorldSection from "@/components/WorldSection";
import CharacterSection from "@/components/CharacterSection";
import GameplaySection from "@/components/GameplaySection";
import CultureSection from "@/components/CultureSection";
import CodexSection from "@/components/CodexSection";
import QuestTreeSection from "@/components/QuestTreeSection";
import SoundboardSection from "@/components/SoundboardSection";
import NewsSection from "@/components/NewsSection";
import PlaySection from "@/components/PlaySection";
import ParticleOverlay from "@/components/ParticleOverlay";
import GameHUD from "@/components/GameHUD";

export default function Home() {
  const [weather, setWeather] = useState<"sun" | "rain" | "fog" | "fireflies">("sun");

  return (
    <main className="relative bg-black min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black">
      {/* Particle Canvas Overlay */}
      <ParticleOverlay weather={weather} />

      {/* Game HUD Bar */}
      <GameHUD weather={weather} onWeatherChange={setWeather} />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Narrative Time Journey */}
      <TimeJourney />

      {/* Time Rift Quest Tree */}
      <QuestTreeSection />

      {/* Interactive World Map */}
      <WorldSection />

      {/* Batak Artifact & Weapon Codex */}
      <CodexSection />

      {/* Interactive Characters / NPCs */}
      <CharacterSection />

      {/* Core Gameplay Mechanics */}
      <GameplaySection />

      {/* Traditional Soundboard Simulator */}
      <SoundboardSection />

      {/* Cultural Heritage Discovery */}
      <CultureSection />

      {/* Latest Devlogs & News */}
      <NewsSection />

      {/* Web Demo Playground */}
      <PlaySection />
    </main>
  );
}