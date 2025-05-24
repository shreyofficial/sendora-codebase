import { Search, Plus, BookOpen } from "lucide-react"
import Sidebar from "@/components/sidebar"
import EmptyState from "@/components/empty-state"

export default function KnowledgeBase() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Knowledge Base</h1>
            <button className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 px-4 rounded text-sm transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Knowledge Base</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search Knowledge Base..."
              className="w-full bg-background border border-input rounded-lg py-2.5 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Content Area */}
          <div className="theme-card p-6">
            <EmptyState
              icon={<BookOpen className="w-8 h-8" />}
              title="No documents found"
              description="You don't have any documents yet."
            />
          </div>
        </div>
      </main>
    </div>
  )
}

