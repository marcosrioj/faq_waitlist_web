import Image from "next/image";
import type { Dictionary } from "@/i18n/types";

import howItWorksBg from "/public/images/fintech/how-it-works-bg.jpg";
import howItWorks from "/public/images/fintech/how-it-works.png";
import icon1 from "/public/images/fintech/icon1.png";
import icon6 from "/public/images/fintech/icon6.png";

type HowItWorksProps = {
  dictionary: Dictionary;
};

const HowItWorks = ({ dictionary }: HowItWorksProps) => {
  const { howItWorks: how } = dictionary;

  return (
    <div
      id="how"
      className="fintech-how-it-works pt-100 pb-70"
      style={{ backgroundImage: `url(${howItWorksBg.src})` }}
    >
      <div className="container mw-1320">
        <div className="row align-items-center">
          <div className="col-lg-5 col-xl-5">
            <div className="fintech-how-it-works-img text-center">
              <Image src={howItWorks} alt="how-it-works" width={536} height={536} />
            </div>
          </div>

          <div className="col-lg-7 col-xl-7">
            <div className="fintech-how-it-works-content">
              <div className="saas-section-title mw-full">
                <span className="sub-title2 d-inline-flex align-items-center gap-2">
                  <Image src={icon1} alt="icon1" width={14} height={16} />
                  {how.label}
                </span>
                <h2>
                  {how.title} <span>{how.titleAccent}</span>
                </h2>
              </div>

              <div>
                {how.steps.map((step) => (
                  <div key={step.title} className="ft-how-it-works d-flex gap-3">
                    <div className="flex-shrink-0">
                      <Image src={icon6} alt="step" width={20} height={20} />
                    </div>
                    <div>
                      <h5>{step.title}</h5>
                      <ul>
                        {step.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
