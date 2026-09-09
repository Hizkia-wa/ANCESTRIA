"use client";

import { Calendar, Tag, ArrowRight } from "lucide-react";

interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  linkText: string;
}

const newsItems: NewsItem[] = [
  {
    id: "news-1",
    date: "09 September 2026",
    category: "Game Devlog",
    title: "Devlog #03 — Implementasi Interactive Village Map & Decision Simulator",
    summary: "Integrasi peta desa interaktif Tanah Batak dengan 7 hotspot fasilitas pembangunan dan simulator keputusan kepemimpinan Raja Nami.",
    linkText: "Baca Devlog →"
  },
  {
    id: "news-2",
    date: "01 September 2026",
    category: "Cultural Heritage",
    title: "Validasi Istilah Kekerabatan Batak bersama Budayawan & Penutur Lokal",
    summary: "Memastikan penggunaan istilah Amang, Inang, Tulang, Namboru, serta ritual Mangulosi sesuai dengan norma adat Batak.",
    linkText: "Lihat Hasil Validasi →"
  },
  {
    id: "news-3",
    date: "25 Agustus 2026",
    category: "Web Competition 2026",
    title: "Tim CCT Mempersiapkan Interactive Game Showcase Portal ANCESTRIA",
    summary: "Pengembangan portal web showcase imersif berlatar naskah naratif From Future to Past untuk Kompetisi Web Development 2026.",
    linkText: "Rincian Showcase →"
  }
];

export default function NewsSection() {
  return (
    <section id="news" className="relative bg-[#0a0d14] py-28 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16 lg:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-medium">
              Updates & Announcements
            </p>
            <h2 className="mt-3 text-4xl font-light tracking-[0.12em] sm:text-5xl">
              LATEST <span className="font-semibold text-white">NEWS & EVENTS</span>
            </h2>
          </div>
          <p className="text-xs text-white/50 max-w-md leading-6">
            Ikuti kabar perkembangan terbaru pengembangan game ANCESTRIA, catatan devlog, serta dokumentasi riset kebudayaan Batak.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {newsItems.map((news) => (
            <article
              key={news.id}
              className="
                group rounded-2xl border border-white/10 bg-[#0f1420] p-6 transition duration-500
                hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between
              "
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-white/40 mb-4">
                  <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                    <Tag size={12} />
                    <span>{news.category}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{news.date}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition leading-snug">
                  {news.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-white/60">
                  {news.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition flex items-center gap-2">
                <span>{news.linkText}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
