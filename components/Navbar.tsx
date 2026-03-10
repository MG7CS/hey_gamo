"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gamo-accent">
            <span className="text-xl font-extrabold text-white">G</span>
          </div>
          <span
            className={`text-xl font-bold transition-colors duration-300 ${
              scrolled ? "text-gamo-dark" : "text-white"
            }`}
          >
            GAMO
          </span>
        </a>

        <a
          href="https://wa.me/14155238886?text=join+cow-wear"
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all active:scale-95 ${
            scrolled
              ? "bg-gamo-accent text-white shadow-md hover:bg-gamo-green hover:shadow-lg"
              : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          }`}
        >
          Try GAMO Free
        </a>
      </div>
    </nav>
  );
}
