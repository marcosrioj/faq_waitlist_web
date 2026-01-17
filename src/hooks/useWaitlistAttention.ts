import { useEffect, useRef } from "react";

const ANIMATION_CLASS = "waitlist-cta-animate";

export default function useWaitlistAttention<T extends HTMLElement>(active = true) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!active || !node) {
      if (node) {
        node.classList.remove(ANIMATION_CLASS);
      }
      return undefined;
    }

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add(ANIMATION_CLASS);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          node.classList.add(ANIMATION_CLASS);
        } else {
          node.classList.remove(ANIMATION_CLASS);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      node.classList.remove(ANIMATION_CLASS);
    };
  }, [active]);

  return ref;
}
