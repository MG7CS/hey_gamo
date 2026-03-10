"use client";

import { motion } from "framer-motion";

interface CtaBannerProps {
  onCtaClick: () => void;
}

export default function CtaBanner({ onCtaClick }: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gamo-green py-16 lg:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-gamo-green via-gamo-green-light to-gamo-accent opacity-90" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto max-w-2xl px-5 text-center"
      >
        <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
          Want the full version?
        </h2>
        <p className="mb-8 text-lg text-white/80">
          Start your free trial — cancel anytime on WhatsApp.
        </p>
        <button
          onClick={onCtaClick}
          className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-bold text-gamo-green shadow-lg transition-all hover:bg-gamo-cream hover:shadow-xl active:scale-95"
        >
          Start Free Trial
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
