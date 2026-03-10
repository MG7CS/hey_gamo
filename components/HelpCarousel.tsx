"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextBubble, PhotoBubble } from "./ChatBubble";

const features = [
  {
    id: 0,
    title: "Bills & letters",
    description:
      "Don't understand a bill or official letter? We explain it in plain language.",
    quote: "Hey GAMO, what does this hospital bill mean?",
    outcome: "Entendió su factura y le perdonaron $200",
    bubbles: [
      { text: "¿qué significa esto?", x: "5%", y: "15%", delay: 0 },
      { text: "no entiendo esta carta", x: "8%", y: "65%", delay: 1.2 },
      { text: "Hey GAMO, me ayudas?", x: "10%", y: "42%", delay: 2.4 },
    ],
    chat: (
      <div className="space-y-0.5 px-2.5 py-3">
        <TextBubble
          type="sent"
          text="Hey GAMO, what does this hospital bill mean?"
          time="10:30 AM"
          read
        />
        <TextBubble
          type="received"
          text="This is a bill for your emergency room visit. The total is $3,200, but you have options:"
          time="10:31 AM"
        />
        <TextBubble
          type="received"
          text={`1️⃣ Ask for financial assistance\n2️⃣ Request a payment plan\n3️⃣ Negotiate the amount\n\nI can help you write the letter. Want me to?`}
          time="10:31 AM"
        />
      </div>
    ),
  },
  {
    id: 1,
    title: "Healthcare & schools",
    description:
      "Questions about insurance, doctors, or enrolling your kids? We walk you through it.",
    quote: "Hey GAMO, como faço pra matricular meu filho na escola?",
    outcome: "Filho matriculado na escola — sem precisar de inglês",
    bubbles: [
      { text: "como faço a matrícula?", x: "6%", y: "20%", delay: 0.4 },
      { text: "qual é o próximo passo?", x: "8%", y: "58%", delay: 1.6 },
      { text: "Hey GAMO, preciso de ajuda", x: "10%", y: "75%", delay: 0.8 },
    ],
    chat: (
      <div className="space-y-0.5 px-2.5 py-3">
        <TextBubble
          type="sent"
          text="Hey GAMO, como faço pra matricular meu filho na escola? A gente acabou de chegar em Providence."
          time="2:15 PM"
          read
        />
        <TextBubble
          type="received"
          text="Bem-vindo! Você vai precisar de: comprovante de endereço, certidão de nascimento e cartão de vacinas. O escritório fica na 797 Westminster St."
          time="2:16 PM"
        />
        <TextBubble
          type="received"
          text="Quer que eu te diga o que falar quando chegar lá?"
          time="2:16 PM"
        />
        <TextBubble
          type="sent"
          text="Sim, e se eu não falar inglês bem?"
          time="2:17 PM"
          read
        />
        <TextBubble
          type="received"
          text='Você tem direito a um intérprete — gratuito e obrigatório por lei. Diga: "I need an interpreter please." 💚'
          time="2:18 PM"
        />
      </div>
    ),
  },
  {
    id: 2,
    title: "Know your rights",
    description:
      "Understand your rights as a person living in the U.S. We help you feel informed.",
    quote: "Hey GAMO, can my landlord raise rent without notice?",
    outcome: "Hakuwalipa ongezeko la kodi haramu",
    bubbles: [
      { text: "haki zangu ni zipi?", x: "7%", y: "18%", delay: 0.6 },
      { text: "anaweza kufanya hivyo?", x: "9%", y: "55%", delay: 1.8 },
      { text: "Hey GAMO, nisaidie", x: "8%", y: "72%", delay: 1.0 },
    ],
    chat: (
      <div className="space-y-0.5 px-2.5 py-3">
        <TextBubble
          type="sent"
          text="Hey GAMO, can my landlord raise rent without notice?"
          time="4:05 PM"
          read
        />
        <PhotoBubble type="sent" time="4:05 PM" read />
        <TextBubble
          type="received"
          text="No, they can't. In most states, landlords must give 30-60 days notice before raising rent."
          time="4:06 PM"
        />
        <TextBubble
          type="received"
          text="This letter says the increase starts next month — that's legal if they sent it 30+ days ago. Want me to help you respond?"
          time="4:06 PM"
        />
      </div>
    ),
  },
  {
    id: 3,
    title: "Learn English",
    description:
      "Practice words and pronunciation with GAMO. Like a patient teacher in your pocket.",
    quote: "Hey GAMO, how do I pronounce 'appointment'?",
    outcome: "Felt confident at her job interview",
    comingSoon: true,
    bubbles: [
      { text: "how do I say this?", x: "6%", y: "22%", delay: 0.2 },
      { text: "is this correct?", x: "9%", y: "60%", delay: 1.4 },
      { text: "Hey GAMO, let's practice", x: "8%", y: "78%", delay: 2.2 },
    ],
    chat: (
      <div className="space-y-0.5 px-2.5 py-3">
        <TextBubble
          type="sent"
          text="Hey GAMO, how do I pronounce 'appointment'?"
          time="11:20 AM"
          read
        />
        <TextBubble
          type="received"
          text={`Great word! It's pronounced: uh-POINT-ment\n\n🔊 Listen: (audio coming soon)\n\nTry saying it slowly: uh... POINT... ment`}
          time="11:21 AM"
        />
        <TextBubble
          type="received"
          text="Want to practice using it in a sentence? 📖"
          time="11:21 AM"
        />
      </div>
    ),
  },
];

