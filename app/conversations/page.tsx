"use client"

import { useState } from "react"
import {
  MessageSquare,
  Search,
  Filter,
  Star,
  Mail,
  Phone,
  User,
  Building,
  Linkedin,
  Globe,
  Paperclip,
  Send,
  MoreHorizontal,
  ChevronDown,
  ArrowLeft,
  Smile,
  Image,
  Calendar,
  X,
  Check,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import EmptyState from "@/components/empty-state"

export default function Conversations() {
  const [activeTab, setActiveTab] = useState("unread")
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messageText, setMessageText] = useState("")
  const [showContactDetails, setShowContactDetails] = useState(true)

  // Sample conversation data
  const sampleConversations = [
    {
      id: 1,
      name: "Alex Johnson",
      company: "Acme Inc.",
      lastMessage: "Thanks for the information. I'll review it and get back to you.",
      time: "10:45 AM",
      unread: true,
      avatar: null,
    },
    {
      id: 2,
      name: "Sarah Williams",
      company: "Tech Solutions",
      lastMessage: "When can we schedule a demo?",
      time: "Yesterday",
      unread: true,
      avatar: null,
    },
    {
      id: 3,
      name: "Michael Brown",
      company: "Global Enterprises",
      lastMessage: "I'm interested in your AI solution. Can you tell me more?",
      time: "Mar 24",
      unread: false,
      avatar: null,
    },
  ]

  // Sample messages for a conversation
  const sampleMessages = [
    {
      id: 1,
      sender: "user",
      text: "Hi Alex, thanks for your interest in our platform!",
      time: "10:30 AM",
      status: "read",
    },
    {
      id: 2,
      sender: "contact",
      text: "Hello! I saw your presentation at the tech conference last week and was impressed with your AI capabilities.",
      time: "10:35 AM",
      status: "read",
    },
    {
      id: 3,
      sender: "user",
      text: "That's great to hear! I'd be happy to give you more information about our AI solutions. What specific features are you most interested in?",
      time: "10:40 AM",
      status: "read",
    },
    {
      id: 4,
      sender: "contact",
      text: "Thanks for the information. I'll review it and get back to you.",
      time: "10:45 AM",
      status: "delivered",
    },
  ]

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, you would add the message to the conversation
      setMessageText("")
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Conversations List Sidebar */}
        <div className="w-72 border-r border-border flex flex-col">
          {/* Header */}
          <div className="p-3 border-b border-border">
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-lg font-bold">Conversations</h1>
              <div className="flex gap-2">
                <button className="p-1 rounded-md hover:bg-secondary transition-colors">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-background border border-input rounded-md py-1.5 pl-8 pr-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border px-2">
            <button
              className={`flex-1 py-1.5 text-sm font-medium ${activeTab === "unread" ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground hover:text-foreground/80"}`}
              onClick={() => setActiveTab("unread")}
            >
              Unread
            </button>
            <button
              className={`flex-1 py-1.5 text-sm font-medium ${activeTab === "starred" ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground hover:text-foreground/80"}`}
              onClick={() => setActiveTab("starred")}
            >
              <div className="flex items-center justify-center gap-1">
                <Star className="w-3 h-3" />
                <span>Starred</span>
              </div>
            </button>
            <button
              className={`flex-1 py-1.5 text-sm font-medium ${activeTab === "all" ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground hover:text-foreground/80"}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {sampleConversations.length > 0 ? (
              sampleConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-2.5 border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors ${conversation.unread ? "bg-secondary/30" : ""}`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center">
                        {conversation.avatar ? (
                          <img
                            src={conversation.avatar || "/placeholder.svg"}
                            alt={conversation.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-4.5 h-4.5 text-muted-foreground" />
                        )}
                      </div>
                      {conversation.unread && (
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate text-sm">{conversation.name}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {conversation.time}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <p className="text-xs text-muted-foreground truncate">{conversation.company}</p>
                      </div>
                      <p className="text-xs text-foreground/80 truncate mt-0.5">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                icon={<MessageSquare className="w-5 h-5" />}
                title="No conversations yet"
                description="Start a new conversation or connect with a lead to begin messaging."
                compact={true}
              />
            )}
          </div>

          {/* Quick Actions */}
          <div className="p-2.5 border-t border-border bg-card/50">
            <button className="w-full py-1.5 px-3 bg-secondary hover:bg-secondary/80 rounded-md text-xs font-medium flex items-center justify-center gap-2 transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>New Conversation</span>
            </button>
          </div>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Conversation Header */}
              <div className="p-2.5 border-b border-border flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    className="p-1 rounded-md hover:bg-secondary transition-colors mr-2 md:hidden"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-2.5">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="font-medium text-sm">{selectedConversation.name}</h2>
                    <p className="text-xs text-muted-foreground">{selectedConversation.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="p-1 rounded-md hover:bg-secondary transition-colors">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-secondary transition-colors">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    className="p-1 rounded-md hover:bg-secondary transition-colors"
                    onClick={() => setShowContactDetails(!showContactDetails)}
                  >
                    <User className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-secondary transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3.5">
                {sampleMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg p-2.5 ${
                        message.sender === "user"
                          ? "bg-[#0066FF] text-white rounded-tr-none"
                          : "bg-secondary text-foreground rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs opacity-70">{message.time}</span>
                        {message.sender === "user" && (
                          <span>
                            {message.status === "read" ? (
                              <Check className="w-2.5 h-2.5 text-white" />
                            ) : (
                              <Check className="w-2.5 h-2.5 text-gray-400" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-2.5 border-t border-border bg-card/50">
                <div className="flex items-end gap-2">
                  <div className="flex-1 bg-background rounded-lg p-2 border border-input">
                    <div className="flex items-center gap-1.5 mb-1">
                      <button className="p-1 rounded hover:bg-secondary transition-colors">
                        <Smile className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1 rounded hover:bg-secondary transition-colors">
                        <Paperclip className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1 rounded hover:bg-secondary transition-colors">
                        <Image className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full bg-transparent border-none outline-none resize-none text-sm text-foreground placeholder-muted-foreground py-1"
                      rows={1}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className={`p-2.5 rounded-full ${
                      messageText.trim() ? "bg-[#0066FF] hover:bg-[#0055DD]" : "bg-secondary"
                    } transition-colors`}
                  >
                    <Send className={`w-4 h-4 ${messageText.trim() ? "text-white" : "text-muted-foreground"}`} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-5 text-center">
              <div>
                <div className="mx-auto w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-3.5">
                  <MessageSquare className="w-7 h-7 text-muted-foreground" />
                </div>
                <h2 className="text-lg font-semibold mb-2">Select a conversation</h2>
                <p className="text-muted-foreground max-w-md text-sm">
                  Choose a conversation from the list or start a new one to begin messaging.
                </p>
                <button className="mt-5 py-1.5 px-3.5 bg-secondary hover:bg-secondary/80 rounded-md text-xs font-medium flex items-center justify-center gap-2 transition-colors mx-auto">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>New Conversation</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Contact Details Sidebar */}
        {showContactDetails && selectedConversation && (
          <div className="w-72 border-l border-border flex flex-col">
            {/* Contact Header */}
            <div className="p-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-9 h-9 bg-secondary rounded-full mr-2.5 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <User className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h2 className="font-medium text-sm">{selectedConversation.name}</h2>
                  <p className="text-xs text-muted-foreground">{selectedConversation.company}</p>
                </div>
              </div>
              <button
                className="p-1 rounded-md hover:bg-secondary transition-colors"
                onClick={() => setShowContactDetails(false)}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Contact Details */}
            <div className="flex-1 p-3 overflow-y-auto">
              <div className="mb-5">
                <h3 className="text-xs font-medium mb-2.5">Contact Information</h3>
                <div className="space-y-2.5">
                  <div className="flex items-start">
                    <Mail className="w-4 h-4 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <div className="text-xs">alex.johnson@acme.com</div>
                      <div className="text-xs text-muted-foreground">Work Email</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-4 h-4 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <div className="text-xs">(555) 123-4567</div>
                      <div className="text-xs text-muted-foreground">Mobile</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Linkedin className="w-4 h-4 text-muted-foreground mr-2 mt-0.5" />
                    <div className="text-xs text-blue-400 underline">LinkedIn Profile</div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="w-4 h-4 text-muted-foreground mr-2 mt-0.5" />
                    <div className="text-xs text-blue-400 underline">acmeinc.com</div>
                  </div>
                  <div className="flex items-start">
                    <Building className="w-4 h-4 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <div className="text-xs">Acme Inc.</div>
                      <div className="text-xs text-muted-foreground">Technology</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-between items-center mb-2.5">
                  <h3 className="text-xs font-medium">Pipeline Stage</h3>
                  <button className="text-xs text-muted-foreground hover:text-foreground">Edit</button>
                </div>
                <div className="p-2.5 bg-secondary rounded-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs">Qualified Lead</span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div className="w-full bg-muted h-1.5 rounded-full">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">New Lead</span>
                    <span className="text-xs text-muted-foreground">Customer</span>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-between items-center mb-2.5">
                  <h3 className="text-xs font-medium">Tags</h3>
                  <button className="text-xs text-muted-foreground hover:text-foreground">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <div className="px-2.5 py-0.5 bg-secondary rounded-full text-xs flex items-center gap-1">
                    <span>Enterprise</span>
                    <X className="w-2.5 h-2.5 text-muted-foreground" />
                  </div>
                  <div className="px-2.5 py-0.5 bg-secondary rounded-full text-xs flex items-center gap-1">
                    <span>High Priority</span>
                    <X className="w-2.5 h-2.5 text-muted-foreground" />
                  </div>
                  <div className="px-2.5 py-0.5 bg-secondary rounded-full text-xs flex items-center gap-1">
                    <span>Tech</span>
                    <X className="w-2.5 h-2.5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <h3 className="text-xs font-medium">Notes</h3>
                  <button className="text-xs text-muted-foreground hover:text-foreground">Save</button>
                </div>
                <textarea
                  placeholder="Add notes about this contact..."
                  className="w-full h-28 bg-background border border-input rounded-lg p-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                ></textarea>
              </div>

              <div className="mt-5">
                <div className="flex justify-between items-center mb-2.5">
                  <h3 className="text-xs font-medium">Activity</h3>
                  <button className="text-xs text-muted-foreground hover:text-foreground">View All</button>
                </div>
                <div className="space-y-2.5">
                  <div className="p-2.5 bg-secondary rounded-lg">
                    <div className="flex items-start">
                      <div className="p-1 bg-muted rounded-md mr-2.5">
                        <Mail className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-medium">Email Sent</span>
                          <span className="text-xs text-muted-foreground">10:30 AM</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Initial outreach email sent to introduce our platform.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 bg-secondary rounded-lg">
                    <div className="flex items-start">
                      <div className="p-1 bg-muted rounded-md mr-2.5">
                        <Calendar className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-medium">Meeting Scheduled</span>
                          <span className="text-xs text-muted-foreground">Yesterday</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Demo call scheduled for next Tuesday at 2 PM.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-2.5 border-t border-border">
              <button className="w-full py-1.5 px-2.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors">
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Meeting</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
