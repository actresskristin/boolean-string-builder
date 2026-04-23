function LockedTierCard({ tier, previewText, showButton }) {
  return (
    <div className="relative mb-5 rounded-2xl border border-black/10 bg-white p-5">
      <div className="blur-[2px]">
        <h3 className="font-medium text-black">{tier}</h3>
        <p className="mt-2 text-sm text-gray-600">{previewText}</p>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 text-center">
        <p className="text-sm font-medium text-black">
          Unlock the full Blueprint to access this layer
        </p>

        {showButton && (
          <a
            href="https://www.24hoursearch.com"
            target="_blank"
            rel="noreferrer"
            className="mt-3 rounded-xl bg-[#8b000f] px-4 py-2 text-sm text-white"
          >
            Get the Full Search Blueprint
          </a>
        )}
      </div>
    </div>
  )
}

export default LockedTierCard