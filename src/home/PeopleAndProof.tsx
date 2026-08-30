import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { TEAM, TESTIMONIALS } from "../data/site";
import { prefersReduced } from "../lib/gsap";
import { Reveal, Stagger } from "../lib/motion";
import { SectionHead } from "../components/ui";

function Team() {
  return (
    <section id="team" className="relative py-24 md:py-40">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow="The team"
            title="The people behind your compliance"
            sub="At Complianto Consulting, our experts are committed to guiding and empowering you on your startup journey."
          />
        </Reveal>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((t) => (
            <div key={t.role} className="group card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent-wash bg-accent-wash font-display text-[1.125rem] font-black text-accent-strong transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                {t.initials}
              </span>
              <h3 className="t-h4 mt-5 text-ink">{t.role}</h3>
              <p className="mt-2 text-[0.875rem] text-muted">{t.line}</p>
              <button
                onClick={() => document.getElementById("consult")?.scrollIntoView({ behavior: "smooth" })}
                className="u-draw mt-5 text-[0.8125rem] font-bold text-accent-strong"
              >
                Talk to this team →
              </button>
            </div>
          ))}
        </Stagger>
        <Reveal delay={0.1}>
          <p className="mt-8 text-[0.8125rem] text-muted/80">
            Individual bios and photographs are being published — meet the whole team on a free consultation call.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const viewport = useRef<HTMLDivElement | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSelected(emblaApi.selectedScrollSnap()));
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  /* auto-advance — pauses on hover and on focus, honours reduced motion */
  useEffect(() => {
    if (!emblaApi || prefersReduced()) return;
    let id = window.setInterval(() => emblaApi.scrollNext(), 6000);
    const el = viewport.current;
    const pause = () => window.clearInterval(id);
    const play = () => { window.clearInterval(id); id = window.setInterval(() => emblaApi.scrollNext(), 6000); };
    el?.addEventListener("pointerenter", pause);
    el?.addEventListener("pointerleave", play);
    el?.addEventListener("focusin", pause);
    el?.addEventListener("focusout", play);
    return () => {
      window.clearInterval(id);
      el?.removeEventListener("pointerenter", pause);
      el?.removeEventListener("pointerleave", play);
      el?.removeEventListener("focusin", pause);
      el?.removeEventListener("focusout", play);
    };
  }, [emblaApi]);

  return (
    <section id="testimonials" className="relative border-t border-line bg-elevated/50 py-24 md:py-40">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHead eyebrow="Client proof" title="What our clients say" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex gap-2">
              <button onClick={scrollPrev} className="rounded-btn border border-line bg-paper p-3 text-ink transition-colors hover:border-accent hover:text-accent-strong" aria-label="Previous testimonial">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button onClick={scrollNext} className="rounded-btn border border-line bg-paper p-3 text-ink transition-colors hover:border-accent hover:text-accent-strong" aria-label="Next testimonial">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div
            ref={(node) => { viewport.current = node; emblaRef(node); }}
            className="mt-12 overflow-hidden"
          >
            <div className="flex">
              {TESTIMONIALS.map((t, i) => (
                <article
                  key={t.quote}
                  className={`card mr-5 flex w-[min(85vw,440px)] shrink-0 flex-col p-8 transition-all duration-500 ${i === selected ? "border-accent shadow-[0_24px_60px_-30px_rgba(81,71,219,0.4)]" : "opacity-70"}`}
                >
                  <Quote className="h-7 w-7 text-accent" aria-hidden />
                  <blockquote className="t-h4 mt-5 flex-1 text-ink">“{t.quote}”</blockquote>
                  <footer className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-wash font-display text-[0.875rem] font-black text-accent-strong" aria-hidden>
                      VC
                    </span>
                    <div>
                      <p className="text-[0.8125rem] font-bold text-ink">Verified client</p>
                      <p className="text-[0.75rem] text-muted">{t.meta} · {t.city}</p>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-7 flex justify-center gap-2" role="tablist" aria-label="Testimonial slides">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === selected}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === selected ? "w-8 bg-accent" : "w-2 bg-line hover:bg-muted/50"}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function PeopleAndProof() {
  return (
    <>
      <Team />
      <Testimonials />
    </>
  );
}
