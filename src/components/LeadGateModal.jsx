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
                  Unlock Continued Access
                </p>
                <h2 className="serif mt-3 text-2xl text-black">
                  Your first preview is complete
                </h2>
                <p className="mt-3 text-sm leading-7 text-gray-700">
                  Enter your details to keep using the Boolean Builder and receive follow-up from 24 Hour Search.
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 transition hover:text-black"
                aria-label="Close"
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
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
              />

              <input
                name="email"
                value={leadData.email}
                onChange={handleChange}
                type="email"
                placeholder="Work email"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
              />

              <input
                name="company"
                value={leadData.company}
                onChange={handleChange}
                type="text"
                placeholder="Company"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
              />

              <div className="rounded-xl bg-[#f7f3f1] px-4 py-3 text-sm text-gray-700">
                Role searched: <span className="font-medium text-black">{jobTitle || 'Not provided yet'}</span>
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-black/10 bg-[#fcf9f7] px-4 py-3 text-sm text-gray-700">
                <input
                  name="consentToContact"
                  checked={leadData.consentToContact}
                  onChange={handleChange}
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[#8b000f]"
                />
                <span>
                  I consent to being contacted by 24 Hour Search about this tool, my search, and related services.
                </span>
              </label>

              {error && (
                <p className="text-sm text-[#8b000f]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 rounded-xl bg-[#8b000f] px-5 py-3.5 text-white font-medium shadow-[0_16px_30px_rgba(139,0,15,0.24)] transition hover:bg-[#74000c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Unlocking...' : 'Unlock the Builder'}
              </button>

              <p className="text-xs text-gray-500">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b000f]">
              Access Unlocked
            </p>
            <h2 className="serif mt-3 text-2xl text-black">
              You’re in
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-700">
              You can now continue using the Boolean Builder. We’ll also follow up with additional insight from 24 Hour Search.
            </p>

            <button
              onClick={onClose}
              type="button"
              className="mt-6 rounded-xl bg-[#8b000f] px-5 py-3 text-white font-medium transition hover:bg-[#74000c]"
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