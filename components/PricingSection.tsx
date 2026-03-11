"use client";

import { useCheckout } from "@/lib/checkout-context";
import Pricing from "@/components/Pricing";

export default function PricingSection() {
  const { open } = useCheckout();
  return <Pricing onCtaClick={open} />;
}
