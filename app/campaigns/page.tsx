"use client"

import { Plus, MoreHorizontal, Target, Settings, Pause, Edit, Trash2 } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Link from "next/link"
import { useState } from "react"

export default function Campaigns() {
  const [showOptions, setShowOptions] = useState(false)

  const toggleOptions = () => {
    setShowOptions(!showOptions)
  }

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
          <div className="space-y-4">
            {/* Dummy Campaign Card */}
            <div className="theme-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Target className="w-6 h-6 text-gray-600" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">Sales Qualifier</h3>
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">Real-Time</span>
                    </div>

                    <p className="text-muted-foreground">Qualifies leads and schedules demos for sales team</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                      <span>Sales Playbook</span>
                      <span>2 campaigns</span>
                      <span>Last used 2 hours ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Settings className="w-5 h-5 text-gray-500" />
                  </button>
                  <div className="relative">
                    <button onClick={toggleOptions} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-gray-500" />
                    </button>

                    {showOptions && (
                      <div className="absolute right-0 mt-1 w-48 bg-card border border-border rounded-md shadow-lg z-10">
                        <div className="py-1">
                          <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                            <Edit className="w-4 h-4 mr-2 text-muted-foreground" />
                            Edit campaign
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                            <Pause className="w-4 h-4 mr-2 text-muted-foreground" />
                            Pause campaign
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-secondary transition-colors">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete campaign
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
