"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { SITE, UI, CONTACT } from "@/lib/content";

export default function ContactPage() {
  const { t } = useLang();
  const [identity, setIdentity] = useState("");
  const [status, setStatus] = useState(null); // null | sending | ok | err

  const isAcademic = identity === "researcher" || identity === "university";
  const isCompany = identity === "company";
  const serviceOptions = isCompany ? CONTACT.corporateServices : CONTACT.academicServices;

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("ok");
      form.reset();
      setIdentity("");
    } catch (err) {
      setStatus("err");
    }
  }

  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>{t(UI.nav_contact)}</h1>
          <p>{t(UI.cta_band_sub)}</p>
          <a className="footer__mail" href={"mailto:" + SITE.email} style={ { justifyContent: "center", marginTop: "10px", color: "var(--navy)" } }>
            <Mail size={16} /> {SITE.email}
          </a>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <form className="form" onSubmit={onSubmit}>
            <div className="field">
              <label>{t({ ar: "أنا:", en: "I am:" })}</label>
              <select className="select" name="identity" required value={identity} onChange={(e) => setIdentity(e.target.value)}>
                <option value="">{t({ ar: "— اختر هويتك —", en: "— Select —" })}</option>
                {CONTACT.identities.map((o) => (
                  <option key={o.id} value={o.id}>{t(o.label)}</option>
                ))}
              </select>
            </div>

            <div className="grid-2">
              <div className="field">
                <label>{t({ ar: "الاسم الكامل", en: "Full name" })}</label>
                <input className="input" name="name" required />
              </div>
              <div className="field">
                <label>{t({ ar: "البريد الإلكتروني", en: "Email" })}</label>
                <input className="input" type="email" name="email" required />
              </div>
            </div>

            <div className="grid-2">
              <div className="field">
                <label>{t({ ar: "الهاتف (اختياري)", en: "Phone (optional)" })}</label>
                <input className="input" name="phone" />
              </div>
              {identity && (
                <div className="field">
                  <label>{t({ ar: "الخدمة المطلوبة", en: "Requested service" })}</label>
                  <select className="select" name="service">
                    <option value="">{t({ ar: "— اختر —", en: "— Select —" })}</option>
                    {serviceOptions.map((o, i) => (
                      <option key={i} value={t(o)}>{t(o)}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {isCompany && (
              <div className="field">
                <label>{t({ ar: "حجم المؤسسة", en: "Organization size" })}</label>
                <select className="select" name="orgSize">
                  <option value="small">{t({ ar: "صغيرة", en: "Small" })}</option>
                  <option value="medium">{t({ ar: "متوسطة", en: "Medium" })}</option>
                  <option value="large">{t({ ar: "كبيرة", en: "Large" })}</option>
                </select>
              </div>
            )}

            <div className="field">
              <label>{t({ ar: "تفاصيل طلبك", en: "Your message" })}</label>
              <textarea className="textarea" name="message" required />
            </div>

            {isAcademic && (
              <p className="help">{t({ ar: "يمكنك إرسال رابط مسودة البحث ضمن الرسالة.", en: "You may include a link to your draft research in the message." })}</p>
            )}

            <button className="btn btn--accent btn--block" type="submit" disabled={status === "sending"}>
              {status === "sending" ? t(UI.loading) : t({ ar: "إرسال الطلب", en: "Send request" })} <Send size={16} />
            </button>

            {status === "ok" && <div className="note note--ok">{t({ ar: "تم إرسال طلبك بنجاح. سنتواصل معك قريبًا.", en: "Your request was sent successfully. We will contact you soon." })}</div>}
            {status === "err" && <div className="note note--err">{t({ ar: "حدث خطأ. حاول مجددًا أو راسلنا عبر البريد.", en: "Something went wrong. Please try again or email us." })}</div>}
          </form>
        </div>
      </section>
    </>
  );
}
