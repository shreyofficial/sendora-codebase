"use client"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface PageFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  // Removed viewMode, onViewModeChange, sortBy, onSortChange, statusFilter, onStatusFilterChange
}

export function PageFilters({ searchQuery, onSearchChange }: PageFiltersProps) {
  // Removed handleStatusToggle, clearFilters, hasActiveFilters

  return (
    <div className="space-y-4">
      {/* Main Filter Bar - Simplified to only search */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/60 dark:border-slate-700/60">
        <div className="flex flex-1 gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm focus:border-blue-300 dark:focus:border-blue-600 focus:ring-blue-200 dark:focus:ring-blue-800"
            />
          </div>

          {/* Removed Status Filter and Sort */}
        </div>

        {/* Removed View Mode Toggle */}
      </div>

      {/* Removed Active Filters & Bulk Actions */}
    </div>
  )
}
