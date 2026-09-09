"use client";

import { useState } from "react";
import { X, Heart, Shield, Award, Users } from "lucide-react";

interface Character {
  id: string;
  name: string;
  kinshipTitle: string;
  role: string;
  image: string;
  trustScore: number;
  bio: string;
  culturalNote: string;
  dialogue: string;
  skills: string[];
}

const characters: Character[] = [
  {
    id: "protagonist",
    name: "Protagonis (Raja Nami)",
    kinshipTitle: "Pemuda Masa Depan / Pemimpin",
    role: "Town Leader & Explorer",
    image: "/characters/protagonist.jpg",
    trustScore: 92,
    bio: "Seorang pemuda Batak dari tahun 20XX yang terlempar ke masa lalu setelah menemukan artefak kayu leluhur. Dengan kecerdasan dan pengetahuan modern, ia membantu warga desa mengatasi krisis pangan dan sanitasi hingga dipercaya sebagai 'Raja Nami'.",
    culturalNote: "Panggilan 'Raja Nami' adalah gelar kehormatan dan kepercayaan dari masyarakat Batak untuk pemimpin yang mengayomi warga.",
    dialogue: "“Aku tidak hanya mencari jalan kembali ke masa depan... Aku di sini untuk membantu tanah leluhurku bertahan dan berkembang.”",
    skills: ["Resource Planning", "Water Management", "Strategic Decision Making"]
  },
  {
    id: "togar",
    name: "Amang Togar",
    kinshipTitle: "Amang (Ayah / Senior)",
    role: "Master Farmer & Agricultural Elder",
    image: "/characters/amang_togar.jpg",
    trustScore: 88,
    bio: "Petani senior bijaksana yang mengerti seluk-beluk tanah dan musim di Tanah Batak. Awalnya skeptis pada pengetahuan masa depan sang protagonis, namun kini menjadi mitra setia dalam mengembangkan terrasing sawah.",
    culturalNote: "Sapaan 'Amang' digunakan untuk menghormati pria yang lebih tua atau figur ayah dalam sistem kekerabatan Batak.",
    dialogue: "“Raja Nami, irigasi baru yang kau usulkan membuat sawah kita hijau kembali. Hasil panen kali ini melimpah!”",
    skills: ["Rice Farming ★★★★", "Soil Knowledge ★★★★★", "Traditional Wisdom ★★★★"]
  },
  {
    id: "uli",
    name: "Uli (Boru Sinaga)",
    kinshipTitle: "Boru / Ito (Saudari / Pengrajin)",
    role: "Master Weaver & Heritage Keeper",
    image: "/characters/uli_weaver.jpg",
    trustScore: 95,
    bio: "Pengrajin kain Ulos ulung yang mewarisi teknik tenun kuno dari nenek moyangnya. Ia mengajarkan makna mendalam di balik motif benang merah, hitam, dan putih kepada sang protagonis.",
    culturalNote: "Tradisi 'Mangulosi' hanya boleh dilakukan dari orang tua/senior kepada yang lebih muda sebagai lambang restu dan kasih sayang.",
    dialogue: "“Tiap lembar Ulos ini punya doa dan perlindungan. Jangan pernah lupa dari mana kain ini berasal.”",
    skills: ["Ulos Weaving ★★★★★", "Natural Dyeing ★★★★", "Cultural Storytelling ★★★★★"]
  },
  {
    id: "sari",
    name: "Boru Sari",
    kinshipTitle: "Inang (Ibu / Pedagang)",
    role: "Market Merchant & Trade Coordinator",
    image: "/images/past.png",
    trustScore: 82,
    bio: "Pedagang pasar yang energik dan cerdik. Mengatur transaksi barter antar-desa dan memastikan hasil bumi desa terjual dengan harga yang adil.",
    culturalNote: "Pasar tradisional Batak (*Onan*) bukan sekadar tempat transaksi ekonomi, melainkan ruang interaksi sosial antar-marga.",
    dialogue: "“Desa tetangga butuh 50 karung beras kita. Kalau kita sepakat barter dengan ternak kerbau, desa kita akan semakin makmur!”",
    skills: ["Trading & Barter ★★★★", "Resource Distribution ★★★★", "Inter-Village Relations ★★★"]
  }
];

export default function CharacterSection() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <section id="characters" className="relative overflow-hidden bg-[#0a0d14] py-28 text-white">
      {/* Glow background */}
      <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-amber-500/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-medium">
            NPC & Community Simulation
          </p>

          <h2 className="mt-4 text-4xl font-light tracking-[0.12em] sm:text-5xl md:text-6xl">
            MEET THE <br />
            <span className="font-semibold text-white">VILLAGE PEOPLE</span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-white/60 sm:text-base">
            Masyarakat desa bukan sekadar karakter statis. Setiap warga memiliki peran, keluarga, keterampilan, 
            serta hubungan kekerabatan Batak yang dinamis sesuai dengan tingkat kepercayaan (*Trust Meter*) terhadap kepemimpinanmu.
          </p>
        </div>

        {/* Character Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {characters.map((char) => (
            <div
              key={char.id}
              onClick={() => setSelectedCharacter(char)}
              className="
                group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10
                bg-[#0f1420] transition duration-500 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10
              "
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                  src={char.image}
                  alt={char.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1420] via-transparent to-transparent opacity-90" />
                
                {/* Trust Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-amber-500/40 bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] text-amber-300">
                  <Heart size={10} className="fill-amber-400 text-amber-400" />
                  <span>Trust {char.trustScore}%</span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-[10px] uppercase tracking-widest text-amber-400 font-medium">
                  {char.kinshipTitle}
                </p>

                <h3 className="mt-1 text-xl font-medium tracking-wide text-white group-hover:text-amber-300 transition">
                  {char.name}
                </h3>

                <p className="mt-2 text-xs text-white/50 line-clamp-2 leading-5">
                  {char.role}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-wider text-white/40 group-hover:text-white">
                  <span>View Details</span>
                  <span className="text-amber-400 group-hover:translate-x-1 transition">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Character Detail Modal */}
      {selectedCharacter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl border border-amber-500/30 bg-[#0f1420] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedCharacter(null)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-amber-500 hover:text-black transition"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                className="h-44 w-36 rounded-xl object-cover border border-white/20 shrink-0"
              />

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-medium">
                  {selectedCharacter.kinshipTitle}
                </p>

                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedCharacter.name}
                </h3>

                <p className="text-xs text-amber-200/80 mt-1 font-medium">
                  {selectedCharacter.role}
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full w-fit">
                  <Shield size={12} />
                  <span>Kepercayaan Masyakarat: {selectedCharacter.trustScore}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-xs leading-6 text-white/70 border-t border-white/10 pt-4">
              <div>
                <h4 className="text-[10px] uppercase tracking-wider text-white/40">Biografi & Peran</h4>
                <p className="mt-1 text-white/80">{selectedCharacter.bio}</p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <h4 className="text-[10px] uppercase tracking-wider text-amber-400 font-medium">Nilai Budaya Batak</h4>
                <p className="mt-1 italic text-amber-100/90">{selectedCharacter.culturalNote}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <h4 className="text-[10px] uppercase tracking-wider text-white/40">Sample Dialog NPC</h4>
                <p className="mt-1 font-serif text-sm italic text-white">{selectedCharacter.dialogue}</p>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Keterampilan Utama</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCharacter.skills.map((skill) => (
                    <span key={skill} className="rounded-md border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white/90">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
