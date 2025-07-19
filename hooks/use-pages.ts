"use client"

import { useState, useEffect } from "react"
import { DatabaseService } from "@/lib/database"
import { dbPageToPage, pageToDbPage, countWords } from "@/lib/utils"
import type { Page, DatabasePage } from "@/types"
import { SUPABASE_URL, headers } from "@/config" // Declare SUPABASE_URL and headers

export function usePages() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load pages from database
  const loadPages = async () => {
    try {
      setLoading(true)
      setError(null)
      const dbPages = await DatabaseService.getPages()
      const convertedPages = dbPages.map(dbPageToPage)
      setPages(convertedPages)
    } catch (err) {
      setError("Failed to load pages")
      console.error("Error loading pages:", err)
    } finally {
      setLoading(false)
    }
  }

  // Create a new page
  const createPage = async (prompt: string): Promise<Page | null> => {
    try {
      const title = `Generated: ${prompt.substring(0, 50)}${prompt.length > 50 ? "..." : ""}`
      const content = `This is AI-generated content based on your prompt: "${prompt}"\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`

      const newPageData = pageToDbPage({
        title,
        content,
        prompt,
        status: "draft",
        tags: ["ai-generated"],
        wordCount: countWords(content),
        companyName: "AI Company",
        personName: "AI User",
      })

      const dbPage = await DatabaseService.createPage(newPageData as any)
      if (dbPage) {
        const newPage = dbPageToPage(dbPage)
        setPages((prev) => [newPage, ...prev])
        return newPage
      }
      return null
    } catch (err) {
      console.error("Error creating page:", err)
      return null
    }
  }

  // Update a page
  const updatePage = async (updatedPage: Page): Promise<boolean> => {
    try {
      const dbPageData = pageToDbPage(updatedPage)
      const result = await DatabaseService.updatePage(updatedPage.id, dbPageData)

      if (result) {
        setPages((prev) => prev.map((p) => (p.id === updatedPage.id ? updatedPage : p)))
        return true
      }
      return false
    } catch (err) {
      console.error("Error updating page:", err)
      return false
    }
  }

  // Removed deletePage, deletePages, updatePagesStatus, duplicatePage functions

  // Search pages - REVERTED to original working query
  const searchPages = async (query: string): Promise<DatabasePage[]> => {
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

  // Load pages on mount
  useEffect(() => {
    loadPages()
  }, [])

  return {
    pages,
    loading,
    error,
    loadPages,
    createPage,
    updatePage,
    // Removed deletePage, deletePages, updatePagesStatus, duplicatePage
    searchPages,
  }
}
