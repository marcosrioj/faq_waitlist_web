import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import RoiCalculator from "@/components/RoiCalculator";

import icon1 from "/public/images/fintech/icon1.png";
import featuredImg from "/public/images/fintech/featured-img.png";
import icon2 from "/public/images/fintech/icon2.png";

type FeaturesProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const Features = ({ locale, dictionary }: FeaturesProps) => {
  const { roi } = dictionary;

  return (
    <div id="roi" className="fintech-features-area pt-100 pb-70">
      <div className="container mw-1320">
        <div className="saas-section-title text-center mx-auto">
          <span className="sub-title2 d-inline-flex align-items-center gap-2">
            <Image src={icon1} alt="icon1" width={14} height={16} />
            {roi.kpiTitle}
          </span>
          <h2>
            {roi.title} <span>{roi.titleAccent}</span>
          </h2>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-4">
            <div className="featured-img text-center">
              <Image src={featuredImg} alt="featured" width={633} height={636} />
            </div>
          </div>

          <div className="col-lg-8">
            <div className="position-relative">
              <div className="row">
                {roi.kpis.map((kpi) => (
                  <div key={kpi.title} className="col-sm-12 col-lg-12 col-xl-6">
                    <div className="fintech-feature-card">
                      <h3>{kpi.title}</h3>
                      <p>{kpi.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="fintech-brand-icon d-none d-xxl-block">
                <Image src={icon2} alt="icon2" width={40} height={50} />
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-lg-12">
            <RoiCalculator dictionary={dictionary} locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
