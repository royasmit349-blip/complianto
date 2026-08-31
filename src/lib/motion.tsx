/**
 * Motion primitives — every one is wrapped in gsap.matchMedia so
 * prefers-reduced-motion users get static final states instantly.
 */
import { useRef, type CSSProperties, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "./gsap";

const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/* Fade + rise on scroll, once. */
export function Reveal({
  children, className, style, delay = 0, y = 26,
}: {
  children: ReactNode; className?: string; style?: CSSProperties; delay?: number; y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = ref.current;
      if (!el) return;
      gsap.from(el, {
        y, autoAlpha: 0, duration: 0.9, ease: "power3.out", delay,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
  }, { scope: ref });
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

/* Staggered reveal of direct children. */
export function Stagger({
  children, className, item = ":scope > *", stagger = 0.07, y = 22, delay = 0,
}: {
  children: ReactNode; className?: string; item?: string; stagger?: number; y?: number; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const root = ref.current;
      if (!root) return;
      const items = gsap.utils.toArray(root.querySelectorAll(item));
      gsap.from(items, {
        y, autoAlpha: 0, duration: 0.75, ease: "power3.out", stagger, delay,
        scrollTrigger: { trigger: root, start: "top 86%", once: true },
      });
    });
  }, { scope: ref });
  return <div ref={ref} className={className}>{children}</div>;
}

/* SplitText word-rise — reverts on cleanup so copy/paste & AT keep real text. */
export function SplitWords({
  children, className, as = "h2", stagger = 0.045,
}: {
  children: string; className?: string; as?: "h1" | "h2" | "h3"; stagger?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = ref.current;
      if (!el) return;
      const split = new SplitText(el, { type: "words", wordsClass: "split-w" });
      gsap.set(split.words, { display: "inline-block", willChange: "transform, opacity" });
      gsap.from(split.words, {
        yPercent: 55, autoAlpha: 0, duration: 0.85, ease: "power3.out", stagger,
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
      return () => split.revert();
    });
  }, { scope: ref });
  const Tag = as;
  return <Tag ref={ref as never} className={className}>{children}</Tag>;
}

/* Count-up, snapped to integers, once on enter view. */
export function CountUp({
  to, prefix = "", suffix = "", duration = 1.8, className,
}: {
  to: number; prefix?: string; suffix?: string; duration?: number; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    const fmt = (v: number) => prefix + Math.round(v).toLocaleString("en-IN") + suffix;
    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (ref.current) ref.current.textContent = fmt(to);
    });
    mm.add(MOTION_OK, () => {
      const el = ref.current;
      if (!el) return;
      const obj = { v: 0 };
      el.textContent = fmt(0);
      gsap.to(obj, {
        v: to, duration, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => { el.textContent = fmt(obj.v); },
      });
    });
  }, { scope: ref });
  return <span ref={ref} className={className} aria-label={`${prefix}${to.toLocaleString("en-IN")}${suffix}`}>{prefix}0{suffix}</span>;
}
