import { useState } from 'react'

const faqItems = [
  {
    question: 'What is a Boolean search?',
    answer:
      'A Boolean search is a structured way to find candidates using keywords and logic. Instead of typing a sentence, you define exactly what should appear and what should not. It is how recruiters search large databases like LinkedIn efficiently.',
  },
  {
    question: 'Why am I not seeing the right candidates?',
    answer:
      'Most candidates do not fully complete their profiles. If you search too literally, you will miss strong talent. The strongest candidates are often found through what is implied, not what is explicitly written. This is where most searches fail.',
  },
  {
    question: 'Can I rely on this to fill a role?',
    answer:
      'No. This gives you a starting point. It does not give you a search. It does not tell you where the best candidates sit, how to calibrate the role against the market, or how to engage passive talent. That is where the Search Blueprint comes in.',
  },
]

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-medium text-black">{question}</span>
        <span className="ml-4 text-xl text-[#8b000f]">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5">
          <p className="text-sm leading-7 text-gray-600">{answer}</p>
        </div>
      )}
    </div>
      )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const handleToggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <div className="mt-10 rounded-[28px] border border-black/8 bg-[#fcf9f7] p-6 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b000f]">
        Common Questions
      </p>

      <h2 className="serif mt-3 text-3xl text-black">
        Before you assume the search is wrong
      </h2>

      <p className="mt-3 text-sm leading-7 text-gray-700">
        This tool is useful, but it is still only the first layer of a real search.
      </p>

      <div className="mt-6 space-y-3">
        {faqItems.map((item, index) => (
          <FAQItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default FAQ