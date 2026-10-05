import { NavLink, Link } from "react-router-dom";

// Edit this to your name / initials.
const BRAND = "Manvendra";

// If your routes in App.jsx use different paths, update them here to match.
const NAV_LINKS = [
  { to: "/", label: "Profile", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Inter:wght@500&display=swap');

.hd{--panel:#161a33;--edge:#272c4f;--text:#e9ebfa;--dim:#9aa0c7;--accent:#8b9bff;--mint:#6ee7c8;--warm:#ffb86b;
  position:sticky;top:0;z-index:50;background:rgba(22,26,51,.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  border-bottom:1px solid var(--edge);font-family:'Inter',system-ui,sans-serif}
.hd *{box-sizing:border-box}
.hd a{text-decoration:none}
.hd :focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px}
.hd-in{max-width:1120px;margin:0 auto;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.hd-brand{display:inline-flex;align-items:center;gap:10px;color:var(--warm);
  font:800 1.1rem 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em}
.hd-brand i{width:9px;height:9px;border-radius:50%;background:var(--mint)}
.hd-nav{display:flex;gap:4px;list-style:none;margin:0;padding:0}
.hd-link{display:inline-flex;padding:8px 14px;border-radius:999px;font-size:14px;font-weight:500;color:var(--dim);
  border:1px solid transparent;transition:color .2s,background .2s}
.hd-link:hover{color:var(--text);background:rgba(139,155,255,.08)}
.hd-link.active{color:#161a33;background:var(--accent)}
@media (max-width:520px){
  .hd-in{padding:12px 16px}
  .hd-link{padding:7px 11px;font-size:13px}
}
@media (prefers-reduced-motion:reduce){.hd *{transition:none!important}}
`;

export default function Header() {
  return (
    <header className="hd">
      <style>{CSS}</style>
      <div className="hd-in">
        <Link to="/" className="hd-brand">
          <i aria-hidden="true" />
          {BRAND}
        </Link>

        <nav aria-label="Main">
          <ul className="hd-nav">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => `hd-link${isActive ? " active" : ""}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}