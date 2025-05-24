"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Phone,
  Mail,
  Calendar,
  Users,
  CheckCircle,
  CalendarRange,
  Bot,
  Activity,
  TrendingUp,
  ChevronDown,
  X,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/motion"
import { debounce } from "@/lib/ux-utils"
import { TooltipProvider } from "@/components/ui/tooltip"

// Sample data for the grid view (removed notes and nextAction)
const sampleLeads = [
  {
    id: "1",
    name: "Acme Corporation",
    contact: "John Smith",
    email: "john@acme.com",
    phone: "+1 (555) 123-4567",
    status: "contacted",
    modifiedDate: "2025-05-24",
    campaign: "Enterprise Outreach Q2",
  },
  {
    id: "2",
    name: "Globex Industries",
    contact: "Sarah Johnson",
    email: "sarah@globex.com",
    phone: "+1 (555) 987-6543",
    status: "replied",
    modifiedDate: "2025-05-23",
    campaign: "SMB Growth Campaign",
  },
  {
    id: "3",
    name: "Wayne Enterprises",
    contact: "Bruce Wayne",
    email: "bruce@wayne.com",
    phone: "+1 (555) 555-5555",
    status: "booked",
    modifiedDate: "2025-05-22",
    campaign: "Enterprise Outreach Q2",
  },
  {
    id: "4",
    name: "Stark Industries",
    contact: "Tony Stark",
    email: "tony@stark.com",
    phone: "+1 (555) 111-2222",
    status: "followed-up",
    modifiedDate: "2025-05-21",
    campaign: "Tech Startup Outreach",
  },
  {
    id: "5",
    name: "Initech Corporation",
    contact: "Bill Lumbergh",
    email: "bill@initech.com",
    phone: "+1 (555) 333-4444",
    status: "contacted",
    modifiedDate: "2025-05-20",
    campaign: "SMB Growth Campaign",
  },
  {
    id: "6",
    name: "Umbrella Corp",
    contact: "Albert Wesker",
    email: "wesker@umbrella.com",
    phone: "+1 (555) 666-7777",
    status: "replied",
    modifiedDate: "2025-05-19",
    campaign: "Tech Startup Outreach",
  },
]

const statusConfig = {
  contacted: {
    label: "Contacted",
    color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800",
  },
  replied: {
    label: "Replied",
    color:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800",
  },
  booked: {
    label: "Booked",
    color:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
  },
  "followed-up": {
    label: "Followed Up",
    color:
      "bg-violet-50 text-violet-700 border-violet-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-800",
  },
}

// Get unique campaigns for filter
const uniqueCampaigns = Array.from(new Set(sampleLeads.map((lead) => lead.campaign)))

