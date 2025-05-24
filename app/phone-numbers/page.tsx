"use client"

import { Search, Plus, Phone } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Sidebar from "@/components/sidebar"
import EmptyState from "@/components/empty-state"
import AddPhoneNumberModal from "@/components/add-phone-number-modal"

export default function PhoneNumbers() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModalOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Phone Numbers</h1>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 px-4 rounded-md text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Phone Number</span>
              </button>

              {/* Dropdown Menu */}
              {isModalOpen && <AddPhoneNumberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search Phone Numbers..."
              className="w-full bg-background border border-input rounded-lg py-2.5 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Content Area */}
          <div className="theme-card p-6">
            <EmptyState
              icon={<Phone className="w-8 h-8" />}
              title="No phone numbers found"
              description="You haven't added any phone numbers yet."
            />
          </div>
        </div>
      </main>
    </div>
  )
}
