"use client"

import { useState, useEffect } from "react"
import { Search, Plus, BookOpen, FileText, Clock, Star, Filter } from "lucide-react"
import Sidebar from "@/components/sidebar"
import EmptyState from "@/components/empty-state"
import KnowledgeBaseSelectionModal from "@/components/knowledge-base-selection-modal"
import { useTheme } from "@/components/theme-provider"

// Sample data for demonstration
const SAMPLE_KNOWLEDGE_BASES = [
  {
    id: "kb1",
    name: "Product Documentation",
    description: "Complete documentation for our product features and usage",
    type: "AI Generated",
    date: "2 days ago",
    starred: true,
  },
  {
    id: "kb2",
    name: "Sales Playbook",
    description: "Strategies and scripts for the sales team",
    type: "Uploaded",
    date: "1 week ago",
    starred: false,
  },
  {
    id: "kb3",
    name: "Customer FAQs",
    description: "Frequently asked questions from customers",
    type: "AI Generated",
    date: "3 days ago",
    starred: true,
  },
]

export default function KnowledgeBase() {
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSampleData, setShowSampleData] = useState(false)
  const { theme } = useTheme()

  // For demo purposes, show sample data after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSampleData(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredKnowledgeBases = SAMPLE_KNOWLEDGE_BASES.filter(
    (kb) =>
      kb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kb.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold">Knowledge Base</h1>
            <button
              onClick={() => setIsSelectionModalOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                theme === "dark"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Knowledge Base</span>
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search Knowledge Base..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "bg-card border border-border focus:border-primary/50"
                    : "bg-white border border-gray-200 focus:border-blue-300"
                } focus:outline-none focus:ring-1 focus:ring-primary/30`}
              />
            </div>
            <button
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium ${
                theme === "dark"
                  ? "bg-secondary hover:bg-secondary/80 text-foreground"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          {/* Content Area */}
          <div
            className={`rounded-xl overflow-hidden ${
              theme === "dark" ? "bg-card/50 border border-border/50" : "bg-white border border-gray-200 shadow-sm"
            }`}
          >
            {!showSampleData ? (
              <div className="p-8">
                <EmptyState
                  icon={<BookOpen className="w-10 h-10" />}
                  title="No knowledge bases found"
                  description="Create your first knowledge base to help your AI agents answer questions accurately."
                />
              </div>
            ) : (
              <>
                {/* Knowledge Base List */}
                <div className="divide-y divide-border">
                  {filteredKnowledgeBases.map((kb) => (
                    <div
                      key={kb.id}
                      className={`p-5 transition-colors ${theme === "dark" ? "hover:bg-muted/20" : "hover:bg-gray-50"}`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            kb.type === "AI Generated"
                              ? theme === "dark"
                                ? "bg-primary/20"
                                : "bg-blue-100"
                              : theme === "dark"
                                ? "bg-secondary"
                                : "bg-gray-100"
                          }`}
                        >
                          {kb.type === "AI Generated" ? (
                            <BookOpen className={`w-6 h-6 ${theme === "dark" ? "text-primary" : "text-blue-600"}`} />
                          ) : (
                            <FileText className={`w-6 h-6 ${theme === "dark" ? "text-foreground" : "text-gray-700"}`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium">{kb.name}</h3>
                            {kb.starred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                          </div>
                          <p className="text-muted-foreground text-sm mt-1">{kb.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                kb.type === "AI Generated"
                                  ? theme === "dark"
                                    ? "bg-primary/20 text-primary"
                                    : "bg-blue-100 text-blue-700"
                                  : theme === "dark"
                                    ? "bg-secondary text-foreground"
                                    : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {kb.type === "AI Generated" ? (
                                <>
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                  AI Generated
                                </>
                              ) : (
                                <>
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                                  Uploaded
                                </>
                              )}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {kb.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className={`p-2 rounded-lg ${theme === "dark" ? "hover:bg-muted" : "hover:bg-gray-100"}`}
                          >
                            <Star
                              className={`w-5 h-5 ${
                                kb.starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                              }`}
                            />
                          </button>
                          <button
                            className={`px-3 py-1.5 rounded-lg text-sm ${
                              theme === "dark"
                                ? "bg-primary/20 text-primary hover:bg-primary/30"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            }`}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Selection Modal */}
      <KnowledgeBaseSelectionModal isOpen={isSelectionModalOpen} onClose={() => setIsSelectionModalOpen(false)} />
    </div>
  )
}
