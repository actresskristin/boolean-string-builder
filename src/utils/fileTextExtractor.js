import mammoth from 'mammoth'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString()

async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  let fullText = ''

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map((item) => item.str).join(' ')
    fullText += `${pageText}\n`
  }

  return fullText.trim()
}

async function extractTextFromDocx(file) {
  const arrayBuffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer })
  return result.value.trim()
}

export async function extractTextFromFile(file) {
  if (!file) return ''

  const fileName = file.name.toLowerCase()

  if (fileName.endsWith('.pdf')) {
    return extractTextFromPdf(file)
  }

  if (fileName.endsWith('.docx')) {
    return extractTextFromDocx(file)
  }

  throw new Error('Unsupported file type. Please upload a PDF or DOCX file.')
}