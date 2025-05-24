"use client"

import { useState, useRef } from "react"
import {
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Download,
  Upload,
  Mail,
  Server,
  Lock,
  Key,
  Globe,
  Info,
} from "lucide-react"

interface AddEmailAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddEmailAccountModal({ isOpen, onClose }: AddEmailAccountModalProps) {
  const [activeTab, setActiveTab] = useState("smtp")
  const [smtpPort, setSmtpPort] = useState("465")
  const [imapPort, setImapPort] = useState("993")
  const [requireSmtpAuth, setRequireSmtpAuth] = useState(true)
  const [useSmtpSsl, setUseSmtpSsl] = useState(true)
  const [useImapSsl, setUseImapSsl] = useState(true)
  const [allowSelfSigned, setAllowSelfSigned] = useState(false)
  const [smtpTestStatus, setSmtpTestStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [imapTestStatus, setImapTestStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleSmtpTest = () => {
    setSmtpTestStatus("loading")
    // Simulate a test connection
    setTimeout(() => {
      setSmtpTestStatus("success")
      // Reset after 3 seconds
      setTimeout(() => setSmtpTestStatus("idle"), 3000)
    }, 1500)
  }

  const handleImapTest = () => {
    setImapTestStatus("loading")
    // Simulate a test connection
    setTimeout(() => {
      setImapTestStatus("success")
      // Reset after 3 seconds
      setTimeout(() => setImapTestStatus("idle"), 3000)
    }, 1500)
  }

  const handleFileUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card backdrop-filter backdrop-blur-xl rounded-2xl w-full max-w-[550px] border border-border shadow-2xl max-h-[90vh] overflow-auto">
        {/* Header with glassmorphism effect */}
        <div className="flex justify-between items-center p-3 border-b border-border bg-card">
          <h2 className="text-lg font-bold text-foreground">Add Email Account</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors bg-secondary hover:bg-secondary/80 rounded-full p-1.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs with glassmorphism effect */}
        <div className="flex border-b border-border bg-card">
          {["smtp", "bulk", "google", "outlook"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-2 text-center text-sm transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "smtp"
                ? "SMTP/IMAP"
                : tab === "bulk"
                  ? "Bulk Upload"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="p-3">
          {activeTab === "smtp" && (
            <form className="space-y-4">
              {/* SMTP Configuration */}
              <div className="bg-background/50 backdrop-blur-md rounded-xl p-4 border border-border shadow-sm">
                <div className="mb-3 flex items-center">
                  <Mail className="w-4 h-4 text-foreground mr-2" />
                  <h3 className="text-base font-semibold text-foreground">SMTP Configuration</h3>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="smtp-email" className="block text-xs font-medium text-foreground">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                        <input
                          type="email"
                          id="smtp-email"
                          placeholder="email@example.com"
                          className="w-full bg-background border border-input rounded-lg py-1.5 pl-8 pr-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="smtp-username" className="block text-xs font-medium text-foreground">
                        Username <span className="text-muted-foreground text-xs">(if different)</span>
                      </label>
                      <div className="relative">
                        <Key className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                        <input
                          type="text"
                          id="smtp-username"
                          placeholder="SMTP username"
                          className="w-full bg-background border border-input rounded-lg py-1.5 pl-8 pr-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="smtp-password" className="block text-xs font-medium text-foreground">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                      <input
                        type="password"
                        id="smtp-password"
                        placeholder="••••••••"
                        className="w-full bg-background border border-input rounded-lg py-1.5 pl-8 pr-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="smtp-server" className="block text-xs font-medium text-foreground">
                        SMTP Server
                      </label>
                      <div className="relative">
                        <Server className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                        <input
                          type="text"
                          id="smtp-server"
                          placeholder="smtp.example.com"
                          className="w-full bg-background border border-input rounded-lg py-1.5 pl-8 pr-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="smtp-port" className="block text-xs font-medium text-foreground">
                        SMTP Port
                      </label>
                      <select
                        id="smtp-port"
                        value={smtpPort}
                        onChange={(e) => setSmtpPort(e.target.value)}
                        className="w-full bg-background border border-input rounded-lg py-1.5 px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition-all appearance-none"
                      >
                        <option value="465">465 (SSL)</option>
                        <option value="587">587 (TLS)</option>
                        <option value="25">25 (Non-encrypted)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 mt-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="smtp-ssl"
                        checked={useSmtpSsl}
                        onChange={() => setUseSmtpSsl(!useSmtpSsl)}
                        className="w-3.5 h-3.5 bg-background border border-input rounded focus:ring-1 focus:ring-ring text-primary"
                      />
                      <label htmlFor="smtp-ssl" className="ml-1.5 text-xs text-foreground">
                        SSL/TLS
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="smtp-starttls"
                        className="w-3.5 h-3.5 bg-background border border-input rounded focus:ring-1 focus:ring-ring text-primary"
                      />
                      <label htmlFor="smtp-starttls" className="ml-1.5 text-xs text-foreground">
                        Disable STARTTLS
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={handleSmtpTest}
                      disabled={smtpTestStatus === "loading"}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 px-3 rounded-lg transition-all text-xs font-medium"
                    >
                      {smtpTestStatus === "loading" ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Testing...</span>
                        </>
                      ) : smtpTestStatus === "success" ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                          <span>Connected</span>
                        </>
                      ) : smtpTestStatus === "error" ? (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                          <span>Failed</span>
                        </>
                      ) : (
                        <span>Test SMTP</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* IMAP Configuration */}
              <div className="bg-background/50 backdrop-blur-md rounded-xl p-4 border border-border shadow-sm">
                <div className="mb-3 flex items-center">
                  <Globe className="w-4 h-4 text-foreground mr-2" />
                  <h3 className="text-base font-semibold text-foreground">IMAP Configuration</h3>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="imap-user" className="block text-xs font-medium text-foreground">
                        User
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                        <input
                          type="text"
                          id="imap-user"
                          placeholder="username@example.com"
                          className="w-full bg-background border border-input rounded-lg py-1.5 pl-8 pr-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="imap-password" className="block text-xs font-medium text-foreground">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                        <input
                          type="password"
                          id="imap-password"
                          placeholder="••••••••"
                          className="w-full bg-background border border-input rounded-lg py-1.5 pl-8 pr-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="imap-host" className="block text-xs font-medium text-foreground">
                        Host
                      </label>
                      <div className="relative">
                        <Server className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                        <input
                          type="text"
                          id="imap-host"
                          placeholder="imap.example.com"
                          className="w-full bg-background border border-input rounded-lg py-1.5 pl-8 pr-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="imap-port" className="block text-xs font-medium text-foreground">
                        Port
                      </label>
                      <select
                        id="imap-port"
                        value={imapPort}
                        onChange={(e) => setImapPort(e.target.value)}
                        className="w-full bg-background border border-input rounded-lg py-1.5 px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition-all appearance-none"
                      >
                        <option value="993">993 (SSL)</option>
                        <option value="143">143 (Non-SSL)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 mt-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="imap-ssl"
                        checked={useImapSsl}
                        onChange={() => setUseImapSsl(!useImapSsl)}
                        className="w-3.5 h-3.5 bg-background border border-input rounded focus:ring-1 focus:ring-ring text-primary"
                      />
                      <label htmlFor="imap-ssl" className="ml-1.5 text-xs text-foreground">
                        SSL/TLS
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="imap-self-signed"
                        checked={allowSelfSigned}
                        onChange={() => setAllowSelfSigned(!allowSelfSigned)}
                        className="w-3.5 h-3.5 bg-background border border-input rounded focus:ring-1 focus:ring-ring text-primary"
                      />
                      <label htmlFor="imap-self-signed" className="ml-1.5 text-xs text-foreground">
                        Allow Self-Signed Certs
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleImapTest}
                    disabled={imapTestStatus === "loading"}
                    className="w-full flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 px-3 rounded-lg transition-all mt-2 text-xs font-medium"
                  >
                    {imapTestStatus === "loading" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Testing IMAP...</span>
                      </>
                    ) : imapTestStatus === "success" ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        <span>IMAP Connected</span>
                      </>
                    ) : imapTestStatus === "error" ? (
                      <>
                        <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                        <span>IMAP Failed</span>
                      </>
                    ) : (
                      <span>Test IMAP Connection</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Help Text */}
              <div className="flex items-start gap-2 text-xs text-muted-foreground px-2">
                <Info className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p>
                  Need help? Check our{" "}
                  <a href="#" className="text-foreground hover:underline">
                    documentation
                  </a>{" "}
                  for common email providers.
                </p>
              </div>
            </form>
          )}

