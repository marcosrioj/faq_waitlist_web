"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import useWaitlistAttention from "@/hooks/useWaitlistAttention";
import { submitLeadToGoogleForms } from "@/lib/google-forms";
import { getCookie } from "@/lib/client-cookies";
import { UTM_FIELDS, type UtmValues } from "@/lib/utm";

import man3 from "/public/images/saas/man3.png";

type SubscribeFormProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const SubscribeForm = ({ locale, dictionary }: SubscribeFormProps) => {
  const { subscribe } = dictionary;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const attentionRef = useWaitlistAttention<HTMLButtonElement>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");

    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    try {
      const utmValues: UtmValues = {};
      for (const field of UTM_FIELDS) {
        const value = getCookie(field);
        if (value) {
          utmValues[field] = value;
        }
      }

      const submitted = await submitLeadToGoogleForms({
        email,
        locale,
        utm: utmValues
      });

      if (!submitted) {
        throw new Error("Lead submission failed");
      }

      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div id="waitlist" className="saas-subscribe-area">
      <div className="container mw-1320">
        <div className="saas-subscribe-content fintech-gradient-bg">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="subscribe-title">
                <h2>
                  <span>{subscribe.title}</span> {subscribe.titleAccent}
                </h2>
                <p>{subscribe.subtitle}</p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="saas-subscribe-form">
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder={subscribe.placeholder}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />

                  <button
                    ref={attentionRef}
                    type="submit"
                    className="saas-green-btn"
                    data-waitlist-cta="true"
                  >
                    {subscribe.button}
                  </button>
                </form>

                {status === "success" ? (
                  <p className="status-message text-white">{subscribe.success}</p>
                ) : null}
                {status === "error" ? (
                  <p className="status-message text-white">{subscribe.error}</p>
                ) : null}
              </div>
            </div>
          </div>

          <Image src={man3} alt="man" className="saas-man3" width={292} height={270} />
        </div>
      </div>
    </div>
  );
};

export default SubscribeForm;
