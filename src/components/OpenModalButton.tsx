"use client";

import type { ReactNode } from "react";
import { useModal } from "@/components/ModalProvider";
import useWaitlistAttention from "@/hooks/useWaitlistAttention";

type OpenModalButtonProps = {
  className?: string;
  children: ReactNode;
};

export default function OpenModalButton({
  className,
  children
}: OpenModalButtonProps) {
  const { openModal } = useModal();
  const attentionRef = useWaitlistAttention<HTMLButtonElement>();

  const handleClick = () => {
    openModal();
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
