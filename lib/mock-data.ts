import type { Page } from "@/types"

export const mockPages: Page[] = [
  {
    id: "1",
    title: "Modern Web Design Trends 2024",
    content:
      "Explore the latest trends in web design including glassmorphism, neumorphism, and minimalist interfaces...",
    prompt: "Write about modern web design trends for 2024",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-16"),
    status: "published",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["design", "web", "trends"],
    wordCount: 1250,
  },
  {
    id: "2",
    title: "AI in Content Creation",
    content: "Artificial intelligence is revolutionizing how we create and manage content across digital platforms...",
    prompt: "Explain how AI is changing content creation",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
    status: "draft",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["ai", "content", "technology"],
    wordCount: 890,
  },
  {
    id: "3",
    title: "Sustainable Technology Solutions",
    content: "Green technology and sustainable practices are becoming essential in modern software development...",
    prompt: "Write about sustainable technology and green computing",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-15"),
    status: "published",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["sustainability", "technology", "environment"],
    wordCount: 1450,
  },
  {
    id: "4",
    title: "Future of Remote Work",
    content: "Remote work continues to evolve with new tools and methodologies shaping the workplace...",
    prompt: "Discuss the future of remote work and digital collaboration",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
    status: "archived",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["remote work", "collaboration", "future"],
    wordCount: 1100,
  },
]

export const promptSuggestions = [
  "Write a comprehensive guide about...",
  "Create an engaging blog post on...",
  "Develop a technical tutorial for...",
  "Compose a marketing copy for...",
  "Generate a product description for...",
  "Write a case study about...",
  "Create educational content on...",
  "Develop a how-to guide for...",
]
