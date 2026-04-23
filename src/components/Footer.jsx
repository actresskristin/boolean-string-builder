function Footer() {
  return (
    <footer className="border-t border-black/8 bg-white/80">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-6 text-center text-sm text-gray-600 sm:flex-row sm:text-left">
        <p>© 2026 24 Hour Search LLC | 24 Hour Search™ is a pending trademark</p>
        <a
          href="https://www.24hoursearch.com"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[#8b000f] transition hover:opacity-70"
        >
          www.24hoursearch.com
        </a>
      </div>
    </footer>
  )
}

export default Footer