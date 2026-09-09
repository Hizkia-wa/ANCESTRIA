import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TimeJourney from "@/components/TimeJourney";
import WorldSection from "@/components/WorldSection";
import CharacterSection from "@/components/CharacterSection";
import GameplaySection from "@/components/GameplaySection";
import CultureSection from "@/components/CultureSection";
import NewsSection from "@/components/NewsSection";
import PlaySection from "@/components/PlaySection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black">
      <Navbar />

      <Hero />

      <TimeJourney />

      <WorldSection />

      <CharacterSection />

      <GameplaySection />

      <CultureSection />

      <NewsSection />

      <PlaySection />
    </main>
  );
}