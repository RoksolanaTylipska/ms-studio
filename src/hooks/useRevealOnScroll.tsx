import { useRouter } from "next/router";
import { useEffect } from "react";

// Gently fades page blocks in as they scroll into view (styles: .reveal in
// globals.css). Classes are added from JS only, so without JS — and for search
// engines — everything is simply visible. Skipped entirely for reduced motion.
export const useRevealOnScroll = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.querySelector("main");
    if (!main) return;

    // Top-level blocks of the page; pages built from <section>s animate per section
    const targets = Array.from(main.children).flatMap((block) => {
      const sections = block.querySelectorAll(":scope > section");
      return sections.length > 0 ? Array.from(sections) : [block];
    });

    // The observer reports every target right after observe() whenever the page
    // renders. If it stays silent (no rendering: some previewers/screenshot tools),
    // show everything so no block can get stuck invisible.
    let observerAlive = false;
    const revealed: HTMLElement[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        observerAlive = true;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    for (const el of targets) {
      if (!(el instanceof HTMLElement) || getComputedStyle(el).position === "fixed") continue;
      // Already on screen at load: show without the slide-in
      const { top } = el.getBoundingClientRect();
      if (top < window.innerHeight * 0.9) continue;
      el.classList.add("reveal");
      revealed.push(el);
      observer.observe(el);
    }

    const fallback = window.setTimeout(() => {
      if (observerAlive) return;
      observer.disconnect();
      revealed.forEach((el) => el.classList.add("is-visible"));
    }, 1500);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [asPath]);
};
