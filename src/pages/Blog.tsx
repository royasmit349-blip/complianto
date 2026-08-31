import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "../data/site";
import { usePageMeta } from "../lib/seo";
import { Reveal, Stagger } from "../lib/motion";
import { JsonLd, SectionHead } from "../components/ui";
import NotFound from "./NotFound";

export function BlogIndex() {
  usePageMeta(
    "Compliance Guides & Updates — Complianto Blog",
    "Plain-language guides on INC-20A, Section 80-IAC, GST registration and the filings that trip Indian founders up — from the Complianto team.",
  );
  return (
    <div className="shell py-16 md:py-24">
      <Reveal>
        <SectionHead
          eyebrow="Blog"
          title="Guides, minus the legalese."
          sub="Short, practical reads on the filings and deadlines that actually affect your business."
        />
      </Reveal>
      <Stagger className="mt-14 space-y-5">
        {BLOG_POSTS.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="group card grid gap-6 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent md:grid-cols-[auto_1fr_auto] md:items-center">
            <span className="w-28 shrink-0">
              <span className="block font-display text-[1.75rem] font-black leading-none text-ink">{p.date.split(" ")[0]}</span>
              <span className="block text-[0.75rem] font-semibold uppercase tracking-widest text-muted">{p.date.split(" ").slice(1).join(" ")}</span>
            </span>
            <span>
              <span className="eyebrow eyebrow-accent">{p.category} · {p.readMins} min read</span>
              <span className="t-h3 mt-2 block text-ink"><span className="u-draw">{p.title}</span></span>
              <span className="mt-2 block max-w-2xl text-[0.9375rem] text-muted">{p.excerpt}</span>
            </span>
            <ArrowRight className="hidden h-5 w-5 shrink-0 text-accent-strong transition-transform group-hover:translate-x-1 md:block" aria-hidden />
          </Link>
        ))}
      </Stagger>
    </div>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  usePageMeta(
    post ? `${post.title} | Complianto Blog` : "Article not found | Complianto",
    post?.excerpt,
  );
  if (!post) return <NotFound />;

  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug);

  return (
    <article className="relative">
      <nav className="shell pt-8" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] font-semibold text-muted">
          <li><Link to="/" className="hover:text-accent-strong">Home</Link></li>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <li><Link to="/blog" className="hover:text-accent-strong">Blog</Link></li>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <li aria-current="page" className="text-ink">{post.title}</li>
        </ol>
      </nav>

      <header className="shell max-w-3xl pb-12 pt-10">
        <Reveal>
          <p className="eyebrow eyebrow-accent">{post.category} · {post.readMins} min read</p>
          <h1 className="t-h2 mt-4 text-ink">{post.title}</h1>
          <p className="mt-4 text-[1.0625rem] text-muted">{post.excerpt}</p>
          <p className="mt-6 border-l-2 border-accent pl-4 text-[0.8125rem] font-semibold text-muted">
            By the Complianto team · {post.date}
          </p>
        </Reveal>
      </header>

      <div className="shell max-w-3xl space-y-10 pb-20">
        {post.body.map((sec, i) => (
          <Reveal key={i}>
            <section>
              {sec.heading && <h2 className="t-h3 mb-4 text-ink">{sec.heading}</h2>}
              {sec.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mb-4 text-[1.0rem] leading-[1.8] text-ink/85">{p}</p>
              ))}
            </section>
          </Reveal>
        ))}

        <Reveal>
          <div className="card rounded-panel bg-accent-wash/60 p-8">
            <p className="t-h4 text-ink">Want this handled for you?</p>
            <p className="mt-2 text-[0.9375rem] text-muted">
              One free consultation, and the calendar entry this article warns about is already taken care of.
            </p>
            <Link to="/contact" className="btn btn-primary mt-5">Get free consultation <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </div>
        </Reveal>

        <section className="border-t border-line pt-10">
          <p className="eyebrow">Keep reading</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {others.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group card p-6 transition-all hover:-translate-y-1 hover:border-accent">
                <p className="eyebrow eyebrow-accent">{p.category}</p>
                <h3 className="t-h4 mt-3 text-ink"><span className="u-draw">{p.title}</span></h3>
                <p className="mt-2 text-[0.8125rem] text-muted">{p.date} · {p.readMins} min read</p>
              </Link>
            ))}
          </div>
          <Link to="/blog" className="mt-8 inline-flex items-center gap-2 text-[0.875rem] font-bold text-accent-strong">
            <ArrowLeft className="h-4 w-4" aria-hidden /> All articles
          </Link>
        </section>
      </div>

      <JsonLd
        json={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.date,
          author: { "@type": "Organization", name: "Complianto Consulting" },
          publisher: { "@type": "Organization", name: "Complianto Consulting" },
          description: post.excerpt,
          mainEntityOfPage: `https://complianto.in/blog/${post.slug}`,
        }}
      />
    </article>
  );
}
