"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, X, Eye, Edit3, FileText, Target, Zap, DollarSign } from "lucide-react"
import { countWords } from "@/lib/utils"
import type { Page } from "@/types"
import { useRouter } from "next/navigation" // Import useRouter

interface PageEditorProps {
  page: Page
  onSave: (updatedPage: Page) => void
  onCancel: () => void
}

export function PageEditor({ page, onSave, onCancel }: PageEditorProps) {
  const [editedPage, setEditedPage] = useState<Page>(page)
  const [hasChanges, setHasChanges] = useState(false)
  const [activeTab, setActiveTab] = useState("hero")
  const router = useRouter() // Initialize useRouter

  // Get original data or create empty structure
  const originalData = (editedPage as any).originalData || {}

  useEffect(() => {
    const hasChanged = JSON.stringify(editedPage) !== JSON.stringify(page)
    setHasChanges(hasChanged)
  }, [editedPage, page])

  const updateOriginalData = (section: string, data: any) => {
    const newOriginalData = { ...originalData, [section]: data }
    setEditedPage({
      ...editedPage,
      originalData: newOriginalData,
    } as any)
  }

  const handleSave = () => {
    const updatedPage = {
      ...editedPage,
      updatedAt: new Date(),
      wordCount: countWords(editedPage.content),
    }

    console.log("💾 Saving page with ORIGINAL JSON STRUCTURE:", {
      title: updatedPage.title,
      originalData: (updatedPage as any).originalData,
    })

    onSave(updatedPage)
  }

  const handleCancel = () => {
    if (hasChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        onCancel()
      }
    } else {
      onCancel()
    }
  }

  // Handle view page navigation
  const handleViewPage = (pageSlug: string) => {
    router.push(`https://offer.sendora.ai/pages/${pageSlug}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Page Sections</h1>
          {/* Removed status badge */}
          {/* Removed JSON Structure Preserved text */}
          {/* Removed auto-save status */}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleViewPage(editedPage.slug)}>
            <Eye className="mr-2 h-4 w-4" />
            View Page
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges} className="bg-blue-600 hover:bg-blue-700">
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Multi-Section Editor */}
      <Card className="border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-slate-100 dark:bg-slate-700 flex-wrap h-auto">
              <TabsTrigger value="hero" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Hero Section
              </TabsTrigger>
              {/* Removed Reviews Tab */}
              <TabsTrigger value="pricing" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Pricing
              </TabsTrigger>
              <TabsTrigger value="growth" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Growth Steps
              </TabsTrigger>
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <Edit3 className="h-4 w-4" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="json" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Raw JSON
              </TabsTrigger>
              {/* Removed Preview Tab */}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab}>
            {/* Hero Section Editor */}
            <TabsContent value="hero" className="space-y-4">
              <h3 className="text-lg font-semibold">Hero Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Tagline</label>
                  <Input
                    value={originalData.hero?.tagline || ""}
                    onChange={(e) =>
                      updateOriginalData("hero", {
                        ...originalData.hero,
                        tagline: e.target.value,
                      })
                    }
                    placeholder="Main headline"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Client Name</label>
                  <Input
                    value={originalData.hero?.clientName || ""}
                    onChange={(e) =>
                      updateOriginalData("hero", {
                        ...originalData.hero,
                        clientName: e.target.value,
                      })
                    }
                    placeholder="Client name"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={originalData.hero?.description || ""}
                  onChange={(e) =>
                    updateOriginalData("hero", {
                      ...originalData.hero,
                      description: e.target.value,
                    })
                  }
                  className="min-h-[120px]"
                  placeholder="Hero description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Target Appointments</label>
                  <Input
                    type="number"
                    value={originalData.hero?.targetAppointments || ""}
                    onChange={(e) =>
                      updateOriginalData("hero", {
                        ...originalData.hero,
                        targetAppointments: Number.parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Current Appointments</label>
                  <Input
                    type="number"
                    value={originalData.hero?.currentAppointments || ""}
                    onChange={(e) =>
                      updateOriginalData("hero", {
                        ...originalData.hero,
                        currentAppointments: Number.parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
            </TabsContent>

            {/* Removed Reviews Editor */}

            {/* Pricing Editor */}
            <TabsContent value="pricing" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Pricing Options</h3>
                <Button
                  onClick={() => {
                    const newOption = {
                      title: "",
                      subtitle: "",
                      description: "",
                      features: [],
                      paymentSummary: "",
                      highlight: false,
                      badge: null,
                      bottomNote: "",
                    }
                    updateOriginalData("pricingOptions", [...(originalData.pricingOptions || []), newOption])
                  }}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add Pricing Option
                </Button>
              </div>
              {(originalData.pricingOptions || []).map((option: any, index: number) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={option.title || ""}
                        onChange={(e) => {
                          const newOptions = [...(originalData.pricingOptions || [])]
                          newOptions[index] = { ...option, title: e.target.value }
                          updateOriginalData("pricingOptions", newOptions)
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Subtitle</label>
                      <Input
                        value={option.subtitle || ""}
                        onChange={(e) => {
                          const newOptions = [...(originalData.pricingOptions || [])]
                          newOptions[index] = { ...option, subtitle: e.target.value }
                          updateOriginalData("pricingOptions", newOptions)
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={option.description || ""}
                      onChange={(e) => {
                        const newOptions = [...(originalData.pricingOptions || [])]
                        newOptions[index] = { ...option, description: e.target.value }
                        updateOriginalData("pricingOptions", newOptions)
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm font-medium">Features (one per line)</label>
                    <Textarea
                      value={(option.features || []).join("\n")}
                      onChange={(e) => {
                        const newOptions = [...(originalData.pricingOptions || [])]
                        newOptions[index] = {
                          ...option,
                          features: e.target.value.split("\n").filter((f) => f.trim()),
                        }
                        updateOriginalData("pricingOptions", newOptions)
                      }}
                      className="min-h-[120px]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={option.highlight || false}
                          onChange={(e) => {
                            const newOptions = [...(originalData.pricingOptions || [])]
                            newOptions[index] = { ...option, highlight: e.target.checked }
                            updateOriginalData("pricingOptions", newOptions)
                          }}
                        />
                        Highlight
                      </label>
                      <div>
                        <label className="text-sm font-medium">Badge</label>
                        <Input
                          value={option.badge || ""}
                          onChange={(e) => {
                            const newOptions = [...(originalData.pricingOptions || [])]
                            newOptions[index] = { ...option, badge: e.target.value || null }
                            updateOriginalData("pricingOptions", newOptions)
                          }}
                          placeholder="RECOMMENDED"
                          className="w-32"
                        />
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const newOptions = [...(originalData.pricingOptions || [])]
                        newOptions.splice(index, 1)
                        updateOriginalData("pricingOptions", newOptions)
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Growth Steps Editor */}
            <TabsContent value="growth" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Growth System Steps</h3>
                <Button
                  onClick={() => {
                    const newStep = {
                      title: "",
                      description: "",
                      icon: "TrendingUp",
                      gradient: "from-blue-600 to-purple-600",
                    }
                    updateOriginalData("growthSystemSteps", [...(originalData.growthSystemSteps || []), newStep])
                  }}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add Step
                </Button>
              </div>
              {(originalData.growthSystemSteps || []).map((step: any, index: number) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={step.title || ""}
                        onChange={(e) => {
                          const newSteps = [...(originalData.growthSystemSteps || [])]
                          newSteps[index] = { ...step, title: e.target.value }
                          updateOriginalData("growthSystemSteps", newSteps)
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Icon</label>
                      <Input
                        value={step.icon || ""}
                        onChange={(e) => {
                          const newSteps = [...(originalData.growthSystemSteps || [])]
                          newSteps[index] = { ...step, icon: e.target.value }
                          updateOriginalData("growthSystemSteps", newSteps)
                        }}
                        placeholder="TrendingUp"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={step.description || ""}
                      onChange={(e) => {
                        const newSteps = [...(originalData.growthSystemSteps || [])]
                        newSteps[index] = { ...step, description: e.target.value }
                        updateOriginalData("growthSystemSteps", newSteps)
                      }}
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Gradient</label>
                      <Input
                        value={step.gradient || ""}
                        onChange={(e) => {
                          const newSteps = [...(originalData.growthSystemSteps || [])]
                          newSteps[index] = { ...step, gradient: e.target.value }
                          updateOriginalData("growthSystemSteps", newSteps)
                        }}
                        placeholder="from-blue-600 to-purple-600"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const newSteps = [...(originalData.growthSystemSteps || [])]
                        newSteps.splice(index, 1)
                        updateOriginalData("growthSystemSteps", newSteps)
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Basic Info Editor */}
            <TabsContent value="basic" className="space-y-6">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
                <Input
                  value={editedPage.title}
                  onChange={(e) => setEditedPage({ ...editedPage, title: e.target.value })}
                  className="mt-1 border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">End Result Quote</label>
                <Textarea
                  value={originalData.endResultQuote || ""}
                  onChange={(e) => updateOriginalData("endResultQuote", e.target.value)}
                  className="mt-1 min-h-[120px] border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tags (comma-separated)</label>
                <Input
                  value={editedPage.tags.join(", ")}
                  onChange={(e) =>
                    setEditedPage({
                      ...editedPage,
                      tags: e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                    })
                  }
                  className="mt-1 border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
                  <select
                    value={editedPage.status}
                    onChange={(e) =>
                      setEditedPage({
                        ...editedPage,
                        status: e.target.value as Page["status"],
                      })
                    }
                    className="mt-1 w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Slug</label>
                  <Input
                    value={editedPage.slug}
                    onChange={(e) => setEditedPage({ ...editedPage, slug: e.target.value })}
                    className="mt-1 border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Raw JSON Editor */}
            <TabsContent value="json" className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Raw JSON Data (Advanced)
                </label>
                <Textarea
                  value={JSON.stringify(originalData, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value)
                      setEditedPage({
                        ...editedPage,
                        originalData: parsed,
                      } as any)
                    } catch (error) {
                      // Invalid JSON, don't update
                    }
                  }}
                  className="mt-1 min-h-[400px] border-slate-200 dark:border-slate-700 font-mono text-sm"
                />
              </div>
            </TabsContent>

            {/* Removed Preview Tab */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
