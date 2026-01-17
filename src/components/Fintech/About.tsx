import Image from "next/image";
import type { Dictionary } from "@/i18n/types";

import icon1 from "/public/images/fintech/icon1.png";
import icon3 from "/public/images/fintech/icon3.png";
import icon4 from "/public/images/fintech/icon4.png";
import icon5 from "/public/images/fintech/icon5.png";

type AboutProps = {
  dictionary: Dictionary;
};

const About = ({ dictionary }: AboutProps) => {
  const { problemSolution } = dictionary;

  return (
    <div id="problem" className="fintech-about-area pb-70">
      <div className="container mw-1320 position-relative z-1">
        <div className="saas-section-title text-center mw-full">
          <span className="sub-title2 d-inline-flex align-items-center gap-2">
            <Image src={icon1} alt="icon1" width={14} height={16} />
            {problemSolution.title}
          </span>
          <h2>{problemSolution.subtitle}</h2>
        </div>

        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="fintech-our-mission">
              <h3>{problemSolution.painsTitle}</h3>
              <p>{problemSolution.painsBody}</p>
              <div className="text-center">
                <Image src={icon3} alt="mission icon" className="om-icon" width={70} height={130} />
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="fintech-our-vision">
              <div className="text-end ov-img">
                <Image src={icon4} alt="solution icon" width={150} height={92} />
              </div>
              <h3>{problemSolution.solutionsTitle}</h3>
              <p>{problemSolution.solutionsBody}</p>
            </div>
          </div>

          <div className="col-lg-12 col-xl-6">
            <div className="fintech-our-values">
              <h3>{problemSolution.valuesTitle}</h3>
              <div className="fintech-values-list">
                {problemSolution.values.map((item) => (
                  <div key={item.label} className="fintech-values-card">
                    <div className="flex-shrink-0">
                      <Image src={icon5} alt="signal" width={15} height={15} />
                    </div>
                    <p>
                      <span>{item.label}:</span> {item.description}
                    </p>
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

export default About;
