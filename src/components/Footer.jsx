"use client";

import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { useLang } from "./LangProvider";
import { SITE, UI } from "@/lib/content";

const LINKS = [
  { href: "/about", key: "nav_about" },
  { href: "/services", key: "nav_services" },
  { href: "/portfolio", key: "nav_portfolio" },
  { href: "/blog", key: "nav_blog" },
  { href: "/contact", key: "nav_contact" },
];

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="footer__brand">{t(SITE.name)}</div>
          <p className="footer__about">{t(UI.footer_about)}</p>
        </div>
        <div>
          <h4 className="footer__title">{t(UI.footer_links)}</h4>
          <ul className="footer__list">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{t(UI[l.key])}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="footer__title">{t(UI.footer_contact)}</h4>
          <a className="footer__mail" href={"mailto:" + SITE.email}>
            <Mail size={16} /> {SITE.email}
          </a>
          <Link href="/contact" className="footer__cta">
            {t(UI.hero_cta2)} <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      <div className="footer__bar">
        <div className="container">
          © {year} {t(SITE.name)} — {t(UI.rights)}.
        </div>
      </div>
    </footer>
  );
}
