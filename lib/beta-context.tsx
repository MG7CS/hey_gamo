"use client";

import { createContext, useContext, useState } from "react";

interface BetaContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const BetaContext = createContext<BetaContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function BetaProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <BetaContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </BetaContext.Provider>
  );
}

export function useBeta() {
  return useContext(BetaContext);
}
