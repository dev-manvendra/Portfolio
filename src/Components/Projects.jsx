import { useMemo, useState } from "react";

// Edit this array — one object per project. The first one gets the featured
// treatment. "stack" also powers the filter chips above the grid.
const PROJECTS_DATA = [
  {
    category: "Web app",
    title: "Project One",
    description:
      "A longer description for your best or most recent project — what it does, the specific problem it solves, and any scale or usage worth mentioning. This one gets the featured slot.",
    stack: ["React", "Node.js", "PostgreSQL"],
    code: "https://github.com/yourhandle/project-one",
    demo: "https://project-one.example.com",
  },
  {
    category: "CLI tool",
    title: "Project Two",
    description:
      "One or two sentences on what it does and the specific problem it solves.",
    stack: ["Go"],
    code: "https://github.com/yourhandle/project-two",
    demo: null,
  },
  {
    category: "API / service",
    title: "Project Three",
    description:
      "One or two sentences on what it does and the specific problem it solves.",
    stack: ["Python", "PostgreSQL"],
    code: "https://github.com/yourhandle/project-three",
    demo: "https://project-three.example.com",
  },
  {
    category: "Mobile",
    title: "Project Four",
    description:
      "One or two sentences on what it does and the specific problem it solves.",
    stack: ["React Native"],
    code: "https://github.com/yourhandle/project-four",
    demo: null,
  },
];

// Cycles through these for the monogram tiles, keyed by index.
const MONOGRAMS = [
  { bg: "var(--accent)", fg: "#0e1124" },
  { bg: "rgba(110,231,200,.14)", fg: "var(--mint)" },
  { bg: "rgba(255,184,107,.14)", fg: "var(--warm)" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');

.pj{--bg:#0e1124;--panel:#161a33;--edge:#272c4f;--text:#e9ebfa;--dim:#9aa0c7;--accent:#8b9bff;--warm:#ffb86b;--mint:#6ee7c8;
  background:var(--bg);color:var(--text);font-family:'Inter',system-ui,sans-serif;line-height:1.6}
.pj *{box-sizing:border-box}
.pj a{color:inherit;text-decoration:none}
.pj :focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.pj-wrap{max-width:1120px;margin:0 auto;padding:72px 24px 96px}
.pj-tag{display:inline-flex;align-items:center;gap:10px;font:400 13px 'JetBrains Mono',monospace;color:var(--mint);
  border:1px solid var(--edge);border-radius:999px;padding:6px 14px;margin:0 0 24px}
.pj-dot{width:8px;height:8px;border-radius:50%;background:var(--mint);animation:pj-pulse 2s ease-in-out infinite}
.pj h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(2.5rem,6vw,4rem);line-height:1;letter-spacing:-.03em;margin:0 0 16px}
.pj-lead{color:var(--dim);max-width:58ch;margin:0 0 32px}
.pj-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:40px}
.pj-chip{font:400 12.5px 'JetBrains Mono',monospace;color:var(--dim);background:transparent;border:1px solid var(--edge);
  border-radius:999px;padding:7px 14px;cursor:pointer;transition:border-color .2s,color .2s,background .2s}
