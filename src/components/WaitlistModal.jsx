import { useEffect, useState } from 'react'

function WaitlistModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

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

  if (!isOpen) return null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.email) {
      setError('Name and email are required')
      return
    }

    await onSubmit(form)
    setSuccess(true)
  }

  const handleBackdropClick = (e) => {
    if (e.target.id === 'waitlist-backdrop') {
      onClose()
    }
  }

  return (
    <div
      id="waitlist-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 relative">
        
        {/* X Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-black text-lg"
        >
          ✕
        </button>

        {!success ? (
          <>
            <h2 className="serif text-xl">Join the Waitlist</h2>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <input
                name="name"
                placeholder="Your name"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="email"
                placeholder="Work email"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="company"
                placeholder="Company"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button className="w-full bg-[#8b000f] text-white py-2 rounded">
                Join Waitlist
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg">You’re on the list.</p>

            <button
              onClick={onClose}
              className="mt-4 text-sm text-gray-500"
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