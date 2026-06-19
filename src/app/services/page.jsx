"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { ChevronDown, Check } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import Reveal from "@/components/Reveal";
import { UI, SECTORS } from "@/lib/content";

function ServiceIcon({ name, size = 20 }) {
  const Cmp = Icons[name] || Icons.Sparkles;
  return <Cmp size={size} />;
}

export default function ServicesPage() {
  const { t } = useLang();
  const [active, setActive] = useState("academic");
  const [openId, setOpenId] = useState(0);
  const sector = SECTORS.find((s) => s.id === active) || SECTORS[0];

  return (
    <div className={active === "corporate" ? "theme-corporate" : "theme-academic"}>
      <div className="page-head">
        <div className="container">
          <h1>{t(UI.nav_services)}</h1>
          <p>{t(UI.sectors_sub)}</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={ { textAlign: "center" } }>
          <div className="sector-tabs">
            {SECTORS.map((s) => (
              <button
                key={s.id}
                className={"sector-tab " + (active === s.id ? "is-active" : "")}
                onClick={() => { setActive(s.id); setOpenId(0); }}
              >
                {t(s.title)}
              </button>
            ))}
          </div>

          <p className="section__sub" style={ { maxWidth: "640px", margin: "0 auto 36px" } }>{t(sector.intro)}</p>

          <div className="services-list">
            {sector.services.map((sv, i) => {
              const isOpen = openId === i;
              return (
                <Reveal key={i} delay={i * 0.04}>
                  <div className={"acc " + (isOpen ? "is-open" : "")}>
                    <button className="acc__head" onClick={() => setOpenId(isOpen ? -1 : i)}>
                      <span className="acc__icon"><ServiceIcon name={sv.icon} /></span>
                      <span>{t(sv.title)}</span>
                      <ChevronDown className="acc__chevron" size={20} />
                    </button>
                    {isOpen && (
                      <div className="acc__body">
                        <p className="acc__desc">{t(sv.desc)}</p>
                        {sv.points && sv.points.length > 0 && (
                          <ul className="acc__points">
                            {sv.points.map((p, j) => (
                              <li key={j}><Check size={18} /> {t(p)}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
