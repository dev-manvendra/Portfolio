function Footer() {
    const socials = [
    { label: "GitHub", url: "https://github.com/dev-manvendra" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/dev-manvendra/" },
    ]
    return (
        <footer className="mx-auto flex max-w-page items-center justify-between border-t border-line px-8 py-7 font-mono text-xs text-muted">
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
    )
}

export default Footer
