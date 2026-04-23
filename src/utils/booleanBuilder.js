function clean(value) {
  return (value || '').trim()
}

function quote(value) {
  return `"${value}"`
}

export function getAlternateTitle(jobTitle) {
  const title = clean(jobTitle)
  const lower = title.toLowerCase()

  if (!title) return ''

  if (lower.includes('vice president')) {
    return title.replace(/vice president/i, 'VP')
  }

  if (/\bvp\b/i.test(title)) {
    return title.replace(/\bvp\b/i, 'Vice President')
  }

  if (lower.includes('director of')) {
    return title.replace(/director of/i, 'Head of')
  }

  if (lower.includes('manager') && !lower.includes('senior')) {
    return `Senior ${title}`
  }

  if (lower.includes('senior') && lower.includes('manager')) {
    return title.replace(/senior/i, '').replace(/\s+/g, ' ').trim()
  }

  return ''
}

function getIndustryTerms(industry) {
  const map = {
    'Commercial Real Estate': ['Commercial Real Estate', 'Real Estate'],
    'Financial Services': ['Financial Services', 'Finance'],
    'Professional Services': ['Professional Services', 'Consulting'],
    Technology: ['Technology', 'Tech'],
    Healthcare: ['Healthcare', 'Health'],
    Construction: ['Construction', 'General Contractor'],
    Manufacturing: ['Manufacturing', 'Industrial'],
    Logistics: ['Logistics', 'Supply Chain'],
    Retail: ['Retail', 'Consumer'],
    Hospitality: ['Hospitality', 'Hotels'],
    Legal: ['Legal', 'Law Firm'],
    Accounting: ['Accounting', 'CPA'],
    Insurance: ['Insurance', 'Risk'],
    Education: ['Education', 'Higher Education'],
    Nonprofit: ['Nonprofit', 'Not-for-Profit'],
    Energy: ['Energy', 'Utilities'],
    Government: ['Government', 'Public Sector'],
    Biotechnology: ['Biotechnology', 'Biotech'],
    Media: ['Media', 'Advertising'],
    Telecommunications: ['Telecommunications', 'Telecom'],
  }

  return map[industry] || []
}

function normalizeDegree(input) {
  const value = clean(input)
  if (!value) return []

  const lower = value.toLowerCase()

  if (lower === 'mba' || lower.includes('master of business administration')) {
    return ['MBA', 'Master of Business Administration']
  }

  if (
    lower === "bachelor's" ||
    lower === 'bachelors' ||
    lower === 'bachelor' ||
    lower === 'ba' ||
    lower === 'bs'
  ) {
    return ["Bachelor's", 'Bachelors', 'Bachelor']
  }

  if (
    lower === "master's" ||
    lower === 'masters' ||
    lower === 'master' ||
    lower === 'ma' ||
    lower === 'ms'
  ) {
    return ["Master's", 'Masters', 'Master']
  }

  if (lower === 'jd' || lower.includes('juris doctor')) {
    return ['JD', 'Juris Doctor']
  }

  if (lower === 'msre') {
    return ['MSRE', 'Master of Science in Real Estate']
  }

  return [value]
}

function buildTitleBlock(jobTitle) {
  const title = clean(jobTitle)
  const altTitle = getAlternateTitle(title)

  if (!title) return ''

  return altTitle
    ? `(${quote(title)} OR ${quote(altTitle)})`
    : `(${quote(title)})`
}

function buildSkillsBlock(formData) {
  const skills = [formData.skill1, formData.skill2, formData.skill3]
    .map(clean)
    .filter(Boolean)

  if (skills.length === 0) return ''

  return ` AND (${skills.map(quote).join(' OR ')})`
}

function buildIndustryBlock(industry) {
  const terms =
    industry && industry !== 'Other'
      ? getIndustryTerms(industry)
      : []

  if (terms.length === 0) return ''

  return ` AND (${terms.map(quote).join(' OR ')})`
}

function buildLocationBlock(location) {
  const value = clean(location)
  if (!value) return ''
  return ` AND ${quote(value)}`
}

function buildEducationBlock(education) {
  const degreeTerms = normalizeDegree(education)

  if (degreeTerms.length === 0) return ''

  return ` AND (${degreeTerms.map(quote).join(' OR ')})`
}

function buildCertificationBlock(certification) {
  const value = clean(certification)
  if (!value) return ''
  return ` AND ${quote(value)}`
}

function buildExcludeBlock(exclude) {
  const terms = clean(exclude)
    .split(',')
    .map((term) => term.trim())
    .filter(Boolean)

  if (terms.length === 0) return ''

  return ` NOT (${terms.map(quote).join(' OR ')})`
}

export function buildBooleanString(formData) {
  const titleBlock = buildTitleBlock(formData.jobTitle)
  const locationBlock = buildLocationBlock(formData.location)

  if (!titleBlock || !locationBlock) {
    return null
  }

  const coreString =
    `${titleBlock}` +
    `${buildSkillsBlock(formData)}` +
    `${buildIndustryBlock(formData.industry)}` +
    `${locationBlock}` +
    `${buildEducationBlock(formData.education)}` +
    `${buildCertificationBlock(formData.certification)}` +
    `${buildExcludeBlock(formData.exclude)}`

  if (formData.platform === 'xray') {
    return `site:linkedin.com/in ${coreString}`
  }

  return coreString
}