function WhatsAppHeader() {
  return (
    <div className="flex items-center gap-3 bg-wa-header px-3 py-2">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gamo-accent">
        <span className="text-xs font-bold text-white">G</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold leading-tight text-white">GAMO</p>
        <p className="text-[10px] text-white/70">online</p>
      </div>
    </div>
  );
}

function WhatsAppInputBar() {
  return (
    <div className="flex items-center gap-2 bg-wa-bg px-2 py-1.5">
      <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-1.5">
        <span className="flex-1 text-[13px] text-gray-400">Message</span>
      </div>
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gamo-accent">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z" />
        </svg>
      </div>
    </div>
  );
}

export default function HelpCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const paginate = useCallback((newIndex: number) => {
    setActiveIndex(newIndex);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate((activeIndex + 1) % features.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activeIndex, paginate]);

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:min-h-screen lg:py-0">
      {/* Floating bubbles per slide - more visible */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 hidden overflow-hidden lg:block"
        >
          {features[activeIndex].bubbles.map((bubble, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [0.15, 0.28, 0.15],
                y: [0, -12, 0],
              }}
              transition={{
                duration: 7,
                delay: bubble.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-xl bg-gamo-accent/15 px-4 py-2.5 text-sm text-gamo-green/50 backdrop-blur-sm"
              style={{ left: bubble.x, top: bubble.y }}
            >
              {bubble.text}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center px-5 lg:min-h-screen">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Text content - left-aligned with more presence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col lg:pl-8"
            >
              {features[activeIndex].comingSoon && (
                <span className="mb-4 inline-block self-start rounded-full bg-purple-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  Coming Soon
                </span>
              )}
              <h2 className="mb-4 text-4xl font-extrabold text-gamo-dark sm:text-5xl">
                {features[activeIndex].title}
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gamo-muted">
                {features[activeIndex].description}
              </p>
              <div className="mb-8 inline-block self-start rounded-xl bg-gamo-accent/10 px-5 py-3">
                <p className="text-sm italic text-gamo-green">
                  &ldquo;{features[activeIndex].quote}&rdquo;
                </p>
              </div>

              {/* Outcome line */}
              <div className="flex items-start gap-3 self-start">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#25D366"
                  className="mt-0.5 flex-shrink-0"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <p className="text-base font-bold text-gamo-dark">
                  {features[activeIndex].outcome}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: Phone mockup */}
          <div className="flex flex-col items-center">
            <div className="phone-shadow relative w-[280px] overflow-hidden rounded-[40px] border-[6px] border-gray-900 bg-gray-900 sm:w-[320px]">
              <div className="absolute top-2 left-1/2 z-20 h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-black" />

              <div className="relative flex items-center justify-between bg-wa-header px-4 pt-3 pb-0">
                <span className="text-[10px] font-semibold text-white/90">
                  9:41
                </span>
                <div className="flex items-center gap-1">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="white"
                    opacity="0.9"
                  >
                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.24 4.24 0 00-6 0zm-4-4l2 2a7.07 7.07 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                  </svg>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="white"
                    opacity="0.9"
                  >
                    <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                  </svg>
                </div>
              </div>

              <WhatsAppHeader />

              <div className="relative h-[420px] overflow-hidden bg-wa-bg sm:h-[480px]">
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 overflow-y-auto"
                  >
                    {features[activeIndex].chat}
                  </motion.div>
                </AnimatePresence>
              </div>

              <WhatsAppInputBar />
            </div>

            {/* Dot indicators */}
            <div className="mt-8 flex gap-2">
              {features.map((f) => (
                <button
                  key={f.id}
                  onClick={() => paginate(f.id)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    f.id === activeIndex
                      ? "w-10 bg-gamo-accent"
                      : "w-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={f.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
