"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const cards = [
  {
    title: "Bills & letters",
    description:
      "Got a confusing bill or official letter? Snap a photo and GAMO explains what it says — in plain language.",
    emoji: "📄",
    example: '"GAMO, what does this hospital bill mean?"',
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=75",
    imageAlt: "Person looking at documents",
    gradient: "from-amber-50 to-orange-50",
    border: "border-amber-200/60",
  },
  {
    title: "Healthcare & schools",
    description:
      "Questions about insurance, doctors, or enrolling your kids in school? GAMO walks you through it step by step.",
    emoji: "🏥",
    example: '"How do I enroll my son in school?"',
    image:
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&q=75",
    imageAlt: "Parent with child",
    gradient: "from-emerald-50 to-teal-50",
    border: "border-emerald-200/60",
  },
  {
    title: "Know your rights",
    description:
      "Understand your rights as a person living in the U.S. GAMO helps you feel informed and protected.",
    emoji: "🛡️",
    example: '"Can my landlord raise rent without notice?"',
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=75",
    imageAlt: "Person feeling confident",
    gradient: "from-blue-50 to-indigo-50",
    border: "border-blue-200/60",
  },
  {
    title: "Learn English",
    description:
      "Practice words and pronunciation with GAMO. Like a patient teacher in your pocket.",
    emoji: "📖",
    example: '"How do I pronounce \'appointment\'?"',
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=75",
    imageAlt: "Person studying",
    gradient: "from-purple-50 to-pink-50",
    border: "border-purple-200/60",
    comingSoon: true,
  },
];

export default function HelpCards() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-extrabold text-gamo-dark sm:text-4xl">
            What GAMO helps with
          </h2>
          <p className="mx-auto max-w-md text-lg text-gamo-muted">
            Real help for real life — in your language.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${card.gradient} ${card.border} transition-shadow hover:shadow-lg`}
            >
              {card.comingSoon && (
                <span className="absolute top-4 right-4 z-10 rounded-full bg-purple-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                  Coming Soon
                </span>
              )}

              {/* Photo strip */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 text-3xl drop-shadow-md">
                  {card.emoji}
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-2 text-xl font-bold text-gamo-dark">
                  {card.title}
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-gamo-muted">
                  {card.description}
                </p>
                <div className="rounded-lg bg-white/80 px-3 py-2 text-xs italic text-gamo-green">
                  {card.example}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
