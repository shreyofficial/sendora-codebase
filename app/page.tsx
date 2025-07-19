"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface FormData {
  name: string
  email: string
  phone: string
  website: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  website?: string
  submit?: string
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    website: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation (basic)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    // Website validation (optional but if provided, should be valid)
    if (formData.website.trim()) {
      const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
      if (!urlRegex.test(formData.website)) {
        newErrors.website = "Please enter a valid website URL"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // Prepare data for webhook
      const webhookData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        website: formData.website.trim() || null,
        timestamp: new Date().toISOString(),
        source: "signup-form",
      }

      // Send to n8n webhook
      const response = await fetch("https://n8n.closi.tech/webhook/7e6b0908-6d19-4722-a652-90ebce4ee28d", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Success - redirect to Notion page in new tab
      window.open(
        "https://sendora.notion.site/30-AI-Agents-Guide-2215596e4f9580f6bc10fef7d97e7aca?source=copy_link",
        "_blank",
      )
    } catch (error) {
      console.error("Submission error:", error)
      setErrors({
        submit: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-lg">
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          <CardContent className="p-8 space-y-8">
            {/* Header section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-white tracking-tight">Just One More Step</h1>

              <p className="text-slate-300 text-lg leading-relaxed">
                You're moments away from accessing the ultimate AI Agents Guide. Join thousands of innovators who are
                already transforming their workflows.
              </p>
            </div>

            {/* Form section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-200">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 h-12 text-base ${
                    errors.name ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-200">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 h-12 text-base ${
                    errors.email ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-slate-200">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 h-12 text-base ${
                    errors.phone ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
              </div>

              {/* Website Field */}
              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-medium text-slate-200">
                  Website URL <span className="text-slate-400">(Optional)</span>
                </Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 h-12 text-base ${
                    errors.website ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {errors.website && <p className="text-red-400 text-sm">{errors.website}</p>}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{errors.submit}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Get Your AI Agents Guide"
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center">
              <p className="text-xs text-slate-400">
                By submitting, you agree to receive the AI Agents Guide and occasional updates from Sendora AI. We
                respect your privacy and won't spam you.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Floating elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/20 rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}
