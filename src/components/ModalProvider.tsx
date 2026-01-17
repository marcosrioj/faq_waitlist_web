"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/types";
import { trackEvent } from "@/lib/track";
import LeadModal from "@/components/LeadModal";

type ModalContextValue = {
  openModal: (source?: string) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}

type ModalProviderProps = {
  children: ReactNode;
  dictionary: Dictionary;
  locale: string;
};

export default function ModalProvider({ children, dictionary, locale }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(
    (source?: string) => {
      setIsOpen(true);
      trackEvent("modal_open", locale, { source });
    },
    [locale]
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(() => ({ openModal }), [openModal]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <LeadModal
        open={isOpen}
        onClose={closeModal}
        dictionary={dictionary}
        locale={locale}
      />
    </ModalContext.Provider>
  );
}
