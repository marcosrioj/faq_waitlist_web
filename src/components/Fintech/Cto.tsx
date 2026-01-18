import Image from "next/image";
import type { Dictionary } from "@/i18n/types";
import OpenModalButton from "@/components/OpenModalButton";

import app2 from "/public/images/fintech/app2.png";

type CtoProps = {
  dictionary: Dictionary;
};

const Cto = ({ dictionary }: CtoProps) => {
  const { finalCta } = dictionary;

  return (
    <div className="fintech-cto-area">
      <div className="container mw-1320">
        <div className="fintech-cto-content">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="content">
                <h2>
                  {finalCta.title} <span>{finalCta.titleAccent}</span>
                </h2>
                <p>{finalCta.subtitle}</p>

                <OpenModalButton className="fintech-green-btn">
                  {finalCta.cta}
                </OpenModalButton>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="image">
                <Image src={app2} alt="app2" width={480} height={400} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cto;
