"use client"

import type React from "react"
import { useState } from "react"
import {
  ArrowRight,
  Copy,
  CheckCircle,
  Play,
  Code,
  ExternalLink,
  HelpCircle,
  Info,
  Phone,
  Calendar,
  Check,
  Edit2,
  LinkIcon,
} from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { useTheme } from "@/components/theme-provider"

export default function NewRealtimeCampaign() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [copiedEndpoint, setCopiedEndpoint] = useState(false)
  const [copiedHeaders, setCopiedHeaders] = useState(false)
  const [copiedBody, setCopiedBody] = useState(false)
  const [testStatus, setTestStatus] = useState<null | "loading" | "success" | "error">(null)
  const [campaignName, setCampaignName] = useState("New Real-Time Campaign")
  const [isEditingName, setIsEditingName] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState("")
  const { theme } = useTheme()
  const isLight = theme === "light"

  // Removed Blueprint step and renumbered
  const steps = [
    { id: 1, name: "Leads", number: 1 },
    { id: 2, name: "AI Agent", number: 2 },
    { id: 3, name: "Select Channels", number: 3 },
    { id: 4, name: "Launch", number: 4 },
  ]

  // Agent data for the grid
  const agentOptions = [
    {
      id: 1,
      name: "Sales Expert",
      color: isLight ? "from-blue-50 to-blue-100" : "from-blue-500/20 to-blue-600/20",
      border: isLight ? "border-blue-300" : "border-blue-500/30",
    },
    {
      id: 2,
      name: "Support Agent",
      color: isLight ? "from-blue-50 to-blue-100" : "from-green-500/20 to-green-600/20",
      border: isLight ? "border-blue-300" : "border-green-500/30",
    },
    {
      id: 3,
      name: "Technical Advisor",
      color: isLight ? "from-blue-50 to-blue-100" : "from-yellow-500/20 to-yellow-600/20",
      border: isLight ? "border-blue-300" : "border-yellow-500/30",
    },
    {
      id: 4,
      name: "Marketing Specialist",
      color: isLight ? "from-blue-50 to-blue-100" : "from-red-500/20 to-red-600/20",
      border: isLight ? "border-blue-300" : "border-red-500/30",
    },
    {
      id: 5,
      name: "Product Expert",
      color: isLight ? "from-blue-50 to-blue-100" : "from-indigo-500/20 to-indigo-600/20",
      border: isLight ? "border-blue-300" : "border-indigo-500/30",
    },
    {
      id: 6,
      name: "Custom Agent",
      color: isLight ? "from-blue-50 to-blue-100" : "from-gray-500/20 to-gray-600/20",
      border: isLight ? "border-blue-300" : "border-gray-500/30",
    },
  ]

  // Days of the week for the schedule
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const handleNext = () => {
    if (currentStep < steps.length) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const copyToClipboard = (text: string, type: "headers" | "body" | "endpoint") => {
    navigator.clipboard.writeText(text)
    if (type === "headers") {
      setCopiedHeaders(true)
      setTimeout(() => setCopiedHeaders(false), 2000)
    } else if (type === "body") {
      setCopiedBody(true)
      setTimeout(() => setCopiedBody(false), 2000)
    } else {
      setCopiedEndpoint(true)
      setTimeout(() => setCopiedEndpoint(false), 2000)
    }
  }

  const testConnection = () => {
    setTestStatus("loading")
    // Simulate API call
    setTimeout(() => {
      setTestStatus("success")
      // Reset after 3 seconds
      setTimeout(() => setTestStatus(null), 3000)
    }, 1500)
  }

  const handleCampaignNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignName(e.target.value)
  }

  const handleCampaignNameBlur = () => {
    setIsEditingName(false)
    // Trim empty campaign name
    if (!campaignName.trim()) {
      setCampaignName("New Real-Time Campaign")
    }
  }

  const handleCampaignNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCampaignNameBlur()
    }
  }

  const handleWebhookUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebhookUrl(e.target.value)
  }

  const headersText = `authorization: Bearer YOUR_API_TOKEN_HERE
content-type: application/json`

  const bodyText = `{
"name": "John Doe",
"email": "john@example.com",
"phone_number": "+1234567890",
"company": "Acme Inc",
"job_title": "Marketing Manager",
"industry": "E-commerce",
"website": "https://acme.com",
"linkedin": "https://linkedin.com/in/johndoe",
"city": "New York",
"state": "NY",
"country": "USA",
"location": "10001",
"interested_in": "AI-powered outbound automation",
"notes": "Requested a demo for next Tuesday."
}`

  return (
    <div
      className={`flex h-screen ${isLight ? "bg-gray-50" : "bg-[#050505]"} ${isLight ? "text-gray-900" : "text-white"}`}
    >
      {/* Main Sidebar */}
      <Sidebar />

      {/* Campaign Creation Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Campaign Header */}
        <div className={`border-b ${isLight ? "border-gray-200 bg-white" : "border-[#1a1a1a] bg-[#0a0a0a]"} p-4`}>
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center">
              <Link
                href="/campaigns"
                className={`${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"} mr-2 transition-colors`}
              >
                <span className="text-sm">Campaigns</span>
              </Link>
              <span className={isLight ? "text-gray-400 mx-2" : "text-gray-600 mx-2"}>/</span>
              <Link
                href="/campaigns/new/select-type"
                className={`${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"} mr-2 transition-colors`}
              >
                <span className="text-sm">New Campaign</span>
              </Link>
              <span className={isLight ? "text-gray-400 mx-2" : "text-gray-600 mx-2"}>/</span>
              {isEditingName ? (
                <input
                  type="text"
                  value={campaignName}
                  onChange={handleCampaignNameChange}
                  onBlur={handleCampaignNameBlur}
                  onKeyDown={handleCampaignNameKeyDown}
                  autoFocus
                  className={`${isLight ? "bg-gray-50 border-gray-300 text-gray-900" : "bg-[#111111] border-[#333333] text-white"} border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-lg font-medium`}
                />
              ) : (
                <div className="flex items-center">
                  <h1 className="text-lg font-medium">{campaignName}</h1>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className={`ml-2 p-1 ${isLight ? "text-gray-500 hover:text-gray-900 hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"} rounded-md transition-colors`}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Campaign Content */}
        <div className="flex-1 overflow-auto">
          <div className="flex h-full">
            {/* Campaign Steps Sidebar */}
            <div
              className={`w-64 border-r ${isLight ? "border-gray-200 bg-white" : "border-[#111111] bg-gradient-to-b from-[#0a0a0a] to-[#080808]"} p-4`}
            >
              <div className="space-y-3">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    className={`w-full py-3 px-4 rounded-md text-center transition-all flex items-center justify-between ${
                      step.id === currentStep
                        ? isLight
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gradient-to-r from-white to-gray-200 text-black shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        : completedSteps.includes(step.id)
                          ? isLight
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gradient-to-r from-[#1a1a1a] to-[#222222] text-white"
                          : isLight
                            ? "bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                            : "bg-[#0c0c0c] text-gray-400 border border-[#1a1a1a] hover:bg-[#101010] hover:border-[#222222]"
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-2.5 ${
                          step.id === currentStep
                            ? isLight
                              ? "bg-white text-blue-600"
                              : "bg-white text-black"
                            : completedSteps.includes(step.id)
                              ? "bg-green-500 text-white"
                              : isLight
                                ? "bg-blue-50 text-blue-500"
                                : "bg-[#1a1a1a] text-gray-400"
                        }`}
                      >
                        {completedSteps.includes(step.id) ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <span className="text-xs font-medium">{step.number}</span>
                        )}
                      </div>
                      <span className="font-medium">{step.name}</span>
                    </div>
                    {step.id === currentStep && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div
              className={`flex-1 p-6 overflow-auto ${isLight ? "bg-gray-50" : "bg-gradient-to-br from-[#050505] to-[#070707]"}`}
            >
              {currentStep === 1 && (
                <div className="max-w-4xl mx-auto">
                  <h2
                    className={`text-2xl font-bold mb-2 ${isLight ? "text-gray-900" : "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"}`}
                  >
                    Connect your lead source through API
                  </h2>
                  <p className={isLight ? "text-gray-600 mb-8" : "text-gray-400 mb-8"}>
                    Connect your lead sources to automatically trigger actions when new leads come in.
                  </p>

                  {/* Developer Assistance Card */}
                  <div
                    className={`${isLight ? "bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200" : "bg-gradient-to-r from-[#0c1b36] to-[#0f1730] border border-[#1e2b4a]"} rounded-lg p-6 mb-8 shadow-md transform hover:translate-y-[-2px] transition-all duration-300`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 ${isLight ? "bg-gradient-to-br from-blue-400 to-blue-500" : "bg-gradient-to-br from-gray-500 to-gray-600"} p-3.5 rounded-full mr-5 shadow-md`}
                      >
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-medium mb-2 ${isLight ? "text-blue-800" : "text-blue-100"}`}>
                          Don't want to figure this out yourself?
                        </h3>
                        <p className={isLight ? "text-gray-700 mb-4" : "text-gray-300 mb-4"}>
                          Our developers can set up the API integration for you.
                        </p>
                        <button
                          className={`flex items-center gap-2 ${isLight ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"} text-white py-2.5 px-5 rounded-md transition-all shadow-md hover:shadow-lg`}
                        >
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">Schedule a Developer Call</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Main Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button
                      onClick={testConnection}
                      className={`flex items-center justify-center gap-2 ${isLight ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gradient-to-r from-[#1a1a1a] to-[#222222] hover:from-[#222222] hover:to-[#2a2a2a] text-white"} py-3 px-5 rounded-md transition-all shadow-md hover:shadow-lg`}
                    >
                      <Code className="w-4 h-4" />
                      <span className="font-medium">Test Connection</span>
                    </button>

                    <button
                      className={`flex items-center justify-center gap-2 ${isLight ? "bg-blue-100 hover:bg-blue-200 text-blue-800" : "bg-gradient-to-r from-[#1a1a1a] to-[#222222] hover:from-[#222222] hover:to-[#2a2a2a] text-white"} py-3 px-5 rounded-md transition-all shadow-md hover:shadow-lg`}
                    >
                      <Play className="w-4 h-4" />
                      <span className="font-medium">Watch API Tutorial</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>

                  {/* Step-by-Step Guide */}
                  <div className="space-y-8">
                    {/* Step 1: API Endpoint */}
                    <div
                      className={`${isLight ? "bg-white border border-gray-200" : "bg-gradient-to-br from-[#0c0c0c] to-[#111111] border border-[#1a1a1a]"} rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-center mb-5">
                        <div
                          className={`w-9 h-9 rounded-full ${isLight ? "bg-gradient-to-br from-blue-400 to-blue-500" : "bg-gradient-to-br from-gray-500 to-gray-600"} flex items-center justify-center mr-4 flex-shrink-0 shadow-md`}
                        >
                          <span className="text-sm font-bold text-white">1</span>
                        </div>
                        <h3
                          className={`text-xl font-medium ${isLight ? "text-gray-900" : "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"}`}
                        >
                          Use this API endpoint
                        </h3>
                      </div>
                      <div
                        className={`${isLight ? "bg-gray-50 border border-gray-200" : "bg-[#0a0a0a] border border-[#1a1a1a]"} p-4 rounded-md font-mono text-sm ${isLight ? "text-gray-800" : "text-gray-300"} flex items-center justify-between shadow-inner`}
                      >
                        <code className={isLight ? "text-blue-600" : "text-blue-400"}>
                          https://api.sendora.com/v1/leads
                        </code>
                        <button
                          className={`p-2 ${isLight ? "hover:bg-gray-200" : "hover:bg-[#1a1a1a]"} rounded-md transition-colors`}
                          onClick={() => copyToClipboard("https://api.sendora.com/v1/leads", "endpoint")}
                        >
                          {copiedEndpoint ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy
                              className={`w-4 h-4 ${isLight ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-white"} transition-colors`}
                            />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Step 2: Headers */}
                    <div
                      className={`${isLight ? "bg-white border border-gray-200" : "bg-gradient-to-br from-[#0c0c0c] to-[#111111] border border-[#1a1a1a]"} rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-center mb-5">
                        <div
                          className={`w-9 h-9 rounded-full ${isLight ? "bg-gradient-to-br from-blue-400 to-blue-500" : "bg-gradient-to-br from-gray-500 to-gray-600"} flex items-center justify-center mr-4 flex-shrink-0 shadow-md`}
                        >
                          <span className="text-sm font-bold text-white">2</span>
                        </div>
                        <h3
                          className={`text-xl font-medium ${isLight ? "text-gray-900" : "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"}`}
                        >
                          Add these headers
                        </h3>
                        <button
                          className={`ml-2 ${isLight ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-gray-300"} transition-colors`}
                        >
                          <HelpCircle className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="relative">
                        <pre
                          className={`font-mono text-sm ${isLight ? "text-gray-800 bg-gray-50 border border-gray-200" : "text-gray-300 bg-[#0a0a0a] border border-[#1a1a1a]"} p-5 rounded-md whitespace-pre-wrap shadow-inner`}
                        >
                          <span className={isLight ? "text-purple-600" : "text-purple-400"}>authorization</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>
                            Bearer YOUR_API_TOKEN_HERE
                          </span>
                          <br />
                          <span className={isLight ? "text-purple-600" : "text-purple-400"}>content-type</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>application/json</span>
                        </pre>
                        <button
                          className={`absolute top-3 right-3 p-2 ${isLight ? "hover:bg-gray-200" : "hover:bg-[#1a1a1a]"} rounded-md transition-colors`}
                          onClick={() => copyToClipboard(headersText, "headers")}
                        >
                          {copiedHeaders ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy
                              className={`w-4 h-4 ${isLight ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-white"} transition-colors`}
                            />
                          )}
                        </button>
                      </div>
                      <p className={`text-xs ${isLight ? "text-gray-600" : "text-gray-400"} mt-3 flex items-center`}>
                        <Info className={`w-3 h-3 mr-1.5 ${isLight ? "text-blue-600" : "text-blue-400"}`} />
                        You can find your API token in the{" "}
                        <Link
                          href="/settings/api"
                          className={`${isLight ? "text-blue-600 hover:text-blue-800" : "text-white hover:text-blue-300"} hover:underline ml-1 transition-colors`}
                        >
                          API settings
                        </Link>
                        .
                      </p>
                    </div>

                    {/* Step 3: Body */}
                    <div
                      className={`${isLight ? "bg-white border border-gray-200" : "bg-gradient-to-br from-[#0c0c0c] to-[#111111] border border-[#1a1a1a]"} rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-center mb-5">
                        <div
                          className={`w-9 h-9 rounded-full ${isLight ? "bg-gradient-to-br from-blue-400 to-blue-500" : "bg-gradient-to-br from-gray-500 to-gray-600"} flex items-center justify-center mr-4 flex-shrink-0 shadow-md`}
                        >
                          <span className="text-sm font-bold text-white">3</span>
                        </div>
                        <h3
                          className={`text-xl font-medium ${isLight ? "text-gray-900" : "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"}`}
                        >
                          Send data in this format
                        </h3>
                      </div>
                      <div className="relative">
                        <pre
                          className={`font-mono text-sm ${isLight ? "text-gray-800 bg-gray-50 border border-gray-200" : "text-gray-300 bg-[#0a0a0a] border border-[#1a1a1a]"} p-5 rounded-md max-h-[300px] overflow-y-auto whitespace-pre-wrap shadow-inner`}
                        >
                          <span className={isLight ? "text-yellow-600" : "text-yellow-300"}>{"{"}</span>
                          <br /> <span className={isLight ? "text-purple-600" : "text-purple-400"}>"name"</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>"John Doe"</span>,
                          <br /> <span className={isLight ? "text-purple-600" : "text-purple-400"}>"email"</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>"john@example.com"</span>,
                          <br /> <span className={isLight ? "text-purple-600" : "text-purple-400"}>"phone_number"</span>
                          : <span className={isLight ? "text-green-600" : "text-green-400"}>"+1234567890"</span>,
                          <br /> <span className={isLight ? "text-purple-600" : "text-purple-400"}>"company"</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>"Acme Inc"</span>,
                          <br /> <span className={isLight ? "text-purple-600" : "text-purple-400"}>"job_title"</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>"Marketing Manager"</span>,
                          <br /> <span className={isLight ? "text-purple-600" : "text-purple-400"}>"industry"</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>"E-commerce"</span>,
                          <br /> <span className={isLight ? "text-purple-600" : "text-purple-400"}>"website"</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>"https://acme.com"</span>,
                          <br /> <span className={isLight ? "text-purple-600" : "text-purple-400"}>"linkedin"</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>
                            "https://linkedin.com/in/johndoe"
                          </span>
                          ,
                          <br /> <span className={isLight ? "text-purple-600" : "text-purple-400"}>"city"</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>"New York"</span>,
                          <br /> <span className={isLight ? "text-purple-600" : "text-purple-400"}>"state"</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>"NY"</span>,
                          <br /> <span className={isLight ? "text-purple-600" : "text-purple-400"}>"country"</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>"USA"</span>,
                          <br /> <span className={isLight ? "text-purple-600" : "text-purple-400"}>"location"</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>"10001"</span>,
                          <br />{" "}
                          <span className={isLight ? "text-purple-600" : "text-purple-400"}>"interested_in"</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>
                            "AI-powered outbound automation"
                          </span>
                          ,
                          <br /> <span className={isLight ? "text-purple-600" : "text-purple-400"}>"notes"</span>:{" "}
                          <span className={isLight ? "text-green-600" : "text-green-400"}>
                            "Requested a demo for next Tuesday."
                          </span>
                          <br />
                          <span className={isLight ? "text-yellow-600" : "text-yellow-300"}>{"}"}</span>
                        </pre>
                        <button
                          className={`absolute top-3 right-3 p-2 ${isLight ? "hover:bg-gray-200" : "hover:bg-[#1a1a1a]"} rounded-md transition-colors`}
                          onClick={() => copyToClipboard(bodyText, "body")}
                        >
                          {copiedBody ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy
                              className={`w-4 h-4 ${isLight ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-white"} transition-colors`}
                            />
                          )}
                        </button>
                      </div>
                      <p className={`text-xs ${isLight ? "text-gray-600" : "text-gray-400"} mt-3 flex items-center`}>
                        <Info className={`w-3 h-3 mr-1.5 ${isLight ? "text-blue-600" : "text-blue-400"}`} />
                        Only{" "}
                        <span className={`font-medium ${isLight ? "text-gray-900" : "text-white"} ml-1 mr-1`}>
                          name
                        </span>{" "}
                        and{" "}
                        <span className={`font-medium ${isLight ? "text-gray-900" : "text-white"} ml-1 mr-1`}>
                          email
                        </span>{" "}
                        fields are required.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: AI Agent */}
              {currentStep === 2 && (
                <div className="max-w-5xl mx-auto">
                  <h2
                    className={`text-2xl font-bold mb-2 ${isLight ? "text-gray-900" : "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"}`}
                  >
                    Select AI Agent
                  </h2>
                  <p className={isLight ? "text-gray-600 mb-8" : "text-gray-400 mb-8"}>
                    Choose the voice that will represent your brand and engage with your prospects
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                    {agentOptions.map((agent) => (
                      <div
                        key={agent.id}
                        className={`${isLight ? "bg-white" : "bg-[#0a0a0a]"} rounded-xl p-5 border ${agent.border} hover:border-opacity-70 transition-all duration-300 hover:shadow-md cursor-pointer group`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`w-20 h-20 rounded-full bg-gradient-to-br ${agent.color} flex items-center justify-center p-1 ${agent.border} mb-4`}
                          >
                            <div
                              className={`w-full h-full rounded-full ${isLight ? "bg-white" : "bg-[#0a0a0a]"} flex items-center justify-center`}
                            >
                              <img
                                src="/images/agent-icons.png"
                                alt={agent.name}
                                className="w-14 h-14 rounded-full opacity-70"
                              />
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{agent.name}</h3>
                          <p className={`text-sm ${isLight ? "text-gray-600" : "text-gray-400"} mb-3`}>
                            {agent.id === 6
                              ? "Create your own custom AI agent"
                              : "Pre-trained agent optimized for specific use cases"}
                          </p>
                          <div
                            className={`w-7 h-7 rounded-full border-2 ${isLight ? "border-gray-300 group-hover:border-blue-500" : "border-[#333333] group-hover:border-white"} flex items-center justify-center transition-colors`}
                          >
                            <div
                              className={`w-2.5 h-2.5 rounded-full ${isLight ? "bg-transparent group-hover:bg-blue-500" : "bg-transparent group-hover:bg-white"} transition-colors`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Select Channels */}
              {currentStep === 3 && (
                <div className="max-w-5xl mx-auto">
                  <h2
                    className={`text-2xl font-bold mb-2 ${isLight ? "text-gray-900" : "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"}`}
                  >
                    Select Channels
                  </h2>
                  <p className={isLight ? "text-gray-600 mb-8" : "text-gray-400 mb-8"}>
                    Choose your outreach channels to connect with your prospects
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* AI Calls Card */}
                    <div
                      className={`${isLight ? "bg-white border border-blue-200" : "bg-gradient-to-br from-[#0c0c0c] to-[#111111] border border-[#222222]"} rounded-xl p-6 hover:border-opacity-70 transition-all duration-300 hover:shadow-md cursor-pointer group`}
                    >
                      <div className="flex flex-col items-center text-center h-full">
                        <div
                          className={`w-16 h-16 rounded-full ${isLight ? "bg-blue-50 group-hover:bg-blue-100" : "bg-[#1a1a1a] group-hover:bg-[#252525]"} flex items-center justify-center mb-4 transition-colors`}
                        >
                          <svg
                            className={`w-8 h-8 ${isLight ? "text-blue-600 group-hover:text-blue-700" : "text-gray-400 group-hover:text-white"} transition-colors`}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21 5.5C21 14.06 14.06 21 5.5 21H4.5C3.67 21 3 20.33 3 19.5V18.5C3 17.67 3.67 17 4.5 17H5.5C6.88 17 8 15.88 8 14.5V13.5C8 12.67 8.67 12 9.5 12H13.5C14.33 12 15 12.67 15 13.5V14.5C15 15.88 16.12 17 17.5 17H18.5C19.33 17 20 17.67 20 18.5V19.5C20 20.33 19.33 21 18.5 21H17.5C8.94 21 2 14.06 2 5.5V4.5C2 3.67 2.67 3 3.5 3H4.5C5.33 3 6 3.67 6 4.5V5.5C6 6.88 7.12 8 8.5 8H9.5C10.33 8 11 8.67 11 9.5V10.5C11 11.88 12.12 13 13.5 13H14.5C15.33 13 16 12.33 16 11.5V10.5C16 9.12 17.12 8 18.5 8H19.5C20.33 8 21 7.33 21 6.5V5.5Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">AI Calls</h3>
                        <p className={`text-sm ${isLight ? "text-gray-600" : "text-gray-400"} mb-6`}>
                          Get instant feedback on your offers through AI-powered phone conversations
                        </p>
                        <div className="mt-auto">
                          <div
                            className={`w-7 h-7 rounded-full border-2 ${isLight ? "border-blue-300 group-hover:border-blue-500" : "border-[#333333] group-hover:border-white"} flex items-center justify-center mx-auto transition-colors`}
                          >
                            <div
                              className={`w-2.5 h-2.5 rounded-full ${isLight ? "bg-transparent group-hover:bg-blue-500" : "bg-transparent group-hover:bg-white"} transition-colors`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Emails Card */}
                    <div
                      className={`${isLight ? "bg-white border border-blue-200" : "bg-gradient-to-br from-[#0c0c0c] to-[#111111] border border-[#222222]"} rounded-xl p-6 hover:border-opacity-70 transition-all duration-300 hover:shadow-md cursor-pointer group`}
                    >
                      <div className="flex flex-col items-center text-center h-full">
                        <div
                          className={`w-16 h-16 rounded-full ${isLight ? "bg-blue-50 group-hover:bg-blue-100" : "bg-[#1a1a1a] group-hover:bg-[#252525]"} flex items-center justify-center mb-4 transition-colors`}
                        >
                          <svg
                            className={`w-8 h-8 ${isLight ? "text-blue-600 group-hover:text-blue-700" : "text-gray-400 group-hover:text-white"} transition-colors`}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">AI Emails</h3>
                        <p className={`text-sm ${isLight ? "text-gray-600" : "text-gray-400"} mb-6`}>
                          Send personalized outbound messages to your prospects with AI-powered email campaigns
                        </p>
                        <div className="mt-auto">
                          <div
                            className={`w-7 h-7 rounded-full border-2 ${isLight ? "border-blue-500 bg-blue-100" : "border-purple-500 bg-purple-500/10"} flex items-center justify-center mx-auto`}
                          >
                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Launch */}
              {currentStep === 4 && (
                <div className="max-w-5xl mx-auto">
                  <h2
                    className={`text-2xl font-bold mb-2 ${isLight ? "text-gray-900" : "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"}`}
                  >
                    Launch Campaign
                  </h2>
                  <p className={isLight ? "text-gray-600 mb-8" : "text-gray-400 mb-8"}>
                    Review your campaign settings and schedule your outreach
                  </p>

                  <div
                    className={`${isLight ? "bg-white border border-gray-200" : "bg-gradient-to-br from-[#0c0c0c] to-[#111111] border border-[#1a1a1a]"} rounded-lg p-6 mb-6 shadow-md`}
                  >
                    <h3 className={`text-lg font-medium mb-5 ${isLight ? "text-gray-900" : "text-white"}`}>
                      Schedule Settings
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isLight ? "text-gray-700" : "text-white"}`}>
                          Timezone
                        </label>
                        <select
                          className={`w-full ${isLight ? "bg-white border-gray-300 text-gray-900" : "bg-[#1a1a1a] border-[#333333] text-white"} border rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors`}
                        >
                          <option>(UTC-12:00) International Date Line West</option>
                          <option>(UTC-11:00) Coordinated Universal Time-11</option>
                          <option>(UTC-10:00) Hawaii</option>
                          <option>(UTC-09:00) Alaska</option>
                          <option>(UTC-08:00) Pacific Time (US & Canada)</option>
                          <option>(UTC-07:00) Mountain Time (US & Canada)</option>
                          <option>(UTC-06:00) Central Time (US & Canada)</option>
                          <option>(UTC-05:00) Eastern Time (US & Canada)</option>
                          <option>(UTC-04:00) Atlantic Time (Canada)</option>
                          <option>(UTC-03:30) Newfoundland</option>
                          <option>(UTC-03:00) Brasilia</option>
                          <option>(UTC-02:00) Coordinated Universal Time-02</option>
                          <option>(UTC-01:00) Cape Verde Is.</option>
                          <option>(UTC+00:00) Dublin, Edinburgh, Lisbon, London</option>
                          <option>(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                          <option>(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                          <option>(UTC+03:00) Moscow, St. Petersburg, Volgograd</option>
                          <option>(UTC+03:30) Tehran</option>
                          <option>(UTC+04:00) Abu Dhabi, Muscat</option>
                          <option>(UTC+04:30) Kabul</option>
                          <option>(UTC+05:00) Islamabad, Karachi</option>
                          <option>(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                          <option>(UTC+05:45) Kathmandu</option>
                          <option>(UTC+06:00) Astana, Dhaka</option>
                          <option>(UTC+06:30) Yangon (Rangoon)</option>
                          <option>(UTC+07:00) Bangkok, Hanoi, Jakarta</option>
                          <option>(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                          <option>(UTC+09:00) Osaka, Sapporo, Tokyo</option>
                          <option>(UTC+09:30) Adelaide</option>
                          <option>(UTC+10:00) Canberra, Melbourne, Sydney</option>
                          <option>(UTC+11:00) Vladivostok</option>
                          <option>(UTC+12:00) Auckland, Wellington</option>
                          <option>(UTC+13:00) Nuku'alofa</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isLight ? "text-gray-700" : "text-white"}`}>
                          Active Days
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {daysOfWeek.map((day, index) => (
                            <button
                              key={day}
                              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                                index < 5
                                  ? isLight
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-[#252525] text-white"
                                  : isLight
                                    ? "bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                                    : "bg-[#1a1a1a] text-gray-400"
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isLight ? "text-gray-700" : "text-white"}`}>
                          Working Hours
                        </label>
                        <div className="flex items-center gap-3">
                          <div
                            className={`${isLight ? "bg-white border-gray-300 text-gray-900" : "bg-[#1a1a1a] border-[#333333] text-white"} border rounded-md py-2 px-3`}
                          >
                            9:00 am
                          </div>
                          <span className={isLight ? "text-gray-500" : "text-gray-400"}>to</span>
                          <div
                            className={`${isLight ? "bg-white border-gray-300 text-gray-900" : "bg-[#1a1a1a] border-[#333333] text-white"} border rounded-md py-2 px-3`}
                          >
                            5:00 pm
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <h4 className={`text-base font-medium ${isLight ? "text-gray-900" : "text-white"}`}>
                            Double Dial
                          </h4>
                          <p className={`text-xs ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                            Double dialing retries a call if unanswered. While it may use more credits, it boosts pickup
                            rates by 40%.
                          </p>
                        </div>
                        <div
                          className={`relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full ${isLight ? "bg-gray-200" : "bg-[#1a1a1a]"}`}
                        >
                          <label
                            className={`absolute left-0 w-6 h-6 transition duration-100 ease-in-out transform ${isLight ? "bg-blue-600" : "bg-white"} rounded-full cursor-pointer`}
                          />
                          <input type="checkbox" className="w-full h-full opacity-0 cursor-pointer" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Webhook URL Input */}
                  <div
                    className={`${isLight ? "bg-white border border-gray-200" : "bg-gradient-to-br from-[#0c0c0c] to-[#111111] border border-[#1a1a1a]"} rounded-lg p-6 mb-6 shadow-md`}
                  >
                    <div className="flex items-center mb-4">
                      <LinkIcon className={`mr-2 ${isLight ? "text-blue-500" : "text-gray-400"}`} size={18} />
                      <h3 className={`text-lg font-medium ${isLight ? "text-gray-900" : "text-white"}`}>Webhook URL</h3>
                    </div>
                    <p className={`text-sm ${isLight ? "text-gray-600" : "text-gray-400"} mb-4`}>
                      Add a webhook URL to receive notifications when campaign events occur
                    </p>
                    <input
                      type="url"
                      value={webhookUrl}
                      onChange={handleWebhookUrlChange}
                      placeholder="https://your-webhook-url.com/endpoint"
                      className={`w-full ${isLight ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400" : "bg-[#1a1a1a] border-[#333333] text-white placeholder-gray-500"} border rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleNext}
          className={`px-7 py-3.5 rounded-full text-base font-medium flex items-center ${
            isLight ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-[#635AFE] hover:bg-[#5048E5] text-white"
          } transition-all shadow-md hover:shadow-lg transform hover:translate-y-[-2px]`}
        >
          <span>Next</span>
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
