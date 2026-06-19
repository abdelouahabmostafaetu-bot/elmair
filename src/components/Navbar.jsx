"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useLang } from "./LangProvider";
import { SITE, UI } from "@/lib/content";

const LINKS = [
  { href: "/", key: "nav_home" },
  { href: "/about", key: "nav_about" },
  { href: "/services", key: "nav_services" },
  { href: "/portfolio", key: "nav_portfolio" },
  { href: "/blog", key: "nav_blog" },
  { href: "/contact", key: "nav_contact" },
];

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={"nav " + (scrolled ? "nav--scrolled" : "")}>
      <div className="container nav__inner">
        <Link href="/" className="brand" aria-label={t(SITE.name)}>
          <Image src="/logo.png" alt={t(SITE.name)} width={40} height={40} className="brand__logo" priority />
          <span className="brand__name">{t(SITE.short)}</span>
        </Link>

        <nav className="nav__links" aria-label="primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={"nav__link " + (pathname === l.href ? "is-active" : "")}
            >
              {t(UI[l.key])}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          <button onClick={toggle} className="lang-btn" aria-label="language">
            <Globe size={16} />
            <span>{lang === "ar" ? "EN" : "عر"}</span>
          </button>

          <SignedIn>
            <Link href="/admin" className="nav__link nav__link--admin">{t(UI.nav_admin)}</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn btn--sm btn--ghost">{t(UI.sign_in)}</button>
            </SignInButton>
          </SignedOut>

          <button
            className="menu-toggle"
            aria-label="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={"mobile-menu " + (open ? "is-open" : "")}>
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={"mobile-menu__link " + (pathname === l.href ? "is-active" : "")}
          >
            {t(UI[l.key])}
          </Link>
        ))}
        <SignedIn>
          <Link href="/admin" className="mobile-menu__link">{t(UI.nav_admin)}</Link>
        </SignedIn>
      </div>
    </header>
  );
}
