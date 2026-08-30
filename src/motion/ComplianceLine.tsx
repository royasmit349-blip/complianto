/**
 * THE SIGNATURE ELEMENT — one continuous accent stroke threading the
 * entire homepage, living in a sticky right-hand column. A single
 * scrubbed ScrollTrigger drives the dash-draw, the travelling marker
 * and the three act nodes (Start → Manage → Scale). The line completes
 * at the consultation form — compliance from start to end.
 *
 * < 1024px or reduced motion → the journey renders as a static stepper
 * and this rail draws itself fully, statically.
 */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const NODES = [
  { y: 11.7, label: "Start", at: 0.03 },
  { y: 50, label: "Manage", at: 0.44 },
  { y: 88.3, label: "Scale", at: 0.86 },
];

const D =
  "M 60 -20 C 60 30, 60 80, 60 117 C 60 200, 22 260, 22 340 C 22 420, 60 420, 60 500 C 60 580, 98 640, 98 720 C 98 800, 60 800, 60 883 C 60 930, 60 970, 60 1030";

export default function ComplianceLine() {
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const marker = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const p = path.current;
    const mk = marker.current;
    if (!p || !mk) return;
    const L = p.getTotalLength();
    p.style.strokeDasharray = String(L);
    const nodeEls = Array.from(root.current?.querySelectorAll<HTMLElement>("[data-node]") ?? []);

    const paint = (prog: number) => {
      p.style.strokeDashoffset = String(L * (1 - prog));
      if (prog > 0.004) {
        const pt = p.getPointAtLength(L * prog);
        mk.style.opacity = "1";
        mk.style.left = `${pt.x}px`;
        mk.style.top = `${(pt.y / 1000) * 100}%`;
      } else {
        mk.style.opacity = "0";
      }
      nodeEls.forEach((el, i) => el.classList.toggle("lit", prog >= NODES[i].at));
    };

    const settle = () => {
      p.style.strokeDashoffset = "0";
      mk.style.opacity = "0";
      nodeEls.forEach((el) => el.classList.add("lit"));
    };

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const home = document.getElementById("home");
      if (!home) return;
      const st = ScrollTrigger.create({
        trigger: home,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => paint(self.progress),
      });
      paint(0);
      return () => st.kill();
    });
    mm.add("(prefers-reduced-motion: reduce)", settle);
  }, { scope: root });

  return (
    <div aria-hidden className="hidden lg:block">
      <div ref={root} className="sticky top-0 h-screen">
        <div className="relative h-full w-[132px]">
          <svg className="absolute inset-y-0 left-0 h-full w-[120px]" viewBox="0 0 120 1000" preserveAspectRatio="none">
            <path d={D} fill="none" stroke="var(--color-line)" strokeWidth="1.5" />
            <path ref={path} d={D} fill="none" stroke="var(--color-accent)" strokeWidth="2" />
          </svg>

          {NODES.map((n) => (
            <div
              key={n.label}
              data-node
              className="group absolute left-[60px] -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${n.y}%` }}
            >
              <span
                className="block h-3.5 w-3.5 rounded-full border-2 border-line bg-paper transition-all duration-500
                           group-[.lit]:border-accent group-[.lit]:bg-accent group-[.lit]:shadow-[0_0_0_5px_var(--color-accent-wash)]"
              />
              <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted/50 transition-colors duration-500 group-[.lit]:text-accent-strong">
                {n.label}
              </span>
            </div>
          ))}

          <div
            ref={marker}
            className="absolute -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300"
            style={{ left: "60px", top: "0%" }}
          >
            <span className="pulse-dot block h-2.5 w-2.5 rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
