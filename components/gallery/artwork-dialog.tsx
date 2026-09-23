"use client";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Artwork } from "@/data/artworks";
import { useLanguage } from "@/i18n/language-provider";
export function ArtworkDialog({ selected, onClose, onInquire }: { selected: Artwork | null; onClose: () => void; onInquire: (item: Artwork) => void }) {
  const { locale, t } = useLanguage();
  const text = selected?.translations[locale];
  return <Dialog open={!!selected} onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent className="art-dialog" showCloseButton={false}>
      <DialogClose className="art-dialog-close" aria-label={t.close}><X size={20} /></DialogClose>
      {selected && text && <>
        <div className="dialog-image"><img src={selected.image} alt={text.alt} width="800" height="1000" /></div>
        <div className="dialog-body">
          <p className="eyebrow">{t.cultures[selected.culture]} · {t.categories[selected.category]} · {selected.id}</p>
          <DialogTitle className="dialog-title">{text.title}</DialogTitle>
          <DialogDescription className="dialog-description">{text.description}</DialogDescription>
          <dl><dt>{t.period}</dt><dd>{text.period}</dd><dt>{t.dimensions}</dt><dd>{text.dimensions}</dd><dt>{t.material}</dt><dd>{text.material}</dd></dl>
          <p className="credit">{t.reference}<br /><a href={selected.source} target="_blank" rel="noreferrer">{t.museum} · {selected.accession} · {t.publicDomain}<ArrowUpRight size={12} /></a></p>
          <button className="solid-button" onClick={() => onInquire(selected)}>{t.similar}<ArrowRight size={17} /></button>
        </div>
      </>}
    </DialogContent>
  </Dialog>;
}
