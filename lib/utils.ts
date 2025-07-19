import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { DatabasePage, Page } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple hash function for consistent ID generation
function simpleHash(str: string): number {
  let hash = 0
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

// Convert database page to app page format - PRESERVE ORIGINAL JSON
export function dbPageToPage(dbPage: DatabasePage): Page {
  console.log("🔄 Converting database page - PRESERVING JSON:", dbPage)

  const data = dbPage.data || {}

  // Extract title from various sources
  let title = "Untitled Page"
  if (data.title) {
    title = data.title
  } else if (data.hero?.tagline) {
    title = data.hero.tagline
  } else if (data.hero?.clientName) {
    title = `${data.hero.clientName} - Business Page`
  }

  // Create readable content for display but KEEP original JSON
  const createDisplayContent = (jsonData: any): string => {
    const parts = []

    if (jsonData.hero) {
      parts.push(`## ${jsonData.hero.tagline || "Hero Section"}`)
      if (jsonData.hero.description) parts.push(jsonData.hero.description)
      if (jsonData.hero.clientName) parts.push(`**Client:** ${jsonData.hero.clientName}`)
    }

    if (jsonData.endResultQuote) {
      parts.push(`## End Result`)
      parts.push(jsonData.endResultQuote)
    }

    if (jsonData.pricingOptions?.length) {
      parts.push(`## Pricing Options (${jsonData.pricingOptions.length} options)`)
      jsonData.pricingOptions.forEach((option: any, i: number) => {
        parts.push(`### ${option.title || `Option ${i + 1}`}`)
        if (option.description) parts.push(option.description)
      })
    }

    if (jsonData.reviews?.length) {
      parts.push(`## Reviews (${jsonData.reviews.length} reviews)`)
      jsonData.reviews.forEach((review: any) => {
        parts.push(`**${review.author}** - ${review.title}: "${review.text}"`)
      })
    }

    return parts.join("\n\n")
  }

  const displayContent = createDisplayContent(data)

  // Generate consistent ID
  const uniqueString = `${dbPage.slug}-${dbPage.created_at || Date.now()}`
  const generatedId = simpleHash(uniqueString)

  const convertedPage: Page = {
    id: generatedId,
    slug: dbPage.slug || generateSlug(title),
    title,
    content: displayContent, // For display only
    originalData: data, // PRESERVE ORIGINAL JSON STRUCTURE
    prompt: data.prompt || `Create a page for ${data.hero?.clientName || "business"}`,
    status: data.status || "published",
    tags: data.tags || ["business", "landing-page"],
    wordCount: countWords(displayContent),
    thumbnail: dbPage.data.thumbnail || "/placeholder.svg?height=200&width=300", // Use abstract placeholder
    createdAt: dbPage.created_at ? new Date(dbPage.created_at) : new Date(),
    updatedAt: dbPage.updated_at ? new Date(dbPage.updated_at) : new Date(),
    companyName: dbPage.Company_name || "Default Company",
    personName: dbPage.person_name || "Default User",
  }

  console.log("✅ Converted with ORIGINAL JSON preserved:", {
    id: convertedPage.id,
    title: convertedPage.title,
    hasOriginalData: !!convertedPage.originalData,
    originalDataKeys: Object.keys(convertedPage.originalData || {}),
  })

  return convertedPage
}

// Convert app page to database page format - RESTORE ORIGINAL JSON
export function pageToDbPage(page: Partial<Page>): Partial<DatabasePage> {
  console.log("🔄 Converting app page to database format - RESTORING JSON:", page)

  // Use the original JSON data structure if available, otherwise create basic structure
  const originalData = (page as any).originalData || {}

  const dbPage = {
    slug: page.slug || generateSlug(page.title || "untitled"),
    data: {
      ...originalData, // PRESERVE ORIGINAL JSON STRUCTURE
      title: page.title || originalData.title || "",
      status: page.status || originalData.status || "draft",
      tags: page.tags || originalData.tags || [],
      wordCount: page.wordCount || originalData.wordCount || 0,
      thumbnail: page.thumbnail || originalData.thumbnail,
      prompt: page.prompt || originalData.prompt || "",
    },
    Company_name: page.companyName || "Default Company",
    person_name: page.personName || "Default User",
  }

  console.log("✅ Converted to database format with ORIGINAL JSON:", {
    dataKeys: Object.keys(dbPage.data),
    hasHero: !!dbPage.data.hero,
    hasReviews: !!dbPage.data.reviews,
    hasPricing: !!dbPage.data.pricingOptions,
  })

  return dbPage
}

// Generate slug from title
export function generateSlug(title: string): string {
  if (!title || typeof title !== "string") {
    return "untitled-" + Date.now()
  }

  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim() +
    "-" +
    Date.now()
  )
}

// Count words in text
export function countWords(text: string): number {
  if (!text || typeof text !== "string") {
    return 0
  }

  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
}
