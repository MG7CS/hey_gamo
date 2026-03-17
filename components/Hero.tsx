"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useBeta } from "@/lib/beta-context";

const heroSlides = [
  {
    headline: "vous aide.",
    lang: "fr",
    bgImage: "/assets/hero-man-black-street.png",
    bgImagePortrait: "/assets/hero-man-black-street-portrait.png",
    bgPosition: "object-center",
    chat: (
      <>
        <div className="flex justify-end">
          <div className="wa-bubble-sent max-w-[85%] bg-wa-sent px-3 py-2 text-[13px] leading-snug text-gamo-dark shadow-sm">
            Hey GAMO, j&apos;ai reçu une facture de l&apos;hôpital 😟
            <span className="ml-2 inline-flex items-center gap-0.5 text-[10px] text-gamo-muted/60 float-right mt-1">
              10:30
              <svg width="14" height="9" viewBox="0 0 16 11" fill="none">
                <path d="M11.071 0.653l-5.657 5.657-1.414-1.414L2.586 6.31l2.828 2.829 7.071-7.071-1.414-1.415z" fill="#53BDEB" />
                <path d="M14.071 0.653l-5.657 5.657-0.707-0.707-1.414 1.414 2.121 2.122 7.071-7.071-1.414-1.415z" fill="#53BDEB" />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="wa-bubble-received max-w-[85%] bg-white px-3 py-2 text-[13px] leading-snug text-gamo-dark shadow-sm">
            Ne t&apos;inquiète pas. Les hôpitaux ont des programmes d&apos;aide. Ne paie rien — je t&apos;aide. 💚
            <span className="ml-2 text-[10px] text-gamo-muted/60 float-right mt-1">10:31</span>
          </div>
        </div>
      </>
    ),
  },
  {
    headline: "inakusaidia.",
    lang: "sw",
    bgImage: "/assets/hero-woman-hijab-phone.png",
    bgImagePortrait: "/assets/hero-woman-hijab-phone-portrait.png",
    bgPosition: "object-center",
    chat: (
      <>
        <div className="flex justify-end">
          <div className="wa-bubble-sent max-w-[85%] bg-wa-sent px-3 py-2 text-[13px] leading-snug text-gamo-dark shadow-sm">
            Hey GAMO, bwana nyumba anaweza kupandisha kodi bila notisi?
            <span className="ml-2 inline-flex items-center gap-0.5 text-[10px] text-gamo-muted/60 float-right mt-1">
              16:05
              <svg width="14" height="9" viewBox="0 0 16 11" fill="none">
                <path d="M11.071 0.653l-5.657 5.657-1.414-1.414L2.586 6.31l2.828 2.829 7.071-7.071-1.414-1.415z" fill="#53BDEB" />
                <path d="M14.071 0.653l-5.657 5.657-0.707-0.707-1.414 1.414 2.121 2.122 7.071-7.071-1.414-1.415z" fill="#53BDEB" />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="wa-bubble-received max-w-[85%] bg-white px-3 py-2 text-[13px] leading-snug text-gamo-dark shadow-sm">
            Hapana, lazima akupe notisi ya siku 30-60. Unataka nikuandalie jibu? 🛡️
            <span className="ml-2 text-[10px] text-gamo-muted/60 float-right mt-1">16:06</span>
          </div>
        </div>
      </>
    ),
  },
  {
    headline: "helps you.",
    lang: "en",
    bgImage: "/assets/hero-woman-kitchen-bill.png",
    bgImagePortrait: "/assets/hero-woman-kitchen-bill-portrait.png",
    bgPosition: "object-center",
    chat: (
      <>
        <div className="flex justify-end">
          <div className="wa-bubble-sent max-w-[85%] bg-wa-sent px-3 py-2 text-[13px] leading-snug text-gamo-dark shadow-sm">
            Hey GAMO, how do I pronounce &apos;appointment&apos;?
            <span className="ml-2 inline-flex items-center gap-0.5 text-[10px] text-gamo-muted/60 float-right mt-1">
              11:20
              <svg width="14" height="9" viewBox="0 0 16 11" fill="none">
                <path d="M11.071 0.653l-5.657 5.657-1.414-1.414L2.586 6.31l2.828 2.829 7.071-7.071-1.414-1.415z" fill="#53BDEB" />
                <path d="M14.071 0.653l-5.657 5.657-0.707-0.707-1.414 1.414 2.121 2.122 7.071-7.071-1.414-1.415z" fill="#53BDEB" />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="wa-bubble-received max-w-[85%] bg-white px-3 py-2 text-[13px] leading-snug text-gamo-dark shadow-sm">
            It&apos;s pronounced: uh-POINT-ment. Try it slowly: uh... POINT... ment 📖
            <span className="ml-2 text-[10px] text-gamo-muted/60 float-right mt-1">11:21</span>
          </div>
        </div>
      </>
    ),
  },
];

