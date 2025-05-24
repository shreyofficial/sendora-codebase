"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar"
import SetupStep from "@/components/setup-step"
import {
  Mail,
  Phone,
  BookOpen,
  Target,
  Settings,
  Megaphone,
  Check,
  ArrowRight,
  Globe,
  Calendar,
  FileText,
} from "lucide-react"

export default function Launchpad() {
  // Track which steps are expanded - start with only step 1 expanded
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1])
  const [activeStep, setActiveStep] = useState(1)
  const [animateProgress, setAnimateProgress] = useState(false)

  // Toggle step expansion
  const toggleStep = (stepNumber: number) => {
    if (expandedSteps.includes(stepNumber)) {
      setExpandedSteps(expandedSteps.filter((step) => step !== stepNumber))
    } else {
      setExpandedSteps([...expandedSteps, stepNumber])
    }
  }

  // Handle step activation with animation
  const activateStep = (stepNumber: number) => {
    if (stepNumber !== activeStep) {
      setAnimateProgress(true)
      setActiveStep(stepNumber)

      // If the step isn't expanded, expand it
      if (!expandedSteps.includes(stepNumber)) {
        // Collapse all steps first for a cleaner transition
        setExpandedSteps([])

        // Then expand the selected step after a short delay
        setTimeout(() => {
          setExpandedSteps([stepNumber])
        }, 150)
      }
    }
  }

  // Reset animation flag after animation completes
  useEffect(() => {
    if (animateProgress) {
      const timer = setTimeout(() => {
        setAnimateProgress(false)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [animateProgress])

  // Calculate progress percentage
  const progressPercentage = `${Math.min(100, (activeStep - 1) * 25)}%`

  // Handle continue button click
  const handleContinue = () => {
    if (activeStep < 4) {
      setAnimateProgress(true)
      setActiveStep(activeStep + 1)

      // Expand the next step and collapse the current one
      setExpandedSteps([activeStep + 1])

      // Smooth scroll to the next step
      setTimeout(() => {
        document.getElementById(`step-${activeStep + 1}`)?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        })
      }, 100)
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[26px] font-bold mb-1.5">Set Up for Success in 15 Minutes!</h1>
            <p className="text-muted-foreground text-[15px]">
              Follow these steps to get everything ready and unlock your full potential
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted h-1.5 rounded-full mb-7 relative">
            <div
              className={`bg-primary h-1.5 rounded-full ${animateProgress ? "transition-all duration-500 ease-out" : "transition-none"}`}
              style={{ width: progressPercentage }}
            ></div>

            {/* Step Indicators */}
            <div className="absolute top-0 left-0 w-full flex justify-between -mt-2.5 px-[1px]">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  id={`step-indicator-${step}`}
                  onClick={() => activateStep(step)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium 
                    transition-all duration-300 ease-in-out transform
                    ${step <= activeStep ? "bg-[#016AFF] text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}
                    ${step === activeStep ? "ring-2 ring-[#016AFF]/50 scale-110" : "hover:scale-105"}
                    focus:outline-none focus:ring-2 focus:ring-[#016AFF]/50
                  `}
                  aria-label={`Go to step ${step}`}
                >
                  {step < activeStep ? <Check className="w-3.5 h-3.5" /> : step}
                </button>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-5">
            {/* Step 1 */}
            <SetupStep
              id="step-1"
              number={1}
              title="Connect Your Accounts"
              description="First, connect your communication channels and knowledge base"
              isActive={activeStep >= 1}
              isCompleted={activeStep > 1}
              isExpanded={expandedSteps.includes(1)}
              onToggle={() => toggleStep(1)}
              actions={[
                {
                  icon: <Mail className="w-4 h-4" />,
                  title: "Connect Email Accounts",
                  description: "Link your email accounts to send and receive messages",
                  href: "/email-accounts",
                },
                {
                  icon: <Phone className="w-4 h-4" />,
                  title: "Connect Phone Numbers",
                  description: "Set up phone numbers for SMS and calling",
                  href: "/phone-numbers",
                },
                {
                  icon: <BookOpen className="w-4 h-4" />,
                  title: "Build Knowledge Base",
                  description: "Create your knowledge base for AI agents to use",
                  href: "/knowledge-base",
                },
              ]}
            />

            {/* Step 2 */}
            <SetupStep
              id="step-2"
              number={2}
              title="Configure AI Agents"
              description="Create and customize your AI agents with your knowledge base"
              isActive={activeStep >= 2}
              isCompleted={activeStep > 2}
              isExpanded={expandedSteps.includes(2)}
              onToggle={() => toggleStep(2)}
              actions={[
                {
                  icon: <Target className="w-4 h-4" />,
                  title: "Create AI Agents",
                  description: "Set up AI agents and assign knowledge base",
                  href: "/ai-agents",
                },
              ]}
            />

            {/* Step 3 */}
            <SetupStep
              id="step-3"
              number={3}
              title="Set Up Integrations"
              description="Connect your preferred apps for inbound and warm outreach"
              isActive={activeStep >= 3}
              isCompleted={activeStep > 3}
              isExpanded={expandedSteps.includes(3)}
              onToggle={() => toggleStep(3)}
              actions={[
                {
                  icon: <Globe className="w-4 h-4" />,
                  title: "Connect Ads",
                  description: "Link your advertising platforms",
                  href: "/settings/integrations/ads",
                },
                {
                  icon: <FileText className="w-4 h-4" />,
                  title: "Connect Forms",
                  description: "Set up form integrations for lead capture",
                  href: "/settings/integrations/forms",
                },
                {
                  icon: <Calendar className="w-4 h-4" />,
                  title: "Connect Calendar",
                  description: "Link your calendar for scheduling",
                  href: "/settings/integrations/calendar",
                },
                {
                  icon: <Settings className="w-4 h-4" />,
                  title: "Additional Integrations",
                  description: "Set up other integrations and funnels",
                  href: "/settings/integrations",
                },
              ]}
            />

            {/* Step 4 */}
            <SetupStep
              id="step-4"
              number={4}
              title="Create Your First Campaign"
              description="Choose and set up your preferred campaign type"
              isActive={activeStep >= 4}
              isCompleted={activeStep > 4}
              isExpanded={expandedSteps.includes(4)}
              onToggle={() => toggleStep(4)}
              actions={[
                {
                  icon: <Megaphone className="w-4 h-4" />,
                  title: "Create Campaign",
                  description: "Select campaign type and launch your first campaign",
                  href: "/campaigns/new",
                },
              ]}
            />
          </div>

          {/* Next Steps */}
          <div className="mt-7 pt-5 border-t border-border">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-[17px] font-semibold mb-0.5">
                  {activeStep < 4 ? `Complete Step ${activeStep}` : "All Steps Completed"}
                </h3>
                <p className="text-muted-foreground text-[13px]">
                  {activeStep < 4
                    ? `${activeStep === 1 ? "Connect your accounts" : activeStep === 2 ? "Configure your AI agents" : "Set up integrations"} to continue`
                    : "You're all set to start using Sendora!"}
                </p>
              </div>
              <button
                onClick={handleContinue}
                className={`flex items-center gap-2 bg-[#016AFF] hover:bg-[#0055DD] text-white py-2.5 px-5 rounded-md transition-all shadow-[0_4px_10px_rgba(1,106,255,0.3)] hover:shadow-[0_6px_15px_rgba(1,106,255,0.4)]
                  focus:outline-none focus:ring-2 focus:ring-[#016AFF]/50
                  ${activeStep >= 4 ? "opacity-50 cursor-not-allowed hover:translate-x-0" : "hover:shadow-md"}
                `}
                disabled={activeStep >= 4}
              >
                <span>{activeStep < 4 ? "Continue" : "Completed"}</span>
                {activeStep < 4 && (
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
