export function getAlternateTitle(jobTitle) {
  const lower = jobTitle.toLowerCase()

  if (lower.includes('vice president')) {
    return jobTitle.replace(/vice president/i, 'VP')
  }

  if (lower.includes('vp')) {
    return jobTitle.replace(/\bvp\b/i, 'Vice President')
  }

  if (lower.includes('director of')) {
    return jobTitle.replace(/director of/i, 'Head of')
  }

  if (lower.includes('manager') && !lower.includes('senior')) {
    return `Senior ${jobTitle}`
  }

  if (lower.includes('senior') && lower.includes('manager')) {
    return jobTitle.replace(/senior/i, '').replace(/\s+/g, ' ').trim()
  }

  return ''
}

export function getAlternateSeniority(seniority) {
  const map = {
    Coordinator: 'Specialist',
    Manager: 'Senior Manager',
    Director: 'Head',
    'Vice President': 'VP',
    SVP: 'Senior Vice President',
    'C-Suite': '',
  }

  return map[seniority] || ''
}

function getIndustryTerms(industry) {
  const industryMap = {
    'Commercial Real Estate': ['Commercial Real Estate', 'Real Estate'],
    'Financial Services': ['Financial Services', 'Finance'],
    'Professional Services': ['Professional Services', 'Consulting'],
    Technology: ['Technology', 'Tech'],
    Healthcare: ['Healthcare', 'Health'],
  }

  return industryMap[industry] || []
}

function normalizeDegree(input) {
  if (!input) return ''

  const val = input.toLowerCase()

  const map = {
    mba: ['MBA', 'Master of Business Administration', 'Masters of Business Administration'],
    bachelors: ["Bachelor's", 'Bachelors', 'Bachelor'],
    masters: ["Master's", 'Masters', 'Master'],
    jd: ['JD', 'Juris Doctor'],
  }

  for (const key in map) {
    if (val.includes(key)) {
      return map[key]
    }
  }

  return [input]
}

export function buildBooleanString(formData) {
  if (!formData.jobTitle || !formData.location) {
    return null
  }

  const altTitle = getAlternateTitle(formData.jobTitle)
  const altSeniority = getAlternateSeniority(formData.seniority)

  const titleBlock = altTitle
    ? `("${formData.jobTitle}" OR "${altTitle}")`
    : `("${formData.jobTitle}")`

  const skills = [formData.skill1, formData.skill2, formData.skill3].filter(
    (skill) => skill.trim() !== ''
  )

  const skillsBlock =
    skills.length > 0
      ? ` AND (${skills.map((skill) => `"${skill.trim()}"`).join(' OR ')})`
      : ''

  const industryTerms =
    formData.industry && formData.industry !== 'Other'
      ? getIndustryTerms(formData.industry)
      : []

  const industryBlock =
    industryTerms.length > 0
      ? ` AND (${industryTerms.map((term) => `"${term}"`).join(' OR ')})`
      : ''

  const seniorityBlock = formData.seniority
    ? altSeniority
      ? ` AND ("${formData.seniority}" OR "${altSeniority}")`
      : ` AND "${formData.seniority}"`
    : ''

  const degreeTerms = normalizeDegree(formData.education)

const educationBlock =
  degreeTerms.length > 0
    ? ` AND (${degreeTerms.map((d) => `"${d}"`).join(' OR ')})`
    : ''

  const certificationBlock = formData.certification.trim()
    ? ` AND "${formData.certification.trim()}"`
    : ''

  const excludeTerms = (formData.exclude || '')
    .split(',')
    .map((term) => term.trim())
    .filter(Boolean)

  const excludeBlock =
    excludeTerms.length > 0
      ? ` NOT (${excludeTerms.map((term) => `"${term}"`).join(' OR ')})`
      : ''

  const baseString = `${titleBlock}${skillsBlock}${industryBlock} AND "${formData.location}"${seniorityBlock}${educationBlock}${certificationBlock}${excludeBlock}`

if (formData.platform === 'xray') {
  return `site:linkedin.com/in ${baseString}`
}

return baseString
}