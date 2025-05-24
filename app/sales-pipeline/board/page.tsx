"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Search,
  Filter,
  ArrowLeft,
  Users,
  CheckCircle,
  Mail,
  Clock,
  CalendarRange,
  Bot,
  Activity,
  ChevronDown,
  X,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/motion"
import { debounce } from "@/lib/ux-utils"
import { TooltipProvider } from "@/components/ui/tooltip"

// Sample data (removed notes and nextAction)
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
]

const statusConfig = {
  contacted: {
    label: "Contacted",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  },
  replied: {
    label: "Replied",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
  },
  booked: {
    label: "Booked",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800",
  },
  "followed-up": {
    label: "Followed Up",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  },
}

const uniqueCampaigns = Array.from(new Set(sampleLeads.map((lead) => lead.campaign)))

// Read-only board component
const ReadOnlyBoard = ({ leads, onViewLead }: { leads: typeof sampleLeads; onViewLead: (id: string) => void }) => {
  const columns = [
    {
      id: "contacted",
      title: "Contacted",
      leads: leads.filter((lead) => lead.status === "contacted"),
    },
    {
      id: "replied",
      title: "Replied",
      leads: leads.filter((lead) => lead.status === "replied"),
    },
    {
      id: "booked",
      title: "Booked",
      leads: leads.filter((lead) => lead.status === "booked"),
    },
    {
      id: "followed-up",
      title: "Followed Up",
      leads: leads.filter((lead) => lead.status === "followed-up"),
    },
  ]

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 px-1">
      {columns.map((column) => (
        <div key={column.id} className="flex-shrink-0 w-72 sm:w-80">
          <Card className="h-full border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                <span>{column.title}</span>
                <Badge variant="secondary" className="text-xs">
                  {column.leads.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="space-y-3 min-h-[300px]">
                {column.leads.length === 0 ? (
                  <div className="flex items-center justify-center h-20 border border-dashed border-border rounded-md">
                    <p className="text-sm text-muted-foreground">No leads in this stage</p>
                  </div>
                ) : (
                  <StaggerContainer className="space-y-3">
                    {column.leads.map((lead) => (
                      <StaggerItem key={lead.id}>
                        <Card
                          className="border-border bg-background hover:shadow-sm transition-shadow cursor-pointer"
                          onClick={() => onViewLead(lead.id)}
                        >
                          <CardContent className="p-3">
                            <div className="space-y-2">
                              <div className="font-medium text-sm">{lead.name}</div>
                              <div className="text-xs text-muted-foreground">
                                <div className="font-medium">{lead.contact}</div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Mail className="w-3 h-3" />
                                  <span className="truncate">{lead.email}</span>
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Bot className="w-3 h-3" />
                                  <span className="truncate">{lead.campaign}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <Badge
                                  variant="outline"
                                  className={statusConfig[lead.status as keyof typeof statusConfig].color}
                                >
                                  {statusConfig[lead.status as keyof typeof statusConfig].label}
                                </Badge>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  <span>{new Date(lead.modifiedDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default function BoardView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
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
      toast({
        title: "Board view loaded",
        description: "Your sales pipeline board has been loaded successfully.",
        variant: "success",
      })
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

  // Filter leads
  const filteredLeads = useMemo(() => {
    return sampleLeads.filter((lead) => {
      const matchesSearch =
        debouncedSearchQuery === "" ||
        lead.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        lead.contact.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        lead.campaign.toLowerCase().includes(debouncedSearchQuery.toLowerCase())

      const leadDate = new Date(lead.modifiedDate)
      const matchesDateRange =
        !dateRange.from || !dateRange.to || (leadDate >= dateRange.from && leadDate <= dateRange.to)

      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(lead.status)
      const matchesCampaign = selectedCampaigns.length === 0 || selectedCampaigns.includes(lead.campaign)

      return matchesSearch && matchesDateRange && matchesStatus && matchesCampaign
    })
  }, [debouncedSearchQuery, dateRange, selectedStatuses, selectedCampaigns])

  // Calculate stats
  const totalLeads = filteredLeads.length
  const bookedLeads = filteredLeads.filter((lead) => lead.status === "booked").length
  const replyRate =
    totalLeads > 0
      ? Math.round(
          (filteredLeads.filter((lead) => lead.status === "replied" || lead.status === "booked").length / totalLeads) *
            100,
        )
      : 0
  const activeToday = filteredLeads.filter((lead) => lead.modifiedDate === "2025-05-24").length

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

  const handleViewLead = (leadId: string) => {
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
      <div className="flex h-screen bg-background text-foreground">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6">
            <div className="max-w-[1400px] mx-auto space-y-6">
              {/* Header */}
              <SlideUp className="space-y-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
                  <div className="flex items-center gap-3 w-full lg:w-auto">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="/sales-pipeline">
                          <Button variant="ghost" size="icon" className="h-9 w-9 transition-all hover:scale-105">
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Back to grid view</TooltipContent>
                    </Tooltip>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Sales Pipeline</h1>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1.5 px-2 sm:px-3 py-1 text-xs sm:text-sm"
                        >
                          <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          AI-Managed
                        </Badge>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Board view - Monitor your AI-managed lead pipeline
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
                    {/* Date Range Picker */}
                    <Popover>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`flex items-center gap-2 min-w-[240px] sm:min-w-[260px] justify-start bg-background border-border hover:bg-muted/50 py-2.5 px-4 h-10 text-sm font-medium transition-colors ${
                                dateRange.from ? "border-primary/50 bg-primary/5" : ""
                              }`}
                            >
                              <CalendarRange className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">
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
                        <Calendar
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

                    {/* Filters */}
                    <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`flex items-center gap-2 min-w-[120px] sm:min-w-[140px] bg-background border-border hover:bg-muted/50 py-2.5 px-4 h-10 text-sm font-medium transition-colors ${
                                hasActiveFilters ? "border-primary/50 bg-primary/5" : ""
                              }`}
                            >
                              <Filter className="w-4 h-4 flex-shrink-0" />
                              <span>Filters</span>
                              {hasActiveFilters && (
                                <Badge
                                  variant="secondary"
                                  className="ml-1 h-5 w-5 p-0 text-xs flex items-center justify-center bg-primary text-primary-foreground"
                                >
                                  {(selectedStatuses.length + selectedCampaigns.length).toString()}
                                </Badge>
                              )}
                              <ChevronDown className="w-4 h-4 flex-shrink-0" />
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
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {debouncedSearchQuery && (
                      <Badge variant="secondary" className="flex items-center gap-1">
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
                      <Badge variant="secondary" className="flex items-center gap-1">
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
                      <Badge key={status} variant="secondary" className="flex items-center gap-1">
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
                      <Badge key={campaign} variant="secondary" className="flex items-center gap-1">
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
                    <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
                      Clear all
                    </Button>
                  </FadeIn>
                )}

                {/* Stats Cards */}
                <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <StaggerItem>
                    <Card className="border-border bg-card hover:shadow-md transition-all duration-200">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="p-2 sm:p-2.5 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Leads</p>
                            <p className="text-lg sm:text-2xl font-bold">{totalLeads}</p>
                            <p className="text-xs text-muted-foreground hidden sm:block">
                              {hasActiveFilters ? "Filtered results" : "Generated by AI"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>

                  <StaggerItem>
                    <Card className="border-border bg-card hover:shadow-md transition-all duration-200">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="p-2 sm:p-2.5 bg-green-100 dark:bg-green-900/50 rounded-lg">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Booked Leads</p>
                            <p className="text-lg sm:text-2xl font-bold">{bookedLeads}</p>
                            <p className="text-xs text-green-600 dark:text-green-400 hidden sm:block">
                              +25% conversion
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>

                  <StaggerItem>
                    <Card className="border-border bg-card hover:shadow-md transition-all duration-200">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="p-2 sm:p-2.5 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Reply Rate</p>
                            <p className="text-lg sm:text-2xl font-bold">{replyRate}%</p>
                            <p className="text-xs text-muted-foreground hidden sm:block">AI engagement success</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>

                  <StaggerItem>
                    <Card className="border-border bg-card hover:shadow-md transition-all duration-200">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="p-2 sm:p-2.5 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Active Today</p>
                            <p className="text-lg sm:text-2xl font-bold">{activeToday}</p>
                            <p className="text-xs text-muted-foreground hidden sm:block">Recent activity</p>
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
                  <Tabs value="board" className="w-full sm:w-auto">
                    <TabsList className="grid w-full grid-cols-2 sm:w-auto bg-muted/30">
                      <TabsTrigger
                        value="grid"
                        asChild
                        className="px-4 sm:px-6 py-2.5 data-[state=active]:bg-background text-sm"
                      >
                        <Link href="/sales-pipeline" className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 10h16M4 14h16M4 18h16"
                            />
                          </svg>
                          Grid View
                        </Link>
                      </TabsTrigger>
                      <TabsTrigger
                        value="board"
                        className="flex items-center gap-2 px-4 sm:px-6 py-2.5 data-[state=active]:bg-background text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                          />
                        </svg>
                        Board View
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </FadeIn>

              {/* Board View */}
              <SlideUp delay={0.2}>
                <Card className="border-border bg-card hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Bot className="w-5 h-5" />
                        AI-Managed Lead Board
                      </CardTitle>

                      {/* Search moved here - inline with title */}
                      <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Search leads, contacts, campaigns..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-10 bg-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                        />
                        {isSearching ? (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Spinner size="sm" />
                          </div>
                        ) : searchQuery ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
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

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="w-fit">
                        {filteredLeads.length} {filteredLeads.length === 1 ? "lead" : "leads"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    {filteredLeads.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                          <Bot className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No leads found</h3>
                        <p className="text-muted-foreground mb-4">
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
                      <ReadOnlyBoard leads={filteredLeads} onViewLead={handleViewLead} />
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
