// import Nav from "./Nav";

// Edit everything below — this is the only place page copy lives.
const PROFILE_DATA = {
  eyebrow: "Software Engineering Student",
  name: "Your Name",
  role: "Backend-leaning full-stack developer",
  bio:
    "I build things end to end — from data models and APIs to the interfaces on top of them. Currently in my final year, spending most nights on side projects and open-source issues rather than problem sets.",
  resumeUrl: "/resume.pdf",
  email: "you@example.com",
  socials: [
    { label: "GitHub", url: "https://github.com/yourhandle" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yourhandle" },
  ],
  stats: [
    { label: "LOCATION", value: "Delhi, India" },
    { label: "FOCUS", value: "Distributed systems" },
    { label: "AVAILABLE", value: "Internships, Summer 2027" },
    { label: "STACK", value: "TypeScript / Go / React" },
  ],
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
  const { eyebrow, name, role, bio, resumeUrl, email, socials, stats, now } =
    PROFILE_DATA;

  return (
    <div className="min-h-screen bg-paper text-ink font-body">

      <main className="mx-auto max-w-page px-8 pb-24">
        {/* Hero */}
        <section className="grid grid-cols-1 gap-14 pt-16 md:grid-cols-[1.3fr_0.9fr] md:gap-14">
          <div>
            <p className="mb-3 font-mono text-sm text-line-cyan">{eyebrow}</p>
            <h1 className="mb-3 font-display text-[clamp(2.4rem,5vw,3.6rem)] font-bold leading-[1.05] text-navy-deep">
              {name}
            </h1>
            <p className="mb-6 text-lg text-muted">{role}</p>
            <p className="mb-8 max-w-[56ch] leading-relaxed">{bio}</p>

            <div className="flex flex-wrap gap-3.5">
              <a href={resumeUrl} className="btn-primary">
                Download résumé
              </a>
              <a href={`mailto:${email}`} className="btn-ghost">
                {email}
              </a>
              {socials.map((s) => (
                <a key={s.label} href={s.url} className="btn-ghost">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Stat panel with blueprint corner marks */}
          <div className="relative border border-line bg-white p-7">
            <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-l-2 border-t-2 border-line-cyan" />
            <span className="pointer-events-none absolute -top-px -right-px h-4 w-4 border-r-2 border-t-2 border-line-cyan" />
            <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-l-2 border-b-2 border-line-cyan" />
            <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-r-2 border-b-2 border-line-cyan" />

            <p className="mb-4 font-mono text-xs text-line-cyan">PROFILE / SPEC</p>
            <dl className="flex flex-col gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between gap-3 border-b border-paper-dim pb-3.5 last:border-b-0 last:pb-0"
                >
                  <dt className="font-mono text-xs text-muted">{stat.label}</dt>
                  <dd className="text-right text-sm font-medium">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Now / background */}
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

      <footer className="mx-auto flex max-w-page items-center justify-between border-t border-line px-8 py-7 font-mono text-xs text-muted">
        <span>&copy; {new Date().getFullYear()} {name}</span>
        <ul className="m-0 flex list-none gap-4 p-0">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} className="hover:text-navy-deep">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
