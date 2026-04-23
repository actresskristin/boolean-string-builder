import { useState } from 'react'
import { motion } from 'framer-motion'

function TierOneCard({ generatedString, onCopy }) {
  const [copied, setCopied] = useState(false)

  const handleCopyClick = () => {
    if (!generatedString) return

    onCopy()
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1200)
  }

  return (
    <div className="mt-6 rounded-[28px] bg-[#120708] p-6 text-white shadow-[0_18px_50px_rgba(0,0,0,0.2)] sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-red-200">
            Layer 1: Targeting Logic
          </p>

          <p className="mt-2 text-sm text-white/70">
            This is how a search begins. Most teams stop here. That is why most searches fail.
          </p>
        </div>

        {generatedString && (
          <button
            onClick={handleCopyClick}
            className="shrink-0 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20 active:scale-95"
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        )}
      </div>

      {!generatedString && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/75">
          Your Boolean string will appear here once generated.
        </div>
      )}

      {generatedString && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white break-words"
        >
          {generatedString}
        </motion.div>
      )}

      {generatedString && (
        <p className="mt-4 text-xs text-white/60">
          Paste this into LinkedIn or Google to begin identifying candidates. This is the first layer of a structured search.
        </p>
      )}
    </div>
  )
}

export default TierOneCard