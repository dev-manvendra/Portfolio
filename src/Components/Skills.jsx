// import Nav from "./Nav";

// Edit these groups. "level" is 1-4 and drives the small bar next to each skill.
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

function LevelBar({ level }) {
  return (
    <div className="flex gap-[3px]">
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-3.5 ${i <= level ? "bg-line-cyan" : "bg-paper-dim"}`}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      {/* <Nav /> */}

      <main className="mx-auto max-w-page px-8 pb-24">
        <section className="pt-16">
          <p className="mb-2 font-mono text-sm text-line-cyan">Toolkit</p>
          <h1 className="mb-3 font-display text-3xl font-semibold text-navy-deep">
            Skills
          </h1>
          <p className="mb-12 max-w-[60ch] leading-relaxed text-muted">
            Grouped by where I use them day to day. Bars are a rough sense of
            how much production or project time I've put in, not a
            certification.
          </p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {SKILLS_DATA.map((group) => (
              <div key={group.category} className="border border-line bg-white p-6">
                <h2 className="mb-4 border-b border-paper-dim pb-2.5 font-mono text-sm text-navy-deep">
                  {group.category}
                </h2>
                <ul className="m-0 flex list-none flex-col p-0">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between gap-3 py-2.5"
                    >
                      <span className="text-sm">{skill.name}</span>
                      <LevelBar level={skill.level} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
