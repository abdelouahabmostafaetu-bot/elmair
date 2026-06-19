"use client";

import { useEffect, useState, useCallback } from "react";
import { Trash2, Plus, FileText, FolderKanban, Pencil, X } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { PORTFOLIO_CATEGORIES } from "@/lib/content";

const BLANK_POST = { title: "", slug: "", excerpt: "", content: "", cover: "", video: "" };
const BLANK_PROJECT = { title: "", category: "patents", description: "", image: "" };

export default function AdminClient() {
  const { t } = useLang();
  const [tab, setTab] = useState("blog");
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>لوحة التحكم — Admin Dashboard</h1>
          <p>أضف وعدّل المقالات وأعمال المعرض بسهولة. Manage your blog & portfolio.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="tabs">
            <button className={"tab " + (tab === "blog" ? "is-active" : "")} onClick={() => setTab("blog")}>
              <FileText size={16} style={ { verticalAlign: "-3px", marginInlineEnd: 6 } } /> المدوّنة / Blog
            </button>
            <button className={"tab " + (tab === "portfolio" ? "is-active" : "")} onClick={() => setTab("portfolio")}>
              <FolderKanban size={16} style={ { verticalAlign: "-3px", marginInlineEnd: 6 } } /> المعرض / Portfolio
            </button>
          </div>
          {tab === "blog" ? <BlogManager /> : <PortfolioManager />}
        </div>
      </section>
    </>
  );
}

function BlogManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(BLANK_POST);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    fetch("/api/blog").then((r) => r.json()).then((d) => Array.isArray(d) && setItems(d)).catch(() => {});
  }, []);
  useEffect(() => { load(); }, [load]);

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  function reset() { setForm(BLANK_POST); setEditId(null); }

  async function save(e) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    try {
      const url = editId ? "/api/blog/" + editId : "/api/blog";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setMsg({ type: "ok", text: editId ? "تم التحديث ✓" : "تمت الإضافة ✓" });
      reset(); load();
    } catch (e) { setMsg({ type: "err", text: "حدث خطأ — Error" }); }
    finally { setBusy(false); }
  }

  async function remove(id) {
    if (!confirm("حذف هذا المقال؟ Delete this post?")) return;
    await fetch("/api/blog/" + id, { method: "DELETE" });
    if (editId === id) reset();
    load();
  }

  function edit(p) { setForm({ title: p.title || "", slug: p.slug || "", excerpt: p.excerpt || "", content: p.content || "", cover: p.cover || "", video: p.video || "" }); setEditId(p.id); window.scrollTo({ top: 0, behavior: "smooth" }); }

  return (
    <div className="admin-grid">
      <div className="panel">
        <h3>{editId ? "تعديل مقال — Edit post" : "مقال جديد — New post"}</h3>
        <form className="form" onSubmit={save} style={ { maxWidth: "none" } }>
          <div className="field"><label>العنوان / Title</label><input className="input" value={form.title} onChange={(e) => set("title", e.target.value)} required /></div>
          <div className="field"><label>الرابط (slug) — اختياري</label><input className="input" value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from title" /></div>
          <div className="field"><label>مقتطف / Excerpt</label><input className="input" value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} /></div>
          <div className="field"><label>رابط صورة الغلاف / Cover image URL</label><input className="input" value={form.cover} onChange={(e) => set("cover", e.target.value)} placeholder="https://..." /></div>
          <div className="field"><label>رابط فيديو (اختياري) / Video URL</label><input className="input" value={form.video} onChange={(e) => set("video", e.target.value)} placeholder="https://..." /></div>
          <div className="field"><label>المحتوى / Content</label><textarea className="textarea" value={form.content} onChange={(e) => set("content", e.target.value)} style={ { minHeight: "180px" } } /></div>
          {form.cover && <img src={form.cover} alt="preview" style={ { borderRadius: 10, maxHeight: 160, objectFit: "cover" } } />}
          <div style={ { display: "flex", gap: 10 } }>
            <button className="btn btn--accent" disabled={busy} type="submit"><Plus size={16} /> {editId ? "حفظ / Save" : "إضافة / Add"}</button>
            {editId && <button type="button" className="btn btn--ghost" onClick={reset}><X size={16} /> إلغاء</button>}
          </div>
          {msg && <div className={"note note--" + (msg.type === "ok" ? "ok" : "err")}>{msg.text}</div>}
        </form>
      </div>
      <div className="panel">
        <h3>المقالات / Posts ({items.length})</h3>
        {items.length === 0 && <p className="help">لا توجد مقالات بعد.</p>}
        {items.map((p) => (
          <div key={p.id} className="list-item">
            <img className="thumb" src={p.cover || "/blog-default.jpg"} alt="" />
            <span className="list-item__title">{p.title}</span>
            <button className="icon-btn" onClick={() => edit(p)} aria-label="edit"><Pencil size={16} /></button>
            <button className="icon-btn" onClick={() => remove(p.id)} aria-label="delete"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(BLANK_PROJECT);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const cats = PORTFOLIO_CATEGORIES.filter((c) => c.id !== "all");

  const load = useCallback(() => {
    fetch("/api/portfolio").then((r) => r.json()).then((d) => Array.isArray(d) && setItems(d)).catch(() => {});
  }, []);
  useEffect(() => { load(); }, [load]);

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  function reset() { setForm(BLANK_PROJECT); setEditId(null); }

  async function save(e) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    try {
      const url = editId ? "/api/portfolio/" + editId : "/api/portfolio";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setMsg({ type: "ok", text: editId ? "تم التحديث ✓" : "تمت الإضافة ✓" });
      reset(); load();
    } catch (e) { setMsg({ type: "err", text: "حدث خطأ — Error" }); }
    finally { setBusy(false); }
  }

  async function remove(id) {
    if (!confirm("حذف هذا العمل؟ Delete this item?")) return;
    await fetch("/api/portfolio/" + id, { method: "DELETE" });
    if (editId === id) reset();
    load();
  }

  function edit(p) { setForm({ title: p.title || "", category: p.category || "patents", description: p.description || "", image: p.image || "" }); setEditId(p.id); window.scrollTo({ top: 0, behavior: "smooth" }); }

  return (
    <div className="admin-grid">
      <div className="panel">
        <h3>{editId ? "تعديل عمل — Edit item" : "عمل جديد — New item"}</h3>
        <form className="form" onSubmit={save} style={ { maxWidth: "none" } }>
          <div className="field"><label>العنوان / Title</label><input className="input" value={form.title} onChange={(e) => set("title", e.target.value)} required /></div>
          <div className="field"><label>التصنيف / Category</label>
            <select className="select" value={form.category} onChange={(e) => set("category", e.target.value)}>
              {cats.map((c) => <option key={c.id} value={c.id}>{c.label.ar} / {c.label.en}</option>)}
            </select>
          </div>
          <div className="field"><label>رابط الصورة / Image URL</label><input className="input" value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." /></div>
          <div className="field"><label>الوصف / Description</label><textarea className="textarea" value={form.description} onChange={(e) => set("description", e.target.value)} /></div>
          {form.image && <img src={form.image} alt="preview" style={ { borderRadius: 10, maxHeight: 160, objectFit: "cover" } } />}
          <div style={ { display: "flex", gap: 10 } }>
            <button className="btn btn--accent" disabled={busy} type="submit"><Plus size={16} /> {editId ? "حفظ / Save" : "إضافة / Add"}</button>
            {editId && <button type="button" className="btn btn--ghost" onClick={reset}><X size={16} /> إلغاء</button>}
          </div>
          {msg && <div className={"note note--" + (msg.type === "ok" ? "ok" : "err")}>{msg.text}</div>}
        </form>
      </div>
      <div className="panel">
        <h3>الأعمال / Items ({items.length})</h3>
        {items.length === 0 && <p className="help">لا توجد أعمال بعد.</p>}
        {items.map((p) => (
          <div key={p.id} className="list-item">
            <img className="thumb" src={p.image || "/blog-default.jpg"} alt="" />
            <span className="list-item__title">{p.title}</span>
            <button className="icon-btn" onClick={() => edit(p)} aria-label="edit"><Pencil size={16} /></button>
            <button className="icon-btn" onClick={() => remove(p.id)} aria-label="delete"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