          {activeTab === "bulk" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-semibold text-foreground">Upload CSV File</h3>
                <button className="flex items-center gap-1.5 text-xs bg-secondary hover:bg-secondary/80 text-foreground py-1.5 px-3 rounded-lg transition-all backdrop-blur-sm">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Template</span>
                </button>
              </div>

              <div
                className="bg-background/50 backdrop-blur-md border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:bg-background/70 transition-all"
                onClick={handleFileUploadClick}
              >
                <input type="file" ref={fileInputRef} className="hidden" accept=".csv,.xlsx" />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-foreground" />
                  </div>
                  <h4 className="text-sm font-medium mb-1 text-foreground">Click to upload or drag and drop</h4>
                  <p className="text-xs text-muted-foreground mb-1">CSV file with email account details</p>
                  <p className="text-xs text-muted-foreground">Supported formats: CSV, XLSX</p>
                </div>
              </div>

              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium transition-all shadow-sm">
                Upload and Add Accounts
              </button>
            </div>
          )}

          {activeTab === "google" && (
            <div className="py-4 text-center">
              <h3 className="text-sm font-semibold text-foreground mb-3">Connect your Google Workspace account</h3>
              <div className="bg-background/50 backdrop-blur-md rounded-xl p-4 inline-block border border-border shadow-sm">
                <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black py-2 px-6 rounded-lg text-sm font-medium transition-all shadow-sm">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "outlook" && (
            <div className="py-4 text-center">
              <h3 className="text-sm font-semibold text-foreground mb-3">Connect your Outlook account</h3>
              <div className="bg-background/50 backdrop-blur-md rounded-xl p-4 inline-block border border-border shadow-sm">
                <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black py-2 px-6 rounded-lg text-sm font-medium transition-all shadow-sm">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M7 5H21V19H7V5Z" fill="#28A8EA" />
                    <path d="M16.5 12L21 16.5V7.5L16.5 12Z" fill="#0078D4" />
                    <path d="M7 5H14L7 12V5Z" fill="#0078D4" />
                    <path d="M14 5H21V12L14 5Z" fill="#50D9FF" />
                    <path d="M7 12H14L7 19V12Z" fill="#0364B8" />
                    <path d="M14 19H7L14 12V19Z" fill="#0078D4" />
                    <path d="M14 12H21L14 19V12Z" fill="#064A8C" />
                    <path d="M21 12H14L21 5V12Z" fill="#0078D4" />
                    <path d="M3 5.5H11V18.5H3C2.448 18.5 2 18.052 2 17.5V6.5C2 5.948 2.448 5.5 3 5.5Z" fill="#0078D4" />
                    <path d="M7 9.5L4 8L7 6.5V9.5Z" fill="white" />
                  </svg>
                  <span>Sign in with Outlook</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

