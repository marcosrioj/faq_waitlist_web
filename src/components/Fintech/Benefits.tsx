import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import OpenModalButton from "@/components/OpenModalButton";

import icon1 from "/public/images/fintech/icon1.png";
import benefits1 from "/public/images/fintech/benefits1.png";
import benefits2 from "/public/images/fintech/benefits2.png";
import benefits3 from "/public/images/fintech/benefits3.png";

type BenefitsProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const Benefits = ({ locale, dictionary }: BenefitsProps) => {
  const { influencers, hero } = dictionary;
  const cardItems = [
    { image: benefits1, title: influencers.card.items[0], body: influencers.bullets[0] },
    { image: benefits2, title: influencers.card.items[1], body: influencers.bullets[1] },
    { image: benefits3, title: influencers.card.items[2], body: influencers.bullets[2] }
  ];

  return (
    <div id="benefits" className="fintech-benefits-area ptb-100">
      <div className="container mw-1320">
        <div className="saas-section-title mw-full">
          <span className="sub-title2 d-inline-flex align-items-center gap-2">
            <Image src={icon1} alt="icon1" width={14} height={16} />
            {influencers.title}
          </span>
          <h2>
            <span>{influencers.subtitle}</span> {influencers.subtitleAccent}
          </h2>
        </div>

        <div className="fintech-benefits-card">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="image">
                <Image
                  src={cardItems[0].image}
                  alt={cardItems[0].title}
                  width={530}
                  height={150}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="contant">
                <h3>{cardItems[0].title}</h3>
                <p>{cardItems[0].body}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {cardItems.slice(1).map((item) => (
            <div key={item.title} className="col-xl-6">
              <div className="fintech-benefits-card">
                <div className="row align-items-center">
                  <div className="col-md-5 col-lg-4 col-xl-5">
                    <div className="image">
                      <Image src={item.image} alt={item.title} width={252} height={150} />
                    </div>
                  </div>

                  <div className="col-md-7 col-lg-8 col-xl-7">
                    <div className="contant">
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted mt-4">{influencers.roadmap}</p>

        <div className="text-center mt-md-3">
          <OpenModalButton
            locale={locale}
            source="influencers-cta"
            trackCta
            className="fintech-default-btn"
          >
            {hero.primaryCta}
          </OpenModalButton>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
