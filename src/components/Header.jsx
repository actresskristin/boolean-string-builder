import logo from '../assets/logo.png'

function Header() {
  return (
    <header className="border-b border-black/8 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="24 Hour Search logo"
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
          />
          <div>
            <p className="serif text-xl font-bold leading-none text-[#8b000f] sm:text-2xl">
              Boolean String Builder
            </p>
          </div>
        </div>

        <a
          href="https://www.24hoursearch.com"
          target="_blank"
          rel="noreferrer"
          className="hidden text-sm font-medium text-[#8b000f] transition hover:opacity-70 sm:inline-block"
        >
          Visit Site
        </a>
      </div>
    </header>
  )
}

export default Header