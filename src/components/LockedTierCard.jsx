function LockedTierCard({ tier, previewText, showButton = false }) {
  return (
    <div className="mt-6 rounded-[28px] border border-black/8 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
      <div className="relative overflow-hidden rounded-2xl border border-black/8 bg-white px-5 py-5">
        <div className="pointer-events-none absolute inset-0 bg-white/55 backdrop-blur-[3px]" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b000f]">
              {tier}
            </p>
            <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-gray-700">
              Locked
            </span>
          </div>

          <p className="mt-4 text-sm leading-7 text-gray-700">
            {previewText}
          </p>
        </div>
      </div>

      {!showButton && (
        <p className="mt-4 text-sm text-gray-700">
          Unlock the full Blueprint: strategy, targeting, market context, messaging, and execution support.
        </p>
      )}

      {showButton && (
        <a
          href="https://www.24hoursearch.com"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#8b000f] px-5 py-3.5 text-sm font-medium text-white shadow-[0_16px_30px_rgba(139,0,15,0.22)] transition hover:bg-[#74000c]"
        >
          Explore the Full Blueprint
        </a>
      )}
    </div>
  )
}

export default LockedTierCard