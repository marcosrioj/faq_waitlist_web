"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { setCookie } from "@/lib/client-cookies";
import { UTM_FIELDS } from "@/lib/utm";

export default function UtmCapture() {
  const params = useSearchParams();

  useEffect(() => {
    if (!params) {
      return;
    }
    for (const field of UTM_FIELDS) {
      const value = params.get(field);
      if (value) {
        setCookie(field, value);
      }
    }
  }, [params]);

  return null;
}
