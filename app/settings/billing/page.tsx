"use client"

import { useState } from "react"
import { CreditCard, Mail, Edit2, Zap, Plus, ChevronRight, Clock, Download, Info } from "lucide-react"

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro")

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-5 h-5 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Billing</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Billing Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Billing Form */}
          <div className="theme-card p-5">
            <div className="space-y-5">
              {/* Billing Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Billing Email</label>
                <div className="flex">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      className="w-full bg-background border border-input rounded-lg py-2 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <button className="ml-2 bg-secondary hover:bg-secondary/80 p-2 rounded-lg transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium mb-2">Payment Method</label>
                <div className="flex items-center justify-between bg-background border border-input rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary p-2 rounded">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm">•••• •••• •••• 4242</div>
                      <div className="text-xs text-muted-foreground">Expires 12/25</div>
                    </div>
                  </div>
                  <button className="p-1.5 hover:bg-secondary rounded-md transition-colors">
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="theme-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Billing History</h2>
              <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View All</button>
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary p-2 rounded">
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-sm">Credit Purchase - 500 Credits</div>
                      <div className="text-xs text-muted-foreground">Mar {10 + i}, 2025</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">$49.00</div>
                    <button className="p-1.5 hover:bg-secondary rounded-md transition-colors">
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Plan & Credits */}
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="theme-card p-5">
            <h2 className="text-lg font-medium mb-4">Current Plan</h2>

            <div className="space-y-4">
              <div className="inline-block px-2.5 py-1 bg-secondary rounded-full text-xs font-medium">Pro</div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Monthly</div>
                <div className="text-sm font-medium">$99/month</div>
              </div>

              <div className="pt-3 border-t border-border">
                <button className="w-full py-2 px-3 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors">
                  Change Plan
                </button>
              </div>
            </div>
          </div>

          {/* Wallet Credits */}
          <div className="theme-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Wallet Credits</h2>
              <button className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                <Info className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>

            <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold">1500</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Available Credits</span>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Last updated: 2h ago</span>
                </div>
              </div>
            </div>

            <button className="w-full py-2.5 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Buy Credits</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

