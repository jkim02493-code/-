"use client";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
export function Footer() {
  const { t } = useLanguage();
  return <footer id="contact" className="wrap">
    <div className="footer-top"><a href="#" className="brand" aria-label={t.home}><span lang="ja">青古堂</span><small>SEIKOUDOU</small></a><p>{t.footerPottery}<br /><span>{t.locationFull}</span></p><a className="text-link" href="#inquire">{t.contactGallery}<ArrowUpRight size={17} /></a></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} 青古堂 Seikoudou</span><span>{t.footerLine}</span><a href="#">{t.backToTop} ↑</a></div>
  </footer>;
}
