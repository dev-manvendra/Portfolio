const SOCIALS = [
  { label: "GitHub", url: "https://github.com/dev-manvendra" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/dev-manvendra/" },
];

// Use the same font family as the rest of the portfolio.
const ORIGINAL_DETAILS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');

.portfolio-footer { font-family: 'Inter', system-ui, sans-serif; }
.portfolio-mono { font-family: 'JetBrains Mono', monospace; }
`;

export default function Footer() {
  return (
    <footer className="portfolio-footer w-full border-t border-[#272c4f] bg-[#0e1124] text-xs text-[#9aa0c7]">
      <style>{ORIGINAL_DETAILS_CSS}</style>

      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-5 py-7 sm:px-6">
        <ul className="portfolio-mono m-0 flex list-none gap-4 p-0">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-[#8b9bff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#8b9bff] motion-reduce:transition-none"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
