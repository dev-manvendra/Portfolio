import { useMemo, useState } from "react";

// Edit this array — one object per project. The first one gets the featured
// treatment. "stack" also powers the filter chips above the grid.
const PROJECTS_DATA = [
  {
    category: "WEB APP",
    title: "Project One",
    description:
      "A longer description for your best or most recent project — what it does, the specific problem it solves, and any scale or usage worth mentioning. This one gets the featured slot.",
    stack: ["React", "Node.js", "PostgreSQL"],
    code: "https://github.com/yourhandle/project-one",
    demo: "https://project-one.example.com",
  },
  {
    category: "CLI TOOL",
    title: "Project Two",
    description:
      "One or two sentences on what it does and the specific problem it solves.",
    stack: ["Go"],
    code: "https://github.com/yourhandle/project-two",
    demo: null,
  },
  {
    category: "API / SERVICE",
    title: "Project Three",
    description:
      "One or two sentences on what it does and the specific problem it solves.",
    stack: ["Python", "PostgreSQL"],
    code: "https://github.com/yourhandle/project-three",
    demo: "https://project-three.example.com",
  },
  {
    category: "MOBILE",
    title: "Project Four",
    description:
      "One or two sentences on what it does and the specific problem it solves.",
    stack: ["React Native"],
    code: "https://github.com/yourhandle/project-four",
    demo: null,
  },
];

// Cycles through these for the monogram tiles, keyed by index.
const MONOGRAM_STYLES = [
  "bg-navy-deep text-paper",
  "bg-line-cyan/20 text-navy-deep",
  "bg-signal/20 text-navy-deep",
];

function Monogram({ title, index, size = "h-14 w-14 text-xl" }) {
  return (
    <div
      className={`flex ${size} shrink-0 items-center justify-center font-display font-semibold ${MONOGRAM_STYLES[index % MONOGRAM_STYLES.length]}`}
    >
      {title.charAt(0)}
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
    activeTag === "All"
      ? rest
      : rest.filter((p) => p.stack.includes(activeTag));
  const showFeatured = activeTag === "All" || featured.stack.includes(activeTag);

  return (
    <div className="min-h-screen bg-paper text-ink font-body">

      <main className="mx-auto max-w-page px-8 pb-24">
        <section className="pt-16">
          <p className="mb-2 font-mono text-sm text-line-cyan">Selected work</p>
          <h1 className="mb-3 font-display text-3xl font-semibold text-navy-deep">
            Projects
          </h1>
          <p className="mb-10 max-w-[60ch] leading-relaxed text-muted">
            A mix of shipped side projects and things built to learn something
            specific. Filter by stack, or browse everything below.
          </p>

          <div className="mb-12 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`font-mono text-xs px-3.5 py-2 border transition-colors ${
                  activeTag === tag
                    ? "border-navy-deep bg-navy-deep text-paper"
                    : "border-line text-muted hover:border-navy-deep hover:text-navy-deep"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Featured project */}
          {showFeatured && (
            <article className="mb-6 flex flex-col gap-6 border border-line bg-white p-8 md:flex-row md:items-start">
              <Monogram title={featured.title} index={0} size="h-20 w-20 text-3xl" />
              <div className="flex flex-1 flex-col gap-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-mono text-[0.7rem] tracking-wide text-line-cyan">
                      {featured.category} · FEATURED
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-navy-deep">
                      {featured.title}
                    </h2>
                  </div>
                </div>
                <p className="max-w-[65ch] text-sm leading-relaxed text-muted">
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {featured.stack.map((tech) => (
                    <span key={tech} className="tag-chip">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-1">
                  <a
                    href={featured.code}
                    className="border-b border-navy-deep font-mono text-sm text-navy-deep hover:border-line-cyan hover:text-line-cyan"
                  >
                    Code
                  </a>
                  {featured.demo && (
                    <a
                      href={featured.demo}
                      className="border-b border-navy-deep font-mono text-sm text-navy-deep hover:border-line-cyan hover:text-line-cyan"
                    >
                      Live demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          )}

          {/* Rest of the projects */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredRest.map((project, i) => (
              <article
                key={project.title}
                className="flex flex-col gap-3.5 border border-line bg-white p-6 transition-colors hover:border-line-cyan"
              >
                <div className="flex items-start gap-4">
                  <Monogram title={project.title} index={i + 1} />
                  <div>
                    <p className="font-mono text-[0.7rem] tracking-wide text-line-cyan">
                      {project.category}
                    </p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-navy-deep">
                      {project.title}
                    </h2>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tag-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex gap-4 pt-2">
                  <a
                    href={project.code}
                    className="border-b border-navy-deep font-mono text-sm text-navy-deep hover:border-line-cyan hover:text-line-cyan"
                  >
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="border-b border-navy-deep font-mono text-sm text-navy-deep hover:border-line-cyan hover:text-line-cyan"
                    >
                      Live demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {!showFeatured && filteredRest.length === 0 && (
            <p className="py-16 text-center font-mono text-sm text-muted">
              Nothing tagged "{activeTag}" yet.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}