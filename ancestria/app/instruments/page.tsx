import Navbar from "@/components/Navbar";
import SoundboardSection from "@/components/SoundboardSection";
import PlaySection from "@/components/PlaySection";

export const metadata = {
  title: "Batak Music Soundboard — ANCESTRIA",
  description: "Interactive Traditional Batak Instrument Soundboard (Hasapi, Taganing, Ogung, Sarune) di Game ANCESTRIA.",
};

export default function InstrumentsPage() {
  return (
    <main className="bg-black min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black pt-16">
      <Navbar />
      <SoundboardSection />
      <PlaySection />
    </main>
  );
}
