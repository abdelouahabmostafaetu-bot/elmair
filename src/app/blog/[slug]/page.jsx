"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { UI } from "@/lib/content";

export default function BlogPostPage() {
  const { t, lang } = useLang();
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch("/api/blog?slug=" + encodeURIComponent(slug))
      .then((r) => r.json())
      .then((d) => setPost(Array.isArray(d) ? d[0] : d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <section className="section">
      <div className="container">
        <Link href="/blog" className="link-arrow" style={ { marginBottom: "24px" } }>
          <ArrowLeft size={16} /> {t(UI.back)}
        </Link>
        {loading ? (
          <div className="spinner" />
        ) : !post ? (
          <p style={ { textAlign: "center", color: "var(--muted)" } }>{t(UI.empty_blog)}</p>
        ) : (
          <article className="post">
            <img src={post.cover || "/blog-default.jpg"} alt={post.title} className="post__cover" />
            <h1 className="post__title">{post.title}</h1>
            <div className="post__meta">{new Date(post.createdAt).toLocaleDateString(lang === "ar" ? "ar" : "en")}</div>
            {post.video && (
              <video className="post__video" src={post.video} controls playsInline />
            )}
            <div className="post__content">{post.content}</div>
          </article>
        )}
      </div>
    </section>
  );
}
