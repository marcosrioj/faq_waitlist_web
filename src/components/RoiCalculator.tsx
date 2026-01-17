"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/types";

import man3 from "/public/images/saas/man3.png";

type RoiCalculatorProps = {
  dictionary: Dictionary;
  locale: string;
};

export default function RoiCalculator({ dictionary, locale }: RoiCalculatorProps) {
  const localeKey = locale.toLowerCase();
  const hourlyCostDefaults: Record<string, number> = {
    en: 25,
    "pt-br": 35,
    es: 22,
    fr: 25,
    de: 30,
    ru: 600,
    "zh-cn": 60,
    ar: 50,
    ja: 1800
  };

  const [visitors, setVisitors] = useState(25000);
  const [questionRate, setQuestionRate] = useState(5);
  const [responseTime, setResponseTime] = useState(6);
  const [hourlyCost, setHourlyCost] = useState(
    () => hourlyCostDefaults[localeKey] ?? 25
  );
  const [deflectionRate, setDeflectionRate] = useState(30);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const results = useMemo(() => {
    const questions = Math.max(visitors, 0) * (Math.max(questionRate, 0) / 100);
    const hoursSpent = (questions * Math.max(responseTime, 0)) / 60;
    const hoursSaved = hoursSpent * (Math.max(deflectionRate, 0) / 100);
    const savings = hoursSaved * Math.max(hourlyCost, 0);
    return { hoursSaved, savings };
  }, [visitors, questionRate, responseTime, hourlyCost, deflectionRate]);

  const currencyByLocale: Record<string, string> = {
    en: "USD",
    "pt-br": "BRL",
    es: "EUR",
    fr: "EUR",
    de: "EUR",
    ru: "RUB",
    "zh-cn": "CNY",
    ar: "SAR",
    ja: "JPY"
  };

  const currency = currencyByLocale[localeKey] ?? "USD";

  const visitorsFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        maximumFractionDigits: 0,
        numberingSystem: "latn"
      }),
    [locale]
  );

  const formatVisitors = (value: number) => visitorsFormatter.format(value);

  const parseVisitors = (value: string) => {
    const digits = value.replace(/[^\d]/g, "");
    return digits ? Number(digits) : 0;
  };

  const hoursFormatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1
  });

  const moneyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  });

  const idPrefix = `roi-${locale}`;
  const descriptionParagraphs = dictionary.roi.calculator.description
    .split(/\n\s*\n/)
    .filter(Boolean);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return undefined;
    }

    const startAnimation = () => {
      const startValue = 10000;
      const endValue = 25000;
      const finalValue = 25000;
      const durationMs = 5000;
      const startTime = performance.now();

      setVisitors(startValue);

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / durationMs, 1);
        const currentValue = Math.round(
          startValue + (endValue - startValue) * progress
        );
        setVisitors(currentValue);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          rafRef.current = null;
          setVisitors(finalValue);
        }
      };

      rafRef.current = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (hasAnimatedRef.current) {
          return;
        }

        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          hasAnimatedRef.current = true;
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="saas-subscribe-content fintech-gradient-bg roi-calculator-card"
    >
      <div className="row align-items-center">
        <div className="col-lg-5">
          <div className="subscribe-title">
            <h2>
              <span>{dictionary.roi.calculator.title}</span>
            </h2>
          </div>

          <div className="roi-description">
            {descriptionParagraphs.map((paragraph, index) => (
              <p key={`${idPrefix}-desc-${index}`}>{paragraph}</p>
            ))}
          </div>

          <div className="row roi-results">
            <div className="col-sm-6">
              <div className="roi-result-card">
                <p>{dictionary.roi.calculator.outputs.hoursSaved}</p>
                <h3>{hoursFormatter.format(results.hoursSaved)}</h3>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="roi-result-card">
                <p>{dictionary.roi.calculator.outputs.savings}</p>
                <h3>{moneyFormatter.format(results.savings)}</h3>
              </div>
            </div>
          </div>

          <p className="roi-disclaimer">{dictionary.roi.calculator.disclaimer}</p>
        </div>

        <div className="col-lg-7">
          <div className="saas-subscribe-form roi-calculator-form">
            <div className="roi-calculator-hint">
              <span className="roi-hint-icon" aria-hidden="true" />
              <span>{dictionary.roi.calculator.prompt}</span>
            </div>
            <form onSubmit={(event) => event.preventDefault()}>
              <div className="row">
                <div className="col-md-6">
                  <label className="roi-input-label" htmlFor={`${idPrefix}-visitors`}>
                    <span>{dictionary.roi.calculator.inputs.visitors}</span>
                    <input
                      id={`${idPrefix}-visitors`}
                      type="text"
                      inputMode="numeric"
                      value={formatVisitors(visitors)}
                      onChange={(event) =>
                        setVisitors(parseVisitors(event.target.value))
                      }
                      className="form-control"
                    />
                  </label>
                </div>
                <div className="col-md-6">
                  <label
                    className="roi-input-label"
                    htmlFor={`${idPrefix}-question-rate`}
                  >
                    <span>{dictionary.roi.calculator.inputs.questionRate}</span>
                    <input
                      id={`${idPrefix}-question-rate`}
                      type="number"
                      min={0}
                      max={100}
                      value={questionRate}
                      onChange={(event) => setQuestionRate(Number(event.target.value))}
                      className="form-control"
                    />
                  </label>
                </div>
                <div className="col-md-6">
                  <label
                    className="roi-input-label"
                    htmlFor={`${idPrefix}-response-time`}
                  >
                    <span>{dictionary.roi.calculator.inputs.responseTime}</span>
                    <input
                      id={`${idPrefix}-response-time`}
                      type="number"
                      min={0}
                      value={responseTime}
                      onChange={(event) => setResponseTime(Number(event.target.value))}
                      className="form-control"
                    />
                  </label>
                </div>
                <div className="col-md-6">
                  <label
                    className="roi-input-label"
                    htmlFor={`${idPrefix}-hourly-cost`}
                  >
                    <span>{dictionary.roi.calculator.inputs.hourlyCost}</span>
                    <input
                      id={`${idPrefix}-hourly-cost`}
                      type="number"
                      min={0}
                      value={hourlyCost}
                      onChange={(event) => setHourlyCost(Number(event.target.value))}
                      className="form-control"
                    />
                  </label>
                </div>
                <div className="col-md-12">
                  <label
                    className="roi-input-label"
                    htmlFor={`${idPrefix}-deflection-rate`}
                  >
                    <span>{dictionary.roi.calculator.inputs.deflectionRate}</span>
                    <input
                      id={`${idPrefix}-deflection-rate`}
                      type="number"
                      min={0}
                      max={100}
                      value={deflectionRate}
                      onChange={(event) => setDeflectionRate(Number(event.target.value))}
                      className="form-control"
                    />
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Image
        src={man3}
        alt=""
        className="saas-man3"
        width={292}
        height={270}
      />
    </div>
  );
}
