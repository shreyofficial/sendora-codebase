"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Settings, Users, CreditCard, Palette, HelpCircle, ChevronRight, Key } from "lucide-react"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Settings Sidebar */}
      <div className="w-56 h-full bg-card/50 border-r border-border flex flex-col">
        {/* Back to Home */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 p-3 m-2 rounded-md hover:bg-secondary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="text-sm font-medium">Home</span>
        </Link>

        <div className="px-2 mt-2">
          <nav className="space-y-1">
            <SettingsNavItem
              href="/settings/general"
              icon={<Settings className="w-4 h-4" />}
              label="General Settings"
              active={pathname === "/settings/general"}
            />
            <SettingsNavItem
              href="/settings/api-keys"
              icon={<Key className="w-4 h-4" />}
              label="API Keys"
              active={pathname === "/settings/api-keys"}
            />
            <SettingsNavItem
              href="/settings/members"
              icon={<Users className="w-4 h-4" />}
              label="Members"
              active={pathname === "/settings/members"}
            />
            <SettingsNavItem
              href="/settings/billing"
              icon={<CreditCard className="w-4 h-4" />}
              label="Billing"
              active={pathname === "/settings/billing"}
            />
            <SettingsNavItem
              href="/settings/whitelabel"
              icon={<Palette className="w-4 h-4" />}
              label="Whitelabel"
              active={pathname === "/settings/whitelabel"}
            />
            <SettingsNavItem
              href="/settings/support"
              icon={<HelpCircle className="w-4 h-4" />}
              label="Support"
              active={pathname === "/settings/support"}
            />
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}

interface SettingsNavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}

function SettingsNavItem({ href, icon, label, active = false }: SettingsNavItemProps) {
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
