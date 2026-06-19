"use client";

import Image from "next/image";
import Link from "next/link";
import { Target, Eye, ShieldCheck, Check } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import Reveal from "@/components/Reveal";
import { SITE, UI } from "@/lib/content";

const VALUES = [
  { icon: Target, title: { ar: "رسالتنا", en: "Mission" }, text: { ar: "تمكين الباحثين والمؤسسات من بلوغ المعايير العالمية في البحث والنشر والجودة.", en: "Empowering researchers and institutions to reach global standards in research, publishing and quality." } },
  { icon: Eye, title: { ar: "رؤيتنا", en: "Vision" }, text: { ar: "أن نكون المرجع الأول للتميز الأكاديمي والمؤسسي في المنطقة.", en: "To be the leading reference for academic and institutional excellence in the region." } },
  { icon: ShieldCheck, title: { ar: "قيمنا", en: "Values" }, text: { ar: "الأمانة العلمية، الدقة، السرية، والاحترافية المطلقة.", en: "Scientific integrity, precision, confidentiality and absolute professionalism." } },
];

const POINTS = [
  { ar: "خبرة أكاديمية وتقنية عميقة", en: "Deep academic and technical expertise" },
  { ar: "شبكة علاقات دولية مع دور النشر", en: "International network with publishers" },
  { ar: "سرية تامة وحماية لبيانات العملاء", en: "Full confidentiality and client data protection" },
  { ar: "مرافقة مخصصة من البداية حتى النجاح", en: "Tailored support from start to success" },
];

export default function AboutPage() {
  const { t } = useLang();
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>{t(UI.nav_about)}</h1>
          <p>{t(SITE.name)}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="sector-grid" style={ { alignItems: "center" } }>
            <Reveal>
              <Image src="/academic.jpg" alt={t(SITE.name)} width={560} height={420} style={ { width: "100%", height: "auto", borderRadius: "16px", border: "1px solid var(--line)" } } />
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div className="eyebrow">{t(SITE.short)}</div>
                <h2 className="section__title">{t(UI.footer_about)}</h2>
                <p style={ { color: "var(--muted)" } }>
                  {t({ ar: "نجمع بين العمق الأكاديمي والخبرة الميدانية لتقديم حلول دقيقة للباحثين والجامعات والشركات، بمعايير عالمية وأمانة علمية كاملة.", en: "We combine academic depth with field experience to deliver precise solutions for researchers, universities and companies — with world-class standards and full scientific integrity." })}
                </p>
                <ul className="acc__points">
                  {POINTS.map((p, i) => (
                    <li key={i}><Check size={18} /> {t(p)}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="sector-grid" style={ { gridTemplateColumns: "repeat(3, 1fr)" } }>
            {VALUES.map((v, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="sector-card">
                  <div className="acc__icon" style={ { marginBottom: "16px" } }><v.icon size={22} /></div>
                  <h3>{t(v.title)}</h3>
                  <p>{t(v.text)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <h2>{t(UI.cta_band_title)}</h2>
              <p>{t(UI.cta_band_sub)}</p>
              <Link href="/contact" className="btn btn--accent">{t(UI.hero_cta2)}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
