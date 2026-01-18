"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { defaultLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import OpenModalButton from "@/components/OpenModalButton";

import logo from "/public/images/saas/white-bold-logo.png";

type NavbarProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export default function Navbar({ locale, dictionary }: NavbarProps) {
  const [menu, setMenu] = useState(true);
  const homeHref = locale === defaultLocale ? "/" : `/${locale}`;

  const toggleNavbar = () => {
    setMenu((prev) => !prev);
  };

  useEffect(() => {
    const elementId = document.getElementById("header");
    const handleScroll = () => {
      if (window.scrollY > 170) {
        elementId?.classList.add("is-sticky");
      } else {
        elementId?.classList.remove("is-sticky");
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const classOne = menu
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  const menuLinks = [
    { href: "#roi", label: dictionary.nav.roi },
    { href: "#problem", label: dictionary.nav.problem },
    { href: "#how", label: dictionary.nav.how },
    { href: "#benefits", label: dictionary.nav.benefits },
    { href: "#integrations", label: dictionary.nav.integrations },
    { href: "#faq", label: dictionary.nav.faq }
  ];

  return (
    <header id="header" className="headroom fintech-navbar">
      <div className="startp-nav">
        <div className="container mw-1600">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link href={homeHref} className="navbar-brand">
              <Image src={logo} alt="logo" width={110} height={36} />
            </Link>

            <button
              onClick={toggleNavbar}
              className={classTwo}
              type="button"
              aria-controls="navbarSupportedContent"
              aria-expanded={!menu}
              aria-label="Toggle navigation"
            >
              <span className="icon-bar top-bar"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
            </button>

            <div className={classOne} id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto d-lg-none">
                {menuLinks.map((item) => (
                  <li className="nav-item" key={item.href}>
                    <a href={item.href} onClick={toggleNavbar} className="nav-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="others-option d-flex align-items-center gap-3">
              <ul className="navbar-nav top-menu-links d-none d-lg-flex">
                {menuLinks.map((item) => (
                  <li className="nav-item" key={item.href}>
                    <a href={item.href} className="nav-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Suspense fallback={null}>
                <LanguageSwitcher locale={locale} />
              </Suspense>
              <OpenModalButton
                locale={locale}
                source="navbar-cta"
                trackCta
                className="fintech-default-btn"
              >
                {dictionary.hero.primaryCta}
              </OpenModalButton>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
