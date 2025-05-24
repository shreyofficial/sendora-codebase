"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check, Plus, Search } from "lucide-react"
import { useTheme } from "next-themes"

interface Subaccount {
  id: string
  name: string
  logo?: string
}

// Sample data - in a real app, this would come from an API
const sampleSubaccounts: Subaccount[] = [
  { id: "1", name: "Blackvolution" },
  { id: "2", name: "Acme Corp" },
  { id: "3", name: "Globex Industries" },
  { id: "4", name: "Initech" },
  { id: "5", name: "Umbrella Corporation" },
]

export function SubaccountDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<Subaccount>(sampleSubaccounts[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredAccounts, setFilteredAccounts] = useState(sampleSubaccounts)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Filter accounts based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAccounts(sampleSubaccounts)
    } else {
      const filtered = sampleSubaccounts.filter((account) =>
        account.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredAccounts(filtered)
    }
  }, [searchQuery])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle escape key to close dropdown
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 bg-secondary rounded-md transition-all hover:bg-secondary/80"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-sm text-foreground">{selectedAccount.name}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 w-full mt-1 rounded-md shadow-lg z-50 overflow-hidden border ${
            isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          }`}
          style={{
            animation: "fadeIn 0.15s ease-out forwards",
            maxHeight: "300px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Search Input */}
          <div className={`p-2 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-8 pr-2 py-1.5 text-sm rounded-md ${
                  isDark
                    ? "bg-gray-800 text-gray-100 placeholder:text-gray-500"
                    : "bg-gray-100 text-gray-900 placeholder:text-gray-500"
                }`}
                autoFocus
              />
            </div>
          </div>

          {/* Account List */}
          <div className="overflow-y-auto flex-1">
            <ul role="listbox" className="py-1">
              {filteredAccounts.map((account) => (
                <li key={account.id} role="option" aria-selected={selectedAccount.id === account.id}>
                  <button
                    onClick={() => {
                      setSelectedAccount(account)
                      setIsOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between ${
                      selectedAccount.id === account.id
                        ? isDark
                          ? "bg-gray-800"
                          : "bg-gray-100"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className="text-sm">{account.name}</span>
                    {selectedAccount.id === account.id && <Check className="w-4 h-4 text-primary" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Create New Account Button */}
          <div className={`p-2 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
            <button
              className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-md text-sm ${
                isDark ? "bg-gray-800 hover:bg-gray-700 text-gray-200" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              onClick={() => {
                // In a real app, this would open a modal or navigate to create account page
                alert("Create new subaccount functionality would go here")
                setIsOpen(false)
              }}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Account</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
