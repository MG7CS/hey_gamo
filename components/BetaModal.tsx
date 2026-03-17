"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBeta } from "@/lib/beta-context";
import { WHATSAPP_SANDBOX_LINK } from "@/lib/config";

type Step = "form" | "success";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

export default function BetaModal() {
  const { isOpen, close } = useBeta();
  const [step, setStep] = useState<Step>("form");

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function handleClose() {
    close();
    setTimeout(() => {
      setStep("form");
      setName("");
      setCity("");
      setState("");
      setCode("");
      setError("");
    }, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !city.trim() || !state || !code.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/beta-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), city: city.trim(), state, code: code.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setStep("success");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Beta access"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-gray-600 transition hover:bg-black/20"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <AnimatePresence mode="wait">
          {step === "form" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="p-7 pt-8"
            >
              {/* Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gamo-accent">
                  <span className="text-xl font-extrabold text-white">G</span>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-gamo-dark">Join the GAMO Beta</h2>
                  <p className="text-sm text-gamo-muted">Enter your access code to get started</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="beta-name" className="mb-1.5 block text-sm font-semibold text-gamo-dark">
                    Full name
                  </label>
                  <input
                    id="beta-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gamo-dark placeholder-gray-400 outline-none transition focus:border-gamo-accent focus:bg-white focus:ring-2 focus:ring-gamo-accent/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="beta-city" className="mb-1.5 block text-sm font-semibold text-gamo-dark">
                      City
                    </label>
                    <input
                      id="beta-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Your city"
                      autoComplete="address-level2"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gamo-dark placeholder-gray-400 outline-none transition focus:border-gamo-accent focus:bg-white focus:ring-2 focus:ring-gamo-accent/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="beta-state" className="mb-1.5 block text-sm font-semibold text-gamo-dark">
                      State
                    </label>
                    <select
                      id="beta-state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gamo-dark outline-none transition focus:border-gamo-accent focus:bg-white focus:ring-2 focus:ring-gamo-accent/20 appearance-none"
                    >
                      <option value="">State</option>
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="beta-code" className="mb-1.5 block text-sm font-semibold text-gamo-dark">
                    Access code
                  </label>
                  <input
                    id="beta-code"
                    type="text"
                    value={code}
                    onChange={(e) => { setCode(e.target.value); setError(""); }}
                    placeholder="Enter your access code"
                    autoComplete="off"
                    className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gamo-dark placeholder-gray-400 outline-none transition focus:bg-white focus:ring-2 ${
                      error
                        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                        : "border-gray-200 focus:border-gamo-accent focus:ring-gamo-accent/20"
                    }`}
                  />
                  {error && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full rounded-xl bg-gamo-accent py-3.5 text-sm font-bold text-white transition hover:bg-gamo-green active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying…" : "Access GAMO Beta"}
                </button>
              </form>

              <p className="mt-5 text-center text-xs text-gray-400">
                Don&apos;t have an access code?{" "}
                <a href="mailto:moise_gasana@brown.edu" className="font-semibold text-gamo-accent hover:underline">
                  Reach out to us
                </a>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-7 pt-10 pb-8 text-center"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gamo-accent/10">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-extrabold text-gamo-dark">
                You&apos;re in, {name.split(" ")[0]}!
              </h2>
              <p className="mb-3 text-sm text-gamo-muted leading-relaxed">
                Welcome to the GAMO beta! Tap below to open WhatsApp. Your first message will be pre-filled — just hit send to activate your access.
              </p>
              <div className="mb-8 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 text-center">
                <p className="text-xs text-gray-400 mb-1">Your activation message</p>
                <p className="font-mono text-sm font-bold text-gamo-dark">join cow-wear</p>
              </div>
              <a
                href={WHATSAPP_SANDBOX_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-gamo-accent px-8 py-4 text-base font-bold text-white shadow-lg shadow-gamo-accent/30 transition hover:bg-gamo-green hover:shadow-xl active:scale-95"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.914l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.801-6.24-2.144l-.436-.35-3.04 1.018 1.018-3.04-.35-.436A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Open WhatsApp
              </a>
              <p className="mt-6 text-xs text-gray-400">
                Questions? Email us at{" "}
                <a href="mailto:moise_gasana@brown.edu" className="font-semibold text-gamo-accent hover:underline">
                  moise_gasana@brown.edu
                </a>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
