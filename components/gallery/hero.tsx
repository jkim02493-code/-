"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { artworks, type Artwork } from "@/data/artworks";

const featuredWorks = [artworks[0], artworks[3], artworks[5]];

export function Hero({ onSelect }: { onSelect: (item: Artwork) => void }) {
  const { locale, t } = useLanguage();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featured = featuredWorks[featuredIndex];
  const text = featured.translations[locale];

  return <>
    <section className="hero wrap" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="eyebrow"><span className="small-rule" />{t.pottery}</p>
        <h1 id="hero-heading">{t.heroLines[0]}<br />{t.heroLines[1]}<br /><em>{t.heroLines[2]}</em></h1>
        <p className="hero-description">{t.heroDescription}</p>
        <a className="text-link" href="#collection">{t.explore}<ArrowDown size={17} /></a>
        <div className="hero-location"><strong>青古堂</strong><span>{t.location}</span><i className="vermillion-seal" aria-hidden="true">青<br />古</i></div>
      </div>
      <figure className="hero-art">
        <span className="vertical-note">{t.verticalNote}</span>
        <button className="hero-art-button" onClick={() => onSelect(featured)} aria-label={`${t.viewWork}: ${text.title}`}>
          <img key={featured.id} src={featured.image} alt={text.alt} width="1000" height="1250" fetchPriority={featuredIndex === 0 ? "high" : "auto"} />
          <span className="hero-view">{t.viewWork}<ArrowUpRight size={16} /></span>
        </button>
        <figcaption><span>{String(featuredIndex + 1).padStart(2, "0")} / {t.categories[featured.category]}</span><span>{text.period}</span></figcaption>
        <div className="hero-selector" role="group" aria-label={t.filterLabel}>
          {featuredWorks.map((item, index) => <button key={item.id} className={featuredIndex === index ? "active" : ""} aria-pressed={featuredIndex === index} onClick={() => setFeaturedIndex(index)}>
            <small>{String(index + 1).padStart(2, "0")}</small><span>{t.cultures[item.culture]}</span>
          </button>)}
        </div>
      </figure>
    </section>
    <div className="intro-line wrap"><span>{t.introTitle}</span><p>{t.introText}</p><span className="intro-mark brush-mark">青古堂</span></div>
  </>;
}
