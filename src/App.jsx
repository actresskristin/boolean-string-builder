import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Header from './components/Header'
import ToolHero from './components/ToolHero'
import Hero from './components/Hero'
import BooleanForm from './components/BooleanForm'
import TierOneCard from './components/TierOneCard'
import BlueprintValueCard from './components/BlueprintValueCard'
import LockedTierCard from './components/LockedTierCard'
import LeadGateModal from './components/LeadGateModal'
import WaitlistModal from './components/WaitlistModal'
import { parseJobDescription } from './utils/jobDescriptionParser'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import { buildBooleanString } from './utils/booleanBuilder'
import { db } from './firebase'

const INITIAL_FORM_DATA = {
  platform: 'recruiter',
  jobTitle: '',
  seniority: '',
  industry: '',
  location: '',
  skill1: '',
  skill2: '',
  skill3: '',
  education: '',
  certification: '',
  exclude: '',
}

function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [generatedString, setGeneratedString] = useState('')

  const [showLeadGate, setShowLeadGate] = useState(false)
  const [unlockSuccess, setUnlockSuccess] = useState(false)
  const [pendingGenerate, setPendingGenerate] = useState(false)

  const [showWaitlist, setShowWaitlist] = useState(false)

  const [usageCount, setUsageCount] = useState(() => {
    return parseInt(localStorage.getItem('booleanToolUses') || '0', 10)
  })

  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem('booleanToolUnlocked') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('booleanToolUses', usageCount.toString())
  }, [usageCount])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleParseJobDescription = (rawText) => {
  const parsed = parseJobDescription(rawText)

  if (!parsed) {
    return
  }

  setFormData((prev) => ({
    ...prev,
    ...Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => value)
    ),
  }))
}

  const runGenerate = () => {
    const output = buildBooleanString(formData)

    if (!output) {
      alert('Job Title and Location are required.')
      return false
    }

    setGeneratedString(output)
    return true
  }

  const handleGenerate = () => {
    if (!isUnlocked && usageCount >= 1) {
      setPendingGenerate(true)
      setUnlockSuccess(false)
      setShowLeadGate(true)
      return
    }

    const success = runGenerate()

    if (success && !isUnlocked) {
      setUsageCount((prev) => prev + 1)
    }
  }

  const handleCopy = async () => {
    if (!generatedString) return
    await navigator.clipboard.writeText(generatedString)
  }

  const handleLeadSubmit = async (leadData) => {
    const normalizedEmail = leadData.email.trim().toLowerCase()
    const existingLocalLead = localStorage.getItem('booleanLead')

    if (!existingLocalLead) {
      await addDoc(collection(db, 'leads'), {
        name: leadData.name,
        email: normalizedEmail,
        company: leadData.company,
        jobTitle: leadData.jobTitle || '',
        platform: formData.platform || '',
        seniority: formData.seniority || '',
        industry: formData.industry || '',
        location: formData.location || '',
        consentToContact: leadData.consentToContact,
        createdAt: serverTimestamp(),
      })
    }

    localStorage.setItem('booleanToolUnlocked', 'true')
    localStorage.setItem(
      'booleanLead',
      JSON.stringify({
        name: leadData.name,
        email: normalizedEmail,
        company: leadData.company,
        consentToContact: leadData.consentToContact,
      })
    )

    setIsUnlocked(true)
    setUnlockSuccess(true)

    if (pendingGenerate) {
      const success = runGenerate()
      if (success) {
        setPendingGenerate(false)
      }
    }
  }

  const handleWaitlistSubmit = async (data) => {
    await addDoc(collection(db, 'waitlist'), {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      company: (data.company || '').trim(),
      createdAt: serverTimestamp(),
    })
  }

  const handleCloseLeadGate = () => {
    setShowLeadGate(false)
    setUnlockSuccess(false)
  }

  const handleCloseWaitlist = () => {
    setShowWaitlist(false)
  }

  return (
    <div className="min-h-screen bg-[#f7f3f1] text-black">
      <Header />
      <ToolHero />

      <main>
        <section className="bg-[#f7f3f1] px-6 py-14 sm:py-18">
          <div className="mx-auto max-w-5xl">
            <Hero />

            <motion.section
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mx-auto mt-12 max-w-3xl"
            >
             <BooleanForm
  formData={formData}
  onChange={handleChange}
  onGenerate={handleGenerate}
  onParseJobDescription={handleParseJobDescription}
/>

              <TierOneCard
                generatedString={generatedString}
                onCopy={handleCopy}
                platform={formData.platform}
              />
              <FAQ />
            </motion.section>
          </div>
        </section>

        <section className="border-t border-black/5 bg-[#fcf9f7] px-6 py-14 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl">
              <BlueprintValueCard />

              <LockedTierCard
                previewText="Preview the deeper strategy layer: search direction, candidate mapping, market framing, and outreach structure built around your role."
                onWaitlistClick={() => setShowWaitlist(true)}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <LeadGateModal
        isOpen={showLeadGate}
        onClose={handleCloseLeadGate}
        onSubmit={handleLeadSubmit}
        jobTitle={formData.jobTitle}
        unlockSuccess={unlockSuccess}
      />

      <WaitlistModal
        isOpen={showWaitlist}
        onClose={handleCloseWaitlist}
        onSubmit={handleWaitlistSubmit}
      />
    </div>
  )
}

export default App