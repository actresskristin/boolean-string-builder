import { useEffect, useState } from 'react'

function WaitlistModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setForm({
        name: '',
        email: '',
        company: '',
      })
      setError('')
      setSuccess(false)
      setIsSubmitting(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.')
      return
    }

    if (!isValidEmail(form.email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    try {
      setIsSubmitting(true)

      await onSubmit({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        company: form.company.trim(),
      })

      setSuccess(true)
    } catch (err) {
      console.error('Waitlist submit failed:', err)
      setError('Something went wrong while joining the waitlist.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackdropClick = () => {
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl leading-none text-gray-400 transition hover:text-black"
          aria-label="Close"
        >
          ✕
        </button>

        {!success ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b000f]">
              Blueprint Waitlist
            </p>

            <h2 className="serif mt-3 text-2xl text-black">
              Join the Waitlist
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-700">
              Enter your details to be notified when the Search Blueprint becomes available.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-black/10 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Work email"
                className="w-full rounded-xl border border-black/10 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
              />

              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                type="text"
                placeholder="Company"
                className="w-full rounded-xl border border-black/10 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8b000f] focus:ring-4 focus:ring-red-100"
              />

              {error && (
                <p className="text-sm text-[#8b000f]">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#8b000f] px-5 py-3 text-white transition hover:bg-[#74000c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
              </button>

              <p className="text-xs leading-6 text-gray-500">
                Your information is never sold or shared. Used only by 24 Hour Search.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b000f]">
              You’re on the list
            </p>

            <h2 className="serif mt-3 text-2xl text-black">
              Success
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-700">
              We’ll let you know when the Search Blueprint is available.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-[#8b000f] px-5 py-3 text-white transition hover:bg-[#74000c]"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WaitlistModal