function BlueprintValueCard() {
  return (
    <div className="mt-6 rounded-[28px] border border-black/8 bg-white p-6 shadow-sm sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b000f]">
        What the Full Blueprint Adds
      </p>

      <h3 className="serif mt-3 text-2xl text-black">
        The free tool gives you one piece. The Blueprint gives you the system.
      </h3>

     <p className="mt-3 text-sm leading-7 text-gray-700">
  The full Blueprint is a 24-hour executive search strategy built for this exact role. 
  It includes a defined candidate persona, compensation data to validate the level, 
  and a map of where the highest-probability candidates actually sit in the market.
</p>

<p className="mt-3 text-sm leading-7 text-gray-700">
  You receive 10 to 15 curated candidate leads, structured Boolean strings across multiple tiers, 
  and outreach sequences designed for passive talent. The goal is not more candidates. 
  It is the right candidates, faster.
</p>
<div className="mt-5 grid gap-3 sm:grid-cols-2">
  <div className="rounded-2xl border border-black/8 bg-[#faf7f6] p-4 text-sm text-gray-700">
    Candidate persona and search direction
  </div>

  <div className="rounded-2xl border border-black/8 bg-[#faf7f6] p-4 text-sm text-gray-700">
    10 to 15 high-probability candidate targets
  </div>

  <div className="rounded-2xl border border-black/8 bg-[#faf7f6] p-4 text-sm text-gray-700">
    Compensation benchmarking tied to your role
  </div>

  <div className="rounded-2xl border border-black/8 bg-[#faf7f6] p-4 text-sm text-gray-700">
    Outreach sequences built for passive candidates
  </div>
</div>
    </div>
  )
}

export default BlueprintValueCard