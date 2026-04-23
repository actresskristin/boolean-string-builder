import { motion } from 'framer-motion'

function BooleanForm({ formData, onChange, onGenerate }) {
  return (
    <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:p-8">
      <h2 className="serif text-2xl text-black">Build Your String</h2>
    <div className="mb-2">
  <p className="text-sm font-medium text-gray-800 mb-2">
    How are you sourcing?
  </p>

  <div className="flex gap-3">
    <button
      type="button"
      onClick={() =>
        onChange({ target: { name: 'platform', value: 'recruiter' } })
      }
      className={`flex-1 rounded-xl border px-4 py-2 text-sm ${
        formData.platform === 'recruiter'
          ? 'bg-[#8b000f] text-white border-[#8b000f]'
          : 'bg-white text-gray-700 border-black/10'
      }`}
    >
      LinkedIn Recruiter
    </button>

    <button
      type="button"
      onClick={() =>
        onChange({ target: { name: 'platform', value: 'xray' } })
      }
      className={`flex-1 rounded-xl border px-4 py-2 text-sm ${
        formData.platform === 'xray'
          ? 'bg-[#8b000f] text-white border-[#8b000f]'
          : 'bg-white text-gray-700 border-black/10'
      }`}
    >
      Google / X-Ray
    </button>
  </div>
</div>
    
    
      <p className="mt-2 text-sm text-gray-600">
        Use the title you would actually search for, not just your internal title.
      </p>

      <div className="mt-6 grid gap-4">
        <div>
          <input
            name="jobTitle"
            value={formData.jobTitle}
            onChange={onChange}
            type="text"
            placeholder="Job Title (required)"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
        </div>

        <div>
          <select
            name="seniority"
            value={formData.seniority}
            onChange={onChange}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          >
            <option value="">Seniority Level</option>
            <option>Coordinator</option>
            <option>Manager</option>
            <option>Director</option>
            <option>Vice President</option>
            <option>SVP</option>
            <option>C-Suite</option>
          </select>
        </div>

        <div>
          <select
            name="industry"
            value={formData.industry}
            onChange={onChange}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          >
            <option value="">Industry</option>
            <option>Commercial Real Estate</option>
            <option>Financial Services</option>
            <option>Professional Services</option>
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <input
            name="location"
            value={formData.location}
            onChange={onChange}
            type="text"
            placeholder="Location (required)"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
          <p className="mt-2 text-xs text-gray-500">
            City or metro area works best, like New York, Dallas, or Chicago.
          </p>
        </div>

        <div>
          <input
            name="skill1"
            value={formData.skill1}
            onChange={onChange}
            type="text"
            placeholder="Must-have Skill 1"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
        </div>

        <div>
          <input
            name="skill2"
            value={formData.skill2}
            onChange={onChange}
            type="text"
            placeholder="Must-have Skill 2"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
        </div>

        <div>
          <input
            name="skill3"
            value={formData.skill3}
            onChange={onChange}
            type="text"
            placeholder="Must-have Skill 3"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
          <p className="mt-2 text-xs text-gray-500">
            Optional: add 1 to 3 skills to narrow results.
          </p>
        </div>

        <div>
          <input
            name="education"
            value={formData.education}
            onChange={onChange}
            type="text"
            placeholder="Education / Degree (optional)"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
        </div>

        <div>
          <input
            name="certification"
            value={formData.certification}
            onChange={onChange}
            type="text"
            placeholder="Certification (optional)"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
          <p className="mt-2 text-xs text-gray-500">
            Examples: CPA, PMP, LEED AP, SHRM-CP
          </p>
        </div>
<div>
  <input
    name="exclude"
    value={formData.exclude}
    onChange={onChange}
    type="text"
    placeholder="Exclude keywords (optional)"
    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
  />
  <p className="mt-2 text-xs text-gray-500">
    Separate with commas, like junior, assistant, residential
  </p>
</div>
        <motion.button
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onGenerate}
          className="mt-2 rounded-xl bg-[#8b000f] px-5 py-3.5 text-white font-medium shadow-[0_16px_30px_rgba(139,0,15,0.24)] transition hover:bg-[#74000c]"
        >
          Build My Candidate Search
        </motion.button>
      </div>
    </div>
  )
}

export default BooleanForm