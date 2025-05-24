"use client"

import { useState, useEffect } from "react"
import { Copy, MoreVertical, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes"

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
}

export default function ApiKeysPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure we only access theme after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Dashboard Integration",
      key: "sk_live_•••••••••••••••••••••••••••••",
      createdAt: "2023-11-15T10:30:00Z",
    },
  ])

  const [newKeyName, setNewKeyName] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return

    // Generate a mock API key
    const newKey = `sk_live_${Array(32)
      .fill(0)
      .map(() => Math.random().toString(36).charAt(2))
      .join("")}`

    const newApiKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk_live_${"•".repeat(32)}`,
      createdAt: new Date().toISOString(),
    }

    // Add the new key to the list
    setApiKeys([...apiKeys, newApiKey])

    // Copy the key to clipboard
    navigator.clipboard.writeText(newKey)

    // Show a toast notification
    toast({
      title: "API Key Created",
      description: "The API key has been copied to your clipboard.",
    })

    // Reset and close the modal
    setNewKeyName("")
    setIsCreateModalOpen(false)
  }

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id))
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "Copied to clipboard",
      description: "The API key has been copied to your clipboard.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  if (!mounted) {
    return null // Avoid rendering with incorrect theme
  }

  const isDark = theme === "dark"

  return (
    <div className={`pl-8 pr-8 py-6 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>API Keys</h1>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className={`h-9 px-4 rounded-md ${isDark ? "bg-black text-white border border-gray-800 hover:bg-gray-900" : ""}`}
          variant={isDark ? "default" : "outline"}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Create API Key Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`rounded-lg w-full max-w-md relative ${isDark ? "bg-gray-900" : "bg-white"}`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"}`}>Add an API Key</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className={isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}>
                  Name this key
                </label>
                <Input
                  placeholder="e.g. Development"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className={`w-[400px] border-2 border-blue-500 rounded-md h-10 ${isDark ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                  style={{ width: "400px" }}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  className={`h-9 px-4 rounded-md ${isDark ? "border-gray-700 text-white hover:bg-gray-800" : ""}`}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateKey}
                  className={`h-9 px-4 rounded-md ${isDark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"}`}
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Keys Table */}
      <div
        className={`rounded-md border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
      >
        <div
          className={`grid grid-cols-12 py-4 px-6 border-b font-medium text-sm ${isDark ? "text-white border-gray-800" : "text-black border-gray-200"}`}
        >
          <div className="col-span-4">Name</div>
          <div className="col-span-5">Key Value</div>
          <div className="col-span-2">Last Edited</div>
          <div className="col-span-1"></div>
        </div>

        {apiKeys.length === 0 ? (
          <div className={`p-8 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            No API keys found. Create your first API key to get started.
          </div>
        ) : (
          apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className={`grid grid-cols-12 py-4 px-6 border-b last:border-0 items-center text-sm ${isDark ? "border-gray-800" : "border-gray-200"}`}
            >
              <div className={`col-span-4 font-medium ${isDark ? "text-white" : "text-black"}`}>{apiKey.name}</div>
              <div className={`col-span-5 font-mono flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}>
                {apiKey.key}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}
                  onClick={() => handleCopyKey(apiKey.key)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className={`col-span-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {formatDate(apiKey.createdAt)}
              </div>
              <div className="col-span-1 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className={isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}
                  >
                    <DropdownMenuItem
                      className={`${isDark ? "text-red-400 focus:text-red-400" : "text-red-600 focus:text-red-600"}`}
                      onClick={() => handleDeleteKey(apiKey.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
