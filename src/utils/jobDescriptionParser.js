const INDUSTRY_KEYWORDS = [
  { label: 'Commercial Real Estate', keywords: ['commercial real estate', 'property management', 'lease administration', 'asset management', 'tenant', 'landlord'] },
  { label: 'Financial Services', keywords: ['financial services', 'banking', 'investment', 'wealth management', 'private equity', 'capital markets'] },
  { label: 'Professional Services', keywords: ['professional services', 'consulting', 'advisory', 'client services'] },
  { label: 'Technology', keywords: ['software', 'saas', 'technology', 'engineering', 'product management', 'cloud'] },
  { label: 'Healthcare', keywords: ['healthcare', 'hospital', 'clinical', 'patient', 'medical'] },
  { label: 'Construction', keywords: ['construction', 'general contractor', 'project management', 'owner’s rep', 'owners rep'] },
  { label: 'Manufacturing', keywords: ['manufacturing', 'plant', 'production', 'industrial operations'] },
  { label: 'Logistics', keywords: ['logistics', 'supply chain', 'distribution', 'warehouse', 'fulfillment'] },
  { label: 'Retail', keywords: ['retail', 'store operations', 'merchandising', 'consumer'] },
  { label: 'Hospitality', keywords: ['hospitality', 'hotel', 'lodging', 'guest services'] },
  { label: 'Legal', keywords: ['law firm', 'legal', 'attorney', 'counsel'] },
  { label: 'Accounting', keywords: ['accounting', 'audit', 'tax', 'controller'] },
  { label: 'Insurance', keywords: ['insurance', 'underwriting', 'claims', 'brokerage'] },
  { label: 'Education', keywords: ['education', 'university', 'higher education', 'school'] },
  { label: 'Nonprofit', keywords: ['nonprofit', 'not-for-profit', 'foundation'] },
  { label: 'Energy', keywords: ['energy', 'utilities', 'power generation'] },
  { label: 'Government', keywords: ['government', 'public sector', 'municipal'] },
  { label: 'Biotechnology', keywords: ['biotech', 'biotechnology', 'life sciences'] },
  { label: 'Media', keywords: ['media', 'advertising', 'publishing'] },
  { label: 'Telecommunications', keywords: ['telecommunications', 'telecom', 'wireless'] },
]

const CERTIFICATIONS = [
  'PMP',
  'CPA',
  'LEED AP',
  'SHRM-CP',
  'SHRM-SCP',
  'SPHR',
  'PHR',
  'CFA',
  'PE',
  'CCIM',
  'WELL AP',
  'LEED GA',
]

const DEGREES = [
  { label: 'MBA', patterns: ['mba', 'master of business administration'] },
  { label: "Bachelor's", patterns: ["bachelor's", 'bachelors degree', 'bachelor degree', 'ba ', 'bs '] },
  { label: "Master's", patterns: ["master's", 'masters degree', 'master degree', 'ms ', 'ma '] },
  { label: 'JD', patterns: ['juris doctor', ' jd', 'jd '] },
  { label: 'MSRE', patterns: ['msre', 'master of science in real estate'] },
]

const TITLE_PATTERNS = [
  /chief [a-z&/ -]+/i,
  /vice president of [a-z&/ -]+/i,
  /vp of [a-z&/ -]+/i,
  /senior director of [a-z&/ -]+/i,
  /director of [a-z&/ -]+/i,
  /head of [a-z&/ -]+/i,
  /senior [a-z&/ -]*manager/i,
  /[a-z&/ -]*manager/i,
  /coordinator/i,
]

const SKILL_CANDIDATES = [
  'budgeting',
  'financial modeling',
  'process improvement',
  'lease administration',
  'project management',
  'vendor management',
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
]

function toTitleCase(value) {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bVp\b/g, 'VP')
    .replace(/\bCfo\b/g, 'CFO')
    .replace(/\bCoo\b/g, 'COO')
    .replace(/\bCeo\b/g, 'CEO')
    .trim()
}

function extractTitle(text) {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const bannedStarts = [
    'manage',
    'managing',
    'lead',
    'leading',
    'oversee',
    'overseeing',
    'responsible',
    'responsibilities',
    'ability',
    'experience',
    'experienced',
    'supports',
    'support',
  ]

  const strongTitlePatterns = [
    /^(chief [a-z&/ -]+)$/i,
    /^(vice president(?: of)? [a-z&/ -]+)$/i,
    /^(vp(?: of)? [a-z&/ -]+)$/i,
    /^(senior director(?: of)? [a-z&/ -]+)$/i,
    /^(director(?: of)? [a-z&/ -]+)$/i,
    /^(head of [a-z&/ -]+)$/i,
    /^(senior [a-z&/ -]*manager)$/i,
    /^([a-z&/ -]*transaction manager)$/i,
    /^([a-z&/ -]*property manager)$/i,
    /^([a-z&/ -]*project manager)$/i,
    /^([a-z&/ -]*asset manager)$/i,
    /^([a-z&/ -]*lease administrator)$/i,
    /^([a-z&/ -]*coordinator)$/i,
  ]

  for (const line of lines) {
    const cleaned = line.replace(/[•:|]/g, '').replace(/\s+/g, ' ').trim()
    const lower = cleaned.toLowerCase()

    if (!cleaned) continue
    if (cleaned.length > 60) continue
    if (bannedStarts.some((word) => lower.startsWith(word))) continue

    for (const pattern of strongTitlePatterns) {
      if (pattern.test(cleaned)) {
        return toTitleCase(cleaned)
      }
    }
  }

  return ''

}

function extractIndustry(lowerText) {
  for (const industry of INDUSTRY_KEYWORDS) {
    if (industry.keywords.some((keyword) => lowerText.includes(keyword))) {
      return industry.label
    }
  }
  return ''
}

function extractDegree(lowerText) {
  for (const degree of DEGREES) {
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
    .map((line) => line.trim())
    .filter(Boolean)

  const locationHints = lines.find(
    (line) =>
      /remote|hybrid|onsite|on-site|new york|nyc|dallas|chicago|atlanta|columbus|los angeles|san francisco|boston|washington/i.test(
        line
      )
  )

  return locationHints || ''
}

function extractSkills(lowerText) {
  const matches = SKILL_CANDIDATES.filter((skill) => lowerText.includes(skill))
  return matches.slice(0, 3)
}

function extractSeniority(title) {
  const lower = title.toLowerCase()

  if (lower.includes('chief')) return 'C-Suite'
  if (lower.includes('vice president') || /\bvp\b/i.test(title)) return 'Vice President'
  if (lower.includes('director')) return 'Director'
  if (lower.includes('manager')) return 'Manager'
  if (lower.includes('coordinator')) return 'Coordinator'

  return ''
}

export function parseJobDescription(rawText) {
  const text = (rawText || '').trim()
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