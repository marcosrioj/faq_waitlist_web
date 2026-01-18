import Image from "next/image";
import Link from "next/link";
import { defaultLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import OpenModalButton from "@/components/OpenModalButton";

import logo from "/public/images/saas/white-bold-logo.png";
import footerBg from "/public/images/fintech/footer-bg.jpg";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const Footer = ({ locale, dictionary }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const homeHref = locale === defaultLocale ? "/" : `/${locale}`;
  const quickLinks = [
    { name: dictionary.nav.roi, href: "#roi" },
    { name: dictionary.nav.problem, href: "#problem" },
    { name: dictionary.nav.how, href: "#how" },
    { name: dictionary.nav.benefits, href: "#benefits" },
    { name: dictionary.nav.integrations, href: "#integrations" },
    { name: dictionary.nav.faq, href: "#faq" }
  ];

  return (
    <footer
      className="footer-area saas-footer-area fintech-footer-area"
      style={{ backgroundImage: `url(${footerBg.src})` }}
    >
      <div className="container mw-1320">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="single-footer-widget">
              <div className="logo">
                <Link href={homeHref}>
                  <Image src={logo} alt="logo" width={110} height={36} />
                </Link>
              </div>

              <p>{dictionary.footer.tagline}</p>
              <p>{dictionary.hero.note}</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="single-footer-widget ps-5">
              <h3>{dictionary.nav.menu}</h3>
              <ul className="list">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-6">
            <div className="single-footer-widget">
              <h3>{dictionary.hero.primaryCta}</h3>
              <ul className="list">
                {dictionary.hero.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="single-footer-widget">
              <h3>{dictionary.modal.title}</h3>
              <p>{dictionary.form.helper}</p>
              <OpenModalButton className="fintech-green-btn">
                {dictionary.hero.primaryCta}
              </OpenModalButton>
            </div>
          </div>

          <div className="col-lg-12 col-md-12">
            <div className="copyright-area">
              <p>
                &copy; {currentYear} FAQ.com.br. {dictionary.footer.rights}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
