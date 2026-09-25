"use client";

import { useEffect } from "react";
import { flushSync } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import { artworks, type Artwork, type CollectionFilter, type Culture } from "@/data/artworks";
import { useLanguage } from "@/i18n/language-provider";

const filters: CollectionFilter[] = ["all", "korea", "china"];

export function CollectionGrid({ filter, setFilter, onSelect }: {
  filter: CollectionFilter;
  setFilter: (value: CollectionFilter) => void;
  onSelect: (item: Artwork) => void;
}) {
  const { locale, t } = useLanguage();

  useEffect(() => {
    const context = (document as Document & { modelContext?: { registerTool: (tool: object, options: { signal: AbortSignal }) => void | Promise<void> } }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const tool = {
      name: "filter_collection", title: "Filter the collection",
      description: "Show Korean art, Chinese art, or both collections. Does not submit an inquiry.",
      inputSchema: { type: "object", properties: { culture: { type: "string", enum: filters } }, required: ["culture"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input: unknown) {
        const value = input as { culture?: CollectionFilter };
        if (!value?.culture || !filters.includes(value.culture)) throw new Error("Unknown collection");
        const culture = value.culture;
        flushSync(() => setFilter(culture));
        return { culture, works: artworks.filter(item => culture === "all" || item.culture === culture).map(item => ({ id: item.id, title: item.translations[locale].title })) };
      },
    };
    try { void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch { /* Optional browser enhancement. */ }
    return () => lifecycle.abort();
  }, [locale, setFilter]);

  const visibleCultures: Culture[] = filter === "all" ? ["korea", "china"] : [filter];

  return <div className="collections" id="collection-index">
    <nav className="collection-nav" aria-label={t.filterLabel}>
      <div className="collection-switcher wrap">
        <p>{t.collectionIndex}</p>
        <div className="culture-filters" role="group" aria-label={t.filterLabel}>
          {filters.map(value => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>
            <span>{t.cultures[value]}</span>
          </button>)}
        </div>
      </div>
    </nav>
    {visibleCultures.map(culture => {
      const pieces = artworks.filter(item => item.culture === culture);
      const isChina = culture === "china";
      return <section key={culture} id={isChina ? "chinese-collection" : "collection"} className={`collection-section culture-${culture}`} aria-labelledby={`${culture}-heading`}>
        <div className="wrap">
          <div className="section-heading">
            <div><p className="eyebrow">{isChina ? t.chineseEyebrow : t.collectionEyebrow}</p><h2 id={`${culture}-heading`}>{isChina ? t.chineseTitle : t.collectionTitle}</h2></div>
            <p>{isChina ? t.chineseDescription : t.collectionDescription}</p>
          </div>
          <div className="collection-rule"><span>{String(pieces.length).padStart(2, "0")} {pieces.length === 1 ? t.workSingular : t.workPlural}</span><span>{t.cultures[culture]}</span></div>
          <div className="art-grid">{pieces.map((item, index) => {
            const text = item.translations[locale];
            return <article key={item.id} className="art-card">
              <button className="art-image" onClick={() => onSelect(item)} aria-label={`${t.viewWork}: ${text.title}`}>
                <span className="art-number">{String(index + 1).padStart(2, "0")}</span>
                <img src={item.image} alt={text.alt} width="1000" height="1200" loading="lazy" />
                <span className="view-art">{t.viewWork}<ArrowUpRight size={17} /></span>
              </button>
              <div className="art-card-copy">
                <p className="art-category">{t.categories[item.category]} <span aria-hidden="true">/</span> {item.id}</p>
                <h3 className="art-heading"><button className="art-title" onClick={() => onSelect(item)}><span className="art-title-text">{text.title}</span><span className="art-title-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span></button></h3>
                <p className="art-description">{text.description}</p>
                <dl className="art-facts">
                  <div><dt>{t.period}</dt><dd>{text.period}</dd></div>
                  <div><dt>{t.material}</dt><dd>{text.material}</dd></div>
                  <div><dt>{t.dimensions}</dt><dd>{text.dimensions}</dd></div>
                </dl>
              </div>
            </article>;
          })}</div>
          <p className="reference-note">{t.referenceNote}</p>
        </div>
      </section>;
    })}
  </div>;
}
