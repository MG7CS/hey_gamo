"use client";

import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";

export default function SubscribePage() {
  return (
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

      <div className="mx-auto flex min-h-[calc(100vh-65px)] max-w-md items-center px-5 py-12">
        <div className="w-full rounded-2xl bg-white shadow-xl">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
