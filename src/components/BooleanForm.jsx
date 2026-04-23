import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { extractTextFromFile } from '../utils/fileTextExtractor'

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

function BooleanForm({ formData, onChange, onGenerate, onParseJobDescription }) {
  const [jobDescription, setJobDescription] = useState('')
  const [isExtracting, setIsExtracting] = useState(false)
  const [fileError, setFileError] = useState('')

  const fileInputRef = useRef(null)

  const handlePlatformChange = (value) => {
    onChange({
      target: {
        name: 'platform',
        value,
      },
    })
  }

  const handleParseClick = () => {
    onParseJobDescription(jobDescription)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileError('')
    setIsExtracting(true)

    try {
      const extractedText = await extractTextFromFile(file)

      if (!extractedText) {
        setFileError(
          'We could not read text from this file. Please paste the job description instead.'
        )
      } else {
        setJobDescription(extractedText)
      }
    } catch (error) {
      setFileError(
        error.message || 'We could not read this file. Please upload a PDF or DOCX file.'
      )
    } finally {
      setIsExtracting(false)
      e.target.value = ''
    }
  }

  return (
    <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:p-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b000f]">
          Layer 1: Initial Targeting
        </p>
        <h2 className="serif mt-3 text-2xl text-black">Build Your Search</h2>
        <p className="mt-2 text-sm leading-7 text-gray-600">
          Enter a role to generate the first layer of targeting. 
        </p>
      </div>

      <div className="mb-8 rounded-[24px] border border-black/10 bg-[#fcf9f7] p-6">
        <div className="mb-4">
          <p className="text-sm font-medium text-black">Start with a job description</p>
          <p className="mt-1 text-sm text-gray-600">
            Optional for parsing.
          </p>
        </div>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={6}
          placeholder="Paste the job description here (optional)"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
        />

        <div className="mt-3 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleUploadClick}
            className="text-sm text-gray-600 underline underline-offset-4 transition hover:text-black"
          >
            Upload PDF or .docx
          </button>

          <button
            type="button"
            onClick={handleParseClick}
            className="rounded-xl bg-[#8b000f] px-4 py-2 text-sm text-white transition hover:bg-[#74000c]"
          >
            Parse from Job Description
          </button>
        </div>

        {isExtracting && (
          <p className="mt-3 text-sm text-gray-600">
            Reading file...
          </p>
        )}

        {fileError && (
          <p className="mt-3 text-sm text-[#8b000f]">
            {fileError}
          </p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="grid gap-4">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-800">
            How are you sourcing?
          </p>

          <div className="grid gap-3 sm:grid-cols-2">

              <button
              type="button"
              onClick={() => handlePlatformChange('xray')}
              className={`rounded-xl border px-4 py-3 text-sm transition ${
                formData.platform === 'xray'
                  ? 'border-[#8b000f] bg-[#8b000f] text-white'
                  : 'border-black/10 bg-white text-gray-700 hover:border-[#8b000f]/30'
              }`}
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => handlePlatformChange('recruiter')}
              className={`rounded-xl border px-4 py-3 text-sm transition ${
                formData.platform === 'recruiter'
                  ? 'border-[#8b000f] bg-[#8b000f] text-white'
                  : 'border-black/10 bg-white text-gray-700 hover:border-[#8b000f]/30'
              }`}
            >
              LinkedIn Recruiter
            </button>
          </div>
        </div>

        <input
          name="jobTitle"
          value={formData.jobTitle}
          onChange={onChange}
          type="text"
          placeholder="Job Title (what you would search)"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
        />

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

        <input
          name="location"
          value={formData.location}
          onChange={onChange}
          type="text"
          placeholder="Location (city or metro area)"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
        />

        <input
          name="skill1"
          value={formData.skill1}
          onChange={onChange}
          type="text"
          placeholder="Key skill (optional)"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
        />

        <input
          name="skill2"
          value={formData.skill2}
          onChange={onChange}
          type="text"
          placeholder="Key skill (optional)"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
        />

        <input
          name="skill3"
          value={formData.skill3}
          onChange={onChange}
          type="text"
          placeholder="Key skill (optional)"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
        />

        <input
          name="education"
          value={formData.education}
          onChange={onChange}
          type="text"
          placeholder="Degree (MBA, Bachelor’s, JD)"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
        />

        <input
          name="certification"
          value={formData.certification}
          onChange={onChange}
          type="text"
          placeholder="Certification (PMP, CPA, LEED)"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
        />

        <input
          name="exclude"
          value={formData.exclude}
          onChange={onChange}
          type="text"
          placeholder="Exclude keywords (junior, assistant, residential)"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
        />

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