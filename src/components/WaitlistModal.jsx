import { useState } from 'react'

function WaitlistModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
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
            <button onClick={onClose} className="mt-4 text-sm">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WaitlistModal