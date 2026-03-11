"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const stripeAppearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#25D366",
    colorBackground: "#ffffff",
    colorText: "#1a1a1a",
    colorDanger: "#e53e3e",
    fontFamily: "Nunito, system-ui, sans-serif",
    borderRadius: "10px",
    spacingUnit: "5px",
  },
  rules: {
    ".Label": { fontWeight: "700", color: "#1a1a1a", marginBottom: "6px" },
    ".Input": { border: "1.5px solid #e2e8f0", boxShadow: "none" },
    ".Input:focus": {
      border: "1.5px solid #25D366",
      boxShadow: "0 0 0 3px rgba(37,211,102,0.15)",
    },
  },
};

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

// ── Inner payment form (must be inside Elements) ───────────────────────────────
function PaymentForm({ onClose }: { onClose?: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [elementsReady, setElementsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const result = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/welcome`,
      },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message ?? "Payment failed. Please try again.");
      setLoading(false);
    } else {
      onClose?.();
      router.push("/welcome");
    }
  };

  return (
    <div className="p-6 sm:p-8">
      {/* Trust banner */}
      <div className="mb-5 flex items-center justify-center gap-2 rounded-xl bg-gamo-accent/10 px-4 py-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" className="flex-shrink-0">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
        <p className="text-sm font-semibold text-gamo-green">
          No charge today — your card won&apos;t be billed until your 14-day trial ends
        </p>
      </div>

      {/* Header */}
      <div className="mb-5 text-center">
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gamo-accent shadow-md shadow-gamo-accent/30">
          <span className="text-xl font-extrabold text-white">G</span>
        </div>
        <h2 className="text-2xl font-extrabold text-gamo-dark">
          Start your free trial
        </h2>
        <p className="mt-1.5 text-sm text-gamo-muted">
          <span className="font-bold text-gamo-green">14 days free</span>
          {" · then $9.99/month · cancel anytime"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Skeleton while Stripe fields initialise */}
        {!elementsReady && (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-11 rounded-lg bg-gray-100" />
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-11 rounded-lg bg-gray-100" />
          </div>
        )}

        <div className={elementsReady ? "block" : "hidden"}>
          <PaymentElement
            onReady={() => setElementsReady(true)}
            options={{ layout: { type: "accordion", defaultCollapsed: false } }}
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!elementsReady || loading || !stripe}
          className="w-full rounded-full bg-gamo-accent py-4 text-base font-bold text-white shadow-lg shadow-gamo-accent/25 transition-all hover:bg-gamo-green hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2"><Spinner />Starting your trial...</span>
          ) : !elementsReady ? (
            <span className="inline-flex items-center gap-2"><Spinner />Loading payment options...</span>
          ) : (
            "Start Free Trial →"
          )}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-gamo-muted">
        🔒 Bank-level encryption. Payments processed securely by Stripe — trusted by millions worldwide.
      </p>
    </div>
  );
}

// ── Loading / error shells ─────────────────────────────────────────────────────
function LoadingShell() {
  return (
    <div className="flex h-72 flex-col items-center justify-center gap-3">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-gamo-accent border-t-transparent" />
      <p className="text-sm text-gamo-muted">Loading secure checkout…</p>
    </div>
  );
}

function ErrorShell({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="p-8 text-center">
      <p className="text-sm font-semibold text-red-600">Could not load payment form.</p>
      <button
        onClick={onRetry}
        className="mt-3 rounded-full bg-gamo-accent px-6 py-2 text-sm font-bold text-white hover:bg-gamo-green"
      >
        Try again
      </button>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function CheckoutForm({ onClose }: { onClose?: () => void }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState(false);

  const fetchSecret = () => {
    setFetchError(false);
    setClientSecret(null);
    fetch("/api/create-subscription-intent", { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else setFetchError(true);
      })
      .catch(() => setFetchError(true));
  };

  useEffect(() => {
    fetchSecret();
  }, []);

  if (fetchError) return <ErrorShell onRetry={fetchSecret} />;
  if (!clientSecret) return <LoadingShell />;

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance: stripeAppearance }}
    >
      <PaymentForm onClose={onClose} />
    </Elements>
  );
}
