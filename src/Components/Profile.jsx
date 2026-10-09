import { useEffect, useMemo, useState } from "react";

const PROFILE_DATA = {
  eyebrow: "Software Engineering Student",
  nameLine1: "Manvendra",
  nameLine2: "",
  role: "Backend-leaning full-stack developer",
  bio:
    "I build things end to end — from data models and APIs to the interfaces on top of them. Currently in my third year, spending most nights on side projects and open-source issues rather than problem sets.",
  resumeUrl: "/Resume.docx",
  email: "manvendrajhansi1406@gmail.com",
  socials: [
    { label: "GitHub", url: "https://github.com/dev-manvendra" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/dev-manvendra/" },
  ],
  stats: [
    { label: "LOCATION", value: "Delhi, IN" },
    { label: "FOCUS", value: "Distributed systems" },
    { label: "AVAILABLE", value: "Winter 2027" },
    { label: "STACK", value: "JS /NODE.JS / React" },
  ],
  now: [
    {
      title: "Education",
      body: "B.Tech in Computer Science, Class of 2028 — coursework in systems, algorithms, and databases.",
    },
    {
      title: "Currently learning",
      body: "System Design with Full-Stack, alongside a side project on real-time data pipelines.",
    },
  ],
};

export default function Profile() {
  const { eyebrow, nameLine1, nameLine2, role, bio, resumeUrl, email, socials, stats, now } =
    PROFILE_DATA;

  const tokens = useMemo(
    () => [
      { t: "const", c: "text-[#8b9bff]" },
      { t: " " },
      { t: "engineer", c: "text-[#ffb86b]" },
      { t: " = {" },
      { t: "\n  name: " },
      { t: `"${nameLine1}"`, c: "text-[#6ee7c8]" },
      { t: "," },
      { t: "\n  role: " },
      { t: `"${role}"`, c: "text-[#6ee7c8]" },
      { t: "," },
      ...stats.flatMap((st) => [
        { t: `\n  ${st.label.toLowerCase()}: ` },
        { t: `"${st.value}"`, c: "text-[#6ee7c8]" },
        { t: "," },
      ]),
      { t: "\n  open: " },
      { t: "true", c: "text-[#8b9bff]" },
      { t: "\n}" },
    ],
    [nameLine1, role, stats]
  );

  const total = useMemo(() => tokens.reduce((n, tk) => n + tk.t.length, 0), [tokens]);
  const lineCount = useMemo(
    () => tokens.reduce((n, tk) => n + (tk.t.match(/\n/g) || []).length, 1),
    [tokens]
  );
  const [count, setCount] = useState(0);
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduced) {
      setCount(total);
      return;
    }

    setCount(0);
    let timer;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        setCount((c) => {
          if (c >= total) {
            clearInterval(timer);
            return c;
          }
          return c + 1;
        });
      }, 32);
    }, 700);

    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [total, reduced]);

  let left = count;

  return (
    <main className="min-h-screen bg-[#0e1124] font-sans leading-[1.6] text-[#e9ebfa]">
      <section className="px-0 pb-12 pt-14 md:pb-[72px] md:pt-24">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1.1fr_1fr] md:gap-14">
          <div>
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#272c4f] px-3.5 py-1.5 font-mono text-[13px] text-[#6ee7c8]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#6ee7c8]" />
              {eyebrow}
            </p>

            <h1 className="mb-5 text-[clamp(3rem,8vw,5.75rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
              <span className="block">{nameLine1}</span>
              {nameLine2 && <span className="block text-[#8b9bff]">{nameLine2}</span>}
            </h1>

            <p className="mb-4 text-[1.4rem] font-medium text-[#8b9bff]">{role}</p>
            <p className="mb-8 max-w-[54ch] text-[#9aa0c7]">{bio}</p>

            <div className="flex flex-wrap gap-3">
              <a
                href={resumeUrl}
                className="inline-flex items-center rounded-[10px] border border-[#8b9bff] bg-[#8b9bff] px-5 py-3 text-sm font-medium text-[#0e1124] transition-colors hover:border-white hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#8b9bff]"
              >
                Download resume
              </a>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center rounded-[10px] border border-[#272c4f] px-5 py-3 text-sm font-medium transition-colors hover:border-[#8b9bff] hover:bg-[rgba(139,155,255,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#8b9bff]"
              >
                Email me
              </a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-[10px] border border-[#272c4f] px-5 py-3 text-sm font-medium transition-colors hover:border-[#8b9bff] hover:bg-[rgba(139,155,255,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#8b9bff]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-[#272c4f] bg-[#161a33] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-[7px] border-b border-[#272c4f] px-4 py-3">
              <span className="h-[11px] w-[11px] rounded-full bg-[#272c4f]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#272c4f]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#272c4f]" />
              <em className="ml-3 not-italic text-xs text-[#9aa0c7]">profile.js</em>
            </div>

            <pre
              aria-hidden="true"
              className="m-0 overflow-x-auto whitespace-pre px-5 py-[22px] font-mono text-[13.5px] leading-[1.9]"
              style={{ minHeight: `calc(${lineCount} * 1.9em + 44px)` }}
            >
              {tokens.map((tk, i) => {
                if (left <= 0) return null;
                const part = tk.t.slice(0, left);
                left -= tk.t.length;
                return (
                  <span key={i} className={tk.c || ""}>
                    {part}
                  </span>
                );
              })}
              <span className={`ml-0.5 inline-block h-[15px] w-2 align-middle bg-[#ffb86b] ${count < total ? "animate-pulse" : "opacity-0"}`} />
            </pre>
          </div>
        </div>
      </section>

      <section className="border-y border-[#272c4f] bg-[#161a33]">
        <div className="mx-auto grid max-w-[1120px] grid-cols-2 px-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`py-6 md:px-6 ${index % 2 === 1 ? "border-l border-[#272c4f] pl-6 md:border-l" : "md:border-l md:border-[#272c4f]"} ${index >= 2 ? "border-t border-[#272c4f] md:border-t-0" : ""} ${index === 0 ? "md:pl-0" : ""}`}
            >
              <p className="mb-1.5 font-mono text-xs text-[#9aa0c7]">{stat.label.toLowerCase()}</p>
              <p className="text-[1.15rem] font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-24 pt-20">
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="mb-8 text-3xl font-bold tracking-[-0.02em]">Background</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {now.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-[#272c4f] border-l-[3px] border-l-[#ffb86b] bg-[#161a33] p-6"
              >
                <h3 className="mb-2 text-[1.15rem] font-semibold">{item.title}</h3>
                <p className="text-[15px] text-[#9aa0c7]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
