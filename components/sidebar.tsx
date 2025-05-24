"use client"

import {
  Rocket,
  BarChart3,
  Target,
  PieChart,
  MessageSquare,
  Mail,
  Phone,
  BookOpen,
  Settings,
  Zap,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-56 h-full bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))] flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center">
        <div className="w-7 h-7 mr-2 bg-primary rounded-full flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-foreground"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>
        <span className="text-lg font-bold text-foreground">Sendora</span>
      </div>

      {/* Organization Selector */}
      <div className="px-3 py-2 mb-3">
        <button className="w-full flex items-center justify-between p-2 bg-secondary rounded-md">
          <span className="text-sm text-foreground">Blackvolution</span>
          <div className="flex flex-col">
            <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground -mt-1" />
          </div>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {/* Main Section */}
        <div className="px-3 mb-3">
          <p className="text-xs text-muted-foreground mb-1.5 px-2">MAIN</p>
          <nav>
            <NavItem href="/launchpad" icon={<Rocket />} label="Launchpad" active={pathname === "/launchpad"} />
            <NavItem href="/dashboard" icon={<BarChart3 />} label="Dashboard" active={pathname === "/dashboard"} />
            <NavItem
              href="/ai-agents"
              icon={<Target />}
              label="AI Agents"
              active={pathname === "/ai-agents" || pathname.startsWith("/ai-agents/")}
              className="z-10 relative"
            />
          </nav>
        </div>

        {/* Sales Section */}
        <div className="px-3 mb-3">
          <p className="text-xs text-muted-foreground mb-1.5 px-2">SALES</p>
          <nav>
            <NavItem
              href="/sales-pipeline"
              icon={<PieChart />}
              label="Sales Pipeline"
              active={pathname === "/sales-pipeline"}
            />
            <NavItem
              href="/conversations"
              icon={<MessageSquare />}
              label="Conversations"
              active={pathname === "/conversations"}
            />
          </nav>
        </div>

        {/* Connect Section */}
        <div className="px-3 mb-3">
          <p className="text-xs text-muted-foreground mb-1.5 px-2">CONNECT</p>
          <nav>
            <NavItem
              href="/email-accounts"
              icon={<Mail />}
              label="Email Accounts"
              active={pathname === "/email-accounts"}
            />
            <NavItem
              href="/phone-numbers"
              icon={<Phone />}
              label="Phone Numbers"
              active={pathname === "/phone-numbers"}
            />
            <NavItem
              href="/knowledge-base"
              icon={<BookOpen />}
              label="Knowledge Base"
              active={pathname === "/knowledge-base"}
            />
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[hsl(var(--sidebar-border))]">
        <div className="mb-3">
          <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 py-1.5 px-3 rounded-md text-sm">
            <Zap className="w-4 h-4" />
            <span>0 Credit</span>
          </button>
        </div>
        <nav>
          <NavItem href="/settings" icon={<Settings />} label="Settings" active={pathname.startsWith("/settings")} />
        </nav>
      </div>
    </div>
  )
}

function NavItem({ href, icon, label, active = false, className = "" }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md mb-1 text-sm 
    ${
      active
        ? "bg-[hsl(var(--sidebar-active-bg))] text-[hsl(var(--sidebar-active-fg))]"
        : "text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--sidebar-hover-bg))]"
    } 
    ${className}`}
    >
      <span className={active ? "text-[hsl(var(--sidebar-active-fg))]" : "text-[hsl(var(--sidebar-fg))]"}>{icon}</span>
      <span>{label}</span>
    </Link>
  )
}

