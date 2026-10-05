import { useEffect, useState } from "react";

// Edit these groups. "level" is 1-4 and drives how many segments fill.
const SKILLS_DATA = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript / TypeScript", level: 4 },
      { name: "Python", level: 4 },
      { name: "Go", level: 2 },
      { name: "C++", level: 3 },
    ],
  },
  {
    category: "Frameworks",
    skills: [
      { name: "React", level: 4 },
      { name: "Node.js / Express", level: 4 },
      { name: "FastAPI", level: 3 },
      { name: "React Native", level: 2 },
    ],
  },
  {
    category: "Data & infra",
    skills: [
      { name: "PostgreSQL", level: 3 },
      { name: "Redis", level: 2 },
      { name: "Docker", level: 3 },
      { name: "AWS", level: 2 },
    ],
  },
  {
    category: "Tools & practice",
    skills: [
      { name: "Git", level: 4 },
      { name: "Testing (Jest/PyTest)", level: 3 },
      { name: "CI/CD", level: 2 },
      { name: "Linux", level: 3 },
    ],
  },
];

// One accent per group, cycled by index.
const GROUP_COLORS = [
  { solid: "#8b9bff", soft: "rgba(139,155,255,.14)", fg: "#8b9bff" },
  { solid: "#6ee7c8", soft: "rgba(110,231,200,.14)", fg: "#6ee7c8" },
  { solid: "#ffb86b", soft: "rgba(255,184,107,.14)", fg: "#ffb86b" },
  { solid: "#c4a8ff", soft: "rgba(196,168,255,.14)", fg: "#c4a8ff" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');

.sk{--bg:#0e1124;--panel:#161a33;--edge:#272c4f;--text:#e9ebfa;--dim:#9aa0c7;--mint:#6ee7c8;
  background:var(--bg);color:var(--text);font-family:'Inter',system-ui,sans-serif;line-height:1.6}
.sk *{box-sizing:border-box}
.sk-wrap{max-width:1120px;margin:0 auto;padding:72px 24px 96px}
.sk-tag{display:inline-flex;align-items:center;gap:10px;font:400 13px 'JetBrains Mono',monospace;color:var(--mint);
  border:1px solid var(--edge);border-radius:999px;padding:6px 14px;margin:0 0 24px}
.sk-dot{width:8px;height:8px;border-radius:50%;background:var(--mint);animation:sk-pulse 2s ease-in-out infinite}
.sk h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(2.5rem,6vw,4rem);line-height:1;letter-spacing:-.03em;margin:0 0 16px}
.sk-lead{color:var(--dim);max-width:58ch;margin:0 0 40px}
.sk-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.sk-card{background:var(--panel);border:1px solid var(--edge);border-radius:14px;padding:24px 26px;border-top:3px solid var(--c)}
.sk-head{display:flex;align-items:center;gap:14px;padding-bottom:16px;margin-bottom:6px;border-bottom:1px solid var(--edge)}
.sk-mono{display:flex;flex:none;align-items:center;justify-content:center;width:42px;height:42px;border-radius:11px;
  font:800 1.15rem 'Bricolage Grotesque',sans-serif;background:var(--soft);color:var(--c)}
.sk h2{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:1.2rem;letter-spacing:-.01em;margin:0}
.sk-list{list-style:none;margin:0;padding:0}
.sk-row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:11px 0}
.sk-name{font-size:15px}
.sk-bar{display:flex;gap:4px;flex:none}
.sk-seg{width:20px;height:6px;border-radius:3px;background:var(--edge);transition:background .4s ease-out}
.sk-seg.on{background:var(--c)}
.sk-in{animation:sk-in .7s cubic-bezier(.2,.7,.2,1) both}
@keyframes sk-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes sk-pulse{50%{opacity:.35}}
@media (max-width:760px){
  .sk-wrap{padding:48px 20px 64px}
  .sk-grid{grid-template-columns:1fr}
}
@media (prefers-reduced-motion:reduce){.sk *{animation:none!important;transition:none!important}}
`;

function LevelBar({ level, mounted }) {
  return (
    <div className="sk-bar" role="img" aria-label={`Level ${level} of 4`}>
      {[1, 2, 3, 4].map((n) => (
        <span
          key={n}
          className={`sk-seg${mounted && n <= level ? " on" : ""}`}
          style={{ transitionDelay: `${n * 90}ms` }}
        />
      ))}
    </div>
  );
}

/**
 * Route component — renders page content only, so it can sit between your
 * Header and Footer.
 */
export default function Skills() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="sk">
      <style>{CSS}</style>

      <section className="sk-wrap">
        <p className="sk-tag sk-in">
          <span className="sk-dot" />
          Toolkit
        </p>
        <h1 className="sk-in" style={{ animationDelay: "80ms" }}>
          Skills
        </h1>
        <p className="sk-lead sk-in" style={{ animationDelay: "160ms" }}>
          Grouped by where I use them day to day. Bars are a rough sense of how much production or
          project time I've put in, not a certification.
        </p>

        <div className="sk-grid">
          {SKILLS_DATA.map((group, gi) => {
            const c = GROUP_COLORS[gi % GROUP_COLORS.length];
            return (
              <div
                key={group.category}
                className="sk-card"
                style={{ "--c": c.solid, "--soft": c.soft }}
              >
                <div className="sk-head">
                  <div className="sk-mono" aria-hidden="true">
                    {group.category.charAt(0)}
                  </div>
                  <h2>{group.category}</h2>
                </div>
                <ul className="sk-list">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="sk-row">
                      <span className="sk-name">{skill.name}</span>
                      <LevelBar level={skill.level} mounted={mounted} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}