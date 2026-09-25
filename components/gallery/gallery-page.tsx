"use client";
import { useState } from "react";
import { flushSync } from "react-dom";
import type { Artwork, CollectionFilter } from "@/data/artworks";
import { LanguageProvider } from "@/i18n/language-provider";
import { Header } from "./header";
import { Hero } from "./hero";
import { CollectionGrid } from "./collection-grid";
import { ArtworkDialog } from "./artwork-dialog";
import { InquiryForm, type InquiryDraft } from "./inquiry-form";
import { Footer } from "./footer";
export function GalleryPage() {
  const [filter, setFilter] = useState<CollectionFilter>("all");
  const [selected, setSelected] = useState<Artwork | null>(null);
  const [draft, setDraft] = useState<InquiryDraft>({ kind: "custom", text: "" });
  function showCulture(culture: "korea" | "china") {
    flushSync(() => setFilter("all"));
    document.getElementById(culture === "korea" ? "collection" : "chinese-collection")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  function inquire(item: Artwork) {
    setDraft({ kind: "artwork", item }); setSelected(null);
    window.setTimeout(() => {
      document.getElementById("inquire")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      document.getElementById("fullName")?.focus({ preventScroll: true });
    }, 150);
  }
  return <LanguageProvider>
    <Header showCulture={showCulture} />
    <main><Hero /><CollectionGrid filter={filter} setFilter={setFilter} onSelect={setSelected} /><InquiryForm draft={draft} setDraft={setDraft} /></main>
    <Footer />
    <ArtworkDialog selected={selected} onClose={() => setSelected(null)} onInquire={inquire} />
  </LanguageProvider>;
}
