"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Eye, Calendar, User, Building2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Page } from "@/types"
import { formatDistanceToNow } from "date-fns"
import { useRouter } from "next/navigation" // Import useRouter

interface PageCardProps {
  page: Page
  viewMode: "grid" | "list" // Keep viewMode prop for conditional rendering, though it will always be 'list' now
  onEdit: (page: Page) => void
  onView: (page: Page) => void // Keep onView prop
}

export function PageCard({ page, viewMode, onEdit, onView }: PageCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter() // Initialize useRouter

  // Add safety checks for page data
  if (!page) {
    console.warn("⚠️ PageCard received null/undefined page")
    return null
  }

  console.log("🎨 Rendering PageCard for:", page.title, "ID:", page.id)

  const statusConfig = {
    published:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/50",
    draft:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800/50",
    archived:
      "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950/50 dark:text-slate-400 dark:border-slate-800/50",
  }

  // Add fallback for undefined status
  const getStatusConfig = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
  }

  // Safe data extraction with fallbacks
  const safeTitle = page.title || "Untitled Page"
  const safeContent = page.content || "No content available"
  const safeStatus = page.status || "draft"
  const safeUpdatedAt = page.updatedAt ? new Date(page.updatedAt) : new Date()
  const safeId = page.id
  const safeCompanyName = page.companyName || "N/A"
  const safePersonName = page.personName || "N/A"

  // Handle view page navigation
  const handleViewPage = (pageSlug: string) => {
    router.push(`https://offer.sendora.ai/pages/${pageSlug}`)
  }

  // Force list view rendering
  return (
    <Card
      className={`group transition-all duration-300 hover:shadow-lg cursor-pointer border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-800/90`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Removed checkbox */}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {safeTitle}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                  <Building2 className="h-4 w-4" />
                  <span>{safeCompanyName}</span>
                  <User className="h-4 w-4 ml-2" />
                  <span>{safePersonName}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {safeContent.length > 150 ? `${safeContent.substring(0, 150)}...` : safeContent}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge className={`${getStatusConfig(safeStatus).color} flex items-center gap-1.5`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${getStatusConfig(safeStatus).dot}`} />
                  {safeStatus}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
                {/* Removed company and person name here as they are now above title */}
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDistanceToNow(safeUpdatedAt, { addSuffix: true })}
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(page)}
                    className="h-8 px-3 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm"
                    >
                      <DropdownMenuItem onClick={() => handleViewPage(page.slug)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      {/* Removed Duplicate and Delete */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
