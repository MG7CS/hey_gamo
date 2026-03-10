"use client";

import { motion } from "framer-motion";

interface PricingProps {
  onCtaClick: () => void;
}

export default function Pricing({ onCtaClick }: PricingProps) {
  return (
    <section className="bg-gamo-cream py-16 lg:py-24">
      <div className="mx-auto max-w-xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-white shadow-lg"
        >
          {/* Top accent bar */}
          <div className="h-2 bg-gradient-to-r from-gamo-green to-gamo-accent" />

          <div className="p-8 text-center sm:p-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gamo-accent/10 px-4 py-1.5 text-sm font-semibold text-gamo-green">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Simple pricing
            </div>

            <h2 className="mb-2 text-3xl font-extrabold text-gamo-dark sm:text-4xl">
              Try free for 2 weeks
            </h2>
            <p className="mb-8 text-lg text-gamo-muted">
              Then $9.99/month. Cancel anytime on WhatsApp.
            </p>

            <div className="mb-8 rounded-2xl bg-gamo-cream p-6">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-extrabold text-gamo-dark">
                  $9.99
                </span>
                <span className="text-lg text-gamo-muted">/month</span>
              </div>
              <p className="mt-2 text-sm text-gamo-muted">
                After your free trial. Cancel anytime.
              </p>
            </div>

            <ul className="mb-8 space-y-3 text-left">
              {[
                "Unlimited questions — text, voice, or photos",
                "Help in any language",
                "Bills, healthcare, government, and more",
                "Cancel with one message on WhatsApp",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#25D366"
                    className="mt-0.5 flex-shrink-0"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm text-gamo-dark">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onCtaClick}
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-gamo-accent px-8 py-4 text-lg font-bold text-white shadow-lg shadow-gamo-accent/30 transition-all hover:bg-gamo-green hover:shadow-xl active:scale-[0.98]"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="transition-transform group-hover:scale-110"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.914l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.801-6.24-2.144l-.436-.35-3.04 1.018 1.018-3.04-.35-.436A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Start Free on WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
