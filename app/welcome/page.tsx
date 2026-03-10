"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WHATSAPP_SANDBOX_LINK } from "@/lib/config";

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gamo-cream via-white to-gamo-cream px-5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        {/* Big green checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gamo-accent shadow-xl shadow-gamo-accent/30"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="white"
            className="drop-shadow-md"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </motion.div>

        {/* Headline */}
        <h1 className="mb-4 text-4xl font-extrabold text-gamo-dark sm:text-5xl lg:text-6xl">
          You&apos;re in! Your 2-week free trial has started. 🎉
        </h1>

        {/* Subtext */}
        <p className="mb-12 text-lg leading-relaxed text-gamo-muted sm:text-xl">
          No charge today. Cancel anytime by messaging GAMO on WhatsApp.
        </p>

        {/* CTA Button */}
        <a
          href={WHATSAPP_SANDBOX_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full bg-gamo-accent px-10 py-5 text-xl font-bold text-white shadow-xl shadow-gamo-accent/30 transition-all hover:bg-gamo-green hover:shadow-2xl active:scale-95"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="transition-transform group-hover:scale-110"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.914l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.801-6.24-2.144l-.436-.35-3.04 1.018 1.018-3.04-.35-.436A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          Start chatting with GAMO →
        </a>

        {/* Back to home link */}
        <div className="mt-8">
          <Link
            href="/"
            className="text-sm text-gamo-muted transition-colors hover:text-gamo-dark"
          >
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
