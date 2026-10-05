import { useEffect, useMemo, useRef, useState } from "react";

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

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');

.pf{--bg:#0e1124;--panel:#161a33;--edge:#272c4f;--text:#e9ebfa;--dim:#9aa0c7;--accent:#8b9bff;--warm:#ffb86b;--mint:#6ee7c8;
  background:var(--bg);color:var(--text);font-family:'Inter',system-ui,sans-serif;line-height:1.6}
.pf *{box-sizing:border-box}
.pf a{color:inherit;text-decoration:none}
.pf :focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.pf-wrap{max-width:1120px;margin:0 auto;padding:0 24px}
.pf-hero{padding:96px 0 72px}
.pf-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:56px;align-items:center}
.pf-tag{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--mint);
  border:1px solid var(--edge);border-radius:999px;padding:6px 14px;margin:0 0 28px}
.pf-dot{width:8px;height:8px;border-radius:50%;background:var(--mint);animation:pf-pulse 2s ease-in-out infinite}
.pf h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(3rem,8vw,5.75rem);line-height:.98;letter-spacing:-.03em;margin:0 0 20px}
.pf h1 span{display:block}
.pf-role{font-family:'Bricolage Grotesque',sans-serif;font-size:1.4rem;font-weight:500;color:var(--accent);margin:0 0 16px}
.pf-bio{color:var(--dim);max-width:54ch;margin:0 0 32px}
.pf-actions{display:flex;flex-wrap:wrap;gap:12px}
.pf-btn{display:inline-flex;align-items:center;padding:12px 20px;border-radius:10px;font-weight:500;font-size:14px;
  border:1px solid var(--edge);transition:background .2s,border-color .2s}
