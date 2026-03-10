// TEMPORARILY DISABLED FOR STRIPE APPROVAL
// Uncomment the code at the bottom after Stripe approves the account

"use client";

import { useEffect } from "react";

export default function SubscribePage() {
  useEffect(() => {
    window.location.href = "https://wa.me/14155238886?text=join+cow-wear";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gamo-cream via-white to-gamo-cream">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-gamo-dark">
          Redirecting to WhatsApp...
        </h1>
        <p className="text-gamo-muted">
          If you&apos;re not redirected,{" "}
          <a
            href="https://wa.me/14155238886?text=join+cow-wear"
            className="text-gamo-accent underline"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
}

/* ORIGINAL STRIPE CHECKOUT CODE - UNCOMMENT AFTER APPROVAL

"use client";

import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function SubscribePage() {
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
    });
    const data = await res.json();
    return data.clientSecret;
  }, []);

  return (
    <>
      <style jsx global>{`
        .ProductSummary {
          display: none !important;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-gamo-cream via-white to-gamo-cream">
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gamo-accent">
                <span className="text-xl font-extrabold text-white">G</span>
              </div>
              <span className="text-xl font-bold text-gamo-dark">GAMO</span>
            </Link>
            <Link
              href="/"
              className="text-sm text-gamo-muted transition-colors hover:text-gamo-dark"
            >
              ← Back
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8 lg:py-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full bg-gamo-accent/10 px-4 py-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.914l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.801-6.24-2.144l-.436-.35-3.04 1.018 1.018-3.04-.35-.436A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                <span className="text-sm font-bold text-gamo-green">
                  Works on WhatsApp
                </span>
              </div>

              <h1 className="mb-4 text-3xl font-extrabold text-gamo-dark sm:text-4xl lg:text-5xl">
                14 days free, then $9.99/month
              </h1>

              <p className="mb-8 text-base text-gamo-muted sm:text-lg">
                Your personal assistant for navigating life in a new country.
              </p>

              <ul className="space-y-4">
                {[
                  {
                    title: "Unlimited questions — text, voice, or photos",
                    sub: "Ask anything, anytime, however you want",
                  },
                  {
                    title: "Help in any language",
                    sub: "Spanish, Portuguese, Kinyarwanda, and more",
                  },
                  {
                    title: "Bills, healthcare, government, and more",
                    sub: "We help with everything you need",
                  },
                  {
                    title: "Cancel anytime by messaging GAMO",
                    sub: "No hassle, no hidden fees",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="#25D366"
                      className="mt-0.5 flex-shrink-0"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-gamo-dark sm:text-base">
                        {item.title}
                      </p>
                      <p className="text-xs text-gamo-muted sm:text-sm">
                        {item.sub}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ fetchClientSecret }}
              >
                <EmbeddedCheckout className="rounded-xl" />
              </EmbeddedCheckoutProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

*/
