"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/i18n/types";

import icon1 from "/public/images/fintech/icon1.png";
import blogImg1 from "/public/images/fintech/blog1.jpg";
import blogImg2 from "/public/images/fintech/blog2.jpg";
import blogImg3 from "/public/images/fintech/blog3.jpg";

type LatestNewsProps = {
  dictionary: Dictionary;
};

const LatestNews = ({ dictionary }: LatestNewsProps) => {
  const items = dictionary.faq.items;
  const images = [blogImg1, blogImg2, blogImg3];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const modalTitleId = useId();
  const modalDescriptionId = `${modalTitleId}-desc`;
  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const fullAnswer = activeItem?.aFull ?? activeItem?.a ?? "";
  const answerParagraphs = fullAnswer.split(/\n\s*\n/).filter(Boolean);

  useEffect(() => {
    if (activeIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const closeModal = () => {
    setActiveIndex(null);
  };

  return (
    <div id="faq" className="fintech-blog-area pt-100 pb-70">
      <div className="container mw-1320">
        <div className="saas-section-title text-center mx-auto mw-780">
          <span className="sub-title2 d-inline-flex align-items-center gap-2">
            <Image src={icon1} alt="icon1" width={14} height={16} />
            {dictionary.faq.label}
          </span>

          <h2>{dictionary.faq.title}</h2>
        </div>

        <div className="row">
          {items.map((item, index) => (
            <div key={item.q} className="col-lg-4">
              <div className="fintech-blog-card">
                <div className="d-block">
                  <Image
                    src={images[index % images.length]}
                    alt="faq"
                    width={636}
                    height={450}
                    className="w-100"
                  />
                </div>

                <div className="contant">
                  <div className="blog-meta d-flex align-items-end gap-3">
                    <div className="date">
                      <span>{dictionary.faq.metaIndexPrefix}{index + 1}</span>
                      <p>{dictionary.faq.metaLabel}</p>
                    </div>
                    <p>{dictionary.faq.metaReadTime}</p>
                  </div>
                  <h3>{item.q}</h3>
                  <p className="faq-answer-preview">{item.a}</p>
                  <button
                    type="button"
                    className="fintech-outline-btn"
                    onClick={() => setActiveIndex(index)}
                  >
                    {dictionary.faq.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {activeItem && (
        <div
          className="faq-modal-overlay"
          role="presentation"
          onClick={closeModal}
        >
          <div
            className="faq-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            aria-describedby={modalDescriptionId}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="faq-modal-close"
              onClick={closeModal}
              aria-label={dictionary.modal.close}
            >
              {dictionary.modal.close}
            </button>
            <div className="faq-modal-content">
              <span className="faq-modal-kicker">{dictionary.faq.label}</span>
              <h3 id={modalTitleId}>{activeItem.q}</h3>
              {answerParagraphs.map((paragraph, index) => (
                <p
                  key={`${modalDescriptionId}-${index}`}
                  id={index === 0 ? modalDescriptionId : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestNews;
