import { Plus, PieChart } from "lucide-react"
import Sidebar from "@/components/sidebar"
import EmptyState from "@/components/empty-state"

export default function SalesPipeline() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Sales Pipeline</h1>
            <button className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 px-4 rounded text-sm transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Lead</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="theme-card p-6">
            <EmptyState
              icon={<PieChart className="w-8 h-8" />}
              title="No leads in pipeline"
              description="Your sales pipeline is empty. Add leads to start tracking your sales process."
            />
          </div>
        </div>
      </main>
    </div>
  )
}

