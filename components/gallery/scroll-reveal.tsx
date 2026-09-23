"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = document.querySelectorAll<HTMLElement>(".section-heading, .art-card, .inquiry-copy, .inquiry-form");
    elements.forEach(element => element.classList.add("reveal-on-scroll"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
