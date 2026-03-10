"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextBubble, VoiceBubble, PhotoBubble } from "./ChatBubble";

const screens = [
  {
    id: 0,
    label: "Text",
    emoji: "💬",
    leftTitle: "Ask about a confusing bill",
    leftSub:
      "GAMO explains it simply — in your language. No jargon, no confusion.",
    rightTitle: "Spanish conversation",
    rightSub:
      "A real user asking about a $3,200 hospital bill. GAMO explains their rights and offers to help write an appeal.",
  },
  {
    id: 1,
    label: "Voice",
    emoji: "🎤",
    leftTitle: "Just talk — send a voice note",
    leftSub:
      "Don't want to type? Record a voice note in your language. GAMO listens and responds.",
    rightTitle: "Portuguese voice note",
    rightSub:
      "A parent asking about enrolling their child in school. GAMO gives step-by-step instructions.",
  },
  {
    id: 2,
    label: "Photo",
    emoji: "📸",
    leftTitle: "Snap a photo of any document",
    leftSub:
      "Got a letter you can't read? Take a photo. GAMO tells you what it says and what to do next.",
    rightTitle: "Photo of a rent letter",
    rightSub:
      "GAMO reads the notice, explains the rent increase, and offers to help write a response.",
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
      <div className="flex gap-4 text-white/80">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 00-1.02.24l-2.2 2.2a15.05 15.05 0 01-6.59-6.58l2.2-2.21a1 1 0 00.24-1.02A11.36 11.36 0 018.5 4a1 1 0 00-1-1H4a1 1 0 00-1 1 17 17 0 0017 17 1 1 0 001-1v-3.5a1 1 0 00-1-1z" />
        </svg>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </div>
    </div>
  );
}

function SpanishChat() {
  return (
    <div className="space-y-0.5 px-2.5 py-3">
      <TextBubble
        type="sent"
        text="Hey GAMO, me llegó una cuenta del hospital y no entiendo. Dice que debo $3,200 😟"
        time="10:30 AM"
        read
      />
      <TextBubble
        type="received"
        text="¡Hola! No te preocupes. Muchos hospitales tienen programas de ayuda. Primero: no pagues nada todavía. ¿Puedes enviarme una foto de la cuenta?"
        time="10:31 AM"
      />
      <TextBubble
        type="sent"
        text="¿En serio? No sabía eso. Déjame tomarle foto..."
        time="10:32 AM"
        read
      />
      <TextBubble
        type="received"
        text="Tienes derecho a pedir un plan de pagos o una reducción. Yo te ayudo a escribir la carta. Solo mándame la foto 📋"
        time="10:32 AM"
      />
    </div>
  );
}

function PortugueseChat() {
  return (
    <div className="space-y-0.5 px-2.5 py-3">
      <VoiceBubble type="sent" duration="0:23" time="2:15 PM" read />
      <TextBubble
        type="received"
        text="Entendi! Você quer saber como matricular seu filho na escola. Aqui vai o passo a passo:"
        time="2:16 PM"
      />
      <TextBubble
        type="received"
        text={`1️⃣ Vá à escola mais perto com comprovante de endereço\n2️⃣ Leve a certidão de nascimento do seu filho\n3️⃣ Preencha o formulário de matrícula`}
        time="2:16 PM"
      />
      <TextBubble
        type="received"
        text="Não precisa de documentos de imigração para matricular. É um direito de todas as crianças! 💚"
        time="2:17 PM"
      />
      <VoiceBubble type="sent" duration="0:08" time="2:18 PM" read />
      <TextBubble
        type="received"
        text="De nada! Qualquer outra dúvida, é só perguntar 😊"
        time="2:18 PM"
      />
    </div>
  );
}

