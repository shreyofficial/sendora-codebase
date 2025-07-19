"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageCreationForm } from "@/components/page-creation-form"
import { PageCard } from "@/components/page-card"
import { PageFilters } from "@/components/page-filters"
import { PageEditor } from "@/components/page-editor" // Import PageEditor
import { usePages } from "@/hooks/use-pages"
import type { Page, ViewMode } from "@/types"
import { FileText, Plus, Sparkles, Zap, Loader2 } from "lucide-react" // Removed RefreshCw, Bell, Settings
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation" // Import useRouter
import { RefreshCw } from "lucide-react" // Declare RefreshCw

export default function Dashboard() {
  const { pages, loading, error, loadPages, createPage, updatePage, searchPages } = usePages()

  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("list") // Force list view
  // Removed sortBy and statusFilter states
  const [searchResults, setSearchResults] = useState<Page[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const { toast } = useToast()
  const router = useRouter() // Initialize useRouter

  // Handle search
  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim()) {
        setIsSearching(true)
        const results = await searchPages(searchQuery)
        setSearchResults(results)
        setIsSearching(false)
      } else {
        setSearchResults([])
      }
    }

    const debounceTimer = setTimeout(handleSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, searchPages]) // Added searchPages to dependency array

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "n":
            e.preventDefault()
            document.querySelector("textarea")?.focus()
            break
          case "k":
            e.preventDefault()
            document.querySelector('input[placeholder*="Search"]')?.focus()
            break
          // Removed Ctrl+R for refresh
        }
      }
      if (e.key === "Escape" && editingPage) {
        setEditingPage(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [editingPage]) // Removed loadPages from dependency array

  // Filter and sort pages - Simplified
  const filteredAndSortedPages = useMemo(() => {
    const pagesToFilter = searchQuery.trim() ? searchResults : pages

    // No status or sort filtering
    return pagesToFilter
  }, [pages, searchResults, searchQuery])

  const handleCreatePage = async (prompt: string) => {
    const newPage = await createPage(prompt)
    if (newPage) {
      toast({ title: "✨ Success", description: "Your AI page has been created!" })
    } else {
      toast({ title: "❌ Error", description: "Failed to create page. Please try again." })
    }
  }

  const handleEditPage = (page: Page) => {
    setEditingPage(page)
  }

  const handleSavePage = async (updatedPage: Page) => {
    const success = await updatePage(updatedPage)
    if (success) {
      setEditingPage(null)
      toast({ title: "💾 Saved", description: "Page updated successfully!" })
    } else {
      toast({ title: "❌ Error", description: "Failed to save page. Please try again." })
    }
  }

  // Handle view page navigation
  const handleViewPage = (page: Page) => {
    router.push(`https://offer.sendora.ai/pages/${page.slug}`)
  }

  // Removed handleDuplicatePage, handleDeletePage, handleSelectPage, handleBulkDelete, handleBulkStatusChange

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Loading your pages...</h2>
          <p className="text-slate-600 dark:text-slate-400">Connecting to database</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Connection Error</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
          <Button onClick={loadPages} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (editingPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <PageEditor page={editingPage} onSave={handleSavePage} onCancel={() => setEditingPage(null)} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Top Navigation - Simplified */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-slate-900 dark:text-white">AI Page Manager</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Removed RefreshCw, Bell, Settings buttons */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Database-Powered AI Content
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Create Amazing Content with AI</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Transform your ideas into compelling pages using advanced AI technology. All data is securely stored in your
            Supabase database.
          </p>
        </div>

        {/* Page Creation - Prominent */}
        <div className="max-w-3xl mx-auto">
          <PageCreationForm onCreatePage={handleCreatePage} />
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Your Pages</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Manage and organize your AI-generated content
                {isSearching && <span className="ml-2 text-blue-600">Searching...</span>}
              </p>
            </div>
          </div>

          {/* Filters - Simplified */}
          <PageFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            // Removed viewMode, onViewModeChange, sortBy, onSortChange, statusFilter, onStatusFilterChange, selectedCount, onBulkDelete, onBulkStatusChange
          />

          {/* Pages List (forced) */}
          <div className="space-y-4">
            {filteredAndSortedPages.length === 0 ? (
              <Card className="col-span-full border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mb-6">
                    <FileText className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                    {searchQuery ? "No pages match your search" : "Ready to create your first page?"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center mb-6 max-w-md">
                    {searchQuery
                      ? "Try adjusting your search terms to find what you're looking for."
                      : "Get started by describing what kind of content you'd like to create. Our AI will handle the rest!"}
                  </p>
                  {!searchQuery && (
                    <Button
                      onClick={() => document.querySelector("textarea")?.focus()}
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Page
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              filteredAndSortedPages.map((page) => (
                <PageCard
                  key={page.id}
                  page={page}
                  viewMode={viewMode} // Still pass viewMode, but it's always 'list'
                  onEdit={handleEditPage}
                  onView={handleViewPage} // Pass the new handleViewPage
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
