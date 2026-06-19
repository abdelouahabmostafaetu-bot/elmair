"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import Reveal from "@/components/Reveal";
import NetworkGlobe from "@/components/NetworkGlobe";
import { SITE, UI, STATS, SECTORS } from "@/lib/content";

export default function HomePage() {
  const { t, lang } = useLang();
  const [posts, setPosts] = useState([]);
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setPosts(d.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="hero">
        <Image src="/hero.jpg" alt="" fill className="hero__bg" priority />
        <div className="hero__overlay" />
        <div className="container hero__inner">
          <div>
            <span className="hero__kicker">{t(UI.hero_kicker)}</span>
            <h1 className="hero__title">{t(UI.hero_title)}</h1>
            <p className="hero__sub">{t(UI.hero_sub)}</p>
            <div className="hero__cta">
              <Link href="/services" className="btn btn--accent">
                {t(UI.hero_cta1)} <Arrow size={18} />
              </Link>
              <Link href="/contact" className="btn btn--ghost" style={ { color: "#fff", borderColor: "rgba(255,255,255,0.3)" } }>
                {t(UI.hero_cta2)}
              </Link>
            </div>
          </div>
          <div className="hero__visual">
            <NetworkGlobe />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats">
            {STATS.map((s, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="stat">
                  <div className="stat__value">{s.value}</div>
                  <div className="stat__label">{t(s.label)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section__head">
            <div className="eyebrow">{t(UI.nav_services)}</div>
            <h2 className="section__title">{t(UI.sectors_title)}</h2>
            <p className="section__sub">{t(UI.sectors_sub)}</p>
          </div>
          <div className="sector-grid">
            {SECTORS.map((sec, i) => (
              <Reveal key={sec.id} delay={i * 0.08}>
                <div className={"sector-card sector-card--" + sec.id}>
                  <Image
                    src={sec.id === "academic" ? "/academic.jpg" : "/corporate.jpg"}
                    alt={t(sec.title)}
                    width={520}
                    height={300}
                    className="sector-card__img"
                  />
                  <h3>{t(sec.title)}</h3>
                  <p>{t(sec.intro)}</p>
                  <div className="chip-row">
                    {sec.services.slice(0, 3).map((sv, j) => (
                      <span key={j} className="chip">{t(sv.title)}</span>
                    ))}
                  </div>
                  <Link href="/services" className="link-arrow">
                    {t(UI.view_all_services)} <Arrow size={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section__head">
              <div className="eyebrow">{t(UI.nav_blog)}</div>
              <h2 className="section__title">{t(UI.latest_blog)}</h2>
            </div>
            <div className="blog-grid">
              {posts.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <Link href={"/blog/" + p.slug} className="bcard">
                    <div className="bcard__media">
                      <img src={p.cover || "/blog-default.jpg"} alt={p.title} />
                    </div>
                    <div className="bcard__body">
                      <div className="bcard__meta">{new Date(p.createdAt).toLocaleDateString(lang === "ar" ? "ar" : "en")}</div>
                      <h3 className="bcard__title">{p.title}</h3>
                      <p className="bcard__excerpt">{p.excerpt}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <h2>{t(UI.cta_band_title)}</h2>
              <p>{t(UI.cta_band_sub)}</p>
              <Link href="/contact" className="btn btn--accent">
                {t(UI.hero_cta2)} <Arrow size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
