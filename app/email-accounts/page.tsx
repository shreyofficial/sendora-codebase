"use client"

import { Search, Plus, Mail, MoreVertical, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"
import Sidebar from "@/components/sidebar"
import EditEmailLimitModal from "@/components/edit-email-limit-modal"
import AddEmailAccountModal from "@/components/add-email-account-modal"

interface EmailAccount {
  id: string
  email: string
  name: string
  provider: "gmail" | "outlook" | "custom"
  quality: "average" | "good" | "great"
  dailyLimit: number
  dailyUsed: number
}

export default function EmailAccounts() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [activeAccount, setActiveAccount] = useState<EmailAccount | null>(null)
  const [optionsOpen, setOptionsOpen] = useState<string | null>(null)

  // Sample email accounts data
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([
    {
      id: "1",
      email: "john@blackvolution.com",
      name: "John Doe",
      provider: "gmail",
      quality: "great",
      dailyLimit: 100,
      dailyUsed: 45,
    },
    {
      id: "2",
      email: "sales@blackvolution.com",
      name: "Sales Team",
      provider: "outlook",
      quality: "good",
      dailyLimit: 80,
      dailyUsed: 65,
    },
    {
      id: "3",
      email: "support@blackvolution.com",
      name: "Support",
      provider: "custom",
      quality: "average",
      dailyLimit: 50,
      dailyUsed: 10,
    },
  ])

  const toggleOptions = (id: string) => {
    if (optionsOpen === id) {
      setOptionsOpen(null)
    } else {
      setOptionsOpen(id)
    }
  }

  const handleEditAccount = (account: EmailAccount) => {
    setActiveAccount(account)
    setIsEditModalOpen(true)
    setOptionsOpen(null)
  }

  const handleDeleteAccount = (id: string) => {
    setEmailAccounts(emailAccounts.filter((account) => account.id !== id))
    setOptionsOpen(null)
  }

  const handleUpdateLimit = (id: string, newLimit: number) => {
    setEmailAccounts(
      emailAccounts.map((account) => (account.id === id ? { ...account, dailyLimit: newLimit } : account)),
    )
    setIsEditModalOpen(false)
  }

  // Update the getProviderIcon function to have better styling for light mode
  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "gmail":
        return (
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.929 0 3.679.768 4.967 2.012l4.195-4.195A11.981 11.981 0 0 0 12 0C7.371 0 3.373 2.531 1.272 6.316l3.994 3.45Z"
              />
              <path
                fill="#FBBC05"
                d="M5.266 14.235a7.077 7.077 0 0 1 0-4.47l-3.994-3.45A11.981 11.981 0 0 0 0 12c0 1.845.417 3.59 1.272 5.147l3.994-3.45Z"
              />
              <path
                fill="#34A853"
                d="M12 19.091c-2.593 0-4.891-1.157-6.466-2.979l-3.994 3.45C3.873 22.392 7.71 24 12 24c4.629 0 8.627-2.531 10.728-6.316l-3.994-3.45c-1.288 1.244-3.038 2.012-4.967 2.012l-1.767 2.845Z"
              />
              <path
                fill="#4285F4"
                d="M23.896 12.196c0-.823-.076-1.626-.22-2.396H12v4.8h6.668c-.271 1.394-1.15 2.576-2.395 3.372l3.994 3.45c2.3-2.143 3.629-5.294 3.629-9.226Z"
              />
            </svg>
          </div>
        )
      case "outlook":
        return (
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg viewBox="0 0 24 24" width="20" height="20">
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
          </div>
        )
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm dark:bg-gray-700 dark:border-gray-700">
            <Mail className="w-5 h-5 text-gray-400 dark:text-gray-400" />
          </div>
        )
    }
  }

  // Update the getQualityBadge function to have lighter colors in light mode
  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case "great":
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-50 text-green-600 border border-green-100 dark:bg-green-900 dark:text-green-300 dark:border-green-800">
            Great
          </span>
        )
      case "good":
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800">
            Good
          </span>
        )
      case "average":
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-50 text-yellow-600 border border-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-800">
            Average
          </span>
        )
      default:
        return null
    }
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
            <h1 className="text-2xl font-bold">Email Accounts</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 px-4 rounded text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Email Account</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search Email Accounts..."
              className="w-full bg-background border border-input rounded-lg py-2.5 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Email Accounts List */}
          <div className="space-y-3">
            {emailAccounts.map((account) => (
              <div key={account.id} className="bg-card border border-border rounded-xl p-4 relative">
                <div className="flex items-start">
                  {/* Account Icon */}
                  <div className="mr-3">{getProviderIcon(account.provider)}</div>

                  {/* Account Details */}
                  <div className="flex-1">
                    <div className="flex items-center mb-0.5">
                      <h3 className="font-medium text-foreground text-base">{account.email}</h3>
                      <div className="ml-2">{getQualityBadge(account.quality)}</div>
                    </div>
                    <p className="text-muted-foreground text-sm">{account.name}</p>
                  </div>

                  {/* Options Menu */}
                  <div className="relative">
                    <button
                      onClick={() => toggleOptions(account.id)}
                      className="p-1 hover:bg-secondary rounded-full transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>

                    {optionsOpen === account.id && (
                      <div className="absolute right-0 top-6 w-44 bg-popover border border-border rounded-md shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleEditAccount(account)}
                            className="flex items-center w-full px-3 py-1.5 text-xs text-foreground hover:bg-secondary transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                            Edit sending limits
                          </button>
                          <button
                            onClick={() => handleDeleteAccount(account.id)}
                            className="flex items-center w-full px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-2" />
                            Delete account
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Edit Email Limit Modal */}
      {activeAccount && (
        <EditEmailLimitModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          account={activeAccount}
          onUpdate={handleUpdateLimit}
        />
      )}

      {/* Add Email Account Modal */}
      <AddEmailAccountModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
