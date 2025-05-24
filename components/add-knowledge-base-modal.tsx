"use client"

import type React from "react"
import { useState } from "react"
import { AlertCircle, Upload, X, FileText, File, FileQuestion, Mail, Phone } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useToast } from "@/hooks/use-toast"

interface AddKnowledgeBaseModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddKnowledgeBaseModal({ isOpen, onClose }: AddKnowledgeBaseModalProps) {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  // Add state for tracking the selected usage type
  const [usageType, setUsageType] = useState<"calls" | "emails">("emails")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Name is required")
      return
    }

    if (!file) {
      setError("File is required")
      return
    }

    // Simulate API call
    toast({
      title: "Knowledge Base Added",
      description: `Your knowledge base "${name}" has been added successfully`,
      variant: "success",
    })
    onClose()
  }

  const getFileIcon = () => {
    if (!file) return <FileQuestion className="w-6 h-6" />

    const extension = file.name.split(".").pop()?.toLowerCase()

    switch (extension) {
      case "pdf":
        return <FileText className="w-6 h-6" />
      case "doc":
      case "docx":
        return <FileText className="w-6 h-6" />
      case "txt":
        return <File className="w-6 h-6" />
      default:
        return <FileQuestion className="w-6 h-6" />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div
        className={`w-full max-w-lg ${theme === "dark" ? "bg-card" : "bg-white"} rounded-xl shadow-lg overflow-hidden`}
      >
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="text-xl font-semibold">Upload Knowledge Base</h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full ${
              theme === "dark" ? "hover:bg-muted/50" : "hover:bg-gray-100"
            } transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError(null)
              }}
              placeholder="e.g., Sales Playbook, Product Documentation"
              className={`w-full p-3 rounded-lg transition-all ${
                theme === "dark"
                  ? "bg-background border border-border focus:border-primary"
                  : "bg-white border border-gray-200 focus:border-blue-400"
              } focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-primary/20" : "focus:ring-blue-100"}`}
            />
            {error === "Name is required" && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                Name is required
              </p>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                isDragging
                  ? theme === "dark"
                    ? "border-primary/70 bg-primary/10"
                    : "border-blue-400 bg-blue-50"
                  : theme === "dark"
                    ? "border-border hover:border-primary/50 bg-background/50"
                    : "border-gray-300 hover:border-blue-300 bg-gray-50"
              } cursor-pointer`}
              onClick={() => document.getElementById("file-input")?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-4">
                <div className={`p-4 rounded-full ${theme === "dark" ? "bg-primary/10" : "bg-blue-100"}`}>
                  <Upload className={`w-8 h-8 ${theme === "dark" ? "text-primary" : "text-blue-600"}`} />
                </div>
                <div>
                  <p className="font-medium text-lg">Drag & drop your file here</p>
                  <p className="text-muted-foreground mt-1">or click to browse</p>
                  <p className={`text-xs mt-4 ${theme === "dark" ? "text-muted-foreground" : "text-gray-500"}`}>
                    Supports PDF, DOCX, TXT, CSV (max. 10MB)
                  </p>
                </div>
              </div>
              <input
                type="file"
                id="file-input"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.docx,.txt,.csv"
              />
            </div>

            {file && (
              <div
                className={`p-4 rounded-lg flex items-center gap-4 ${
                  theme === "dark" ? "bg-primary/10" : "bg-blue-50"
                }`}
              >
                <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-primary/20" : "bg-blue-100"}`}>
                  {getFileIcon()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setFile(null)
                  }}
                  className={`p-2 rounded-full ${theme === "dark" ? "hover:bg-background/80" : "hover:bg-white/80"}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {error === "File is required" && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                File is required
              </p>
            )}
          </div>
        </div>

        {/* Usage Type Selection */}
        <div className="p-6 pt-0 space-y-3">
          <label className="block text-base font-medium">
            I want to use this knowledge base for: <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setUsageType("emails")}
              className={`flex flex-col items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                usageType === "emails"
                  ? theme === "dark"
                    ? "border-primary bg-primary/10"
                    : "border-blue-500 bg-blue-50"
                  : theme === "dark"
                    ? "border-border hover:border-primary/50"
                    : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex flex-col items-center gap-2 w-full">
                <div
                  className={`p-3 rounded-full ${
                    usageType === "emails"
                      ? theme === "dark"
                        ? "bg-primary/20"
                        : "bg-blue-100"
                      : theme === "dark"
                        ? "bg-muted"
                        : "bg-gray-100"
                  }`}
                >
                  <Mail
                    className={`w-6 h-6 ${
                      usageType === "emails"
                        ? theme === "dark"
                          ? "text-primary"
                          : "text-blue-600"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="text-center">
                  <p className="font-medium">Email Campaigns</p>
                  <p className="text-xs text-muted-foreground">For email outreach</p>
                </div>
              </div>
              <div className="mt-3 w-full">
                <span
                  className={`block text-center text-xs font-medium px-2 py-1 rounded ${
                    theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"
                  }`}
                >
                  Free
                </span>
              </div>
            </div>

            <div
              onClick={() => setUsageType("calls")}
              className={`flex flex-col items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                usageType === "calls"
                  ? theme === "dark"
                    ? "border-primary bg-primary/10"
                    : "border-blue-500 bg-blue-50"
                  : theme === "dark"
                    ? "border-border hover:border-primary/50"
                    : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex flex-col items-center gap-2 w-full">
                <div
                  className={`p-3 rounded-full ${
                    usageType === "calls"
                      ? theme === "dark"
                        ? "bg-primary/20"
                        : "bg-blue-100"
                      : theme === "dark"
                        ? "bg-muted"
                        : "bg-gray-100"
                  }`}
                >
                  <Phone
                    className={`w-6 h-6 ${
                      usageType === "calls"
                        ? theme === "dark"
                          ? "text-primary"
                          : "text-blue-600"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="text-center">
                  <p className="font-medium">Call Campaigns</p>
                  <p className="text-xs text-muted-foreground">For voice conversations</p>
                </div>
              </div>
              <div className="mt-3 w-full">
                <span
                  className={`block text-center text-xs font-medium px-2 py-1 rounded ${
                    theme === "dark" ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  10 Credits
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-5 border-t border-border">
          <button
            onClick={onClose}
            className={`px-4 py-2.5 rounded-lg text-sm transition-colors ${
              theme === "dark"
                ? "bg-secondary hover:bg-secondary/80 text-foreground"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2.5 rounded-lg text-sm transition-colors ${
              theme === "dark"
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Add Knowledge Base
          </button>
        </div>
      </div>
    </div>
  )
}
