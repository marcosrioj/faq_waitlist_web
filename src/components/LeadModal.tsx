"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { defaultLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { budgetRangeOptions, type BudgetRangeOption } from "@/lib/options";
import { getCookie } from "@/lib/client-cookies";
import { submitLeadToGoogleForms } from "@/lib/google-forms";
import { UTM_FIELDS, type UtmValues } from "@/lib/utm";
import useWaitlistAttention from "@/hooks/useWaitlistAttention";

import featuredImg from "/public/images/fintech/featured-img.png";
type LeadModalProps = {
  open: boolean;
  onClose: () => void;
  dictionary: Dictionary;
  locale: string;
};

type LeadFormState = {
  email: string;
  name: string;
  budgetRange: BudgetRangeOption | "";
  company: string;
};

export default function LeadModal({
  open,
  onClose,
  dictionary,
  locale
}: LeadModalProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LeadFormState>({
    email: "",
    name: "",
    budgetRange: "",
    company: ""
  });
  const attentionRef = useWaitlistAttention<HTMLButtonElement>(open);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const labels = dictionary.form.labels;
  const placeholders = dictionary.form.placeholders;
  const options = dictionary.form.options;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const nextValue =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!formData.email) {
      setError(dictionary.modal.error);
      return;
    }

    setIsSubmitting(true);
    try {
      if (formData.company) {
        const thankYouPath =
          locale === defaultLocale ? "/thank-you" : `/${locale}/thank-you`;
        router.push(thankYouPath);
        return;
      }

      const utmValues: UtmValues = {};
      for (const field of UTM_FIELDS) {
        const value = getCookie(field);
        if (value) {
          utmValues[field] = value;
        }
      }

      const budgetLabel = formData.budgetRange
        ? options.budget[formData.budgetRange]
        : undefined;
      const submitted = await submitLeadToGoogleForms({
        email: formData.email,
        name: formData.name || undefined,
        budget: budgetLabel,
        locale,
        utm: utmValues
      });

      if (!submitted) {
        throw new Error("Submission failed");
      }

      const thankYouPath = locale === defaultLocale ? "/thank-you" : `/${locale}/thank-you`;
      router.push(thankYouPath);
    } catch {
      setError(dictionary.errors.generic);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="waitlist-modal-overlay"
      role="dialog"
      aria-modal="true"
    >
      <div className="waitlist-modal">
        <button
          type="button"
          className="waitlist-modal-close"
          onClick={onClose}
          aria-label={dictionary.modal.close}
        >
          {dictionary.modal.close}
        </button>

        <div className="newsletter-area waitlist-newsletter">
          <div className="container-fluid">
            <div className="row align-items-center g-0">
              <div className="col-lg-6 d-none d-lg-block">
                <div className="newsletter-image waitlist-modal-image">
                  <Image src={featuredImg} alt="" width={633} height={636} />
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="newsletter-content waitlist-modal-content">
                  <p className="waitlist-modal-kicker">{dictionary.modal.title}</p>
                  <h2>{dictionary.modal.subtitle}</h2>

                  <form className="waitlist-form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <label className="waitlist-label">
                          {labels.email}
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control waitlist-input"
                            placeholder={placeholders.email}
                            required
                          />
                        </label>
                      </div>

                      <div className="col-md-6">
                        <label className="waitlist-label">
                          {labels.name}{" "}
                          <span className="waitlist-optional">
                            ({dictionary.form.optional})
                          </span>
                          <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control waitlist-input"
                            placeholder={placeholders.name}
                          />
                        </label>
                      </div>

                      <div className="col-md-6">
                        <label className="waitlist-label">
                          {labels.budget}{" "}
                          <span className="waitlist-optional">
                            ({dictionary.form.optional})
                          </span>
                          <select
                            name="budgetRange"
                            value={formData.budgetRange}
                            onChange={handleChange}
                            className="form-control waitlist-input"
                          >
                            <option value="">{placeholders.budget}</option>
                            {budgetRangeOptions.map((option) => (
                              <option key={option} value={option}>
                                {options.budget[option]}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <div className="col-12 d-none">
                        <label className="waitlist-label">
                          <span className="sr-only">Company</span>
                          <input
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            className="form-control"
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </label>
                      </div>

                      <div className="col-12">
                        <p className="waitlist-helper">{dictionary.form.helper}</p>
                      </div>

                      {error ? (
                        <div className="col-12">
                          <p className="waitlist-error">{error}</p>
                        </div>
                      ) : null}

                      <div className="col-12">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="fintech-green-btn waitlist-submit"
                          ref={attentionRef}
                          data-waitlist-cta="true"
                        >
                          {isSubmitting ? dictionary.modal.processing : dictionary.modal.submit}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
