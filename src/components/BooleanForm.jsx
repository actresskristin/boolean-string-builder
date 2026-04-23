import { motion } from 'framer-motion'

const INDUSTRY_OPTIONS = [
  'Commercial Real Estate',
  'Financial Services',
  'Professional Services',
  'Technology',
  'Healthcare',
  'Construction',
  'Manufacturing',
  'Logistics',
  'Retail',
  'Hospitality',
  'Legal',
  'Accounting',
  'Insurance',
  'Education',
  'Nonprofit',
  'Energy',
  'Government',
  'Biotechnology',
  'Media',
  'Telecommunications',
  'Other',
]

function BooleanForm({ formData, onChange, onGenerate }) {
  const handlePlatformChange = (value) => {
    onChange({
      target: {
        name: 'platform',
        value,
      },
    })
  }

  return (
    <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:p-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b000f]">
          Layer 1: Initial Targeting
        </p>
        <h2 className="serif mt-3 text-2xl text-black">Build Your Search</h2>
        <p className="mt-2 text-sm leading-7 text-gray-600">
        
        </p>
      </div>

      <div className="grid gap-4">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-800">
            How are you sourcing?
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handlePlatformChange('recruiter')}
              className={`rounded-xl border px-4 py-3 text-sm transition ${
                formData.platform === 'recruiter'
                  ? 'border-[#8b000f] bg-[#8b000f] text-white'
                  : 'border-black/10 bg-white text-gray-700 hover:border-[#8b000f]/30'
              }`}
            >
              I have LinkedIn Recruiter
            </button>

            <button
              type="button"
              onClick={() => handlePlatformChange('xray')}
              className={`rounded-xl border px-4 py-3 text-sm transition ${
                formData.platform === 'xray'
                  ? 'border-[#8b000f] bg-[#8b000f] text-white'
                  : 'border-black/10 bg-white text-gray-700 hover:border-[#8b000f]/30'
              }`}
            >
              I do not have LinkedIn Recruiter
            </button>
          </div>
        </div>

        <div>
          <input
            name="jobTitle"
            value={formData.jobTitle}
            onChange={onChange}
            type="text"
            placeholder="Job Title (what you would search)"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
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
            {INDUSTRY_OPTIONS.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            name="location"
            value={formData.location}
            onChange={onChange}
            type="text"
            placeholder="Location (city or metro area; if remote, list country)"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
        </div>

        <div>
          <input
            name="skill1"
            value={formData.skill1}
            onChange={onChange}
            type="text"
            placeholder="Add a priority skill to refine results (optional)"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
        </div>

        <div>
          <input
            name="skill2"
            value={formData.skill2}
            onChange={onChange}
            type="text"
            placeholder="Add a priority skill to refine results (optional)"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
        </div>

        <div>
          <input
            name="skill3"
            value={formData.skill3}
            onChange={onChange}
            type="text"
            placeholder="Add a priority skill to refine results (optional)"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
        </div>

        <div>
          <input
            name="education"
            value={formData.education}
            onChange={onChange}
            type="text"
            placeholder="Degree (MBA, Bachelor’s, JD)"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
        </div>

        <div>
          <input
            name="certification"
            value={formData.certification}
            onChange={onChange}
            type="text"
            placeholder="Certification (PMP, CPA, LEED)"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
        </div>

        <div>
          <input
            name="exclude"
            value={formData.exclude}
            onChange={onChange}
            type="text"
            placeholder="Exclude keywords (junior, assistant, residential)"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
          />
        </div>

        <div className="pt-2">
          <motion.button
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onGenerate}
            className="w-full rounded-xl bg-[#8b000f] px-5 py-3.5 text-white font-medium shadow-[0_16px_30px_rgba(139,0,15,0.24)] transition hover:bg-[#74000c]"
          >
            Build My Candidate Search
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default BooleanForm