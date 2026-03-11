"use client";

import { createContext, useContext, useState } from "react";

interface CheckoutContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CheckoutContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return useContext(CheckoutContext);
}
