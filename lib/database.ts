const SUPABASE_URL = "https://bemvcxfitdfzbsdszsli.supabase.co"
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlbXZjeGZpdGRmemJzZHN6c2xpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDQ1Nzk4NCwiZXhwIjoyMDY2MDMzOTg0fQ.wm4QIrQ8T7g64Qk-18EklQkq8HtmaR9v4AKeS-odidA"

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
}

export interface DatabasePage {
  id?: number
  slug: string
  data: any // Changed to any to handle complex JSON structures
  created_at?: string
  updated_at?: string
  Company_name: string
  person_name: string
}

export class DatabaseService {
  // Get all pages - REVERTED to original working query
  static async getPages(): Promise<DatabasePage[]> {
    console.log("🔍 Fetching pages from database...")

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/pages?select=*&order=updated_at.desc`, {
        method: "GET",
        headers,
      })

      if (!response.ok) {
        console.error("❌ Database fetch error:", response.status, response.statusText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("✅ Raw database response:", data)
      console.log(`📊 Found ${data.length} pages in database`)

      // Log each page's structure
      data.forEach((page: DatabasePage, index: number) => {
        console.log(`📄 Page ${index + 1}:`, {
          slug: page.slug,
          dataKeys: Object.keys(page.data || {}),
          company: page.Company_name,
          person: page.person_name,
          created: page.created_at,
          updated: page.updated_at,
        })
      })

      return data || []
    } catch (error) {
      console.error("❌ Error fetching pages:", error)
      return []
    }
  }

  // Create a new page
  static async createPage(
    pageData: Omit<DatabasePage, "id" | "created_at" | "updated_at">,
  ): Promise<DatabasePage | null> {
    console.log("➕ Creating new page:", pageData)

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/pages`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          slug: pageData.slug,
          data: pageData.data,
          Company_name: pageData.Company_name,
          person_name: pageData.person_name,
        }),
      })

      if (!response.ok) {
        console.error("❌ Database create error:", response.status, response.statusText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("✅ Created page:", data[0])
      return data[0] || null
    } catch (error) {
      console.error("❌ Error creating page:", error)
      return null
    }
  }

  // Update a page - FIXED to work with slug-based updates
  static async updatePage(id: number, pageData: Partial<DatabasePage>): Promise<DatabasePage | null> {
    console.log(`📝 Updating page with generated ID ${id}:`, pageData)

    try {
      // Find the page by the generated ID (we need to get the slug first)
      const allPages = await this.getPages()
      const targetPage = allPages.find((page) => {
        const uniqueString = `${page.slug}-${page.created_at || Date.now()}`
        const pageId = Math.abs(
          uniqueString.split("").reduce((hash, char) => {
            hash = (hash << 5) - hash + char.charCodeAt(0)
            return hash & hash
          }, 0),
        )
        return pageId === id
      })

      if (!targetPage) {
        console.error("❌ Page not found for update")
        return null
      }

      const updateData: any = {}
      if (pageData.slug) updateData.slug = pageData.slug
      if (pageData.data) updateData.data = pageData.data
      if (pageData.Company_name) updateData.Company_name = pageData.Company_name
      if (pageData.person_name) updateData.person_name = pageData.person_name

      const response = await fetch(`${SUPABASE_URL}/rest/v1/pages?slug=eq.${targetPage.slug}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        console.error("❌ Database update error:", response.status, response.statusText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("✅ Updated page:", data[0])
      return data[0] || null
    } catch (error) {
      console.error("❌ Error updating page:", error)
      return null
    }
  }

  // Removed deletePage, deletePages, updatePagesStatus functions

  // Search pages - REVERTED to original working query
  static async searchPages(query: string): Promise<DatabasePage[]> {
    console.log("🔍 Searching pages for:", query)

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/pages?or=(data->>title.ilike.*${query}*,data->>content.ilike.*${query}*,data->hero->>tagline.ilike.*${query}*,data->hero->>description.ilike.*${query}*)&order=updated_at.desc`,
        {
          method: "GET",
          headers,
        },
      )

      if (!response.ok) {
        console.error("❌ Database search error:", response.status, response.statusText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`🔍 Search results: ${data.length} pages found`)
      return data || []
    } catch (error) {
      console.error("❌ Error searching pages:", error)
      return []
    }
  }
}
