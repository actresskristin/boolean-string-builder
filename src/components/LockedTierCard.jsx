function LockedTierCard({ previewText, onWaitlistClick }) {
  return (
    <div className="relative mb-5 rounded-2xl border border-black/10 bg-white p-5">
      <div className="blur-[2px]">
        <h3 className="font-medium text-black">Blueprint Preview</h3>
        <p className="mt-2 text-sm leading-7 text-gray-600">{previewText}</p>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 px-6 text-center">
        <p className="text-sm font-medium text-black">
          The full Search Blueprint is in development
        </p>

        <p className="mt-1 text-xs text-gray-600">
          Join the waitlist for early access and release details
        </p>

        <button
          onClick={onWaitlistClick}
          className="mt-4 rounded-xl bg-[#8b000f] px-4 py-2 text-sm text-white transition hover:bg-[#74000c]"
        >
          Join the Waitlist
        </button>
      </div>
    </div>
  )
}

export default LockedTierCard