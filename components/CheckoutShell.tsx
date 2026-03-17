"use client";

import { CheckoutProvider } from "@/lib/checkout-context";
import { BetaProvider } from "@/lib/beta-context";
import BetaModal from "@/components/BetaModal";
// import CheckoutModal from "@/components/CheckoutModal"; // commented out during beta

export default function CheckoutShell({ children }: { children: React.ReactNode }) {
  return (
    <CheckoutProvider>
      <BetaProvider>
        {children}
        <BetaModal />
        {/* <CheckoutModal /> */}
      </BetaProvider>
    </CheckoutProvider>
  );
}
