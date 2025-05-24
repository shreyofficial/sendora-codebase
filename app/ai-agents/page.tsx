"use client"
import { Search, Plus, Target, Settings, MoreHorizontal, Clock, Zap } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Link from "next/link"

export default function AIAgentsPage() {
  // Sample AI agents data
  const agents = [
    {
      id: "1",
      name: "Sales Qualifier",
      description: "Qualifies leads and schedules demos for sales team",
      type: "real-time",
      lastUsed: "2 hours ago",
      campaigns: 2,
      knowledgeBase: "Sales Playbook",
    },
    {
      id: "2",
      name: "Follow-up Agent",
      description: "Follows up with leads who haven't responded",
      type: "scheduled",
      lastUsed: "Yesterday",
      campaigns: 1,
      knowledgeBase: "Product Knowledge",
    },
  ]

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">AI Agents</h1>
            <Link
              href="/ai-agents/new"
              className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 px-4 rounded text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create AI Agent</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search AI Agents..."
              className="w-full bg-background border border-input rounded-lg py-2.5 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex mb-6 space-x-2">
            <button className="px-4 py-1.5 bg-[hsl(var(--apple-blue))] rounded-md text-sm font-medium text-white">
              All
            </button>
            <button className="px-4 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium text-secondary-foreground transition-colors">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Real-Time</span>
              </div>
            </button>
            <button className="px-4 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium text-secondary-foreground transition-colors">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Scheduled</span>
              </div>
            </button>
          </div>

          {/* Agents List */}
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="theme-card theme-card-hover p-5">
                <div className="flex justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-lg font-semibold">{agent.name}</h2>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            agent.type === "real-time"
                              ? "bg-[hsl(var(--apple-blue))]/20 text-[hsl(var(--apple-blue))]"
                              : "bg-[hsl(var(--apple-purple))]/20 text-[hsl(var(--apple-purple))]"
                          }`}
                        >
                          {agent.type === "real-time" ? "Real-Time" : "Scheduled"}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{agent.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span className="text-foreground/80">{agent.knowledgeBase}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{agent.campaigns} campaigns</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Last used {agent.lastUsed}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <button className="p-2 hover:bg-secondary rounded-md transition-colors">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded-md transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

