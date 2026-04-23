import { motion } from 'framer-motion'
import heroImage from '../assets/tool-hero.jpg'

function ToolHero() {
  return (
    <section className="border-b border-black/5 bg-[#efe6e1]">
      <div className="mx-auto grid max-w-6xl items-stretch gap-0 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center px-6 py-14 sm:px-10 lg:px-12 lg:py-20"
        >
          <div className="max-w-xl">
            <div className="mb-6 h-[3px] w-16 bg-[#8b000f]" />

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b000f]">
              Free Search Strategy Preview
            </p>

            <h1 className="serif mt-4 text-4xl leading-tight text-black sm:text-5xl">
              Build a smarter candidate search in seconds.
            </h1>

            <p className="mt-5 text-base leading-8 text-gray-700 sm:text-lg">
              This free tool gives you the starting point of a real, targeted search strategy.
              Most hiring teams rely on job postings and inbound applicants. The
              strongest candidates are not applying.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative min-h-[320px] lg:min-h-full"
        >
          <img
            src={heroImage}
            alt="24 Hour Search branded hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
          <div className="absolute left-0 top-0 h-full w-4 bg-[#8b000f]" />
        </motion.div>
      </div>
    </section>
  )
}

export default ToolHero