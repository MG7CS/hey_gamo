export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+14155238886";

export const WHATSAPP_SANDBOX_LINK = "https://wa.me/14155238886?text=join+cow-wear";

export const PREFILLED_MESSAGES: Record<string, string> = {
  spanish: "Hey GAMO, quiero empezar",
  portuguese: "Hey GAMO, quero começar",
  kinyarwanda: "Hey GAMO, ndashaka gutangira",
  english: "Hey GAMO, I want to get started",
};

export function getWhatsAppLink(language: string): string {
  const message = PREFILLED_MESSAGES[language] || PREFILLED_MESSAGES.english;
  const encoded = encodeURIComponent(message);
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encoded}`;
}

export const LANGUAGES = [
  { value: "spanish", label: "Español (Spanish)" },
  { value: "portuguese", label: "Português (Portuguese)" },
  { value: "kinyarwanda", label: "Ikinyarwanda (Kinyarwanda)" },
  { value: "english", label: "English" },
  { value: "other", label: "Other" },
];

export const HELP_TOPICS = [
  { value: "bills", label: "Bills & documents" },
  { value: "healthcare", label: "Healthcare questions" },
  { value: "government", label: "Government services" },
  { value: "english", label: "Learning English" },
];
