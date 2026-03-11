"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Mandé una foto de mi factura del hospital y GAMO me explicó todo en español. Hasta me ayudó a pedir una reducción.",
    name: "María R.",
    location: "Providence, RI",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=120&q=80",
    lang: "Spanish speaker",
  },
  {
    quote:
      "Eu não sabia como matricular minha filha na escola. Mandei um áudio e o GAMO me explicou tudo passo a passo.",
    name: "Carlos M.",
    location: "Newark, NJ",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    lang: "Portuguese speaker",
  },
  {
    quote:
      "I took a photo of a letter from my landlord. GAMO told me it was a rent increase and helped me understand my rights.",
    name: "Amina K.",
    location: "Minneapolis, MN",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=80",
    lang: "Kinyarwanda speaker",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gamo-cream py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-extrabold text-gamo-dark sm:text-4xl">
            You come with courage. GAMO comes with answers.
          </h2>
          <p className="mx-auto max-w-md text-lg text-gamo-muted">
            Real people. Real situations. Real help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm"
            >
              {/* Stars */}
              <div className="mb-3 flex gap-0.5 text-amber-400">
                {[...Array(5)].map((_, j) => (
                  <svg
                    key={j}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="mb-5 flex-1 text-[15px] italic leading-relaxed text-gamo-dark">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Person */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-gamo-dark">{t.name}</p>
                  <p className="text-xs text-gamo-muted">
                    {t.location} &middot; {t.lang}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
