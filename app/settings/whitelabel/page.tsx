"use client"

import {
  Palette,
  Upload,
  ImageIcon,
  Globe,
  Layers,
  ArrowLeftRight,
  PauseCircle,
  PlayCircle,
  Plus,
  Search,
  X,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Link,
} from "lucide-react"
import { useState } from "react"
import { CreateSubAccountModal } from "@/components/create-sub-account-modal"
import { TransferCreditsModal } from "@/components/transfer-credits-modal"
import { ConfirmActionModal } from "@/components/confirm-action-modal"
import { toast } from "@/components/ui/use-toast"

interface SubAccount {
  id: number
  name: string
  emailCredits: number
  callCredits: number
  status: "active" | "paused"
  lastActive: string
}

export default function WhitelabelPage() {
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("")
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  // Booking link state
  const [bookingLink, setBookingLink] = useState("")

  // Selected account for actions
  const [selectedAccount, setSelectedAccount] = useState<SubAccount | null>(null)

  // Main account state
  const [mainAccount, setMainAccount] = useState({
    id: "main",
    name: "Main Account",
    emailCredits: 10000,
    callCredits: 5000,
  })

  // Sub-accounts state
  const [subAccounts, setSubAccounts] = useState<SubAccount[]>([
    {
      id: 1,
      name: "Marketing Team",
      emailCredits: 3000,
      callCredits: 2000,
      status: "active",
      lastActive: "2023-04-15",
    },
    {
      id: 2,
      name: "Sales Department",
      emailCredits: 2200,
      callCredits: 1000,
      status: "active",
      lastActive: "2023-04-18",
    },
    {
      id: 3,
      name: "Customer Support",
      emailCredits: 1000,
      callCredits: 500,
      status: "paused",
      lastActive: "2023-03-22",
    },
    {
      id: 4,
      name: "Development Team",
      emailCredits: 5000,
      callCredits: 2800,
      status: "active",
      lastActive: "2023-04-20",
    },
    { id: 5, name: "HR Department", emailCredits: 600, callCredits: 300, status: "paused", lastActive: "2023-02-10" },
  ])

  // Filter sub-accounts based on search query
  const filteredSubAccounts = subAccounts.filter((account) => {
    const matchesSearch = account.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  // Handler for creating a new sub-account
  const handleCreateSubAccount = (name: string, emailCredits: number, callCredits: number) => {
    // Create new sub-account
    const newAccount: SubAccount = {
      id: Date.now(), // Use timestamp as temporary ID
      name,
      emailCredits,
      callCredits,
      status: "active",
      lastActive: new Date().toISOString().split("T")[0],
    }

    // Update sub-accounts list
    setSubAccounts([...subAccounts, newAccount])

    // Deduct credits from main account
    setMainAccount({
      ...mainAccount,
      emailCredits: mainAccount.emailCredits - emailCredits,
      callCredits: mainAccount.callCredits - callCredits,
    })

    // Show success message
    toast({
      title: "Sub-account created",
      description: `${name} has been created with ${emailCredits.toLocaleString()} email credits and ${callCredits.toLocaleString()} call credits.`,
    })
  }

  // Handler for transferring credits between accounts
  const handleTransferCredits = (
    fromId: number | string,
    toId: number | string,
    emailCredits: number,
    callCredits: number,
    isSubscriptionUpdate: boolean,
  ) => {
    // If updating subscription (no actual transfer, just update the values)
    if (isSubscriptionUpdate) {
      setSubAccounts(
        subAccounts.map((account) =>
          account.id.toString() === toId.toString() ? { ...account, emailCredits, callCredits } : account,
        ),
      )

      // Show success message
      toast({
        title: "Subscription updated",
        description: `Monthly credit allocation has been updated to ${emailCredits.toLocaleString()} email credits and ${callCredits.toLocaleString()} call credits.`,
      })
      return
    }

    // If transferring from main account to sub-account
    if (fromId === "main" && typeof toId === "number") {
      // Update main account
      setMainAccount({
        ...mainAccount,
        emailCredits: mainAccount.emailCredits - emailCredits,
        callCredits: mainAccount.callCredits - callCredits,
      })

      // Update sub-account
      setSubAccounts(
        subAccounts.map((account) =>
          account.id === toId
            ? {
                ...account,
                emailCredits: account.emailCredits + emailCredits,
                callCredits: account.callCredits + callCredits,
              }
            : account,
        ),
      )
    }
    // If transferring from sub-account to main account
    else if (typeof fromId === "number" && toId === "main") {
      // Update sub-account
      setSubAccounts(
        subAccounts.map((account) =>
          account.id === fromId
            ? {
                ...account,
                emailCredits: account.emailCredits - emailCredits,
                callCredits: account.callCredits - callCredits,
              }
            : account,
        ),
      )

      // Update main account
      setMainAccount({
        ...mainAccount,
        emailCredits: mainAccount.emailCredits + emailCredits,
        callCredits: mainAccount.callCredits + callCredits,
      })
    }
    // If transferring between sub-accounts
    else if (typeof fromId === "number" && typeof toId === "number") {
      setSubAccounts(
        subAccounts.map((account) => {
          if (account.id === fromId) {
            return {
              ...account,
              emailCredits: account.emailCredits - emailCredits,
              callCredits: account.callCredits - callCredits,
            }
          }
          if (account.id === toId) {
            return {
              ...account,
              emailCredits: account.emailCredits + emailCredits,
              callCredits: account.callCredits + callCredits,
            }
          }
          return account
        }),
      )
    }

    // Show success message
    toast({
      title: "Credits transferred",
      description: `${emailCredits.toLocaleString()} email credits and ${callCredits.toLocaleString()} call credits have been transferred successfully.`,
    })
  }

  // Handler for toggling account status (active/paused)
  const handleToggleAccountStatus = () => {
    if (!selectedAccount) return

    setSubAccounts(
      subAccounts.map((account) =>
        account.id === selectedAccount.id
          ? {
              ...account,
              status: account.status === "active" ? "paused" : "active",
              lastActive: account.status === "paused" ? new Date().toISOString().split("T")[0] : account.lastActive,
            }
          : account,
      ),
    )

    // Show success message
    toast({
      title: `Account ${selectedAccount.status === "active" ? "paused" : "activated"}`,
      description: `${selectedAccount.name} has been ${selectedAccount.status === "active" ? "paused" : "activated"}.`,
    })

    // Reset selected account
    setSelectedAccount(null)
  }

  // Handler for deleting a sub-account
  const handleDeleteAccount = () => {
    if (!selectedAccount) return

    // Return credits to main account
    setMainAccount({
      ...mainAccount,
      emailCredits: mainAccount.emailCredits + selectedAccount.emailCredits,
      callCredits: mainAccount.callCredits + selectedAccount.callCredits,
    })

    // Remove account from list
    setSubAccounts(subAccounts.filter((account) => account.id !== selectedAccount.id))

    // Show success message
    toast({
      title: "Sub-account deleted",
      description: `${selectedAccount.name} has been deleted and all credits have been returned to your main account.`,
    })

    // Reset selected account
    setSelectedAccount(null)
  }

  // Open transfer modal with specific account
  const openTransferModal = (account?: SubAccount) => {
    if (account) {
      setSelectedAccount(account)
    }
    setIsTransferModalOpen(true)
  }

  // Open pause/activate confirmation modal
  const openPauseModal = (account: SubAccount) => {
    setSelectedAccount(account)
    setIsPauseModalOpen(true)
  }

  // Open delete confirmation modal
  const openDeleteModal = (account: SubAccount) => {
    setSelectedAccount(account)
    setIsDeleteModalOpen(true)
  }

  // Handler for saving booking link
  const handleSaveBookingLink = () => {
    toast({
      title: "Booking link saved",
      description: "Your booking link has been saved successfully.",
    })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="w-5 h-5 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Whitelabel</h1>
      </div>

      <div className="theme-card p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-lg font-medium">Branding</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Logo</label>
            <div className="border border-dashed border-border rounded-lg p-6 text-center">
              <div className="mb-3 flex justify-center">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">Drag and drop your logo here, or click to browse</p>
              <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-xs font-medium transition-colors">
                Upload Logo
              </button>
              <p className="text-xs text-muted-foreground mt-3">Recommended size: 200x50px, PNG or SVG</p>
            </div>
          </div>

          {/* Favicon Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Favicon</label>
            <div className="border border-dashed border-border rounded-lg p-6 text-center">
              <div className="mb-3 flex justify-center">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">Drag and drop your favicon here, or click to browse</p>
              <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-xs font-medium transition-colors">
                Upload Favicon
              </button>
              <p className="text-xs text-muted-foreground mt-3">Recommended size: 32x32px, ICO or PNG</p>
            </div>
          </div>
        </div>
      </div>

      <div className="theme-card p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-lg font-medium">Custom Domain</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="domain" className="block text-sm font-medium mb-2">
              Domain Name
            </label>
            <div className="flex">
              <input
                type="text"
                id="domain"
                placeholder="app.yourdomain.com"
                className="flex-1 bg-background border border-input rounded-lg py-2 px-3 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button className="ml-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors">
                Verify
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Enter the domain you want to use for your Sendora instance
            </p>
          </div>

          <div className="p-3 bg-secondary/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">DNS Configuration</div>
                <div className="text-xs text-muted-foreground">Add these records to your DNS settings</div>
              </div>
              <button className="px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-md text-xs transition-colors">
                Copy
              </button>
            </div>
            <div className="mt-3 p-2 bg-card rounded border border-border font-mono text-xs text-muted-foreground overflow-x-auto">
              <pre>CNAME app.yourdomain.com sendora-app.vercel.app</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Link Section */}
      <div className="theme-card p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-lg font-medium">Booking Link</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="booking-link" className="block text-sm font-medium mb-2">
              Calendar Booking URL
            </label>
            <div className="flex">
              <div className="relative flex-1">
                <Link className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="url"
                  id="booking-link"
                  placeholder="https://calendly.com/your-link"
                  className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  value={bookingLink}
                  onChange={(e) => setBookingLink(e.target.value)}
                />
              </div>
              <button
                className="ml-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors"
                onClick={handleSaveBookingLink}
              >
                Save
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Paste in your booking link. We'll share this with users when they show interest and are ready to hop on a
              call.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-Account Management Section */}
      <div className="theme-card p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-lg font-medium">Sub-Account Management</h2>
        </div>

        {/* Sub-Account Controls */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search sub-accounts..."
                className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-lg text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => openTransferModal()}
              className="flex items-center gap-1.5 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Transfer Credits</span>
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Sub-Account</span>
            </button>
          </div>
        </div>

        {/* Sub-Accounts Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      <span>Email Prospects</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>Call Credits</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredSubAccounts.length > 0 ? (
                  filteredSubAccounts.map((account) => (
                    <tr key={account.id} className="bg-card hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm">{account.name}</td>
                      <td className="px-4 py-3 text-sm">{account.emailCredits.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm">{account.callCredits.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            account.status === "active"
                              ? "bg-[#c8e6c9] text-[#2e7d32] dark:bg-green-900/30 dark:text-green-400"
                              : "bg-[#e6dfc8] text-[#b3a742] dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {account.status === "active" ? "Active" : "Paused"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{account.lastActive}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="p-1 text-muted-foreground hover:text-foreground"
                            title={account.status === "active" ? "Pause account" : "Activate account"}
                            onClick={() => openPauseModal(account)}
                          >
                            {account.status === "active" ? (
                              <PauseCircle className="w-4 h-4" />
                            ) : (
                              <PlayCircle className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            className="p-1 text-red-500 hover:text-red-600"
                            title="Delete sub-account"
                            onClick={() => openDeleteModal(account)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      {searchQuery ? (
                        <div>
                          <p>No sub-accounts match your search</p>
                          <button
                            onClick={() => {
                              setSearchQuery("")
                            }}
                            className="text-sm text-primary hover:underline mt-1"
                          >
                            Clear search
                          </button>
                        </div>
                      ) : (
                        <p>No sub-accounts created yet</p>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-3">
          Sub-accounts allow you to create separate workspaces with their own credits and settings.
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors">
          Save Changes
        </button>
      </div>

      {/* Modals */}
      <CreateSubAccountModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateSubAccount={handleCreateSubAccount}
        availableEmailCredits={mainAccount.emailCredits}
        availableCallCredits={mainAccount.callCredits}
      />

      <TransferCreditsModal
        isOpen={isTransferModalOpen}
        onClose={() => {
          setIsTransferModalOpen(false)
          setSelectedAccount(null)
        }}
        onTransferCredits={handleTransferCredits}
        accounts={subAccounts}
        selectedAccountId={selectedAccount?.id.toString()}
        mainAccount={mainAccount}
      />

      <ConfirmActionModal
        isOpen={isPauseModalOpen}
        onClose={() => {
          setIsPauseModalOpen(false)
          setSelectedAccount(null)
        }}
        onConfirm={handleToggleAccountStatus}
        title={selectedAccount?.status === "active" ? "Pause Sub-Account" : "Activate Sub-Account"}
        description={
          selectedAccount?.status === "active"
            ? `Are you sure you want to pause ${selectedAccount?.name}? This will temporarily disable all functionality for this sub-account.`
            : `Are you sure you want to activate ${selectedAccount?.name}? This will restore all functionality for this sub-account.`
        }
        confirmText={selectedAccount?.status === "active" ? "Pause Account" : "Activate Account"}
      />

      <ConfirmActionModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedAccount(null)
        }}
        onConfirm={handleDeleteAccount}
        title="Delete Sub-Account"
        description={`Are you sure you want to delete ${selectedAccount?.name}? This action cannot be undone. All remaining credits will be returned to your main account.`}
        confirmText="Delete Account"
        variant="destructive"
      />
    </div>
  )
}
