/**
 * GSAP — registered once, client-side only.
 * All plugins are free for commercial use since GSAP 3.13 (April 2025).
 * DrawSVG-style effects are implemented with stroke-dash math instead of
 * the plugin, keeping the critical path lean.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, SplitText);

export { gsap, ScrollTrigger, MotionPathPlugin, SplitText };

export const prefersReduced = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isMobile = (): boolean =>
  typeof window !== "undefined" && window.innerWidth < 768;
