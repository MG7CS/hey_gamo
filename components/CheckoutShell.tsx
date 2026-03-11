"use client";

import { CheckoutProvider } from "@/lib/checkout-context";
import CheckoutModal from "@/components/CheckoutModal";

export default function CheckoutShell({ children }: { children: React.ReactNode }) {
  return (
    <CheckoutProvider>
      {children}
      <CheckoutModal />
    </CheckoutProvider>
  );
}
