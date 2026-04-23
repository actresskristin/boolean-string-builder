const INDUSTRY_KEYWORDS = [
  {
    label: 'Commercial Real Estate',
    keywords: [
      'commercial real estate',
      'property management',
      'lease administration',
      'asset management',
      'tenant improvement',
      'tenant improvements',
      'landlord',
      'tenant',
      'commercial leasing',
      'facilities management',
    ],
  },
  {
    label: 'Financial Services',
    keywords: [
      'financial services',
      'banking',
      'investment',
      'wealth management',
      'private equity',
      'capital markets',
      'asset management',
      'lending',
    ],
  },
  {
    label: 'Professional Services',
    keywords: [
      'professional services',
      'consulting',
      'advisory',
      'client services',
      'business services',
    ],
  },
  {
    label: 'Technology',
    keywords: [
      'software',
      'saas',
      'technology',
      'engineering',
      'product management',
      'cloud',
      'platform',
      'developer',
    ],
  },
  {
    label: 'Healthcare',
    keywords: [
      'healthcare',
      'hospital',
      'clinical',
      'patient',
      'medical',
      'health system',
    ],
  },
  {
    label: 'Construction',
    keywords: [
      'construction',
      'general contractor',
      'owner’s rep',
      "owner's rep",
      'project manager',
      'superintendent',
      'site development',
    ],
  },
  {
    label: 'Manufacturing',
    keywords: [
      'manufacturing',
      'plant',
      'production',
      'industrial operations',
      'factory',
      'assembly',
    ],
  },
  {
    label: 'Logistics',
    keywords: [
      'logistics',
      'supply chain',
      'distribution',
      'warehouse',
      'fulfillment',
      'transportation',
    ],
  },
  {
    label: 'Retail',
    keywords: [
      'retail',
      'store operations',
      'merchandising',
      'consumer',
      'new store locations',
      'site selection',
      'retail real estate',
      'store development',
      'icsc',
    ],
  },
  {
    label: 'Hospitality',
    keywords: ['hospitality', 'hotel', 'lodging', 'guest services'],
  },
  {
    label: 'Legal',
    keywords: ['law firm', 'legal', 'attorney', 'counsel'],
  },
  {
    label: 'Accounting',
    keywords: ['accounting', 'audit', 'tax', 'controller', 'bookkeeping'],
  },
  {
    label: 'Insurance',
    keywords: ['insurance', 'underwriting', 'claims', 'brokerage'],
  },
  {
    label: 'Education',
    keywords: ['education', 'university', 'higher education', 'school'],
  },
  {
    label: 'Nonprofit',
    keywords: ['nonprofit', 'not-for-profit', 'foundation'],
  },
  {
    label: 'Energy',
    keywords: ['energy', 'utilities', 'power generation'],
  },
  {
    label: 'Government',
    keywords: ['government', 'public sector', 'municipal'],
  },
  {
    label: 'Biotechnology',
    keywords: ['biotech', 'biotechnology', 'life sciences'],
  },
  {
    label: 'Media',
    keywords: ['media', 'advertising', 'publishing'],
  },
  {
    label: 'Telecommunications',
    keywords: ['telecommunications', 'telecom', 'wireless'],
  },
]

const CERTIFICATIONS = [
  'PMP',
  'CPA',
  'LEED AP',
  'LEED GA',
  'SHRM-CP',
  'SHRM-SCP',
  'SPHR',
  'PHR',
  'CFA',
  'PE',
  'CCIM',
  'WELL AP',
  'SIOR',
  'RPA',
  'FMA',
]

const DEGREE_PATTERNS = [
  { label: 'MBA', patterns: ['mba', 'master of business administration'] },
  {
    label: "Bachelor's",
    patterns: [
      "bachelor's degree",
      'bachelors degree',
      'bachelor degree',
      'undergraduate degree',
      'ba ',
      'bs ',
      'b.a.',
      'b.s.',
    ],
  },
  {
    label: "Master's",
    patterns: [
      "master's degree",
      'masters degree',
      'master degree',
      'graduate degree',
      'ms ',
      'ma ',
      'm.s.',
      'm.a.',
    ],
  },
  { label: 'JD', patterns: ['juris doctor', ' jd', 'jd '] },
  { label: 'MSRE', patterns: ['msre', 'master of science in real estate'] },
]

const SKILL_CANDIDATES = [
  'site selection',
  'lease negotiations',
  'market analysis',
  'market analyses',
  'lease renewals',
  'letters of intent',
  'vendor management',
  'budgeting',
  'financial modeling',
  'process improvement',
  'lease administration',
  'project management',
  'operations',
  'portfolio management',
  'compliance',
  'underwriting',
  'asset management',
  'construction management',
  'change management',
  'client relationship management',
  'team leadership',
  'recruiting',
  'sourcing',
  'data analysis',
  'forecasting',
  'tenant improvement',
  'capital planning',
  'contract negotiation',
  'store development',
  'real estate leasing',
  'demographics',
  'sales forecasts',
  'market strategies',
]

function clean(value) {
  return (value || '').replace(/\s+/g, ' ').trim()
}

