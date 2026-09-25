"use client";

import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { artworks } from "@/data/artworks";

export function Hero() {
  const { locale, t } = useLanguage();

  return <>
    <section className="hero wrap" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="eyebrow"><span className="small-rule" />{t.pottery}</p>
        <h1 id="hero-heading">{t.heroLines[0]}<br />{t.heroLines[1]}<br /><em>{t.heroLines[2]}</em></h1>
        <p className="hero-description">{t.heroDescription}</p>
        <a className="text-link" href="#collection-index">{t.explore}<ArrowDown size={17} /></a>
        <div className="hero-location"><strong>青古堂</strong><span>{t.location}</span><i className="vermillion-seal" aria-hidden="true">青<br />古</i></div>
      </div>
      <figure className="hero-art">
        <span className="vertical-note">{t.verticalNote}</span>
        <img src="/images/celadon.jpg" alt={artworks[0].translations[locale].alt} width="1000" height="1250" fetchPriority="high" />
        <figcaption><span>{t.heroCaption}</span><span>{t.heroPeriod}</span></figcaption>
      </figure>
    </section>
    <div className="intro-line wrap"><span>{t.introTitle}</span><p>{t.introText}</p><span className="intro-mark brush-mark">青古堂</span></div>
  </>;
}
