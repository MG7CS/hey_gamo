"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-gamo-dark">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo + tagline */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gamo-accent">
                <span className="text-lg font-extrabold text-white">G</span>
              </div>
              <span className="text-xl font-bold text-white">GAMO</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              Your personal assistant on WhatsApp. We help people navigating
              life in a new country — in their language.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Product
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="https://wa.me/14155238886?text=join+cow-wear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gamo-accent"
                >
                  Try GAMO Free
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/14155238886?text=join+cow-wear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gamo-accent"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <span className="text-gray-500">
                  Available in Spanish, Portuguese, Kinyarwanda & more
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="mailto:hello@heygamo.com"
                  className="transition-colors hover:text-gamo-accent"
                >
                  hello@heygamo.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/14155238886"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gamo-accent"
                >
                  +1 (650) 374-4396
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="transition-colors hover:text-gamo-accent">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-gamo-accent">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} GAMO. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Made with 💚 for people navigating life in a new country
          </p>
        </div>
      </div>
    </footer>
  );
}
