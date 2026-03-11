"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextBubble, PhotoBubble } from "./ChatBubble";

const features = [
  {
    id: 0,
    title: "Never Lose Job Opportunities.",
    description:
      "Send a photo of the job application form and GAMO explains everything in your language and translates your answers.",
    quote: "Hey GAMO, I got a job application form and don't understand it.",
    outcome: "Got the job — GAMO helped fill out every section.",
    bubbles: [
      { text: "what does this form mean?", x: "5%", y: "15%", delay: 0 },
      { text: "Hey GAMO, can you help?", x: "8%", y: "65%", delay: 1.2 },
      { text: "I need to apply today", x: "10%", y: "42%", delay: 2.4 },
    ],
    chat: (
      <div className="space-y-0.5 px-2.5 py-3">
        <TextBubble
          type="sent"
          text="Hey GAMO, I got a job application form and I don't understand it."
          time="10:30 AM"
          read
        />
        <PhotoBubble type="sent" time="10:30 AM" read />
        <TextBubble
          type="received"
          text="Got it! Question 3 asks if you have legal permission to work in the US — the answer is 'Yes'."
          time="10:31 AM"
        />
        <TextBubble
          type="received"
          text="The EEO section at the bottom is optional — you don't need to fill it in. Want help with the experience section?"
          time="10:31 AM"
        />
        <TextBubble
          type="sent"
          text="Yes please, what do I write for 'previous experience'?"
          time="10:32 AM"
          read
        />
        <TextBubble
          type="received"
          text={`Try: "5 years of hands-on experience in construction and maintenance." Want me to tailor it to your background? 💚`}
          time="10:32 AM"
        />
      </div>
    ),
  },
  {
    id: 1,
    title: "Car Insurance Application. Landlord Questions.",
    description:
      "GAMO walks you through every step from understanding what your insurance actually covers to negotiating a better deal.",
    quote: "Hey GAMO, my landlord sent me a letter and I'm worried.",
    outcome: "Understood her rights and felt in control.",
    bubbles: [
      { text: "what does this letter mean?", x: "6%", y: "20%", delay: 0.4 },
      { text: "do I have to sign this?", x: "8%", y: "58%", delay: 1.6 },
      { text: "Hey GAMO, help me", x: "10%", y: "75%", delay: 0.8 },
    ],
    chat: (
      <div className="space-y-0.5 px-2.5 py-3">
        <TextBubble
          type="sent"
          text="Hey GAMO, my landlord sent me this letter and I'm worried."
          time="2:15 PM"
          read
        />
        <PhotoBubble type="sent" time="2:15 PM" read />
        <TextBubble
          type="received"
          text="This is a lease renewal. Your rent will increase starting next month — but they gave you the required 30 days notice."
          time="2:16 PM"
        />
        <TextBubble
          type="received"
          text="You don't have to accept it as-is. Want me to write a polite letter asking them to keep your current rent?"
          time="2:16 PM"
        />
        <TextBubble
          type="sent"
          text="Yes! Can you write that for me?"
          time="2:17 PM"
          read
        />
        <TextBubble
          type="received"
          text="Of course. I'll write it now — you just copy, sign, and send it. 💚"
          time="2:18 PM"
        />
      </div>
    ),
  },
  {
    id: 2,
    title: "Practice English Words and Pronunciation.",
    description:
      "English is a door. GAMO helps you open it without pressure, without judgment, and without embarrassment.",
    quote: "Hey GAMO, how do I say 'appointment' correctly?",
    outcome: "Felt confident at her doctor's appointment.",
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
          text="Hey GAMO, how do I pronounce 'appointment' correctly?"
          time="11:20 AM"
          read
        />
        <TextBubble
          type="received"
          text={"It's pronounced: uh-POINT-ment. Say it slowly: uh... POINT... ment. 🎤"}
          time="11:21 AM"
        />
        <TextBubble
          type="received"
          text={"Now try using it: 'I have a doctor's appointment on Friday.' Go ahead!"}
          time="11:21 AM"
        />
        <TextBubble
          type="sent"
          text="I have a doctor appointment on Friday."
          time="11:22 AM"
          read
        />
        <TextBubble
          type="received"
          text={"Almost perfect! Just add 'a' before appointment. You've got this — keep going! 💚"}
          time="11:22 AM"
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

      <div className="relative z-10 mx-auto flex max-w-7xl items-center px-5 lg:min-h-screen lg:pt-16">
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
