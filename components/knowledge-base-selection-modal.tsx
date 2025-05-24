"use client"

import { useState } from "react"
import { X, Upload, Sparkles, ArrowRight } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import AddKnowledgeBaseModal from "./add-knowledge-base-modal"
import AIKnowledgeBaseModal from "./ai-knowledge-base-modal"

interface KnowledgeBaseSelectionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function KnowledgeBaseSelectionModal({ isOpen, onClose }: KnowledgeBaseSelectionModalProps) {
  const [selectedOption, setSelectedOption] = useState<"upload" | "ai" | null>(null)
  const { theme } = useTheme()

  if (!isOpen) return null

  const handleOptionSelect = (option: "upload" | "ai") => {
    setSelectedOption(option)
  }

  // If an option is selected, show the appropriate modal
  if (selectedOption === "upload") {
    return (
      <AddKnowledgeBaseModal
        isOpen={true}
        onClose={() => {
          onClose()
          setSelectedOption(null)
        }}
      />
    )
  }

  if (selectedOption === "ai") {
    return (
      <AIKnowledgeBaseModal
        isOpen={true}
        onClose={() => {
          onClose()
          setSelectedOption(null)
        }}
      />
    )
  }

  // Otherwise, show the selection modal
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div
        className={`w-full max-w-lg ${theme === "dark" ? "bg-card" : "bg-white"} rounded-xl shadow-lg overflow-hidden`}
      >
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="text-xl font-semibold">Add Knowledge Base</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${
              theme === "dark" ? "hover:bg-muted/50" : "hover:bg-gray-100"
            } transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-muted-foreground mb-6">Choose how you want to create your knowledge base:</p>

          <div className="grid gap-4">
            {/* Upload Knowledge Base Option */}
            <button
              onClick={() => handleOptionSelect("upload")}
              className={`flex items-center gap-6 p-6 rounded-xl border-2 transition-all text-left group ${
                theme === "dark"
                  ? "border-border hover:border-primary/50 hover:bg-primary/5"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
            >
              <div
                className={`p-4 rounded-xl ${
                  theme === "dark" ? "bg-primary/10" : "bg-blue-100"
                } group-hover:scale-110 transition-transform`}
              >
                <Upload className={`w-8 h-8 ${theme === "dark" ? "text-primary" : "text-blue-600"}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Upload Knowledge Base</h3>
                <p className="text-muted-foreground">
                  Upload existing documents, PDFs, or website links to create your knowledge base.
                </p>
              </div>
              <ArrowRight
                className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${
                  theme === "dark" ? "text-primary" : "text-blue-600"
                }`}
              />
            </button>

            {/* AI Knowledge Base Option */}
            <button
              onClick={() => handleOptionSelect("ai")}
              className={`flex items-center gap-6 p-6 rounded-xl border-2 transition-all text-left group ${
                theme === "dark"
                  ? "border-border hover:border-primary/50 hover:bg-primary/5"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
            >
              <div
                className={`p-4 rounded-xl ${
                  theme === "dark" ? "bg-primary/10" : "bg-blue-100"
                } group-hover:scale-110 transition-transform`}
              >
                <Sparkles className={`w-8 h-8 ${theme === "dark" ? "text-primary" : "text-blue-600"}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Create with AI</h3>
                <p className="text-muted-foreground">
                  Build the perfect knowledge base in just a few minutes using our AI assistant.
                </p>
              </div>
              <ArrowRight
                className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${
                  theme === "dark" ? "text-primary" : "text-blue-600"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