.pj-chip:hover{border-color:var(--accent);color:var(--text)}
.pj-chip[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:#0e1124}
.pj-card{display:flex;flex-direction:column;gap:14px;background:var(--panel);border:1px solid var(--edge);border-radius:14px;padding:26px;transition:border-color .2s}
.pj-card:hover{border-color:var(--accent)}
.pj-feat{flex-direction:row;gap:28px;padding:32px;margin-bottom:20px;border-left:3px solid var(--warm)}
.pj-mono{display:flex;flex:none;align-items:center;justify-content:center;border-radius:12px;font:800 1.4rem 'Bricolage Grotesque',sans-serif;width:52px;height:52px}
.pj-feat .pj-mono{width:76px;height:76px;font-size:2rem;border-radius:16px}
.pj-body{display:flex;flex:1;flex-direction:column;gap:14px;min-width:0}
.pj-head{display:flex;align-items:flex-start;gap:16px}
.pj-cat{font:400 12.5px 'JetBrains Mono',monospace;color:var(--mint);margin:0}
.pj h2{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:1.3rem;letter-spacing:-.01em;margin:2px 0 0}
.pj-feat h2{font-size:1.8rem}
.pj-desc{margin:0;color:var(--dim);font-size:15px;max-width:64ch}
.pj-stack{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0}
.pj-stack li{font:400 12px 'JetBrains Mono',monospace;color:var(--accent);background:rgba(139,155,255,.1);border-radius:6px;padding:3px 9px}
.pj-links{display:flex;gap:10px;margin-top:auto;padding-top:6px}
.pj-btn{display:inline-flex;font-weight:500;font-size:13.5px;border:1px solid var(--edge);border-radius:9px;padding:8px 16px;transition:border-color .2s,background .2s}
.pj-btn:hover{border-color:var(--accent);background:rgba(139,155,255,.08)}
.pj-btn.primary{background:var(--accent);border-color:var(--accent);color:#0e1124}
.pj-btn.primary:hover{background:#fff;border-color:#fff}
.pj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.pj-empty{padding:64px 0;text-align:center;font:400 14px 'JetBrains Mono',monospace;color:var(--dim)}
.pj-in{animation:pj-in .7s cubic-bezier(.2,.7,.2,1) both}
@keyframes pj-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes pj-pulse{50%{opacity:.35}}
@media (max-width:760px){
  .pj-wrap{padding:48px 20px 64px}
  .pj-grid{grid-template-columns:1fr}
  .pj-feat{flex-direction:column;gap:20px;padding:24px}
}
@media (prefers-reduced-motion:reduce){.pj *{animation:none!important}}
`;

function Monogram({ title, index }) {
  const m = MONOGRAMS[index % MONOGRAMS.length];
  return (
    <div className="pj-mono" style={{ background: m.bg, color: m.fg }} aria-hidden="true">
      {title.charAt(0)}
    </div>
  );
}

function Stack({ items }) {
  return (
    <ul className="pj-stack">
      {items.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  );
}

function Links({ project }) {
  return (
    <div className="pj-links">
      <a href={project.code} target="_blank" rel="noopener noreferrer" className="pj-btn primary">
        View code
      </a>
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="pj-btn">
          Live demo
        </a>
      )}
    </div>
  );
}

/**
 * Route component — renders page content only, so it can sit between your
 * Header and Footer.
 */
export default function Projects() {
  const [activeTag, setActiveTag] = useState("All");

  const tags = useMemo(() => {
    const unique = new Set(PROJECTS_DATA.flatMap((p) => p.stack));
    return ["All", ...unique];
  }, []);

  const [featured, ...rest] = PROJECTS_DATA;
  const filteredRest =
    activeTag === "All" ? rest : rest.filter((p) => p.stack.includes(activeTag));
  const showFeatured = activeTag === "All" || featured.stack.includes(activeTag);

  return (
    <div className="pj">
      <style>{CSS}</style>

      <section className="pj-wrap">
        <p className="pj-tag pj-in">
          <span className="pj-dot" />
          Selected work
        </p>
        <h1 className="pj-in" style={{ animationDelay: "80ms" }}>
          Projects
        </h1>
        <p className="pj-lead pj-in" style={{ animationDelay: "160ms" }}>
          A mix of shipped side projects and things built to learn something specific. Filter by
          stack, or browse everything below.
        </p>

        <div className="pj-chips pj-in" style={{ animationDelay: "220ms" }} role="group" aria-label="Filter by stack">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="pj-chip"
              aria-pressed={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {showFeatured && (
          <article className="pj-card pj-feat">
            <Monogram title={featured.title} index={0} />
            <div className="pj-body">
              <div>
                <p className="pj-cat">{featured.category} · featured</p>
                <h2>{featured.title}</h2>
              </div>
              <p className="pj-desc">{featured.description}</p>
              <Stack items={featured.stack} />
              <Links project={featured} />
            </div>
          </article>
        )}

        <div className="pj-grid">
          {filteredRest.map((project, i) => (
            <article key={project.title} className="pj-card">
              <div className="pj-head">
                <Monogram title={project.title} index={i + 1} />
                <div>
                  <p className="pj-cat">{project.category}</p>
                  <h2>{project.title}</h2>
                </div>
              </div>
              <p className="pj-desc">{project.description}</p>
              <Stack items={project.stack} />
              <Links project={project} />
            </article>
          ))}
        </div>

        {!showFeatured && filteredRest.length === 0 && (
          <p className="pj-empty">Nothing tagged "{activeTag}" yet.</p>
        )}
      </section>
    </div>
  );
}