function toTitleCase(value) {
  return clean(value)
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bVp\b/g, 'VP')
    .replace(/\bCfo\b/g, 'CFO')
    .replace(/\bCoo\b/g, 'COO')
    .replace(/\bCeo\b/g, 'CEO')
    .replace(/\bHr\b/g, 'HR')
    .replace(/\bIcsc\b/g, 'ICSC')
}

function normalizeText(value) {
  return clean(value).toLowerCase()
}

function unique(list) {
  return [...new Set(list.filter(Boolean))]
}

function looksLikeBadTitleStart(lower) {
  const bannedStarts = [
    'responsible',
    'principal',
    'minimum',
    'summary',
    'develop',
    'analyze',
    'identify',
    'prepare',
    'work with',
    'track',
    'provide',
    'establish',
    'able to',
    'customer service',
    'extensive travel',
    'computer skills',
    'interface with',
    'position interfaces',
    'this position',
    'manage',
    'managing',
    'lead',
    'leading',
    'oversee',
    'overseeing',
    'experienced',
    'experience',
  ]

  return bannedStarts.some((word) => lower.startsWith(word))
}

function looksLikeTitle(line) {
  const cleaned = clean(line).replace(/[•:|]/g, '')
  const lower = cleaned.toLowerCase()

  if (!cleaned) return false
  if (cleaned.length < 4 || cleaned.length > 55) return false
  if (looksLikeBadTitleStart(lower)) return false

  const goodPatterns = [
    /manager$/i,
    /director$/i,
    /coordinator$/i,
    /administrator$/i,
    /specialist$/i,
    /analyst$/i,
    /vice president/i,
    /^vp\b/i,
    /^chief\b/i,
    /^head of\b/i,
    /lease administrator$/i,
    /real estate manager$/i,
    /transaction manager$/i,
    /project manager$/i,
    /property manager$/i,
    /asset manager$/i,
  ]

  return goodPatterns.some((pattern) => pattern.test(cleaned))
}

function extractTitle(text) {
  const lines = text
    .split('\n')
    .map((line) => clean(line))
    .filter(Boolean)

  // Strongest signal: short title-like lines near the top
  for (const line of lines.slice(0, 10)) {
    const cleaned = clean(line.replace(/[•:|]/g, ''))
    if (looksLikeTitle(cleaned)) {
      return toTitleCase(cleaned)
    }
  }

  // Fallback: line-by-line anywhere in document
  for (const line of lines) {
    const cleaned = clean(line.replace(/[•:|]/g, ''))
    if (looksLikeTitle(cleaned)) {
      return toTitleCase(cleaned)
    }
  }

  return ''
}

function extractSeniority(title) {
  const lower = normalizeText(title)

  if (!lower) return ''
  if (lower.includes('chief')) return 'C-Suite'
  if (lower.includes('vice president') || /\bvp\b/i.test(title)) return 'Vice President'
  if (lower.includes('director')) return 'Director'
  if (lower.includes('manager')) return 'Manager'
  if (lower.includes('coordinator')) return 'Coordinator'

  return ''
}

function extractIndustry(lowerText) {
  let bestMatch = ''
  let bestScore = 0

  for (const industry of INDUSTRY_KEYWORDS) {
    const score = industry.keywords.reduce((count, keyword) => {
      return lowerText.includes(keyword) ? count + 1 : count
    }, 0)

    if (score > bestScore) {
      bestScore = score
      bestMatch = industry.label
    }
  }

  return bestMatch
}

function extractDegree(lowerText) {
  for (const degree of DEGREE_PATTERNS) {
    if (degree.patterns.some((pattern) => lowerText.includes(pattern))) {
      return degree.label
    }
  }
  return ''
}

function extractCertification(text) {
  const upper = text.toUpperCase()

  for (const cert of CERTIFICATIONS) {
    if (upper.includes(cert.toUpperCase())) {
      return cert
    }
  }

  return ''
}

function extractLocation(text) {
  const lines = text
    .split('\n')
    .map((line) => clean(line))
    .filter(Boolean)

  const locationPatterns = [
    /remote/i,
    /hybrid/i,
    /on[- ]site/i,
    /new york/i,
    /\bnyc\b/i,
    /dallas/i,
    /chicago/i,
    /atlanta/i,
    /columbus/i,
    /los angeles/i,
    /san francisco/i,
    /boston/i,
    /washington/i,
    /philadelphia/i,
    /miami/i,
    /houston/i,
  ]

  for (const line of lines.slice(0, 20)) {
    if (locationPatterns.some((pattern) => pattern.test(line))) {
      return line
    }
  }

  return ''
}

function extractSkills(lowerText) {
  const matches = SKILL_CANDIDATES.filter((skill) => lowerText.includes(skill))
  return unique(matches).slice(0, 3)
}

export function parseJobDescription(rawText) {
  const text = clean(rawText)
  const lowerText = text.toLowerCase()

  if (!text) {
    return null
  }

  const title = extractTitle(text)
  const skills = extractSkills(lowerText)

  return {
    jobTitle: title,
    seniority: extractSeniority(title),
    industry: extractIndustry(lowerText),
    location: extractLocation(text),
    skill1: skills[0] || '',
    skill2: skills[1] || '',
    skill3: skills[2] || '',
    education: extractDegree(lowerText),
    certification: extractCertification(text),
  }
}