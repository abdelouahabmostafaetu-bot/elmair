"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/components/LangProvider";
import { UI, PORTFOLIO_CATEGORIES } from "@/lib/content";

export default function PortfolioPage() {
  const { t } = useLang();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setItems(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const shown = filter === "all" ? items : items.filter((i) => i.category === filter);
  const catLabel = (id) => {
    const c = PORTFOLIO_CATEGORIES.find((x) => x.id === id);
    return c ? t(c.label) : id;
  };

  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>{t(UI.nav_portfolio)}</h1>
          <p>{t(UI.portfolio_preview)}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="filter-row">
            {PORTFOLIO_CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={"filter-btn " + (filter === c.id ? "is-active" : "")}
                onClick={() => setFilter(c.id)}
              >
                {t(c.label)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="spinner" />
          ) : shown.length === 0 ? (
            <p style={ { textAlign: "center", color: "var(--muted)" } }>{t(UI.empty_portfolio)}</p>
          ) : (
            <div className="card-grid">
              <AnimatePresence mode="popLayout">
                {shown.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={ { opacity: 0, scale: 0.94 } }
                    animate={ { opacity: 1, scale: 1 } }
                    exit={ { opacity: 0, scale: 0.94 } }
                    transition={ { duration: 0.35 } }
                    className="pcard"
                  >
                    <div className="pcard__media">
                      <img src={item.image || "/blog-default.jpg"} alt={item.title} />
                    </div>
                    <div className="pcard__body">
                      <div className="pcard__tag">{catLabel(item.category)}</div>
                      <h3 className="pcard__title">{item.title}</h3>
                      <p className="pcard__desc">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
