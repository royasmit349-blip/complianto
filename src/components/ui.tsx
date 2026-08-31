import { useEffect, type ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronDown, X } from "lucide-react";

/* ---------- section heading block ---------- */
export function SectionHead({
  eyebrow, title, sub, dark, center,
}: {
  eyebrow: string; title: string; sub?: string; dark?: boolean; center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${dark ? "!text-accent-soft" : "eyebrow-accent"}`}>{eyebrow}</p>
      <h2 className={`t-h2 mt-3 ${dark ? "text-paper" : "text-ink"}`}>{title}</h2>
      {sub && <p className={`mt-4 text-[1.0625rem] ${dark ? "text-paper/70" : "text-muted"}`}>{sub}</p>}
    </div>
  );
}

/* ---------- accessible accordion ---------- */
export function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className="border-t border-line">
      {items.map((it, i) => (
        <AccordionPrimitive.Item key={it.q} value={String(i)} className="border-b border-line">
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left t-h4 text-ink transition-colors hover:text-accent-strong">
              {it.q}
              <ChevronDown
                className="h-5 w-5 shrink-0 text-muted transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent-strong"
                aria-hidden
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-[accUp_.28s_ease] data-[state=open]:animate-[accDown_.28s_ease]">
            <p className="pb-6 pr-8 text-muted">{it.a}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
      <style>{`@keyframes accDown{from{height:0}to{height:var(--radix-accordion-content-height)}}@keyframes accUp{from{height:var(--radix-accordion-content-height)}to{height:0}}`}</style>
    </AccordionPrimitive.Root>
  );
}

/* ---------- focus-trapped modal ---------- */
export function Modal({
  open, onOpenChange, title, children,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[110] bg-ink/50 data-[state=open]:animate-[fadeIn_.25s_ease]" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-[120] max-h-[88vh] w-[min(94vw,620px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-panel border border-line bg-paper p-6 shadow-[0_32px_80px_-24px_rgba(10,10,10,0.4)] data-[state=open]:animate-[popIn_.3s_cubic-bezier(.22,1,.36,1)] md:p-8"
          aria-describedby={undefined}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <DialogPrimitive.Title className="t-h3 text-ink">{title}</DialogPrimitive.Title>
            <DialogPrimitive.Close
              className="rounded-card border border-line p-2 text-muted transition-colors hover:border-ink hover:text-ink"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
      <style>{`@keyframes fadeIn{from{opacity:0}}@keyframes popIn{from{opacity:0;transform:translate(-50%,-46%) scale(.97)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}`}</style>
    </DialogPrimitive.Root>
  );
}

/* ---------- JSON-LD ---------- */
export function JsonLd({ json }: { json: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
