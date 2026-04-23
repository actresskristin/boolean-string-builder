function Footer() {
  return (
    <footer className="border-t border-black/8 bg-white/80">
      <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-gray-600">
        <p>© 2026 24 Hour Search LLC | 24 Hour Search™ is a pending trademark</p>

        <a
          href="https://www.24hoursearch.com"
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block font-medium text-[#8b000f] transition hover:opacity-70"
        >
          www.24hoursearch.com
        </a>

        <p className="mt-3 text-xs leading-6 text-gray-500">
          Information submitted through this tool is used only by 24 Hour Search and is never sold or shared.
        </p>
      </div>
    </footer>
  )
}

export default Footer