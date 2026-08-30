import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { ACT_META, JOURNEY } from "../data/services";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { Reveal } from "../lib/motion";
import { SectionHead } from "../components/ui";

const LINE_D = "M 20 -20 C 20 120, 20 200, 20 300 C 20 430, 20 560, 20 700 C 20 830, 20 900, 20 1020";
const NODE_Y = [8, 50, 92];

/** The pinned, scroll-scrubbed three-act narrative (≥1024px, motion OK). */
export default function Journey() {
  const outer = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);
  const marker = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    /* reduced motion → everything visible, line fully drawn, no pin */
    mm.add("(prefers-reduced-motion: reduce)", () => {
      const root = outer.current;
      if (!root) return;
      gsap.set(root.querySelectorAll("[data-panel]"), { autoAlpha: 1, position: "relative", y: 0 });
      root.querySelectorAll<HTMLElement>("[data-actnode]").forEach((n) => n.classList.add("lit"));
      if (line.current) {
        line.current.style.strokeDasharray = "none";
      }
      if (marker.current) marker.current.style.opacity = "0";
      gsap.set(root.querySelectorAll("[data-chip]"), { autoAlpha: 1, scale: 1 });
    });

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const root = outer.current;
      const p = line.current;
      const mk = marker.current;
      if (!root || !p || !mk) return;
      const L = p.getTotalLength();
      p.style.strokeDasharray = String(L);
      p.style.strokeDashoffset = String(L);

      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", root);
      const nodes = gsap.utils.toArray<HTMLElement>("[data-actnode]", root);
      gsap.set(panels, { autoAlpha: 0, y: 36 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set(nodes, { scale: 0.6 });
      root.querySelectorAll<HTMLElement>("[data-chip]").forEach((c) => gsap.set(c, { autoAlpha: 0, scale: 0.6 }));

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=2400",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      const moveMarker = { prog: 0 };
      tl.to(moveMarker, {
        prog: 1, ease: "none", duration: 3,
        onUpdate: () => {
          const pt = p.getPointAtLength(L * moveMarker.prog);
          p.style.strokeDashoffset = String(L * (1 - moveMarker.prog));
          mk.style.left = `${pt.x}px`;
          mk.style.top = `${(pt.y / 1000) * 100}%`;
        },
      }, 0);

      [0, 1, 2].forEach((i) => {
        const chips = root.querySelectorAll(`[data-chips="${i}"] [data-chip]`);
        tl.to(nodes[i], { scale: 1, duration: 0.15 }, i + 0.05)
          .call(() => nodes[i].classList.add("lit"), undefined, i + 0.1)
          .fromTo(chips, { autoAlpha: 0, scale: 0.6, y: 10 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.22, stagger: 0.05, ease: "power3.out" }, i + 0.15);
        if (i < 2) {
          tl.to(panels[i], { autoAlpha: 0, y: -30, duration: 0.22 }, i + 0.86)
            .fromTo(panels[i + 1], { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.24 }, i + 0.92);
        }
      });

      return () => { tl.scrollTrigger?.kill(); tl.kill(); };
    });
  }, { scope: outer });

  return (
    <section id="journey" className="relative">
      <div className="shell pb-4 pt-24 md:pt-32">
        <Reveal>
          <SectionHead
            eyebrow="The compliance journey"
            title="One continuous line from idea to scale."
            sub="Every business travels the same three acts. We walk the whole line with you — this is the route, and what we handle at each stretch."
          />
        </Reveal>
      </div>

      {/* ------- pinned version (lg, motion OK) ------- */}
      <div ref={outer} className="journey-pinned hidden">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="shell grid items-center gap-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[430px]">
              {JOURNEY.map((j, i) => (
                <div key={j.act} data-panel className="absolute inset-0 flex flex-col justify-center">
                  <p className="eyebrow eyebrow-accent">{ACT_META[j.act].label} — {ACT_META[j.act].title}</p>
                  <h3 className="t-h2 mt-4 max-w-md text-ink">
                    {i === 0 ? "Start your business." : i === 1 ? "Manage your business." : "Scale your business."}
                  </h3>
                  <p className="mt-5 max-w-md text-[1.0625rem] text-muted">{j.copy}</p>
                  <Link to="/services" className="group mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-bold text-accent-strong">
                    <span className="u-draw">See {ACT_META[j.act].title.toLowerCase()} services</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </div>
              ))}
            </div>

            <div className="relative h-[62vh] justify-self-center">
              <svg className="absolute inset-y-0 left-0 h-full w-[40px]" viewBox="0 0 40 1000" preserveAspectRatio="none">
                <path d={LINE_D} fill="none" stroke="var(--color-line)" strokeWidth="2" />
                <path ref={line} d={LINE_D} fill="none" stroke="var(--color-accent)" strokeWidth="2.5" />
              </svg>

              {JOURNEY.map((j, i) => (
                <div key={j.act} className="absolute left-[20px]" style={{ top: `${NODE_Y[i]}%` }}>
                  <div data-actnode className="-translate-x-1/2 -translate-y-1/2">
                    <span className="block h-4 w-4 rounded-full border-2 border-accent bg-paper transition-colors duration-300" />
                  </div>
                  <div data-chips={i} className={`absolute left-7 ${i === 2 ? "bottom-0" : "top-0"} w-[290px] space-y-2.5`}>
                    {j.nodes.map((n) => (
                      <span key={n} data-chip className="flex w-fit items-center gap-2 rounded-btn border border-line bg-paper px-3 py-1.5 text-[0.8125rem] font-semibold text-ink shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden /> {n}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div ref={marker} className="absolute left-[20px] top-0 -translate-x-1/2 -translate-y-1/2">
                <span className="pulse-dot block h-2.5 w-2.5 rounded-full bg-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------- static stepper (mobile / reduced motion) ------- */}
      <div className="journey-fallback shell pt-12">
        <ol className="space-y-12 border-l-2 border-accent pb-4 pl-8 md:pl-12">
          {JOURNEY.map((j, i) => (
            <li key={j.act} className="relative">
              <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-accent bg-paper md:-left-[57px]" aria-hidden />
              <p className="eyebrow eyebrow-accent">{ACT_META[j.act].label} — {ACT_META[j.act].title}</p>
              <h3 className="t-h3 mt-3 text-ink">
                {i === 0 ? "Start your business." : i === 1 ? "Manage your business." : "Scale your business."}
              </h3>
              <p className="mt-3 max-w-xl text-muted">{j.copy}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {j.nodes.map((n) => (
                  <li key={n} className="flex items-center gap-2 rounded-btn border border-line bg-elevated px-3 py-1.5 text-[0.8125rem] font-semibold text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden /> {n}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-2 pb-20 pl-8 text-[0.875rem] font-semibold text-accent-strong md:pl-12">
          …and the line ends where your next filing begins. <Link to="/services" className="u-draw">Browse all services →</Link>
        </p>
      </div>

      <style>{`
        @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
          .journey-fallback { display: none; }
          .journey-pinned { display: block; }
        }
        [data-actnode] span { transition: background-color 0.3s ease, box-shadow 0.3s ease; }
        [data-actnode].lit span {
          background: var(--color-accent);
          box-shadow: 0 0 0 6px var(--color-accent-wash);
        }
      `}</style>
    </section>
  );
}
