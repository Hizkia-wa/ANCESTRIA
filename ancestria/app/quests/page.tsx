import Navbar from "@/components/Navbar";
import QuestTreeSection from "@/components/QuestTreeSection";
import PlaySection from "@/components/PlaySection";

export const metadata = {
  title: "Time Rift Quests — ANCESTRIA",
  description: "Interactive Narrative Quest & Time Rift Scenario Tree di Game ANCESTRIA.",
};

export default function QuestsPage() {
  return (
    <main className="bg-black min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black pt-16">
      <Navbar />
      <QuestTreeSection />
      <PlaySection />
    </main>
  );
}