export default function SalesPipeline() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const [currentView, setCurrentView] = useState("grid")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const { toast } = useToast()

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

  // Debounce search input
  useEffect(() => {
    setIsSearching(true)
    const debouncedSearch = debounce(() => {
      setDebouncedSearchQuery(searchQuery)
      setIsSearching(false)
    }, 300)
    debouncedSearch()
    return () => {
      // Clean up
    }
  }, [searchQuery])

  // Filter leads based on search, date range, status, and campaign
  const filteredLeads = useMemo(() => {
    return sampleLeads.filter((lead) => {
      // Search filter
      const matchesSearch =
        debouncedSearchQuery === "" ||
        lead.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        lead.contact.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        lead.campaign.toLowerCase().includes(debouncedSearchQuery.toLowerCase())

      // Date range filter
      const leadDate = new Date(lead.modifiedDate)
      const matchesDateRange =
        !dateRange.from || !dateRange.to || (leadDate >= dateRange.from && leadDate <= dateRange.to)

      // Status filter
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(lead.status)

      // Campaign filter
      const matchesCampaign = selectedCampaigns.length === 0 || selectedCampaigns.includes(lead.campaign)

      return matchesSearch && matchesDateRange && matchesStatus && matchesCampaign
    })
  }, [debouncedSearchQuery, dateRange, selectedStatuses, selectedCampaigns])

  // Calculate pipeline stats from filtered data
  const totalLeads = filteredLeads.length
  const bookedLeads = filteredLeads.filter((lead) => lead.status === "booked").length
  const replyRate =
    totalLeads > 0
      ? Math.round(
          (filteredLeads.filter((lead) => lead.status === "replied" || lead.status === "booked").length / totalLeads) *
            100,
        )
      : 0
  const conversionRate = totalLeads > 0 ? Math.round((bookedLeads / totalLeads) * 100) : 0

  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setSelectedStatuses([...selectedStatuses, status])
    } else {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status))
    }
  }

  const handleCampaignChange = (campaign: string, checked: boolean) => {
    if (checked) {
      setSelectedCampaigns([...selectedCampaigns, campaign])
    } else {
      setSelectedCampaigns(selectedCampaigns.filter((c) => c !== campaign))
    }
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setDebouncedSearchQuery("")
    setDateRange({ from: undefined, to: undefined })
    setSelectedStatuses([])
    setSelectedCampaigns([])

    toast({
      title: "Filters cleared",
      description: "All filters have been reset to default values.",
      variant: "info",
    })
  }

  const handleViewDetails = (leadId: string) => {
    toast({
      title: "Lead details",
      description: `Viewing details for lead ID: ${leadId}`,
      variant: "info",
    })
  }

  const hasActiveFilters =
    debouncedSearchQuery || dateRange.from || selectedStatuses.length > 0 || selectedCampaigns.length > 0

  if (isLoading) {
    return null // Let Suspense handle the loading state
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-slate-50 dark:bg-background text-foreground">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6">
            <div className="max-w-[1400px] mx-auto space-y-6">
              {/* Header */}
              <SlideUp className="space-y-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
                  <div className="w-full lg:w-auto">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-foreground">
                        Sales Pipeline
                      </h1>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1.5 px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 dark:from-blue-900/50 dark:to-indigo-900/50 dark:text-blue-300 dark:border-blue-800"
                      >
                        <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        AI-Managed
                      </Badge>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-muted-foreground">
                      Monitor leads generated and managed by your AI voice campaigns
                    </p>
                  </div>

                  {/* Enhanced Controls - Better sizing and spacing */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
                    {/* Enhanced Date Range Picker - Better width and clickability */}
                    <Popover>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`flex items-center gap-2 min-w-[240px] sm:min-w-[260px] justify-start bg-white dark:bg-background border-slate-200 dark:border-border hover:bg-slate-50 dark:hover:bg-muted/50 py-2.5 px-4 h-10 text-sm font-medium transition-colors shadow-sm ${
                                dateRange.from
                                  ? "border-blue-300 bg-blue-50 dark:border-primary/50 dark:bg-primary/5"
                                  : ""
                              }`}
                            >
                              <CalendarRange className="w-4 h-4 flex-shrink-0 text-slate-500 dark:text-muted-foreground" />
                              <span className="truncate text-slate-700 dark:text-foreground">
                                {dateRange.from ? (
                                  dateRange.to ? (
                                    <>
                                      {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                                    </>
                                  ) : (
                                    format(dateRange.from, "MMM d, yyyy")
                                  )
                                ) : (
                                  "Select date range"
                                )}
                              </span>
                            </Button>
                          </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent>Filter leads by date range</TooltipContent>
                      </Tooltip>
                      <PopoverContent className="w-auto p-0" align="end">
                        <CalendarComponent
                          mode="range"
                          selected={{ from: dateRange.from, to: dateRange.to }}
                          onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                          initialFocus
                        />
                        <div className="flex items-center justify-between p-3 border-t">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDateRange({ from: undefined, to: undefined })}
                          >
                            Clear
                          </Button>
                          <Button size="sm">Apply</Button>
                        </div>
                      </PopoverContent>
                    </Popover>

                    {/* Enhanced Filters - Better width and clickability */}
                    <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`flex items-center gap-2 min-w-[120px] sm:min-w-[140px] bg-white dark:bg-background border-slate-200 dark:border-border hover:bg-slate-50 dark:hover:bg-muted/50 py-2.5 px-4 h-10 text-sm font-medium transition-colors shadow-sm ${
                                hasActiveFilters
                                  ? "border-blue-300 bg-blue-50 dark:border-primary/50 dark:bg-primary/5"
                                  : ""
                              }`}
                            >
                              <Filter className="w-4 h-4 flex-shrink-0 text-slate-500 dark:text-muted-foreground" />
                              <span className="text-slate-700 dark:text-foreground">Filters</span>
                              {hasActiveFilters && (
                                <Badge
                                  variant="secondary"
                                  className="ml-1 h-5 w-5 p-0 text-xs flex items-center justify-center bg-blue-500 text-white dark:bg-primary dark:text-primary-foreground"
                                >
                                  {(selectedStatuses.length + selectedCampaigns.length).toString()}
                                </Badge>
                              )}
                              <ChevronDown className="w-4 h-4 flex-shrink-0 text-slate-500 dark:text-muted-foreground" />
                            </Button>
                          </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent>Filter leads by status and campaign</TooltipContent>
                      </Tooltip>
                      <PopoverContent className="w-80" align="end">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Filters</h4>
                            {hasActiveFilters && (
                              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                                Clear all
                              </Button>
                            )}
                          </div>

                          {/* Status Filter */}
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Status</Label>
                            <div className="space-y-2">
                              {Object.entries(statusConfig).map(([status, config]) => (
                                <div key={status} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`status-${status}`}
                                    checked={selectedStatuses.includes(status)}
                                    onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                                  />
                                  <Label htmlFor={`status-${status}`} className="text-sm">
                                    {config.label}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Campaign Filter */}
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Campaign</Label>
                            <div className="space-y-2">
                              {uniqueCampaigns.map((campaign) => (
                                <div key={campaign} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`campaign-${campaign}`}
                                    checked={selectedCampaigns.includes(campaign)}
                                    onCheckedChange={(checked) => handleCampaignChange(campaign, checked as boolean)}
                                  />
                                  <Label htmlFor={`campaign-${campaign}`} className="text-sm">
                                    {campaign}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-end pt-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                setIsFilterOpen(false)
                                toast({
                                  title: "Filters applied",
                                  description: "Your filter settings have been applied.",
                                  variant: "info",
                                })
                              }}
                            >
                              Apply Filters
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <FadeIn className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-slate-600 dark:text-muted-foreground">Active filters:</span>
                    {debouncedSearchQuery && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-slate-100 text-slate-700 border-slate-200 dark:bg-secondary dark:text-secondary-foreground dark:border-border"
                      >
                        Search: "{debouncedSearchQuery}"
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => {
                            setSearchQuery("")
                            setDebouncedSearchQuery("")
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {dateRange.from && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-slate-100 text-slate-700 border-slate-200 dark:bg-secondary dark:text-secondary-foreground dark:border-border"
                      >
                        Date: {format(dateRange.from, "MMM d")} - {dateRange.to ? format(dateRange.to, "MMM d") : "..."}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => setDateRange({ from: undefined, to: undefined })}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {selectedStatuses.map((status) => (
                      <Badge
                        key={status}
                        variant="secondary"
                        className="flex items-center gap-1 bg-slate-100 text-slate-700 border-slate-200 dark:bg-secondary dark:text-secondary-foreground dark:border-border"
                      >
                        Status: {statusConfig[status as keyof typeof statusConfig].label}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => handleStatusChange(status, false)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    {selectedCampaigns.map((campaign) => (
                      <Badge
                        key={campaign}
                        variant="secondary"
                        className="flex items-center gap-1 bg-slate-100 text-slate-700 border-slate-200 dark:bg-secondary dark:text-secondary-foreground dark:border-border"
                      >
                        Campaign: {campaign}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => handleCampaignChange(campaign, false)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-slate-600 dark:text-muted-foreground"
                    >
                      Clear all
                    </Button>
                  </FadeIn>
                )}

                {/* Enhanced Stats Cards - Better responsive design */}
                <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <StaggerItem>
                    <Card className="border-slate-200 dark:border-border bg-white dark:bg-card hover:shadow-lg dark:hover:shadow-md transition-all duration-200 shadow-sm">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-blue-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-muted-foreground mb-1">
                              Total Leads
                            </p>
                            <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-foreground">
                              {totalLeads}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-muted-foreground">
                              {hasActiveFilters ? "Filtered results" : "Generated by AI"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>

                  <StaggerItem>
                    <Card className="border-slate-200 dark:border-border bg-white dark:bg-card hover:shadow-lg dark:hover:shadow-md transition-all duration-200 shadow-sm">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-sm">
                            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-green-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-muted-foreground mb-1">
                              Booked Leads
                            </p>
                            <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-foreground">
                              {bookedLeads}
                            </p>
                            <p className="text-xs text-emerald-600 dark:text-green-400 font-medium">
                              +{conversionRate}% conversion
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>

                  <StaggerItem>
                    <Card className="border-slate-200 dark:border-border bg-white dark:bg-card hover:shadow-lg dark:hover:shadow-md transition-all duration-200 shadow-sm">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-sm">
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-yellow-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-muted-foreground mb-1">
                              Reply Rate
                            </p>
                            <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-foreground">
                              {replyRate}%
                            </p>
                            <p className="text-xs text-slate-500 dark:text-muted-foreground">AI engagement success</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>

                  <StaggerItem>
                    <Card className="border-slate-200 dark:border-border bg-white dark:bg-card hover:shadow-lg dark:hover:shadow-md transition-all duration-200 shadow-sm">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-sm">
                            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-purple-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-muted-foreground mb-1">
                              Active Today
                            </p>
                            <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-foreground">
                              {filteredLeads.filter((lead) => lead.modifiedDate === "2025-05-24").length}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-muted-foreground">Recent activity</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                </StaggerContainer>
              </SlideUp>

              {/* View Switcher */}
              <FadeIn delay={0.1}>
                <div className="flex justify-center">
                  <Tabs value={currentView} onValueChange={setCurrentView} className="w-full sm:w-auto">
                    <TabsList className="grid w-full grid-cols-2 sm:w-auto bg-slate-100 dark:bg-muted/30 border border-slate-200 dark:border-border shadow-sm">
                      <TabsTrigger
                        value="grid"
                        className="flex items-center gap-2 px-4 sm:px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-background text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                          />
                        </svg>
                        Grid View
                      </TabsTrigger>
                      <TabsTrigger
                        value="kanban"
                        asChild
                        className="px-4 sm:px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-background text-sm font-medium"
                      >
                        <Link href="/sales-pipeline/board" className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                            />
                          </svg>
                          Board View
                        </Link>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </FadeIn>

              {/* Grid View Content */}
              <SlideUp delay={0.2}>
                <Card className="border-slate-200 dark:border-border bg-white dark:bg-card hover:shadow-lg dark:hover:shadow-md transition-all duration-200 shadow-sm">
                  <CardHeader className="pb-4 border-b border-slate-100 dark:border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-900 dark:text-foreground">
                        <TrendingUp className="w-5 h-5 text-slate-600 dark:text-muted-foreground" />
                        Lead Pipeline Overview
                      </CardTitle>

                      {/* Search moved here - inline with title */}
                      <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Search leads, contacts, campaigns..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-10 bg-white dark:bg-background border-slate-200 dark:border-border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 dark:focus:ring-primary/20 dark:focus:border-primary text-sm transition-all shadow-sm"
                        />
                        {isSearching ? (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Spinner size="sm" />
                          </div>
                        ) : searchQuery ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 hover:bg-slate-100 dark:hover:bg-muted"
                            onClick={() => {
                              setSearchQuery("")
                              setDebouncedSearchQuery("")
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge
                        variant="outline"
                        className="w-fit bg-slate-50 text-slate-700 border-slate-200 dark:bg-muted dark:text-muted-foreground dark:border-border"
                      >
                        {filteredLeads.length} {filteredLeads.length === 1 ? "lead" : "leads"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {filteredLeads.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-slate-100 dark:bg-muted/50 rounded-full flex items-center justify-center mb-4">
                          <Bot className="w-12 h-12 text-slate-400 dark:text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-foreground">
                          No leads found
                        </h3>
                        <p className="text-slate-600 dark:text-muted-foreground mb-4">
                          {hasActiveFilters
                            ? "Try adjusting your search criteria or filters"
                            : "Your AI campaigns will populate leads here automatically"}
                        </p>
                        {hasActiveFilters && (
                          <Button variant="outline" onClick={clearAllFilters}>
                            Clear all filters
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="border-b border-slate-100 dark:border-border bg-slate-50/50 dark:bg-muted/20">
                            <tr>
                              <th className="text-left p-4 font-semibold text-sm text-slate-700 dark:text-foreground">
                                Company
                              </th>
                              <th className="text-left p-4 font-semibold text-sm text-slate-700 dark:text-foreground">
                                Contact
                              </th>
                              <th className="text-left p-4 font-semibold text-sm text-slate-700 dark:text-foreground">
                                Status
                              </th>
                              <th className="text-left p-4 font-semibold text-sm text-slate-700 dark:text-foreground hidden lg:table-cell">
                                Campaign
                              </th>
                              <th className="text-left p-4 font-semibold text-sm text-slate-700 dark:text-foreground hidden md:table-cell">
                                Modified
                              </th>
                              <th className="text-right p-4 font-semibold text-sm text-slate-700 dark:text-foreground">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredLeads.map((lead, index) => (
                              <tr
                                key={lead.id}
                                className={`border-b border-slate-100 dark:border-border hover:bg-slate-50 dark:hover:bg-muted/10 transition-colors cursor-pointer ${
                                  index % 2 === 0 ? "bg-white dark:bg-card" : "bg-slate-50/30 dark:bg-muted/5"
                                }`}
                                onClick={() => handleViewDetails(lead.id)}
                              >
                                <td className="p-4">
                                  <div className="font-semibold text-sm text-slate-900 dark:text-foreground">
                                    {lead.name}
                                  </div>
                                </td>
                                <td className="p-4">
                                  <div>
                                    <div className="font-medium text-sm text-slate-900 dark:text-foreground">
                                      {lead.contact}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-muted-foreground flex items-center gap-1 mt-1">
                                      <Mail className="w-3 h-3" />
                                      <span className="truncate">{lead.email}</span>
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-muted-foreground flex items-center gap-1">
                                      <Phone className="w-3 h-3" />
                                      {lead.phone}
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <Badge
                                    variant="outline"
                                    className={`${statusConfig[lead.status as keyof typeof statusConfig].color} font-medium`}
                                  >
                                    {statusConfig[lead.status as keyof typeof statusConfig].label}
                                  </Badge>
                                </td>
                                <td className="p-4 hidden lg:table-cell">
                                  <div className="text-sm text-slate-600 dark:text-muted-foreground">
                                    {lead.campaign}
                                  </div>
                                </td>
                                <td className="p-4 hidden md:table-cell">
                                  <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-muted-foreground">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(lead.modifiedDate).toLocaleDateString()}
                                  </div>
                                </td>
                                <td className="p-4">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-muted"
                                          >
                                            <MoreHorizontal className="w-4 h-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={() => handleViewDetails(lead.id)}>
                                            <Eye className="w-4 h-4 mr-2" />
                                            View Details
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </TooltipTrigger>
                                    <TooltipContent>View lead details</TooltipContent>
                                  </Tooltip>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </SlideUp>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}
