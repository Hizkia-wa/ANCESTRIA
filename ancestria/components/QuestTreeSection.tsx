"use client";

import { useState } from "react";
import { Scroll, CheckCircle2, ChevronRight, Award, Compass, ShieldAlert, Sparkles, BookOpen } from "lucide-react";
import { soundFx } from "@/lib/soundEffects";

interface QuestNode {
  id: string;
  chapterNumber: string;
  yearTag: string;
  title: string;
  subtitle: string;
  status: "Completed" | "In Progress" | "Locked";
  summary: string;
  objectives: string[];
  branchingChoices: { choice: string; outcome: string }[];
  dialogueSnippet: string;
  rewardBadge: string;
}

export const questTree: QuestNode[] = [
  {
    id: "chapter-1",
    chapterNumber: "CHAPTER I",
    yearTag: "Masa Depan (20XX)",
    title: "Anomali Artefak Kayu Sakral",
    subtitle: "Awal Terbukanya Perjalanan Waktu",
    status: "Completed",
    summary: "Di sebuah laboratorium arkeologi tahun 20XX, protagonis meneliti artefak ukiran kayu kuno khas Batak. Reaksi aneh terjadi ketika energi misterius memicu terbukanya gerbang Time Rift di ruang hampa udara.",
    objectives: [
      "Mengidentifikasi inskripsi naskah Laklak kuno",
      "Stabilkan fluktuasi medan magnetik artefak",
      "Memasuki pusaran energi Time Rift"
    ],
    branchingChoices: [
      { choice: "Ambil artefak dan sentuh ukiran Gorga", outcome: "Pusaran waktu langsung menyedot protagonis ke abad 15 Tanah Batak." },
      { choice: "Gunakan pemindai laser canggih", outcome: "Terjadi ledakan resonansi frekuensi tinggi yang membuka portal waktu." }
    ],
    dialogueSnippet: "“Sinyal energi ini... bukan dari abad ke-21. Artefak ini memiliki detak jantung sendiri!”",
    rewardBadge: "Reward: Artefak Kayu Laklak Awal & Akses Portal"
  },
  {
    id: "chapter-2",
    chapterNumber: "CHAPTER II",
    yearTag: "Tanah Batak (1420)",
    title: "Tiba di Pemukiman Huta Batak",
    subtitle: "Penyambutan & Uji Kepercayaan",
    status: "Completed",
    summary: "Terbangun di tepian Danau Toba abad ke-15, protagonis disambut warga desa yang skeptis. Dengan bantuan pengetahuan modern, ia membantu mengatasi wabah penyakit tanaman dan dipercaya menjadi 'Raja Nami'.",
    objectives: [
      "Temui Amang Togar di pondok sawah",
      "Bantu sanitasi air bersih desa",
      "Dapatkan Trust Meter awal minimal 60%"
    ],
    branchingChoices: [
      { choice: "Jelaskan bahwa kamu datang dari masa depan", outcome: "Warga bingung, namun menghormati kecerdasan irigasi modernmu." },
      { choice: "Katakan kamu adalah penjelajah pedagang", outcome: "Warga menyambutmu dengan penuh kewaspadaan awal." }
    ],
    dialogueSnippet: "“Siapa pemuda berpakaian aneh ini? Tapi cara dia mengalirkan air ke sawah kita... sangat luar biasa!”",
    rewardBadge: "Reward: Gelar Kehormatan 'Raja Nami' & TH Level 1"
  },
  {
    id: "chapter-3",
    chapterNumber: "CHAPTER III",
    yearTag: "Sawah & Pegunungan",
    title: "Krisis Musim Kemarau & Terrasering",
    subtitle: "Gotong Royong Marsiadapari",
    status: "In Progress",
    summary: "Kemarau panjang mengancam panen padi desa. Protagonis merancang sistem irigasi berundak (terrasering sawah) dan menggerakkan tradisi gotong royong Marsiadapari bersama warga.",
    objectives: [
      "Rancang saluran air dari sungai lereng gunung",
      "Pimpin 50 warga dalam kerja bakti Marsiadapari",
      "Tingkatkan produksi beras desa hingga 150 Unit"
    ],
    branchingChoices: [
      { choice: "Fokus membangun bendungan kayu alami", outcome: "Pasokan air melimpah dan warga makin percaya pada kepemimpinanmu." },
      { choice: "Buka lahan hutan rimba baru untuk sawah", outcome: "Panen bertambah tetapi berisiko merusak keseimbangan hutan." }
    ],
    dialogueSnippet: "“Raja Nami! Air sungai melimpah masuk ke sawah berundak kita. Hasil panen kali ini diselamatkan!”",
    rewardBadge: "Reward: Unlocks TH Level 3 & Workshop Tenun Ulos"
  },
  {
    id: "chapter-4",
    chapterNumber: "CHAPTER IV",
    yearTag: "Pasar Adat (Onan)",
    title: "Aliansi Marga & Tenun Ulos Ragidup",
    subtitle: "Persatuan Ekonomi & Kebudayaan",
    status: "Locked",
    summary: "Memperluas perdagangan desa ke Pasar Adat (Onan) dan menyatukan marga-marga Batak sekitar. Uli membantu menenun Ulos Ragidup sebagai lambang restu persatuan.",
    objectives: [
      "Jalin perjanjian barter dengan 3 desa tetangga",
      "Selesaikan tenun Ulos Ragidup bersama Uli",
      "Gelar Pesta Adat Syukuran Panen di Ruma Bolon"
    ],
    branchingChoices: [
      { choice: "Tawarkan harga barter yang adil bagi semua desa", outcome: "Seluruh marga mengikrarkan janji persaudaraan abadi." },
      { choice: "Monopoli komoditas beras desa di Onan", outcome: "Kas desa kaya melimpah tetapi hubungan diplomatik menegang." }
    ],
    dialogueSnippet: "“Ulos ini ditenun dengan doa seluruh warga. Selama Ulos ini membungkus kita, kita adalah satu keluarga.”",
    rewardBadge: "Reward: Unlocks TH Level 5 & Solu Bolon Ship"
  },
  {
    id: "chapter-5",
    chapterNumber: "CHAPTER V",
    yearTag: "Puncak Portal Waktu",
    title: "Penentuan Takdir Abadi ANCESTRIA",
    subtitle: "Dua Masa, Satu Keputusan",
    status: "Locked",
    summary: "Portal Time Rift terbuka kembali di puncak pegunungan. Protagonis dihadapkan pada pilihan tersulit: kembali ke kehidupan masa depan 20XX atau tetap tinggal memimpin dan melestarikan tanah leluhur.",
    objectives: [
      "Temui Datu Manginte di situs sakral",
      "Kumpulkan 8 Artefak Pusaka Lengkap",
      "Ambil keputusan akhir perjalanan waktu"
    ],
    branchingChoices: [
      { choice: "Kembali ke Masa Depan membawa warisan kebudayaan", outcome: "Menjadi pelindung museum sejarah Batak di abad 21." },
      { choice: "Menetap Abadi sebagai Pemimpin Huta Batak", outcome: "Membangun peradaban desa yang makmur dan diabadikan dalam legenda." }
    ],
    dialogueSnippet: "“Portal ini memanggilmu kembali... Namun hatimu telah tertambat di tanah leluhur ini. Apa keputusanmu, Raja Nami?”",
    rewardBadge: "Reward: Ending Storyline Unlock & Master Trophy"
  }
];

