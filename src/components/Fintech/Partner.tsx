import Image from "next/image";
import type { Dictionary } from "@/i18n/types";

import partnerImg1 from "/public/images/fintech/partner1.png";
import partnerImg2 from "/public/images/fintech/partner2.png";
import partnerImg3 from "/public/images/fintech/partner3.png";
import partnerImg4 from "/public/images/fintech/partner4.png";
import partnerImg5 from "/public/images/fintech/partner5.png";
import partnerImg6 from "/public/images/fintech/partner6.png";

const logos = [
  { src: partnerImg1, alt: "Partner 1", width: 152, height: 40 },
  { src: partnerImg2, alt: "Partner 2", width: 137, height: 40 },
  { src: partnerImg3, alt: "Partner 3", width: 146, height: 40 },
  { src: partnerImg4, alt: "Partner 4", width: 154, height: 40 },
  { src: partnerImg5, alt: "Partner 5", width: 194, height: 40 },
  { src: partnerImg6, alt: "Partner 6", width: 116, height: 40 },
  { src: partnerImg2, alt: "Partner 2", width: 127, height: 40 },
  { src: partnerImg3, alt: "Partner 3", width: 146, height: 40 }
];

const Partner = ({ dictionary }: { dictionary: Dictionary }) => {
  const looped = [...logos, ...logos];
  return (
    <div className="fintech-partner ptb-100">
      <div className="container mw-1600">
        <h5 className="title">{dictionary.partner.title}</h5>
        <div className="fintech-partner-slider">
          <div className="partner-track">
            {looped.map((logo, index) => {
              const isDuplicate = index >= logos.length;
              return (
                <div
                  key={`${logo.alt}-${index}`}
                  className="item"
                  aria-hidden={isDuplicate}
                >
                  <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
