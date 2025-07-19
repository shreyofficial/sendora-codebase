export interface Page {
  id: number
  slug: string
  title: string
  content: string
  originalData?: any // PRESERVE ORIGINAL JSON STRUCTURE
  prompt: string
  createdAt: Date
  updatedAt: Date
  status: "draft" | "published" | "archived"
  thumbnail?: string
  tags: string[]
  wordCount: number
  companyName: string
  personName: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export type ViewMode = "grid" | "list"
export type SortOption = "newest" | "oldest" | "title" | "status"

export interface DatabasePage {
  id?: number
  slug: string
  data: {
    title: string
    content: string
    prompt: string
    status: "draft" | "published" | "archived"
    tags: string[]
    wordCount: number
    thumbnail?: string
    hero?: any
    reviews?: any[]
    pricingOptions?: any[]
    footer?: any
    [key: string]: any // Allow any other JSON structure
  }
  created_at?: string
  updated_at?: string
  Company_name: string
  person_name: string
}