export default function QuestTreeSection() {
  const [activeQuest, setActiveQuest] = useState<QuestNode>(questTree[1]); // Default Chapter 2

  const handleSelectQuest = (q: QuestNode) => {
    setActiveQuest(q);
    soundFx.playTimeRiftWarp();
  };

  return (
    <section id="quests" className="relative bg-[#0a0d14] py-28 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/3 bottom-1/3 h-[450px] w-[450px] rounded-full bg-amber-500/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            <Scroll size={14} />
            <span>Interactive Narrative Storyline</span>
          </div>

          <h2 className="text-4xl font-light tracking-[0.1em] sm:text-5xl md:text-6xl">
            TIME RIFT QUEST & <br />
            <span className="font-semibold text-white">CHAPTER TREE</span>
          </h2>

          <p className="mt-5 text-xs sm:text-sm text-white/60 leading-7">
            Ikuti alur narasi 5 babak perjalanan waktu protagonis dari tahun 20XX hingga memimpin peradaban 
            Huta Batak di game **ANCESTRIA**. Klik setiap babak untuk mengeksplorasi misi, pilihan naratif, dan hadiahnya!
          </p>
        </div>

        {/* Timeline Bar Navigator */}
        <div className="grid gap-3 sm:grid-cols-5 mb-10">
          {questTree.map((quest) => {
            const isActive = activeQuest.id === quest.id;
            return (
              <button
                key={quest.id}
                onClick={() => handleSelectQuest(quest)}
                className={`
                  relative rounded-2xl border p-4 text-left transition duration-300 flex flex-col justify-between min-h-[120px]
                  ${isActive ? "border-amber-400 bg-amber-500/15 shadow-xl shadow-amber-500/10" : "border-white/10 bg-[#0c1017] hover:border-white/30"}
                `}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] tracking-widest uppercase mb-1">
                    <span className={isActive ? "text-amber-300 font-bold" : "text-white/40"}>
                      {quest.chapterNumber}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] ${
                      quest.status === "Completed" ? "bg-emerald-500/20 text-emerald-300" : quest.status === "In Progress" ? "bg-amber-500/20 text-amber-300" : "bg-white/10 text-white/40"
                    }`}>
                      {quest.status}
                    </span>
                  </div>

                  <h3 className={`text-xs font-bold transition mt-1 line-clamp-1 ${isActive ? "text-white" : "text-white/70"}`}>
                    {quest.title}
                  </h3>
                </div>

                <div className="text-[10px] text-amber-400/80 font-medium">
                  {quest.yearTag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Quest Chapter Detail Card */}
        <div className="rounded-3xl border border-amber-500/30 bg-[#0c1017] p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[10px] text-amber-300 uppercase tracking-widest font-bold">
                  {activeQuest.chapterNumber} — {activeQuest.yearTag}
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>Status: {activeQuest.status}</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">{activeQuest.title}</h3>
              <p className="text-xs sm:text-sm text-amber-200/80 font-medium mt-1">{activeQuest.subtitle}</p>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 shrink-0 text-center">
              <Award className="mx-auto text-amber-400 mb-1" size={24} />
              <span className="text-[10px] text-amber-200 font-bold uppercase tracking-wider block">Quest Reward</span>
              <span className="text-xs font-semibold text-white block mt-0.5">{activeQuest.rewardBadge}</span>
            </div>
          </div>

          {/* Story Summary & Dialogue */}
          <div className="grid gap-8 lg:grid-cols-2 mb-8">
            <div className="space-y-4 text-xs leading-6 text-white/80">
              <h4 className="text-[10px] uppercase tracking-wider text-amber-400 font-medium">Ringkasan Sinopsis Babak</h4>
              <p className="text-sm text-white/90 leading-7 font-light">{activeQuest.summary}</p>

              <div className="rounded-2xl border border-white/10 bg-black/50 p-4">
                <h5 className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Kutipan Dialog Karakter</h5>
                <p className="font-serif italic text-sm text-amber-100">{activeQuest.dialogueSnippet}</p>
              </div>
            </div>

            {/* Objectives & Branching */}
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] uppercase tracking-wider text-amber-400 font-medium mb-3">Target Misi Utama</h4>
                <div className="space-y-2">
                  {activeQuest.objectives.map((obj, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-3 text-xs">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                        {i + 1}
                      </span>
                      <span className="text-white/90">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-wider text-amber-400 font-medium mb-3">Cabang Keputusan RPG</h4>
                <div className="space-y-2">
                  {activeQuest.branchingChoices.map((b, i) => (
                    <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs">
                      <span className="font-bold text-amber-300 block">Pilihan #{i + 1}: {b.choice}</span>
                      <span className="text-[11px] text-white/60 mt-1 block">Dampak: {b.outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
