"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Membuat instance Lenis untuk smooth scrolling
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      smoothWheel: true,
    });

    // Membersihkan instance ketika component dilepas
    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}