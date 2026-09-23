"use client";
import { useEffect } from "react";
import { ArrowUpRight, Languages } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isLocale, languages } from "@/i18n/config";
import { useLanguage } from "@/i18n/language-provider";
export function Header() {
  const { locale, t, setLocale } = useLanguage();
  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(1, window.scrollY / height) : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress * 100}%`);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <>
    <a className="skip-link" href="#collection">{t.skip}</a>
    <header className="site-header wrap">
      <span className="scroll-progress" aria-hidden="true" />
      <a href="#" className="brand" aria-label={t.home}><span lang="ja">青古堂</span><small>SEIKOUDOU</small></a>
      <div className="header-controls">
        <nav aria-label={t.navigation}>
          <a href="#collection">{t.collection}</a>
          <a href="#chinese-collection">{t.chineseCollection}</a>
          <a href="#inquire">{t.inquire}</a>
          <a href="#contact">{t.contact} <ArrowUpRight size={14} /></a>
        </nav>
        <Select value={locale} onValueChange={value => { if (isLocale(value)) setLocale(value); }}>
          <SelectTrigger aria-label={t.language} className="language-trigger"><Languages size={15} /><SelectValue /></SelectTrigger>
          <SelectContent position="popper" className="language-menu">
            {Object.entries(languages).map(([value, label]) => <SelectItem key={value} value={value}><span lang={value === "zh" ? "zh-Hans" : value}>{label}</span></SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </header>
  </>;
}
