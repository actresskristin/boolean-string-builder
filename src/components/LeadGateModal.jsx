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
                  This is just the beginning.
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-700">
                  Enter your details to continue.
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 transition hover:text-black"
                type="button"
                aria-label="Close"
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
                className="w-full rounded-xl border border-black/10 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
              />

              <input
                name="email"
                value={leadData.email}
                onChange={handleChange}
                type="email"
                placeholder="Work email"
                className="w-full rounded-xl border border-black/10 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
              />

              <input
                name="company"
                value={leadData.company}
                onChange={handleChange}
                type="text"
                placeholder="Company"
                className="w-full rounded-xl border border-black/10 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
              />

              <div className="rounded-xl bg-[#f7f3f1] px-4 py-3 text-sm text-gray-700">
                Role searched: <span className="font-medium text-black">{jobTitle || 'Not provided'}</span>
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-black/10 bg-[#fcf9f7] px-4 py-3 text-sm">
                <input
                  type="checkbox"
                  name="consentToContact"
                  checked={leadData.consentToContact}
                  onChange={handleChange}
                  className="mt-1 accent-[#8b000f]"
                />
                <span className="leading-6 text-gray-700">
                  I agree to be contacted by 24 Hour Search regarding this tool, my search, and related services. I understand I can opt out at any time.
                </span>
              </label>

              {error && <p className="text-sm text-[#8b000f]">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-[#8b000f] px-5 py-3 text-white transition hover:bg-[#74000c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Unlocking...' : 'Unlock the Full Builder'}
              </button>

              <p className="text-xs leading-6 text-gray-500">
                Your information is never sold or shared. Used only by 24 Hour Search.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="serif text-2xl text-black">You’re in. Now use this properly.</h2>

            <p className="mt-3 text-sm leading-7 text-gray-700">
              You now have access to the full builder.
            </p>

            <a
              href="mailto:kristin@24hoursearch.com?subject=Join%20the%20Blueprint%20Waitlist"
              className="mt-5 inline-block rounded-xl bg-[#8b000f] px-5 py-3 text-white"
            >
              Join the Waitlist
            </a>

            <button
              onClick={onClose}
              className="mt-4 text-sm text-gray-500"
              type="button"
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