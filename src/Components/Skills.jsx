import { useEffect, useState } from "react";

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

const GROUP_COLORS = [
  { solid: "#8b9bff", soft: "rgba(139,155,255,.14)", fg: "#8b9bff" },
  { solid: "#6ee7c8", soft: "rgba(110,231,200,.14)", fg: "#6ee7c8" },
  { solid: "#ffb86b", soft: "rgba(255,184,107,.14)", fg: "#ffb86b" },
  { solid: "#c4a8ff", soft: "rgba(196,168,255,.14)", fg: "#c4a8ff" },
];

// Keep the original fonts and custom animations; layout and component styling use Tailwind.
const ORIGINAL_DETAILS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');

.profile-skills { font-family: 'Inter', system-ui, sans-serif; line-height: 1.6; }
.profile-display { font-family: 'Bricolage Grotesque', sans-serif; }
.profile-mono { font-family: 'JetBrains Mono', monospace; }
.skills-in { animation: skills-in .7s cubic-bezier(.2,.7,.2,1) both; }
.skills-pulse { animation: skills-pulse 2s ease-in-out infinite; }
@keyframes skills-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes skills-pulse { 50% { opacity: .35; } }
.profile-skills :focus-visible { outline: 2px solid #8b9bff; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { .profile-skills * { animation: none !important; transition: none !important; } }
`;

function LevelBar({ level, mounted }) {
  return (
    <div className="flex shrink-0 gap-1" role="img" aria-label={`Level ${level} of 4`}>
      {[1, 2, 3, 4].map((n) => (
        <span
          key={n}
          className={`h-1.5 w-5 rounded-[3px] transition-colors duration-[400ms] ease-out ${
            mounted && n <= level ? "bg-[var(--skill-color)]" : "bg-[#272c4f]"
          }`}
          style={{ transitionDelay: `${n * 90}ms` }}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="profile-skills min-h-screen bg-[#0e1124] text-[#e9ebfa]">
      <style>{ORIGINAL_DETAILS_CSS}</style>

      <section className="mx-auto max-w-[1120px] px-5 py-12 pb-16 sm:px-6 sm:py-[72px] sm:pb-24">
        <p className="skills-in mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#272c4f] px-3.5 py-1.5 text-[13px] text-[#6ee7c8] profile-mono">
          <span className="skills-pulse h-2 w-2 rounded-full bg-[#6ee7c8]" />
          Toolkit
        </p>

        <h1
          className="skills-in mb-4 text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-none tracking-[-0.03em] profile-display"
          style={{ animationDelay: "80ms" }}
        >
          Skills
        </h1>

        <p className="skills-in mb-10 max-w-[58ch] text-[#9aa0c7]" style={{ animationDelay: "160ms" }}>
          Grouped by where I use them day to day. Bars are a rough sense of how much production or
          project time I've put in, not a certification.
        </p>

        <div className="grid grid-cols-1 gap-5 min-[761px]:grid-cols-2">
          {SKILLS_DATA.map((group, gi) => {
            const c = GROUP_COLORS[gi % GROUP_COLORS.length];
            return (
              <div
                key={group.category}
                className="rounded-[14px] border border-[#272c4f] border-t-[3px] bg-[#161a33] px-[26px] py-6"
                style={{ borderTopColor: c.solid, "--skill-color": c.solid, "--skill-soft": c.soft }}
              >
                <div className="mb-1 flex items-center gap-3.5 border-b border-[#272c4f] pb-4">
                  <div
                    className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[11px] text-[1.15rem] font-extrabold profile-display"
                    style={{ background: "var(--skill-soft)", color: c.fg }}
                    aria-hidden="true"
                  >
                    {group.category.charAt(0)}
                  </div>
                  <h2 className="m-0 text-[1.2rem] font-bold tracking-[-0.01em] profile-display">{group.category}</h2>
                </div>
                <ul className="m-0 list-none p-0">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center justify-between gap-4 py-[11px]">
                      <span className="text-[15px]">{skill.name}</span>
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
