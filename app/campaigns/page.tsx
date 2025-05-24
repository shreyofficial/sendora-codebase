import { Plus, Megaphone } from "lucide-react"
import Sidebar from "@/components/sidebar"
import EmptyState from "@/components/empty-state"
import Link from "next/link"

export default function Campaigns() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Campaigns</h1>
            <Link
              href="/campaigns/new/select-type"
              className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 px-4 rounded text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Campaign</span>
            </Link>
          </div>

          {/* Content Area */}
          <div className="theme-card p-6">
            <EmptyState
              icon={<Megaphone className="w-8 h-8" />}
              title="No campaigns found"
              description="You haven't created any campaigns yet. Create a campaign to start reaching out to your audience."
            />
          </div>
        </div>
      </main>
    </div>
  )
}

