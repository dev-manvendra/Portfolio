import { NavLink, Link } from "react-router-dom";

// Edit this to your name / initials.
const BRAND = "Manvendra";

// Keep these paths in sync with the routes in App.jsx.
const NAV_LINKS = [
  { to: "/", label: "Profile", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
];

// Tailwind handles the layout and colors; this small block preserves the original fonts.
const ORIGINAL_DETAILS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Inter:wght@400;500&display=swap');

.portfolio-header { font-family: 'Inter', system-ui, sans-serif; }
.portfolio-display { font-family: 'Bricolage Grotesque', sans-serif; }
`;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#131947] bg-[rgba(7,12,35,0.92)] backdrop-blur-xl portfolio-header">
      <style>{ORIGINAL_DETAILS_CSS}</style>

      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          to="/"
          className="portfolio-display inline-flex shrink-0 items-center gap-2.5 text-[1.1rem] font-extrabold tracking-[-0.02em] text-[#ffb86b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#8b9bff]"
        >
          <span aria-hidden="true" className="h-[9px] w-[9px] rounded-full bg-[#6ee7c8]" />
          {BRAND}
        </Link>

        <nav aria-label="Main">
          <ul className="m-0 flex list-none gap-1 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `inline-flex rounded-full border border-transparent px-[11px] py-[7px] text-[13px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#8b9bff] motion-reduce:transition-none sm:px-3.5 sm:py-2 sm:text-sm ${
                      isActive
                        ? "bg-[#8b9bff] text-[#161a33]"
                        : "text-[#9aa0c7] hover:bg-[rgba(139,155,255,0.08)] hover:text-[#e9ebfa]"
                    }`
                  }
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
