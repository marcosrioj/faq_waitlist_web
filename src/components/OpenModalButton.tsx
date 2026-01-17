"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/track";
import { useModal } from "@/components/ModalProvider";
import useWaitlistAttention from "@/hooks/useWaitlistAttention";

type OpenModalButtonProps = {
  locale: string;
  source?: string;
  trackCta?: boolean;
  className?: string;
  children: ReactNode;
};

export default function OpenModalButton({
  locale,
  source,
  trackCta = false,
  className,
  children
}: OpenModalButtonProps) {
  const { openModal } = useModal();
  const attentionRef = useWaitlistAttention<HTMLButtonElement>();

  const handleClick = () => {
    if (trackCta) {
      trackEvent("cta_click", locale, { location: source });
    }
    openModal(source);
  };

  return (
    <button
      ref={attentionRef}
      type="button"
      className={className}
      onClick={handleClick}
      data-waitlist-cta="true"
    >
      {children}
    </button>
  );
}