const floatingBubbles = [
  { text: "Hey GAMO, help me", x: "8%", y: "15%", delay: 0, size: "sm" },
  { text: "¿me puedes ayudar?", x: "85%", y: "25%", delay: 1.2, size: "md" },
  { text: "como faço?", x: "12%", y: "65%", delay: 2.4, size: "xs" },
  { text: "msaada tafadhali", x: "78%", y: "70%", delay: 0.8, size: "sm" },
  { text: "Hey GAMO, what does this mean?", x: "15%", y: "42%", delay: 1.8, size: "lg" },
  { text: "no entiendo", x: "82%", y: "50%", delay: 0.4, size: "xs" },
  { text: "Hey GAMO, nisaidie", x: "20%", y: "80%", delay: 2.0, size: "md" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const { open } = useBeta();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-gamo-dark">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Portrait image for mobile */}
            <Image
              src={heroSlides[index].bgImagePortrait}
              alt="Person using GAMO"
              fill
              className={`object-cover object-top md:hidden`}
              priority={index === 0}
              sizes="100vw"
              quality={90}
            />
            {/* Landscape image for desktop */}
            <Image
              src={heroSlides[index].bgImage}
              alt="Person using GAMO"
              fill
              className={`hidden object-cover ${heroSlides[index].bgPosition} md:block`}
              priority={index === 0}
              sizes="100vw"
              quality={95}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
      </div>

      <div className="absolute inset-0 hidden overflow-hidden lg:block">
        {floatingBubbles.map((bubble, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0.25, 0.4, 0.25], y: [0, -15, 0] }}
            transition={{ duration: 8, delay: bubble.delay, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute ${
              bubble.size === "xs" ? "text-[10px] px-2 py-1"
              : bubble.size === "sm" ? "text-xs px-2.5 py-1.5"
              : bubble.size === "md" ? "text-sm px-3 py-2"
              : "text-base px-4 py-2.5"
            } rounded-lg bg-white/15 backdrop-blur-md text-white/70`}
            style={{ left: bubble.x, top: bubble.y }}
          >
            {bubble.text}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-24 pt-24">
        <div className="mt-12 lg:max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.914l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.801-6.24-2.144l-.436-.35-3.04 1.018 1.018-3.04-.35-.436A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Works on WhatsApp
          </div>

          <div className="relative mb-8 h-[85px] sm:h-[85px] lg:h-[100px]">
            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
              >
                <span className="text-gamo-accent">GAMO </span>
                {heroSlides[index].headline}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="mb-6 flex gap-1.5">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-gamo-accent" : "w-4 bg-white/30"
                }`}
                aria-label={`Show slide ${i + 1}`}
              />
            ))}
          </div>

          <p className="mb-3 max-w-md text-lg leading-relaxed text-white/85 sm:text-xl">
            Starting over in a new country? GAMO explains anything in your language. On WhatsApp.
          </p>
          <p className="mb-10 text-sm text-white/60">
            No app. Nothing complicated. Just chat.
          </p>

          <button
            onClick={open}
            className="group inline-flex items-center gap-3 rounded-full bg-gamo-accent px-8 py-4 text-lg font-bold text-white shadow-lg shadow-gamo-accent/30 transition-all hover:bg-gamo-green hover:shadow-xl active:scale-95"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="transition-transform group-hover:scale-110">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.914l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.801-6.24-2.144l-.436-.35-3.04 1.018 1.018-3.04-.35-.436A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Ask GAMO — it&apos;s free
          </button>
        </div>

      </div>
    </section>
  );
}
