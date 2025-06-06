import type { Metadata } from "next"
import { Globe, Plus, ArrowRight, Code, Play, CheckCircle, XCircle, Clock } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export const metadata: Metadata = {
  title: "Webhooks | TheLUX.app",
  description: "Manage webhooks for real-time event notifications",
}

export default function WebhooksPage() {
  // This would be fetched from the API in a real implementation
  const webhooks = [
    {
      id: "wh1",
      name: "New Message Handler",
      url: "https://example.com/api/lux-webhook",
      secret: "whsec_Kms9o2X1lP5tBvF3hG7jR8qZ",
      events: ["message.created", "message.completed"],
      status: "active",
      lastTriggered: "10 minutes ago",
      successRate: 98,
    },
    {
      id: "wh2",
      name: "User Analytics",
      url: "https://analytics.myapp.com/webhooks/lux",
      secret: "whsec_7dH2pT6vN8mK1lS3oP5bQ9rX",
      events: ["user.created", "user.action", "chatbot.rating"],
      status: "active",
      lastTriggered: "3 hours ago",
      successRate: 100,
    },
    {
      id: "wh3",
      name: "Failed Conversations",
      url: "https://support.example.com/webhooks/incoming",
      secret: "whsec_2fG7hJ4kL5mN6pQ8rS9tV1xZ",
      events: ["conversation.failed"],
      status: "inactive",
      lastTriggered: "2 days ago",
      successRate: 62,
    },
  ]

  const eventTypes = [
    {
      category: "Messages",
      events: [
        { id: "message.created", description: "Triggered when a new message is created" },
        { id: "message.completed", description: "Triggered when a message response is completed" },
        { id: "message.failed", description: "Triggered when a message fails to process" },
      ],
    },
    {
      category: "Conversations",
      events: [
        { id: "conversation.started", description: "Triggered when a new conversation starts" },
        { id: "conversation.completed", description: "Triggered when a conversation ends successfully" },
        { id: "conversation.failed", description: "Triggered when a conversation fails" },
      ],
    },
    {
      category: "Users",
      events: [
        { id: "user.created", description: "Triggered when a new user is created" },
        { id: "user.action", description: "Triggered when a user performs a significant action" },
      ],
    },
    {
      category: "Chatbots",
      events: [
        { id: "chatbot.created", description: "Triggered when a new chatbot is created" },
        { id: "chatbot.updated", description: "Triggered when a chatbot is updated" },
        { id: "chatbot.rating", description: "Triggered when a chatbot receives a rating" },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Webhooks</h1>
            <p className="text-white/70 mt-1">Receive real-time notifications for events in your application</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-lux-cyan text-black rounded-md hover:bg-lux-cyan/80 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Create Webhook</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Your Webhooks</h2>

              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="glass-card p-4 hover:border-lux-cyan/30 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{webhook.name}</h3>
                        <div className="flex items-center mt-1 text-sm text-white/50">
                          <Globe className="h-4 w-4 mr-1" />
                          <span className="truncate max-w-xs">{webhook.url}</span>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          webhook.status === "active" ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/50"
                        }`}
                      >
                        {webhook.status === "active" ? "Active" : "Inactive"}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {webhook.events.map((event) => (
                        <div key={event} className="px-2 py-1 bg-white/10 rounded-md text-xs">
                          {event}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-between items-center text-sm border-t border-white/10 pt-3">
                      <div className="flex items-center text-white/50">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Last triggered: {webhook.lastTriggered}</span>
                      </div>
                      <div className="flex items-center">
                        {webhook.successRate > 90 ? (
                          <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400 mr-1" />
                        )}
                        <span className={webhook.successRate > 90 ? "text-green-400" : "text-red-400"}>
                          {webhook.successRate}% success
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button className="px-3 py-1 text-xs bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-xs bg-white/10 rounded-md hover:bg-white/20 transition-colors flex items-center">
                        <Play className="h-3 w-3 mr-1" />
                        <span>Test</span>
                      </button>
                      <button className="px-3 py-1 text-xs bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                        Logs
                      </button>
                      {webhook.status === "active" ? (
                        <button className="px-3 py-1 text-xs bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                          Disable
                        </button>
                      ) : (
                        <button className="px-3 py-1 text-xs bg-lux-cyan/20 text-lux-cyan rounded-md hover:bg-lux-cyan/30 transition-colors">
                          Enable
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-card p-4">
              <h2 className="text-lg font-semibold text-white mb-3">Available Events</h2>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {eventTypes.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <h3 className="text-sm font-medium text-white/70">{category.category}</h3>

                    {category.events.map((event) => (
                      <div key={event.id} className="glass-card p-2 hover:bg-white/5 transition-colors">
                        <div className="text-sm font-medium">{event.id}</div>
                        <div className="text-xs text-white/50 mt-1">{event.description}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-4">
              <h2 className="text-lg font-semibold text-white mb-3">Quick Setup</h2>

              <div className="space-y-4">
                <div className="bg-black/30 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">Example Payload</div>
                    <button className="p-1 text-white/50 hover:text-white">
                      <Code className="h-4 w-4" />
                    </button>
                  </div>
                  <pre className="text-xs overflow-x-auto text-white/70 p-2 bg-black/50 rounded-md max-h-40">
                    {`{
  "event": "message.completed",
  "created_at": "2025-03-29T05:42:32Z",
  "data": {
    "id": "msg_1a2b3c4d",
    "conversation_id": "conv_5e6f7g8h",
    "chatbot_id": "bot_9i0j1k2l",
    "type": "ai",
    "content": "Hello! How can I help you today?",
    "metadata": {
      "tokens": 12,
      "model": "gpt-4o"
    }
  }
}`}
                  </pre>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Integration Steps</div>
                  <ol className="space-y-2 text-sm text-white/70">
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-lux-cyan/20 flex items-center justify-center text-xs text-lux-cyan">
                        1
                      </div>
                      <span>Set up an endpoint on your server</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-lux-cyan/20 flex items-center justify-center text-xs text-lux-cyan">
                        2
                      </div>
                      <span>Create a webhook with your endpoint URL</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-lux-cyan/20 flex items-center justify-center text-xs text-lux-cyan">
                        3
                      </div>
                      <span>Verify signatures with your secret key</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-lux-cyan/20 flex items-center justify-center text-xs text-lux-cyan">
                        4
                      </div>
                      <span>Process and respond to events</span>
                    </li>
                  </ol>
                </div>

                <button className="w-full flex items-center justify-center gap-1 py-2 text-sm text-lux-cyan border border-lux-cyan/30 rounded-md hover:bg-lux-cyan/10 transition-colors">
                  <ArrowRight className="h-4 w-4" />
                  <span>View Documentation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