function PhotoChat() {
  return (
    <div className="space-y-0.5 px-2.5 py-3">
      <TextBubble
        type="sent"
        text="Hey GAMO, I got this letter and I don't know what it means"
        time="4:05 PM"
        read
      />
      <PhotoBubble type="sent" time="4:05 PM" read />
      <TextBubble
        type="received"
        text="This is a notice from your landlord about a rent increase of $50 starting next month. Here's what you should know:"
        time="4:06 PM"
      />
      <TextBubble
        type="received"
        text={`✅ They must give 30 days notice (they did)\n✅ Check your lease for any rent cap\n📞 You can call 311 to ask about tenant rights in your area`}
        time="4:06 PM"
      />
      <TextBubble
        type="received"
        text="Want me to help you write a response to your landlord?"
        time="4:07 PM"
      />
    </div>
  );
}

function WhatsAppInputBar() {
  return (
    <div className="flex items-center gap-2 bg-wa-bg px-2 py-1.5">
      <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-1.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#8696A0" className="flex-shrink-0">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
        <span className="flex-1 text-[13px] text-gray-400">Message</span>
      </div>
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gamo-accent">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.41 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
        </svg>
      </div>
    </div>
  );
}

export default function PhoneMockup() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = useCallback(
    (newIndex: number) => {
      setPage([newIndex, newIndex > activeScreen ? 1 : -1]);
      setActiveScreen(newIndex);
    },
    [activeScreen]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      paginate((activeScreen + 1) % screens.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeScreen, paginate]);

  const chatScreens = [
    <SpanishChat key="es" />,
    <PortugueseChat key="pt" />,
    <PhotoChat key="photo" />,
  ];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 200 : -200, opacity: 0 }),
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-extrabold text-gamo-dark sm:text-4xl">
            See GAMO in action
          </h2>
          <p className="mx-auto max-w-md text-lg text-gamo-muted">
            Real conversations. Real help. Right on WhatsApp.
          </p>
        </motion.div>

        {/* Tab pills */}
        <div className="mb-10 flex justify-center gap-2">
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => paginate(s.id)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                s.id === activeScreen
                  ? "bg-gamo-accent text-white shadow-md shadow-gamo-accent/20"
                  : "bg-gray-100 text-gamo-muted hover:bg-gray-200"
              }`}
            >
              <span>{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Three-column: left text | phone | right text */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${activeScreen}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="order-2 text-center lg:order-1 lg:text-right"
            >
              <h3 className="mb-3 text-2xl font-extrabold text-gamo-dark sm:text-3xl">
                {screens[activeScreen].leftTitle}
              </h3>
              <p className="text-base leading-relaxed text-gamo-muted">
                {screens[activeScreen].leftSub}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Phone (always centered) */}
          <div className="order-1 flex flex-col items-center lg:order-2">
            <div className="phone-shadow relative w-[280px] overflow-hidden rounded-[40px] border-[6px] border-gray-900 bg-gray-900 sm:w-[300px]">
              <div className="absolute top-2 left-1/2 z-20 h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-black" />

              <div className="relative flex items-center justify-between bg-wa-header px-4 pt-3 pb-0">
                <span className="text-[10px] font-semibold text-white/90">9:41</span>
                <div className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.9">
                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.24 4.24 0 00-6 0zm-4-4l2 2a7.07 7.07 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                  </svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.9">
                    <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                  </svg>
                </div>
              </div>

              <WhatsAppHeader />

              <div className="relative h-[380px] overflow-hidden bg-wa-bg sm:h-[420px]">
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 overflow-y-auto"
                  >
                    {chatScreens[activeScreen]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <WhatsAppInputBar />
            </div>

            {/* Dot indicators */}
            <div className="mt-6 flex gap-2">
              {screens.map((s) => (
                <button
                  key={s.id}
                  onClick={() => paginate(s.id)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    s.id === activeScreen
                      ? "w-8 bg-gamo-accent"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={s.label}
                />
              ))}
            </div>
          </div>

          {/* Right description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${activeScreen}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="order-3 text-center lg:text-left"
            >
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-gamo-accent/10 px-3 py-1 text-xs font-semibold text-gamo-green">
                <span className="h-2 w-2 rounded-full bg-gamo-accent" />
                {screens[activeScreen].rightTitle}
              </div>
              <p className="text-base leading-relaxed text-gamo-muted">
                {screens[activeScreen].rightSub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
