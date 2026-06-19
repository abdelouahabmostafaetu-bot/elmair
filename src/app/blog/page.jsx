"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangProvider";
import { UI } from "@/lib/content";

export default function BlogPage() {
  const { t, lang } = useLang();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setPosts(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>{t(UI.nav_blog)}</h1>
          <p>{t(UI.latest_blog)}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="spinner" />
          ) : posts.length === 0 ? (
            <p style={ { textAlign: "center", color: "var(--muted)" } }>{t(UI.empty_blog)}</p>
          ) : (
            <div className="blog-grid">
              {posts.map((p) => (
                <Link key={p.id} href={"/blog/" + p.slug} className="bcard">
                  <div className="bcard__media">
                    <img src={p.cover || "/blog-default.jpg"} alt={p.title} />
                  </div>
                  <div className="bcard__body">
                    <div className="bcard__meta">{new Date(p.createdAt).toLocaleDateString(lang === "ar" ? "ar" : "en")}</div>
                    <h3 className="bcard__title">{p.title}</h3>
                    <p className="bcard__excerpt">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
