import { useMemo, useState } from "react";

const PROJECTS_DATA = [
  {
    category: "Web app",
    title: "StreaTube",
    description: "A video streaming platform where user post and watch vidoes.",
    stack: ["React", "Node.js", "MongoDB, Express.js"],
    code: "https://github.com/yourhandle/project-one",
    demo: "https://project-one.example.com",
  },
  {
    category: "Web app",
    title: "Password-Generator",
    description: "This is clean and responsive react app to generate password",
    stack: ["React","TailwindCSS"],
    code: "https://github.com/yourhandle/project-two",
    demo: null,
  },
  {
    category: "API / service",
    title: "Project Three",
    description: "One or two sentences on what it does and the specific problem it solves.",
    stack: ["Python", "PostgreSQL"],
    code: "https://github.com/yourhandle/project-three",
    demo: "https://project-three.example.com",
  },
  {
    category: "Mobile",
    title: "Project Four",
    description: "One or two sentences on what it does and the specific problem it solves.",
    stack: ["React Native"],
    code: "https://github.com/yourhandle/project-four",
    demo: null,
  },
];

const MONOGRAMS = [
  { bg: "#8b9bff", fg: "#0e1124" },
  { bg: "rgba(110,231,200,.14)", fg: "#6ee7c8" },
  { bg: "rgba(255,184,107,.14)", fg: "#ffb86b" },
];

// Keep the original fonts and custom animations; layout and component styling use Tailwind.
const ORIGINAL_DETAILS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');

.profile-projects { font-family: 'Inter', system-ui, sans-serif; line-height: 1.6; }
.profile-display { font-family: 'Bricolage Grotesque', sans-serif; }
.profile-mono { font-family: 'JetBrains Mono', monospace; }
.project-in { animation: project-in .7s cubic-bezier(.2,.7,.2,1) both; }
.project-pulse { animation: project-pulse 2s ease-in-out infinite; }
@keyframes project-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes project-pulse { 50% { opacity: .35; } }
.profile-projects :focus-visible { outline: 2px solid #8b9bff; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { .profile-projects * { animation: none !important; } }
`;

function Monogram({ title, index, featured = false }) {
  const m = MONOGRAMS[index % MONOGRAMS.length];
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-xl font-extrabold profile-display ${
        featured ? "h-[76px] w-[76px] rounded-2xl text-[2rem]" : "h-[52px] w-[52px] text-[1.4rem]"
      }`}
      style={{ background: m.bg, color: m.fg }}
      aria-hidden="true"
    >
      {title.charAt(0)}
    </div>
  );
}

function Stack({ items }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
      {items.map((tech) => (
        <li
          key={tech}
          className="rounded-md bg-[rgba(139,155,255,0.1)] px-[9px] py-[3px] text-xs text-[#8b9bff] profile-mono"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function Links({ project }) {
  const base =
    "mt-auto inline-flex items-center rounded-[9px] border border-[#272c4f] px-4 py-2 text-[13.5px] font-medium transition-colors duration-200 hover:border-[#8b9bff] hover:bg-[rgba(139,155,255,0.08)]";
  return (
    <div className="mt-auto flex gap-2.5 pt-1.5">
      <a
        href={project.code}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border-[#8b9bff] bg-[#8b9bff] text-[#0e1124] hover:border-white hover:bg-white`}
      >
        View code
      </a>
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className={base}>
          Live demo
        </a>
      )}
    </div>
  );
}

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
    <div className="profile-projects min-h-screen bg-[#0e1124] text-[#e9ebfa]">
      <style>{ORIGINAL_DETAILS_CSS}</style>

      <section className="mx-auto max-w-[1120px] px-5 py-12 pb-16 sm:px-6 sm:py-[72px] sm:pb-24">
        <p className="project-in mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#272c4f] px-3.5 py-1.5 text-[13px] text-[#6ee7c8] profile-mono">
          <span className="project-pulse h-2 w-2 rounded-full bg-[#6ee7c8]" />
          Selected work
        </p>

        <h1 className="project-in mb-4 text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-none tracking-[-0.03em] profile-display" style={{ animationDelay: "80ms" }}>
          Projects
        </h1>

        <p className="project-in mb-8 max-w-[58ch] text-[#9aa0c7]" style={{ animationDelay: "160ms" }}>
          A mix of shipped side projects and things built to learn something specific. Filter by
          stack, or browse everything below.
        </p>

        <div
          className="project-in mb-10 flex flex-wrap gap-2"
          style={{ animationDelay: "220ms" }}
          role="group"
          aria-label="Filter by stack"
        >
          {tags.map((tag) => {
            const selected = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                className={`rounded-full border px-3.5 py-[7px] text-[12.5px] transition-colors duration-200 profile-mono ${
                  selected
                    ? "border-[#8b9bff] bg-[#8b9bff] text-[#0e1124]"
                    : "border-[#272c4f] bg-transparent text-[#9aa0c7] hover:border-[#8b9bff] hover:text-[#e9ebfa]"
                }`}
                aria-pressed={selected}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {showFeatured && (
          <article className="mb-5 flex flex-col gap-5 rounded-[14px] border border-[#272c4f] border-l-[3px] border-l-[#ffb86b] bg-[#161a33] p-6 transition-colors duration-200 hover:border-[#8b9bff] sm:flex-row sm:gap-7 sm:p-8">
            <Monogram title={featured.title} index={0} featured />
            <div className="flex min-w-0 flex-1 flex-col gap-3.5">
              <div>
                <p className="m-0 text-[12.5px] text-[#6ee7c8] profile-mono">{featured.category} · featured</p>
                <h2 className="mt-0.5 text-[1.8rem] font-bold tracking-[-0.01em] profile-display">{featured.title}</h2>
              </div>
              <p className="m-0 max-w-[64ch] text-[15px] text-[#9aa0c7]">{featured.description}</p>
              <Stack items={featured.stack} />
              <Links project={featured} />
            </div>
          </article>
        )}

        <div className="grid grid-cols-1 gap-5 min-[761px]:grid-cols-2">
          {filteredRest.map((project, i) => (
            <article
              key={project.title}
              className="flex flex-col gap-3.5 rounded-[14px] border border-[#272c4f] bg-[#161a33] p-[26px] transition-colors duration-200 hover:border-[#8b9bff]"
            >
              <div className="flex items-start gap-4">
                <Monogram title={project.title} index={i + 1} />
                <div>
                  <p className="m-0 text-[12.5px] text-[#6ee7c8] profile-mono">{project.category}</p>
                  <h2 className="mt-0.5 text-[1.3rem] font-bold tracking-[-0.01em] profile-display">{project.title}</h2>
                </div>
              </div>
              <p className="m-0 max-w-[64ch] text-[15px] text-[#9aa0c7]">{project.description}</p>
              <Stack items={project.stack} />
              <Links project={project} />
            </article>
          ))}
        </div>

        {!showFeatured && filteredRest.length === 0 && (
          <p className="py-16 text-center text-sm text-[#9aa0c7] profile-mono">
            Nothing tagged "{activeTag}" yet.
          </p>
        )}
      </section>
    </div>
  );
}
