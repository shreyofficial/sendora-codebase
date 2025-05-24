"use client"

import type React from "react"

import { useState } from "react"
import {
  Calendar,
  Phone,
  Mail,
  Users,
  TrendingUp,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Filter,
  Eye,
  Reply,
  PhoneCall,
  VoicemailIcon,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import EmptyDashboard from "@/components/empty-dashboard"

// Sample data for the chart
const chartData = [
  { name: "Jan", value: 100000 },
  { name: "Feb", value: 200000 },
  { name: "Mar", value: 150000 },
  { name: "Apr", value: 180000 },
  { name: "May", value: 250000 },
  { name: "Jun", value: 300000 },
  { name: "Jul", value: 450000 },
  { name: "Aug", value: 400000 },
  { name: "Sep", value: 320000 },
]

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState("today")
  const [hasData, setHasData] = useState(true) // Set to true to show data by default

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <div className="flex items-center gap-3">
              <div className="bg-card rounded-lg p-1 flex shadow-sm">
                <button
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${timeFilter === "today" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setTimeFilter("today")}
                >
                  Today
                </button>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${timeFilter === "7d" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setTimeFilter("7d")}
                >
                  7d
                </button>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${timeFilter === "30d" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setTimeFilter("30d")}
                >
                  30d
                </button>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${timeFilter === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setTimeFilter("all")}
                >
                  All
                </button>
              </div>

              <button className="flex items-center gap-2 bg-card hover:bg-card/80 text-foreground py-2 px-3 rounded-lg text-sm transition-colors shadow-sm">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {hasData ? (
            <>
              {/* Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard title="Total Campaigns" value="12" change="+2" icon={<Target className="w-5 h-5" />} />
                <MetricCard title="Active Channels" value="2" change="+2" icon={<TrendingUp className="w-5 h-5" />} />
                <MetricCard
                  title="Prospects Contacted"
                  value="4,535"
                  change="+589"
                  icon={<Users className="w-5 h-5" />}
                />
                <MetricCard
                  title="Response Rate"
                  value="24.8%"
                  change="+3.2%"
                  isPositive={true}
                  icon={<Mail className="w-5 h-5" />}
                />
              </div>

              {/* Main Chart */}
              <div className="theme-card p-6 mb-6 overflow-hidden shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Campaign Performance</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Showing: </span>
                    <button className="flex items-center gap-1 bg-secondary hover:bg-secondary/80 px-3 py-1 rounded-md text-sm">
                      <span>Prospects</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#016AFF" stopOpacity={0.8} />
                          <stop offset="50%" stopColor="#016AFF" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#016AFF" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        tickFormatter={(value) => `${value / 1000}K`}
                        width={40}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          color: "hsl(var(--foreground))",
                          boxShadow: "var(--shadow-sm)",
                        }}
                        itemStyle={{ color: "hsl(var(--foreground))" }}
                        labelStyle={{ color: "hsl(var(--foreground))", fontWeight: "bold", marginBottom: "5px" }}
                        formatter={(value) => [`${value.toLocaleString()}`, "Prospects"]}
                        labelFormatter={(label) => `${label} 2025`}
                      />
                      <Area type="monotone" dataKey="value" stroke="#016AFF" strokeWidth={2} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Call Analytics */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Call Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="Calls Made"
                    value="1,284"
                    change="+124"
                    icon={<Phone className="w-5 h-5" />}
                    variant="secondary"
                  />
                  <MetricCard
                    title="Picked Up"
                    value="856"
                    change="+78"
                    isPositive={true}
                    icon={<PhoneCall className="w-5 h-5" />}
                    variant="secondary"
                  />
                  <MetricCard
                    title="Appointments Booked"
                    value="92"
                    change="+8"
                    isPositive={true}
                    icon={<Calendar className="w-5 h-5" />}
                    variant="secondary"
                  />
                  <MetricCard
                    title="Voicemails"
                    value="428"
                    change="+46"
                    isPositive={false}
                    icon={<VoicemailIcon className="w-5 h-5" />}
                    variant="secondary"
                  />
                </div>
              </div>

              {/* Email Analytics */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Email Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="Emails Sent"
                    value="3,251"
                    change="+465"
                    icon={<Mail className="w-5 h-5" />}
                    variant="secondary"
                  />
                  <MetricCard
                    title="Opened"
                    value="1,872"
                    change="+215"
                    isPositive={true}
                    icon={<Eye className="w-5 h-5" />}
                    variant="secondary"
                  />
                  <MetricCard
                    title="Replied"
                    value="643"
                    change="+87"
                    isPositive={true}
                    icon={<Reply className="w-5 h-5" />}
                    variant="secondary"
                  />
                  <MetricCard
                    title="Appointments Booked"
                    value="36"
                    change="+4"
                    isPositive={true}
                    icon={<Calendar className="w-5 h-5" />}
                    variant="secondary"
                  />
                </div>
              </div>
            </>
          ) : (
            <EmptyDashboard onGetStarted={() => setHasData(true)} />
          )}
        </div>
      </main>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change?: string
  isPositive?: boolean
  icon?: React.ReactNode
  variant?: "primary" | "secondary"
}

function MetricCard({ title, value, change, isPositive = true, icon, variant = "primary" }: MetricCardProps) {
  return (
    <div
      className={`${variant === "primary" ? "bg-card" : "bg-card/80"} border border-border rounded-lg p-5 shadow-sm`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon && <div className="p-1.5 bg-secondary rounded-md">{icon}</div>}
      </div>
      <div className="flex flex-col">
        <div className="text-2xl font-bold mb-1">{value}</div>
        {change && (
          <div
            className={`flex items-center text-xs ${isPositive ? "text-[hsl(var(--apple-green))]" : "text-[hsl(var(--apple-red))]"}`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-1" />
            )}
            <span>{change} since last week</span>
          </div>
        )}
      </div>
    </div>
  )
}
