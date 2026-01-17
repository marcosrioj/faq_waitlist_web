import Image from "next/image";
import type { Dictionary } from "@/i18n/types";

import integrationsLine from "/public/images/saas/integrations/integrations-line.png";

import google from "/public/images/saas/integrations/google.png";
import evernote from "/public/images/saas/integrations/evernote.png";
import asana from "/public/images/saas/integrations/asana.png";
import drive from "/public/images/saas/integrations/drive.png";
import mailchimp from "/public/images/saas/integrations/mailchimp.png";
import dropbox from "/public/images/saas/integrations/dropbox.png";
import startpLogo from "/public/images/saas/integrations/startp-logo.png";
import slack from "/public/images/saas/integrations/slack.png";
import stripe from "/public/images/saas/integrations/stripe.png";
import salesforce from "/public/images/saas/integrations/salesforce.png";
import airtable from "/public/images/saas/integrations/airtable.png";
import shopify from "/public/images/saas/integrations/shopify.png";
import hubspot from "/public/images/saas/integrations/hubspot.png";

type IntegrationsProps = {
  dictionary: Dictionary;
};

const Integrations = ({ dictionary }: IntegrationsProps) => {
  const { integrations } = dictionary;

  return (
    <div id="integrations" className="saas-integrations-area pb-100">
      <div className="container mw-1320">
        <div className="saas-section-title text-center mx-auto">
          <h2>
            {integrations.title} <span>{integrations.titleAccent}</span>
          </h2>
          <p>{integrations.subtitle}</p>
        </div>

        <div className="saas-integrations">
          <Image
            src={integrationsLine}
            alt="integrations-line"
            className="integrations-line"
            width={1322}
            height={320}
          />

          <h3 className="title">{integrations.label}</h3>
          <ul>
            <li>
              <Image src={google} alt="Google" width={60} height={60} />
            </li>
            <li>
              <Image src={evernote} alt="Evernote" width={80} height={80} />
            </li>
            <li>
              <Image src={asana} alt="Asana" width={100} height={100} />
            </li>
            <li>
              <Image src={drive} alt="Drive" width={60} height={60} />
            </li>
            <li>
              <Image src={mailchimp} alt="Mailchimp" width={80} height={80} />
            </li>
            <li>
              <Image src={dropbox} alt="Dropbox" width={100} height={100} />
            </li>
            <li>
              <Image src={startpLogo} alt="Logo" width={150} height={150} />
            </li>
            <li>
              <Image src={slack} alt="Slack" width={100} height={100} />
            </li>
            <li>
              <Image src={stripe} alt="Stripe" width={80} height={80} />
            </li>
            <li>
              <Image src={salesforce} alt="Salesforce" width={60} height={60} />
            </li>
            <li>
              <Image src={airtable} alt="Airtable" width={100} height={100} />
            </li>
            <li>
              <Image src={hubspot} alt="HubSpot" width={100} height={100} />
            </li>
            <li>
              <Image src={shopify} alt="Shopify" width={60} height={60} />
            </li>
          </ul>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-lg-8">
            <ul className="list-unstyled text-center">
              {integrations.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
