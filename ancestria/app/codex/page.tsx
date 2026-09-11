import Navbar from "@/components/Navbar";
import CodexSection from "@/components/CodexSection";
import PlaySection from "@/components/PlaySection";

export const metadata = {
  title: "Batak Artifact Codex — ANCESTRIA",
  description: "Pustaka Warisan Artefak, Senjata Pusaka, dan Kitab Laklak Kuno Batak di Game ANCESTRIA.",
};

export default function CodexPage() {
  return (
    <main className="bg-black min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black pt-16">
      <Navbar />
      <CodexSection />
      <PlaySection />
    </main>
  );
}
