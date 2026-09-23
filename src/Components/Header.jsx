import { NavLink, Link } from "react-router-dom";

// Edit this to your name / initials.
const BRAND = "Manvendra";

// If your routes in App.jsx use different paths, update them here to match.
const NAV_LINKS = [
  { to: "/", label: "Profile", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-page items-center justify-between px-8 py-5">
        <div>
            <Link to ="/">
                <span className="font-display text-[1.05rem] font-semibold">{BRAND}</span>
               
            </Link>
         </div>
        
        <ul className="flex list-none  gap-7 p-0 m-0">
          {NAV_LINKS.map((link) => (
            <li 
            key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active text-navy-deep font-bold" : "text-gray-500"}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
