import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import OpenModalButton from "@/components/OpenModalButton";
import TrackableLink from "@/components/TrackableLink";

import bannerBg from "/public/images/fintech/banner-bg.jpg";
import app from "/public/images/fintech/app.png";

type MainBannerProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const MainBanner = ({ locale, dictionary }: MainBannerProps) => {
  const { hero } = dictionary;

  return (
    <div
      className="fintech-main-banner"
      style={{ backgroundImage: `url(${bannerBg.src})` }}
    >
      <div className="container mw-1600">
        <div className="row align-items-center">
          <div className="col-lg-6 col-xl-7">
            <div className="hero-content">
              <h1 className="title">
                {hero.title} <span>{hero.titleAccent}</span>
              </h1>

              <p className="short-des">{hero.subtitle}</p>

              <div className="btn-box d-flex align-items-center gap-3">
                <OpenModalButton
                  locale={locale}
                  source="hero-primary"
                  trackCta
                  className="fintech-default-btn"
                >
                  {hero.primaryCta}
                </OpenModalButton>
                <TrackableLink
                  href="#roi"
                  locale={locale}
                  event="cta_click"
                  metadata={{ location: "hero-secondary" }}
                  className="fintech-outline-btn text-white"
                >
                  {hero.secondaryCta}
                </TrackableLink>
              </div>

              <div className="status-list">
                {hero.points.slice(0, 3).map((point) => (
                  <div key={point} className="list-card d-flex align-items-center gap-3">
                    <i className="bx bx-check"></i>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-5">
            <div className="fintech-app-img text-center">
              <Image src={app} alt="app" width={766} height={700} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
