"use client"

import { useState } from "react"
import { Settings, Globe, Bell, Lock, Moon, Sun, Monitor } from "lucide-react"
import ThemeSelectorModal from "@/components/theme-selector-modal"
import { useTheme } from "@/components/theme-provider"

export default function GeneralSettingsPage() {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false)
  const { theme } = useTheme()

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="w-4 h-4 text-[hsl(var(--apple-yellow))]" />
      case "dark":
        return <Moon className="w-4 h-4 text-[hsl(var(--apple-blue))]" />
      default:
        return <Monitor className="w-4 h-4 text-[hsl(var(--apple-gray-500))]" />
    }
  }

  const getThemeName = () => {
    switch (theme) {
      case "light":
        return "Light"
      case "dark":
        return "Dark"
      default:
        return "System"
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-5 h-5 text-muted-foreground" />
        <h1 className="text-2xl font-bold">General Settings</h1>
      </div>

      <div className="space-y-6">
        {/* Account Settings */}
        <div className="theme-card p-5 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Account Settings</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Organization Name</label>
                <input
                  type="text"
                  defaultValue="Blackvolution"
                  className="w-full bg-background border border-input rounded-lg py-2 px-3 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Time Zone</label>
                <select className="w-full bg-background border border-input rounded-lg py-2 px-3 text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                  <option>(UTC-08:00) Pacific Time</option>
                  <option>(UTC-05:00) Eastern Time</option>
                  <option>(UTC+00:00) UTC</option>
                  <option>(UTC+01:00) Central European Time</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Website URL</label>
              <div className="flex items-center">
                <div className="bg-secondary p-2 rounded-l-lg border-y border-l border-input">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  type="url"
                  defaultValue="https://blackvolution.com"
                  className="flex-1 bg-background border border-input rounded-r-lg py-2 px-3 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="theme-card p-5 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Appearance</h2>

          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="w-full flex items-center justify-between p-3 bg-background hover:bg-secondary/50 border border-input rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">{getThemeIcon()}</div>
              <div>
                <div className="text-sm font-medium">Theme</div>
                <div className="text-xs text-muted-foreground">{getThemeName()}</div>
              </div>
            </div>
            <div className="text-xs text-[hsl(var(--apple-blue))]">Change</div>
          </button>
        </div>

        {/* Notification Settings */}
        <div className="theme-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-lg font-medium">Notification Settings</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div>
                <div className="text-sm font-medium">Email Notifications</div>
                <div className="text-xs text-muted-foreground">Receive email notifications for important updates</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-[hsl(var(--apple-blue))] peer-focus:ring-1 peer-focus:ring-ring after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div>
                <div className="text-sm font-medium">SMS Notifications</div>
                <div className="text-xs text-muted-foreground">Receive SMS alerts for critical events</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-[hsl(var(--apple-blue))] peer-focus:ring-1 peer-focus:ring-ring after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div>
                <div className="text-sm font-medium">Browser Notifications</div>
                <div className="text-xs text-muted-foreground">Show desktop notifications in your browser</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-[hsl(var(--apple-blue))] peer-focus:ring-1 peer-focus:ring-ring after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="theme-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-lg font-medium">Security Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Two-Factor Authentication</label>
              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <div className="text-sm">Not Enabled</div>
                  <div className="text-xs text-muted-foreground">Add an extra layer of security to your account</div>
                </div>
                <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-xs font-medium transition-colors">
                  Enable
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <button className="px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* Theme Selector Modal */}
      <ThemeSelectorModal isOpen={isThemeModalOpen} onClose={() => setIsThemeModalOpen(false)} />
    </div>
  )
}

