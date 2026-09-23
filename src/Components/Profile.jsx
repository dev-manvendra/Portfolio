
// Edit everything below — this is the only place page copy lives.
const PROFILE_DATA = {
  eyebrow: "Software Engineering Student",
  nameLine1: "Manvendra",
  nameLine2: "",
  role: "Backend-leaning full-stack developer",
  bio:
    "I build things end to end — from data models and APIs to the interfaces on top of them. Currently in my final year, spending most nights on side projects and open-source issues rather than problem sets.",
  resumeUrl: "/Resume.docx",
  email: "manvendrajhansi1406@gmail.com",
  socials : [
    { label: "GitHub", url: "https://github.com/dev-manvendra" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/dev-manvendra/" },
    ],
 
  // stats: [
  //   { label: "LOCATION", value: "Delhi, IN" },
  //   { label: "FOCUS", value: "Distributed systems" },
  //   { label: "AVAILABLE", value: "Summer 2027" },
  //   { label: "STACK", value: "TS / Go / React" },
  // ],
  now: [
    {
      title: "Education",
      body: "B.Tech in Computer Science, Class of 2027 — coursework in systems, algorithms, and databases.",
    },
    {
      title: "Currently learning",
      body: "Distributed systems fundamentals and Go, alongside a side project on real-time data pipelines.",
    },
  ],
};

export default function Profile() {
  const {
    eyebrow,
    nameLine1,
    nameLine2,
    role,
    bio,
    resumeUrl,
    email,
    socials,
    // stats,
    now,
  } = PROFILE_DATA;

  return (
    <div className="min-h-screen bg-paper text-ink font-body">

      {/* Hero — full height, dark, one-time entrance sequence */}
      <section className="relative flex min-h-[86vh] flex-col justify-center overflow-hidden bg-navy-deep bg-dot-grid text-paper">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #e2a63b, transparent 70%)" }}
        />

        <div className="relative mx-auto w-full max-w-page px-8 py-24">
          <p
            className="animate-reveal mb-5 font-mono text-sm text-line-cyan"
            style={{ animationDelay: "0ms" }}
          >
            {eyebrow}
          </p>

          <h1 className="mb-6 font-display text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[0.95]">
            <span
              className="animate-reveal block"
              style={{ animationDelay: "80ms" }}
            >
              {nameLine1}
            </span>
            <span
              className="animate-reveal block text-line-cyan"
              style={{ animationDelay: "180ms" }}
            >
              {nameLine2}
            </span>
          </h1>

          <p
            className="animate-reveal mb-6 text-xl text-paper/70"
            style={{ animationDelay: "280ms" }}
          >
            {role}
          </p>

          <p
            className="animate-reveal mb-10 max-w-[56ch] leading-relaxed text-paper/80"
            style={{ animationDelay: "360ms" }}
          >
            {bio}
          </p>

          <div
            className="animate-reveal flex flex-wrap gap-3.5"
            style={{ animationDelay: "440ms" }}
          >
            <a
              href={resumeUrl}
              className="inline-flex items-center gap-2 bg-signal px-6 py-3 font-mono text-sm text-navy-deep transition-colors hover:bg-white"
            >
              Download Resume
            </a>
            <a
              href={`mailto:${email}`}
              target="_blank"
              className="inline-flex items-center gap-2 border border-paper/30 px-6 py-3 font-mono text-sm text-paper transition-colors hover:border-paper hover:bg-paper/5"
            >
              {email}
            </a>
            {socials.map((s) => (
              <a 
                target="_blank"
                rel="noopener noreferrer"
                key={s.label}
                href={s.url}
                className="inline-flex items-center gap-2 border border-paper/30 px-6 py-3 font-mono text-sm text-paper transition-colors hover:border-paper hover:bg-paper/5"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="font-mono text-[0.65rem] tracking-wide text-paper/40">SCROLL</span>
          <span className="h-8 w-px bg-paper/20" />
          <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-line-cyan" />
        </div>
      </section>

      {/* Stat strip */}
      {/* <section className="border-b border-line">
        <div className="mx-auto grid max-w-page grid-cols-2 divide-x divide-y divide-line border-t border-line md:grid-cols-4 md:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="px-8 py-7">
              <p className="mb-2 font-mono text-xs text-line-cyan">{stat.label}</p>
              <p className="font-display text-lg font-medium">{stat.value}</p>
            </div>
          ))}
        </div>
      </section> */}

      <main className="mx-auto max-w-page px-8 pb-24">
        <section className="pt-20">
          <p className="mb-2 font-mono text-sm text-line-cyan">Right now</p>
          <h2 className="mb-10 font-display text-3xl font-semibold text-navy-deep">
            Background
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {now.map((item) => (
              <div key={item.title} className="border-l-2 border-signal pl-5">
                <h3 className="mb-1.5 font-display text-lg">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}