.pf-btn:hover{border-color:var(--accent);background:rgba(139,155,255,.08)}
.pf-btn.primary{background:var(--accent);color:#0e1124;border-color:var(--accent)}
.pf-btn.primary:hover{background:#fff;border-color:#fff}
.pf-win{background:var(--panel);border:1px solid var(--edge);border-radius:14px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(0,0,0,.6)}
.pf-bar{display:flex;align-items:center;gap:7px;padding:12px 16px;border-bottom:1px solid var(--edge)}
.pf-bar i{width:11px;height:11px;border-radius:50%;background:var(--edge)}
.pf-bar em{margin-left:10px;font:400 12px 'JetBrains Mono',monospace;color:var(--dim);font-style:normal}
.pf-code{margin:0;padding:22px 20px;font:400 13.5px/1.9 'JetBrains Mono',monospace;overflow-x:auto;white-space:pre}
.pf-code .k{color:var(--accent)}.pf-code .s{color:var(--mint)}.pf-code .c{color:#5d6494}.pf-code .w{color:var(--warm)}
.pf-snd{margin-left:auto;display:inline-flex;align-items:center;gap:6px;font:400 12px 'JetBrains Mono',monospace;color:var(--dim);
  background:transparent;border:1px solid var(--edge);border-radius:999px;padding:4px 11px;cursor:pointer;transition:color .2s,border-color .2s}
.pf-snd:hover{color:var(--text);border-color:var(--accent)}
.pf-snd[aria-pressed="true"]{color:var(--mint);border-color:var(--mint)}
.pf-caret.typing{animation:none}
.pf-caret{display:inline-block;width:8px;height:15px;background:var(--warm);vertical-align:middle;margin-left:2px;animation:pf-blink 1.1s steps(1) infinite}
.pf-stats{border-block:1px solid var(--edge);background:var(--panel)}
.pf-stats .pf-wrap{display:grid;grid-template-columns:repeat(4,1fr)}
.pf-stat{padding:26px 24px;border-left:1px solid var(--edge)}
.pf-stat:first-child{border-left:0;padding-left:0}
.pf-stat p{margin:0}
.pf-stat .l{font:400 12px 'JetBrains Mono',monospace;color:var(--dim);margin-bottom:6px}
.pf-stat .v{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:1.15rem}
.pf-bg{padding:80px 0 96px}
.pf-bg h2{font-family:'Bricolage Grotesque',sans-serif;font-size:2rem;font-weight:700;letter-spacing:-.02em;margin:0 0 32px}
.pf-cols{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.pf-card{background:var(--panel);border:1px solid var(--edge);border-left:3px solid var(--warm);border-radius:12px;padding:24px}
.pf-card h3{font-family:'Bricolage Grotesque',sans-serif;font-size:1.15rem;margin:0 0 8px}
.pf-card p{margin:0;color:var(--dim);font-size:15px}
.pf-in{animation:pf-in .7s cubic-bezier(.2,.7,.2,1) both}
@keyframes pf-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes pf-pulse{50%{opacity:.35}}
@keyframes pf-blink{50%{opacity:0}}
@media (max-width:860px){
  .pf-hero{padding:56px 0 48px}.pf-grid{grid-template-columns:1fr;gap:40px}
  .pf-stats .pf-wrap{grid-template-columns:1fr 1fr}
  .pf-stat{border-left:0;padding-left:0;border-top:1px solid var(--edge)}
  .pf-stat:nth-child(-n+2){border-top:0}
  .pf-stat:nth-child(even){padding-left:24px;border-left:1px solid var(--edge)}
  .pf-cols{grid-template-columns:1fr}
}
@media (prefers-reduced-motion:reduce){.pf *{animation:none!important}}
`;

/**
 * Route component. Renders only the page content (no header/footer, no
 * full-viewport shell), so it can sit inside your layout between them:
 *
 *   <Header />
 *   <Routes><Route path="/" element={<Profile />} /></Routes>
 *   <Footer />
 */
export default function Profile() {
  const { eyebrow, nameLine1, nameLine2, role, bio, resumeUrl, email, socials, stats, now } =
    PROFILE_DATA;

  // The profile.js window "types" itself out once on load.
  const tokens = useMemo(
    () => [
      { t: "const", c: "k" },
      { t: " " },
      { t: "engineer", c: "w" },
      { t: " = {" },
      { t: "\n  name: " },
      { t: `"${nameLine1}"`, c: "s" },
      { t: "," },
      { t: "\n  role: " },
      { t: `"${role}"`, c: "s" },
      { t: "," },
      ...stats.flatMap((st) => [
        { t: `\n  ${st.label.toLowerCase()}: ` },
        { t: `"${st.value}"`, c: "s" },
        { t: "," },
      ]),
      { t: "\n  open: " },
      { t: "true", c: "k" },
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

  const [soundOn, setSoundOn] = useState(false);
  const [run, setRun] = useState(0);
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const audio = useRef(null);
  const fullText = useMemo(() => tokens.map((tk) => tk.t).join(""), [tokens]);

  // Browsers block audio until the visitor interacts, so sound is opt-in via
  // the button in the window bar. Turning it on replays the typing.
  const initAudio = () => {
    if (audio.current) return audio.current;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();
    const out = ctx.createGain();
    out.gain.value = 0.5;
    const soften = ctx.createBiquadFilter();
    soften.type = "lowpass";
    soften.frequency.value = 4200;
    out.connect(soften);
    soften.connect(ctx.destination);
    const len = Math.floor(ctx.sampleRate * 0.04);
    const noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    audio.current = { ctx, out, noise };
    return audio.current;
  };

  // A soft key tick: a filtered noise "click" plus a short, low "thock".
  const tick = (deep) => {
    const a = audio.current;
    if (!a) return;
    const { ctx, out, noise } = a;
    const t = ctx.currentTime;

    const src = ctx.createBufferSource();
    src.buffer = noise;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = (deep ? 900 : 1900) + Math.random() * 700;
    bp.Q.value = 1.1;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(deep ? 0.28 : 0.2, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    src.connect(bp);
    bp.connect(g);
    g.connect(out);
    src.start(t);

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime((deep ? 130 : 190) + Math.random() * 30, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.05);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.0001, t);
    og.gain.linearRampToValueAtTime(deep ? 0.16 : 0.09, t + 0.004);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    osc.connect(og);
    og.connect(out);
    osc.start(t);
    osc.stop(t + 0.07);
  };

  const toggleSound = () => {
    if (soundOn) {
      setSoundOn(false);
      return;
    }
    const a = initAudio();
    if (!a) return;
    a.ctx.resume();
    setSoundOn(true);
    setRun((r) => r + 1); // replay so the sound can be heard
  };

  useEffect(() => () => audio.current?.ctx.close(), []);

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
  }, [total, run, reduced]);

  // One tick for every other character, a deeper one for line breaks.
  useEffect(() => {
    if (!soundOn || count === 0 || count > total) return;
    const ch = fullText[count - 1];
    if (ch === "\n") tick(true);
    else if (ch !== " " && count % 2 === 0) tick(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  let left = count;

  return (
    <div className="pf">
      <style>{CSS}</style>

      <section className="pf-hero">
        <div className="pf-wrap pf-grid">
          <div>
            <p className="pf-tag pf-in">
              <span className="pf-dot" />
              {eyebrow}
            </p>

            <h1 className="pf-in" style={{ animationDelay: "80ms" }}>
              <span>{nameLine1}</span>
              {nameLine2 && <span style={{ color: "var(--accent)" }}>{nameLine2}</span>}
            </h1>

            <p className="pf-role pf-in" style={{ animationDelay: "160ms" }}>
              {role}
            </p>
            <p className="pf-bio pf-in" style={{ animationDelay: "220ms" }}>
              {bio}
            </p>

            <div className="pf-actions pf-in" style={{ animationDelay: "300ms" }}>
              <a href={resumeUrl} className="pf-btn primary">
                Download resume
              </a>
              <a href={`mailto:${email}`} className="pf-btn">
                Email me
              </a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-btn"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* The memorable element: the profile written as code */}
          <div className="pf-win pf-in" style={{ animationDelay: "240ms" }}>
            <div className="pf-bar">
              <i />
              <i />
              <i />
              <em>profile.js</em>
              {!reduced && (
                <button
                  type="button"
                  className="pf-snd"
                  onClick={toggleSound}
                  aria-pressed={soundOn}
                  aria-label="Typing sound"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M11 5 6 9H2v6h4l5 4V5z" />
                    {soundOn ? (
                      <>
                        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                        <path d="M19 5a10 10 0 0 1 0 14" />
                      </>
                    ) : (
                      <>
                        <path d="m23 9-6 6" />
                        <path d="m17 9 6 6" />
                      </>
                    )}
                  </svg>
                  {soundOn ? "Sound on" : "Sound off"}
                </button>
              )}
            </div>
            <pre className="pf-code" aria-hidden="true" style={{ minHeight: `calc(${lineCount} * 1.9em + 44px)` }}>
              {tokens.map((tk, i) => {
                if (left <= 0) return null;
                const part = tk.t.slice(0, left);
                left -= tk.t.length;
                return (
                  <span key={i} className={tk.c}>
                    {part}
                  </span>
                );
              })}
              <span className={`pf-caret${count < total ? " typing" : ""}`} />
            </pre>
          </div>
        </div>
      </section>

      <section className="pf-stats" aria-label="At a glance">
        <div className="pf-wrap">
          {stats.map((stat) => (
            <div key={stat.label} className="pf-stat">
              <p className="l">{stat.label.toLowerCase()}</p>
              <p className="v">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pf-bg">
        <div className="pf-wrap">
          <h2>Background</h2>
          <div className="pf-cols">
            {now.map((item) => (
              <article key={item.title} className="pf-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}