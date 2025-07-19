"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Loader2, Wand2, Lightbulb, MemoryStickIcon as MagicStick } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PageCreationFormProps {
  onCreatePage: (prompt: string) => Promise<void>
}

export function PageCreationForm({ onCreatePage }: PageCreationFormProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [progress, setProgress] = useState(0)

  const { toast } = useToast()

  const handleGeneratePage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsGenerating(true)
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      // Send prompt to n8n webhook for generation (original functionality)
      console.log("🚀 Sending prompt to n8n webhook for generation:", prompt)

      const generateWebhookResponse = await fetch(
        "https://n8n.closi.tech/webhook/40d4601d-67b6-454f-86ac-264770c0ec6b",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
            timestamp: new Date().toISOString(),
            source: "ai-page-manager-generate",
          }),
        },
      )

      if (!generateWebhookResponse.ok) {
        throw new Error(`Generate Webhook failed: ${generateWebhookResponse.status}`)
      }

      const generateWebhookData = await generateWebhookResponse.json()
      console.log("✅ Generate Webhook response:", generateWebhookData)

      // Call the original onCreatePage function with the prompt
      await onCreatePage(prompt)

      setProgress(100)
      setTimeout(() => {
        setPrompt("")
        setIsGenerating(false)
        setProgress(0)
        toast({ title: "✨ Success", description: "Your AI page has been created!" })
      }, 500)
    } catch (error) {
      console.error("❌ Error during page generation or webhook call:", error)
      setIsGenerating(false)
      setProgress(0)
      toast({ title: "❌ Error", description: "Failed to generate page. Please try again." })
    }

    clearInterval(progressInterval)
  }

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) {
      toast({ title: "💡 Tip", description: "Please enter some text to enhance." })
      return
    }

    setIsEnhancing(true)
    try {
      console.log("✨ Sending prompt to n8n webhook for enhancement:", prompt)
      const enhanceWebhookResponse = await fetch(
        "https://n8n.closi.tech/webhook/cf38d362-0557-43ad-bb82-04b2e365b95a",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            originalPrompt: prompt,
            timestamp: new Date().toISOString(),
            source: "ai-page-manager-enhance",
          }),
        },
      )

      if (!enhanceWebhookResponse.ok) {
        throw new Error(`Enhance Webhook failed: ${enhanceWebhookResponse.status}`)
      }

      const responseData = await enhanceWebhookResponse.json()
      console.log("✅ Enhance Webhook response:", responseData)

      // Assuming the webhook returns the enhanced prompt in a field like 'enhancedPrompt' or 'text'
      // Clean the incoming data: trim whitespace and remove any leading/trailing quotes or unexpected characters
      let enhancedText = responseData.enhancedPrompt || responseData.text || responseData.content || ""
      enhancedText = String(enhancedText)
        .trim()
        .replace(/^["']|["']$/g, "") // Ensure it's a string, trim, remove quotes

      if (enhancedText) {
        setPrompt(enhancedText)
        toast({ title: "🪄 Enhanced!", description: "Your prompt has been magically improved." })
      } else {
        toast({ title: "⚠️ No Enhancement", description: "Webhook returned no enhanced text." })
      }
    } catch (error) {
      console.error("❌ Error enhancing prompt:", error)
      toast({ title: "❌ Error", description: "Failed to enhance prompt. Please try again." })
    } finally {
      setIsEnhancing(false)
    }
  }

  return (
    <Card className="border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl shadow-xl shadow-slate-200/20 dark:shadow-slate-900/20">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-3">
            <Wand2 className="w-4 h-4" />
            AI Content Generator
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">What would you like to create?</h3>
          <p className="text-slate-600 dark:text-slate-400">Describe your content idea and let AI bring it to life</p>
        </div>

        <form onSubmit={handleGeneratePage} className="space-y-6">
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write a comprehensive guide about sustainable web development practices, including best practices, tools, and real-world examples..."
              className="min-h-[120px] max-h-[300px] overflow-y-auto resize-y border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm focus:border-blue-300 dark:focus:border-blue-600 focus:ring-blue-200 dark:focus:ring-blue-800 text-base leading-relaxed"
              disabled={isGenerating || isEnhancing}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500">{prompt.length} chars</span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={handleEnhancePrompt}
              className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
              disabled={!prompt.trim() || isGenerating || isEnhancing}
            >
              {isEnhancing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enhancing...
                </>
              ) : (
                <>
                  <MagicStick className="mr-2 h-5 w-5" />
                  Enhance Prompt
                </>
              )}
            </Button>
          </div>

          {isGenerating && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3 text-blue-600 dark:text-blue-400">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="font-medium">Creating your page... {progress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            disabled={!prompt.trim() || isGenerating || isEnhancing}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Page with AI
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
