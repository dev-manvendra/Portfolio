// import Nav from "./Nav";

// Edit this array — one object per project.
const PROJECTS_DATA = [
  {
    category: "WEB APP",
    title: "Project One",
    description:
      "One or two sentences on what it does and the specific problem it solves. Mention scale or usage if relevant.",
    stack: ["React", "Node.js", "PostgreSQL"],
    code: "https://github.com/yourhandle/project-one",
    demo: "https://project-one.example.com",
  },
  {
    category: "CLI TOOL",
    title: "Project Two",
    description:
      "One or two sentences on what it does and the specific problem it solves. Mention scale or usage if relevant.",
    stack: ["Go", "Cobra"],
    code: "https://github.com/yourhandle/project-two",
    demo: null,
  },
  {
    category: "API / SERVICE",
    title: "Project Three",
    description:
      "One or two sentences on what it does and the specific problem it solves. Mention scale or usage if relevant.",
    stack: ["Python", "FastAPI", "Redis"],
    code: "https://github.com/yourhandle/project-three",
    demo: "https://project-three.example.com",
  },
  {
    category: "MOBILE",
    title: "Project Four",
    description:
      "One or two sentences on what it does and the specific problem it solves. Mention scale or usage if relevant.",
    stack: ["React Native", "Firebase"],
    code: "https://github.com/yourhandle/project-four",
    demo: null,
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      {/* <Nav /> */}

      <main className="mx-auto max-w-page px-8 pb-24">
        <section className="pt-16">
          <p className="mb-2 font-mono text-sm text-line-cyan">Selected work</p>
          <h1 className="mb-3 font-display text-3xl font-semibold text-navy-deep">
            Projects
          </h1>
          <p className="mb-12 max-w-[60ch] leading-relaxed text-muted">
            A mix of shipped side projects and things built to learn something
            specific — each one links to the code, and to a live version where
            there is one.
          </p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {PROJECTS_DATA.map((project) => (
              <article
                key={project.title}
                className="flex flex-col gap-3.5 border border-line bg-white p-6 transition-colors hover:border-line-cyan"
              >
                <div>
                  <p className="font-mono text-[0.7rem] tracking-wide text-line-cyan">
                    {project.category}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-semibold text-navy-deep">
                    {project.title}
                  </h2>
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
        </section>
      </main>
    </div>
  );
}
