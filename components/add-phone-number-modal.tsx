"use client"

import { useState, useEffect } from "react"
import {
  X,
  Phone,
  Globe,
  User,
  Lock,
  ChevronDown,
  Check,
  Info,
  AlertCircle,
  Search,
  MapPin,
  CreditCard,
} from "lucide-react"

interface AddPhoneNumberModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddPhoneNumberModal({ isOpen, onClose }: AddPhoneNumberModalProps) {
  const [view, setView] = useState<"menu" | "buy" | "sip">("menu")
  const [areaCode, setAreaCode] = useState("")
  const [nickname, setNickname] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [terminationUri, setTerminationUri] = useState("")
  const [sipUsername, setSipUsername] = useState("")
  const [sipPassword, setSipPassword] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAreaCode, setSelectedAreaCode] = useState<string | null>(null)
  const [showAreaCodeSearch, setShowAreaCodeSearch] = useState(false)

  // Reset view when modal is closed
  useEffect(() => {
    if (!isOpen) {
      // Small delay to allow close animation to finish
      setTimeout(() => setView("menu"), 200)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBuyNumber = () => {
    // Handle buying number logic
    console.log("Buying number with area code:", areaCode, "and nickname:", nickname)
    onClose()
  }

  const handleSaveSip = () => {
    // Handle saving SIP trunk connection
    console.log("Saving SIP trunk connection:", { phoneNumber, terminationUri, sipUsername, sipPassword })
    onClose()
  }

  // Sample area codes for demonstration
  const areaCodes = [
    { code: "212", location: "New York, NY", availability: "High", popular: true },
    { code: "213", location: "Los Angeles, CA", availability: "Medium", popular: true },
    { code: "312", location: "Chicago, IL", availability: "High", popular: true },
    { code: "415", location: "San Francisco, CA", availability: "Low", popular: true },
    { code: "305", location: "Miami, FL", availability: "Medium", popular: false },
    { code: "202", location: "Washington, DC", availability: "High", popular: false },
    { code: "404", location: "Atlanta, GA", availability: "High", popular: false },
    { code: "617", location: "Boston, MA", availability: "Medium", popular: false },
  ]

  const filteredAreaCodes = searchQuery
    ? areaCodes.filter(
        (ac) => ac.code.includes(searchQuery) || ac.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : areaCodes

  // Enhanced dropdown menu with animations
  if (view === "menu") {
    return (
      <div className="absolute right-0 top-full mt-1 z-50 w-56 bg-card/90 backdrop-filter backdrop-blur-xl rounded-lg border border-border shadow-xl overflow-hidden animate-fadeIn">
        <div className="p-1.5 space-y-1">
          <button
            onClick={() => setView("buy")}
            className="w-full text-left px-3 py-2 bg-background/30 hover:bg-secondary/50 backdrop-blur-sm rounded-md transition-all text-foreground text-sm flex items-center gap-2 group"
          >
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <Phone className="w-3 h-3 text-blue-400" />
            </div>
            <span>Buy New Number</span>
          </button>

          <button
            onClick={() => setView("sip")}
            className="w-full text-left px-3 py-2 bg-background/30 hover:bg-secondary/50 backdrop-blur-sm rounded-md transition-all text-foreground text-sm flex items-center gap-2 group"
          >
            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
              <Globe className="w-3 h-3 text-purple-400" />
            </div>
            <span>Connect via SIP</span>
          </button>
        </div>
      </div>
    )
  }

  // Enhanced Buy Number modal with area code selection
  if (view === "buy") {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
        <div
          className="bg-card backdrop-filter backdrop-blur-xl rounded-xl w-full max-w-[400px] border border-border shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-3 border-b border-border bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Phone className="w-3 h-3 text-blue-400" />
              </div>
              Buy a New Phone Number
            </h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors bg-secondary hover:bg-secondary/80 rounded-full p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Nickname field */}
            <div className="space-y-1.5">
              <label htmlFor="nickname" className="block text-xs font-medium text-foreground flex items-center gap-1">
                Number Nickname
                <div className="relative group">
                  <Info className="w-3 h-3 text-muted-foreground cursor-help" />
                  <div className="absolute bottom-full mb-1.5 left-1/2 transform -translate-x-1/2 w-48 p-2 bg-card/90 rounded text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    A friendly name to identify this number in your account
                  </div>
                </div>
              </label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g., Sales Line, Support Number"
                className="w-full bg-background border border-input rounded-md py-2 px-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-transparent transition-all"
              />
            </div>

            {/* Area code selection */}
            <div className="space-y-1.5">
              <label htmlFor="areaCode" className="block text-xs font-medium text-foreground">
                Select Area Code
              </label>

              {showAreaCodeSearch ? (
                <div className="space-y-2">
                  {/* Search input */}
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by area code or location"
                      className="w-full bg-background border border-input rounded-md py-2 pl-8 pr-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Area code results */}
                  <div className="max-h-48 overflow-y-auto bg-background/80 border border-border rounded-md">
                    {filteredAreaCodes.length > 0 ? (
                      filteredAreaCodes.map((ac) => (
                        <button
                          key={ac.code}
                          onClick={() => {
                            setAreaCode(ac.code)
                            setSelectedAreaCode(ac.code)
                            setShowAreaCodeSearch(false)
                          }}
                          className="w-full flex items-center justify-between p-2 hover:bg-secondary/50 border-b border-border/50 last:border-0 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                ac.availability === "High"
                                  ? "bg-green-500/20"
                                  : ac.availability === "Medium"
                                    ? "bg-yellow-500/20"
                                    : "bg-red-500/20"
                              }`}
                            >
                              <span className="text-xs font-medium">{ac.code}</span>
                            </div>
                            <span className="text-xs text-foreground">{ac.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {ac.popular && (
                              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full">
                                Popular
                              </span>
                            )}
                            <span
                              className={`text-[10px] ${
                                ac.availability === "High"
                                  ? "text-green-400"
                                  : ac.availability === "Medium"
                                    ? "text-yellow-400"
                                    : "text-red-400"
                              }`}
                            >
                              {ac.availability}
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-center text-xs text-muted-foreground">
                        No area codes found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAreaCodeSearch(true)}
                  className={`w-full flex items-center justify-between bg-background border ${selectedAreaCode ? "border-blue-500/30" : "border-input"} rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all`}
                >
                  <div className="flex items-center gap-2">
                    {selectedAreaCode ? (
                      <>
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-foreground">
                          {selectedAreaCode} - {areaCodes.find((ac) => ac.code === selectedAreaCode)?.location}
                        </span>
                      </>
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">Search for area code</span>
                      </>
                    )}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Pricing information */}
            {selectedAreaCode && (
              <div className="bg-background/80 rounded-md p-3 border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground">Monthly fee</span>
                  <span className="text-sm font-medium text-foreground">$4.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">One-time setup</span>
                  <span className="text-sm font-medium text-foreground">$1.00</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center p-3 border-t border-border bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm">
            <button
              onClick={() => setView("menu")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Back
            </button>

            <button
              onClick={handleBuyNumber}
              disabled={!nickname || !selectedAreaCode}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                nickname && selectedAreaCode
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/20"
                  : "bg-secondary/50 text-muted-foreground cursor-not-allowed"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              Purchase Number
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Enhanced SIP modal with better organization
  if (view === "sip") {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
        <div
          className="bg-card backdrop-filter backdrop-blur-xl rounded-xl w-full max-w-[400px] border border-border shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-3 border-b border-border bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Globe className="w-3 h-3 text-purple-400" />
              </div>
              Connect via SIP Trunking
            </h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors bg-secondary hover:bg-secondary/80 rounded-full p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4">
            {/* Required fields section */}
            <div className="mb-4">
              <h3 className="text-xs font-medium text-purple-300 mb-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Required Information
              </h3>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="phoneNumber" className="block text-xs font-medium text-foreground">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full bg-background border border-input rounded-md py-2 pl-8 pr-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="terminationUri" className="block text-xs font-medium text-foreground">
                    Termination URI
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                    <input
                      type="text"
                      id="terminationUri"
                      value={terminationUri}
                      onChange={(e) => setTerminationUri(e.target.value)}
                      placeholder="sip:example.com:5060"
                      className="w-full bg-background border border-input rounded-md py-2 pl-8 pr-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Format: sip:domain.com:port or sip:ip-address:port
                  </p>
                </div>
              </div>
            </div>

            {/* Optional authentication section */}
            <div className="mb-2">
              <h3 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Authentication (Optional)
              </h3>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="sipUsername" className="block text-xs font-medium text-foreground">
                    SIP Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                    <input
                      type="text"
                      id="sipUsername"
                      value={sipUsername}
                      onChange={(e) => setSipUsername(e.target.value)}
                      placeholder="Username"
                      className="w-full bg-background border border-input rounded-md py-2 pl-8 pr-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="sipPassword" className="block text-xs font-medium text-foreground">
                    SIP Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                    <input
                      type="password"
                      id="sipPassword"
                      value={sipPassword}
                      onChange={(e) => setSipPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-background border border-input rounded-md py-2 pl-8 pr-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center p-3 border-t border-border bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm">
            <button
              onClick={() => setView("menu")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Back
            </button>

            <button
              onClick={handleSaveSip}
              disabled={!phoneNumber || !terminationUri}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                phoneNumber && terminationUri
                  ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600 shadow-lg shadow-purple-500/20"
                  : "bg-secondary/50 text-muted-foreground cursor-not-allowed"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              Connect
            </button>
          </div>
        </div>
      </div>
    )
  }
}

