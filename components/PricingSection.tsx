"use client";

import { useBeta } from "@/lib/beta-context";
import Pricing from "@/components/Pricing";

export default function PricingSection() {
  const { open } = useBeta();
  return <Pricing onCtaClick={open} />;
}
