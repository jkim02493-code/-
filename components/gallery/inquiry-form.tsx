"use client";
import { useState, useRef, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import type { Artwork } from "@/data/artworks";
export type InquiryDraft = { kind: "custom"; text: string } | { kind: "artwork"; item: Artwork };
export function InquiryForm({ draft, setDraft }: { draft: InquiryDraft; setDraft: (value: InquiryDraft) => void }) {
  const { locale, t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorStatus, setErrorStatus] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const submitting = useRef(false);
  // Translate automatic drafts but preserve anything the visitor has personally typed.
  const details = draft.kind === "custom" ? draft.text : t.prefill.replace("{title}", draft.item.translations[locale].title).replace("{id}", draft.item.id) + "\n\n";
  const error = errorStatus === 400 ? t.invalid : errorStatus === 403 ? t.originError : errorStatus === 413 ? t.tooLarge : errorStatus === 503 ? t.unavailable : t.failed;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true; setStatus("sending");
    const fields = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(fields)) });
      const result = await response.json() as { ok?: boolean };
      if (!response.ok || result.ok !== true) { setErrorStatus(response.status); setStatus("error"); return; }
      setStatus("success"); formRef.current?.reset(); setDraft({ kind: "custom", text: "" });
    } catch { setErrorStatus(0); setStatus("error"); }
    finally { submitting.current = false; }
  }
  return <section id="inquire" className="inquiry-section">
    <div className="wrap inquiry-grid">
      <div className="inquiry-copy"><p className="eyebrow">{t.inquiryEyebrow}</p><h2>{t.inquiryLines[0]}<br />{t.inquiryLines[1]}<br /><em>{t.inquiryLines[2]}</em></h2><p>{t.inquiryDescription}</p><div className="inquiry-signature" lang="ja">青古堂</div></div>
      <form ref={formRef} onSubmit={submit} className="inquiry-form">
        <div className="form-top"><h3>{t.formTitle}</h3><span lang="ja">青古堂</span></div>
        <label htmlFor="fullName">{t.fullName}</label><input id="fullName" name="fullName" autoComplete="name" required maxLength={120} placeholder={t.namePlaceholder} disabled={status === "sending"} />
        <label htmlFor="email">{t.email}</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" disabled={status === "sending"} />
        <label htmlFor="details">{t.details}</label><textarea id="details" name="details" required minLength={10} maxLength={6000} rows={4} value={details} onChange={event => { setDraft({ kind: "custom", text: event.target.value }); if (status !== "sending") setStatus("idle"); }} placeholder={t.detailsPlaceholder} disabled={status === "sending"} />
        <div className="honeypot" aria-hidden="true"><label htmlFor="website">{t.website}</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <p className="form-privacy">{t.privacy}</p>
        <button className="send-button" type="submit" disabled={status === "sending"}>{status === "sending" ? t.sending : t.send}<ArrowUpRight size={19} /></button>
        <div aria-live="polite" aria-atomic="true">{status === "success" && <p className="form-message"><Check size={18} />{t.success}</p>}{status === "error" && <p className="form-message error" role="alert">{error}</p>}</div>
      </form>
    </div>
  </section>;
}
