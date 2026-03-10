"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LANGUAGES, HELP_TOPICS, getWhatsAppLink } from "@/lib/config";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) return "Please enter at least 7 digits";
  if (digits.length > 15) return "Phone number is too long";
  if (/^0+$/.test(digits)) return "Please enter a valid phone number";
  return null;
}

export default function OnboardingModal({
  isOpen,
  onClose,
}: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [languages, setLanguages] = useState<string[]>([]);
  const [customLanguage, setCustomLanguage] = useState("");
  const [helpTopics, setHelpTopics] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setStep(0);
      setLanguages([]);
      setCustomLanguage("");
      setHelpTopics([]);
      setPhone("");
      setError("");
      setPhoneError("");
      setPhoneTouched(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  const toggleLanguage = (lang: string) => {
    if (languages.includes(lang)) {
      setLanguages(languages.filter((l) => l !== lang));
      if (lang === "other") setCustomLanguage("");
    } else {
      setLanguages([...languages, lang]);
    }
  };

  const toggleHelpTopic = (topic: string) => {
    if (helpTopics.includes(topic)) {
      setHelpTopics(helpTopics.filter((t) => t !== topic));
    } else {
      setHelpTopics([...helpTopics, topic]);
    }
  };

  const canAdvance = () => {
    if (step === 0) {
      if (languages.length === 0) return false;
      if (languages.includes("other")) return customLanguage.trim().length >= 2;
      return true;
    }
    if (step === 1) return helpTopics.length > 0;
    if (step === 2) return phone.length >= 7 && !validatePhone(phone);
    return false;
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "");
    setPhone(digits);
    if (phoneTouched) {
      setPhoneError(validatePhone(digits) || "");
    }
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    setPhoneError(validatePhone(phone) || "");
  };

  const handleSubmit = async () => {
    const phoneValidation = validatePhone(phone);
    if (phoneValidation) {
      setPhoneError(phoneValidation);
      setPhoneTouched(true);
      return;
    }

    setLoading(true);
    setError("");

    const effectiveLanguages = languages.includes("other")
      ? [...languages.filter((l) => l !== "other"), customLanguage.trim()]
      : languages;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: effectiveLanguages.join(", "),
          helpWith: helpTopics.join(", "),
          phone: `${countryCode}${phone}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const primaryLang = languages.includes("other")
        ? "english"
        : languages[0] || "english";
      const whatsappUrl = getWhatsAppLink(primaryLang);
      window.open(whatsappUrl, "_blank");
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (step < 2 && canAdvance()) setStep(step + 1);
    else if (step === 2) handleSubmit();
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const countryCodes = [
    { code: "+1", label: "🇺🇸 US +1" },
    { code: "+1", label: "🇨🇦 CA +1" },
    { code: "+55", label: "🇧🇷 BR +55" },
    { code: "+250", label: "🇷🇼 RW +250" },
    { code: "+52", label: "🇲🇽 MX +52" },
    { code: "+34", label: "🇪🇸 ES +34" },
    { code: "+351", label: "🇵🇹 PT +351" },
    { code: "+44", label: "🇬🇧 UK +44" },
    { code: "+33", label: "🇫🇷 FR +33" },
    { code: "+243", label: "🇨🇩 CD +243" },
    { code: "+254", label: "🇰🇪 KE +254" },
    { code: "+91", label: "🇮🇳 IN +91" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
              aria-label="Close"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            <div className="flex gap-1.5 px-6 pt-6 pr-16">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i <= step ? "bg-gamo-accent" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="mb-1 text-2xl font-extrabold text-gamo-dark">
                      What languages do you speak?
                    </h3>
                    <p className="mb-6 text-sm text-gamo-muted">
                      Select all that apply. We&apos;ll help you in any of them.
                    </p>

                    <div className="space-y-2">
                      {LANGUAGES.map((lang) => (
                        <div key={lang.value}>
                          <button
                            onClick={() => toggleLanguage(lang.value)}
                            className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all ${
                              languages.includes(lang.value)
                                ? "border-gamo-accent bg-gamo-accent/5"
                                : "border-gray-100 bg-gray-50 hover:border-gray-200"
                            }`}
                          >
                            <div
                              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all ${
                                languages.includes(lang.value)
                                  ? "border-gamo-accent bg-gamo-accent"
                                  : "border-gray-300"
                              }`}
                            >
                              {languages.includes(lang.value) && (
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 24 24"
                                  fill="white"
                                >
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                              )}
                            </div>
                            <span className="font-semibold text-gamo-dark">
                              {lang.label}
                            </span>
                          </button>

                          {lang.value === "other" &&
                            languages.includes("other") && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-2 ml-8"
                              >
                                <input
                                  type="text"
                                  value={customLanguage}
                                  onChange={(e) =>
                                    setCustomLanguage(e.target.value)
                                  }
                                  placeholder="Type your language (e.g. Haitian Creole, Amharic)"
                                  className="h-11 w-full rounded-lg border-2 border-gamo-accent/30 bg-gamo-accent/5 px-3 text-sm text-gamo-dark placeholder-gray-400 focus:border-gamo-accent focus:outline-none"
                                  autoFocus
                                />
                              </motion.div>
                            )}
                        </div>
                      ))}
                    </div>

                    {languages.length > 0 && (
                      <div className="mt-4 rounded-lg bg-gamo-accent/10 px-3 py-2 text-xs text-gamo-green">
                        ✓ {languages.length} language{languages.length > 1 ? "s" : ""} selected
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="mb-1 text-2xl font-extrabold text-gamo-dark">
                      What do you need help with?
                    </h3>
                    <p className="mb-6 text-sm text-gamo-muted">
                      Select all that apply.
                    </p>

                    <div className="space-y-2">
                      {HELP_TOPICS.map((topic) => (
                        <button
                          key={topic.value}
                          onClick={() => toggleHelpTopic(topic.value)}
                          className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all ${
                            helpTopics.includes(topic.value)
                              ? "border-gamo-accent bg-gamo-accent/5"
                              : "border-gray-100 bg-gray-50 hover:border-gray-200"
                          }`}
                        >
                          <div
                            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all ${
                              helpTopics.includes(topic.value)
                                ? "border-gamo-accent bg-gamo-accent"
                                : "border-gray-300"
                            }`}
                          >
                            {helpTopics.includes(topic.value) && (
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="white"
                              >
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                              </svg>
                            )}
                          </div>
                          <span className="font-semibold text-gamo-dark">
                            {topic.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    {helpTopics.length > 0 && (
                      <div className="mt-4 rounded-lg bg-gamo-accent/10 px-3 py-2 text-xs text-gamo-green">
                        ✓ {helpTopics.length} topic{helpTopics.length > 1 ? "s" : ""} selected
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="mb-1 text-2xl font-extrabold text-gamo-dark">
                      Your phone number
                    </h3>
                    <p className="mb-6 text-sm text-gamo-muted">
                      So we can connect your WhatsApp account and billing.
                    </p>

                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="h-12 rounded-xl border-2 border-gray-100 bg-gray-50 px-2 text-sm font-semibold text-gamo-dark focus:border-gamo-accent focus:outline-none"
                      >
                        {countryCodes.map((c, i) => (
                          <option key={`${c.code}-${i}`} value={c.code}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        onBlur={handlePhoneBlur}
                        placeholder="Phone number"
                        maxLength={15}
                        className={`h-12 flex-1 rounded-xl border-2 bg-gray-50 px-4 text-gamo-dark placeholder-gray-400 focus:outline-none ${
                          phoneError && phoneTouched
                            ? "border-red-300 focus:border-red-400"
                            : "border-gray-100 focus:border-gamo-accent"
                        }`}
                        autoFocus
                      />
                    </div>

                    {phoneError && phoneTouched && (
                      <p className="mt-2 text-sm text-red-500">{phoneError}</p>
                    )}

                    {error && (
                      <p className="mt-2 text-sm text-red-500">{error}</p>
                    )}

                    <p className="mt-3 text-xs text-gamo-muted">
                      Your card will be charged $9.99/month after the 2-week free trial.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 flex gap-3">
                {step > 0 && (
                  <button
                    onClick={back}
                    className="flex h-12 items-center justify-center rounded-full border-2 border-gray-200 px-6 font-semibold text-gamo-dark transition-colors hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={next}
                  disabled={!canAdvance() || loading}
                  className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full font-bold text-white transition-all ${
                    canAdvance() && !loading
                      ? "bg-gamo-accent shadow-lg shadow-gamo-accent/30 hover:bg-gamo-green active:scale-[0.98]"
                      : "cursor-not-allowed bg-gray-300"
                  }`}
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : step === 2 ? (
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      </svg>
                      Start on WhatsApp
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
