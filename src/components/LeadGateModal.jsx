import { useEffect, useState } from 'react'

function LeadGateModal({ isOpen, onClose, onSubmit, jobTitle, unlockSuccess }) {
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    company: '',
    consentToContact: false,
  })

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setError('')
      setIsSubmitting(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setLeadData({
      ...leadData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!leadData.name.trim() || !leadData.email.trim() || !leadData.company.trim()) {
      setError('Please complete all fields.')
      return
    }

    if (!isValidEmail(leadData.email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    if (!leadData.consentToContact) {
      setError('Please confirm that you consent to being contacted.')
      return
    }

    try {
      setIsSubmitting(true)

      await onSubmit({
        name: leadData.name.trim(),
        email: leadData.email.trim().toLowerCase(),
        company: leadData.company.trim(),
        consentToContact: leadData.consentToContact,
        jobTitle,
      })
    } catch (err) {
      setError('Something went wrong while saving your information.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">
        {!unlockSuccess ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b000f]">
                  Continue the Search
                </p>

                <h2 className="serif mt-3 text-2xl text-black">
                  You’ve seen the starting point. This is not the full search.
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-700">
                  This string will return profiles. It will not give you a real candidate pool.
                  Enter your details to continue and see how a structured search is actually built.
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 transition hover:text-black"
                type="button"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <input
                name="name"
                value={leadData.name}
                onChange={handleChange}
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-black/10 px-4 py-3"
              />

              <input
                name="email"
                value={leadData.email}
                onChange={handleChange}
                type="email"
                placeholder="Work email"
                className="w-full rounded-xl border border-black/10 px-4 py-3"
              />

              <input
                name="company"
                value={leadData.company}
                onChange={handleChange}
                type="text"
                placeholder="Company"
                className="w-full rounded-xl border border-black/10 px-4 py-3"
              />

              <div className="rounded-xl bg-[#f7f3f1] px-4 py-3 text-sm">
                Role searched: <span className="font-medium">{jobTitle || 'Not provided'}</span>
              </div>

              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  name="consentToContact"
                  checked={leadData.consentToContact}
                  onChange={handleChange}
                  className="mt-1 accent-[#8b000f]"
                />
                <span>
                  I consent to being contacted by 24 Hour Search about this tool,
                  my search, and related services.
                </span>
              </label>

              {error && <p className="text-sm text-[#8b000f]">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-[#8b000f] px-5 py-3 text-white"
              >
                {isSubmitting ? 'Unlocking...' : 'Unlock the Full Builder'}
              </button>

              <p className="text-xs text-gray-500">
                You will also receive follow-up from 24 Hour Search with additional search insight.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="serif text-2xl text-black">You’re in. Now use this properly.</h2>

            <p className="mt-3 text-sm text-gray-700">
              You now have access to the full builder. If this is a critical hire,
              the Blueprint shows exactly how to run the search end-to-end.
            </p>

            <a
              href="https://www.24hoursearch.com"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block rounded-xl bg-[#8b000f] px-5 py-3 text-white"
            >
              View Full Search Blueprint
            </a>

            <button
              onClick={onClose}
              className="mt-4 text-sm text-gray-500"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LeadGateModal