"use client"

import type React from "react"

import {
  Rocket,
  BarChart3,
  Target,
  PieChart,
  MessageSquare,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

// Import the settings popup component
import { SettingsPopup } from "./settings-popup"
import { useRef, useState, useEffect } from "react"
import { SubaccountDropdown } from "./subaccount-dropdown"
import { CompanyLogo } from "./company-logo"

// Update the Sidebar component to include the settings popup
export default function Sidebar() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [isSettingsPopupOpen, setIsSettingsPopupOpen] = useState(false)
  const profileButtonRef = useRef<HTMLButtonElement>(null)

  // Close settings popup when pathname changes (navigation occurs)
  useEffect(() => {
    setIsSettingsPopupOpen(false)
  }, [pathname])

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isSettingsPopupOpen) setIsSettingsPopupOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [isSettingsPopupOpen])

  return (
    <div className="w-56 h-full bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))] flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center">
        <CompanyLogo name="Sendora" className="mr-2" />
        <span className="text-lg font-bold text-foreground">Sendora</span>
      </div>

      {/* Organization Selector */}
      <div className="px-3 py-2 mb-3">
        <SubaccountDropdown />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2">
        {/* Main Section */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-1.5 px-3">MAIN</p>
          <nav className="space-y-1">
            <SidebarNavItem
              href="/launchpad"
              icon={<Rocket className="w-4 h-4" />}
              label="Launchpad"
              active={pathname === "/launchpad"}
            />
            <SidebarNavItem
              href="/dashboard"
              icon={<BarChart3 className="w-4 h-4" />}
              label="Dashboard"
              active={pathname === "/dashboard"}
            />
            <SidebarNavItem
              href="/campaigns"
              icon={<Calendar className="w-4 h-4" />}
              label="Campaigns"
              active={pathname === "/campaigns" || pathname.startsWith("/campaigns/")}
            />
            <SidebarNavItem
              href="/ai-agents"
              icon={<Target className="w-4 h-4" />}
              label="AI Agents"
              active={pathname === "/ai-agents" || pathname.startsWith("/ai-agents/")}
            />
          </nav>
        </div>

        {/* Sales Section */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-1.5 px-3">SALES</p>
          <nav className="space-y-1">
            <SidebarNavItem
              href="/sales-pipeline"
              icon={<PieChart className="w-4 h-4" />}
              label="Sales Pipeline"
              active={pathname === "/sales-pipeline" || pathname.startsWith("/sales-pipeline/")}
            />
            <SidebarNavItem
              href="/conversations"
              icon={<MessageSquare className="w-4 h-4" />}
              label="Conversations"
              active={pathname === "/conversations"}
            />
          </nav>
        </div>

        {/* Resources Section (renamed from Connect) */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-1.5 px-3">RESOURCES</p>
          <nav className="space-y-1">
            <SidebarNavItem
              href="/knowledge-base"
              icon={<BookOpen className="w-4 h-4" />}
              label="Knowledge Base"
              active={pathname === "/knowledge-base"}
            />
            <SidebarNavItem
              href="/email-accounts"
              icon={<Mail className="w-4 h-4" />}
              label="Email Accounts"
              active={pathname === "/email-accounts"}
            />
            <SidebarNavItem
              href="/phone-numbers"
              icon={<Phone className="w-4 h-4" />}
              label="Phone Numbers"
              active={pathname === "/phone-numbers"}
            />
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[hsl(var(--sidebar-border))]">
        <div className="flex gap-2 mb-3">
          {/* Email Credits */}
          <div className={`flex-1 rounded-md ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
            <div className="flex items-center justify-between px-3 py-2">
              <Mail className={`w-4 h-4 ${isDark ? "text-gray-300" : "text-gray-600"}`} />
              <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>0</span>
            </div>
          </div>

          {/* Call Credits */}
          <div className={`flex-1 rounded-md ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
            <div className="flex items-center justify-between px-3 py-2">
              <Phone className={`w-4 h-4 ${isDark ? "text-gray-300" : "text-gray-600"}`} />
              <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>0</span>
            </div>
          </div>
        </div>

        {/* User Profile Section - Replaces Settings Button */}
        <div className="px-2">
          <button
            ref={profileButtonRef}
            onClick={(e) => {
              e.stopPropagation() // Prevent event bubbling
              setIsSettingsPopupOpen(!isSettingsPopupOpen)
            }}
            className="w-full flex items-center gap-3 p-2 rounded-md transition-all hover:bg-[hsl(var(--sidebar-hover-bg))]"
            aria-haspopup="true"
            aria-expanded={isSettingsPopupOpen}
          >
            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold">AJ</span>
            </div>

            {/* User Info */}
            <div className="flex-1 overflow-hidden text-left">
              <p className="text-sm font-medium text-foreground truncate">Aaroh Jain</p>
              <p className="text-xs text-muted-foreground truncate">aarohjain06@gmail.com</p>
            </div>

            {/* Indicator - Fixed direction */}
            <ChevronRight
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isSettingsPopupOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Settings Popup */}
      <SettingsPopup
        isOpen={isSettingsPopupOpen}
        onClose={() => setIsSettingsPopupOpen(false)}
        anchorRef={profileButtonRef}
      />
    </div>
  )
}

interface SidebarNavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}

function SidebarNavItem({ href, icon, label, active = false }: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-3 py-2 rounded-md transition-all ${
        active
          ? "bg-[hsl(var(--sidebar-active-bg))] text-[hsl(var(--sidebar-active-fg))]"
          : "text-muted-foreground hover:bg-[hsl(var(--sidebar-hover-bg))] hover:text-foreground"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className={active ? "text-[hsl(var(--sidebar-active-fg))]" : "text-muted-foreground"}>{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      {active && <ChevronRight className="w-3.5 h-3.5 text-[hsl(var(--sidebar-active-fg))]" />}
    </Link>
  )
}
