"use client"

import { useState } from "react"
import { CreditCard, Zap, Plus, Clock, Download, Info } from "lucide-react"
import PricingModal from "@/components/pricing-modal"
import { useToast } from "@/components/ui/use-toast"
import CreditsModal from "@/components/credits-modal"

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("Pro")
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false)
  const { toast } = useToast()
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false)

  const handlePlanChange = (planType: string, planName: string) => {
    setSelectedPlan(planName)
    toast({
      title: "Plan updated",
      description: `You've successfully changed to the ${planName} ${planType} plan.`,
      duration: 5000,
    })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-5 h-5 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Billing</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Billing Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Billing Management */}
          <div className="theme-card p-5">
            <h2 className="text-lg font-medium mb-4">Billing Information</h2>
            <button
              className="w-full py-2.5 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              onClick={() =>
                toast({
                  title: "Redirecting to billing portal",
                  description: "You'll be redirected to manage your billing information.",
                  duration: 3000,
                })
              }
            >
              <CreditCard className="w-4 h-4" />
              <span>Manage Billing Info</span>
            </button>
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
          {/* Calls Usage */}
          <div className="theme-card p-5">
            <h2 className="text-lg font-medium mb-4">Calls Usage</h2>

            <div className="space-y-4">
              <div className="inline-block px-2.5 py-1 bg-secondary rounded-full text-xs font-medium">Pro Plan</div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Monthly Limit</div>
                <div className="text-sm font-medium">5,000 minutes</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Used</div>
                <div className="text-sm font-medium">1,250 minutes</div>
              </div>

              <div className="pt-3 border-t border-border">
                <button
                  className="w-full py-2 px-3 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors"
                  onClick={() => setIsPricingModalOpen(true)}
                >
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>

          {/* Emails Usage */}
          <div className="theme-card p-5">
            <h2 className="text-lg font-medium mb-4">Emails Usage</h2>

            <div className="space-y-4">
              <div className="inline-block px-2.5 py-1 bg-secondary rounded-full text-xs font-medium">Pro Plan</div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Monthly Limit</div>
                <div className="text-sm font-medium">10,000 emails</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Used</div>
                <div className="text-sm font-medium">3,456 emails</div>
              </div>

              <div className="pt-3 border-t border-border">
                <button
                  className="w-full py-2 px-3 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors"
                  onClick={() => setIsPricingModalOpen(true)}
                >
                  Upgrade Plan
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

            <button
              onClick={() => setIsCreditsModalOpen(true)}
              className="w-full py-2.5 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Buy Credits</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        currentPlan={selectedPlan}
        onSelectPlan={handlePlanChange}
      />

      {/* Credits Modal */}
      <CreditsModal isOpen={isCreditsModalOpen} onClose={() => setIsCreditsModalOpen(false)} />
    </div>
  )
}
