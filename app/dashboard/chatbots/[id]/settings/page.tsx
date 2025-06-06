import { ChatbotSnapshots } from "@/components/chatbot/snapshots"
import { ChatbotSchedule } from "@/components/chatbot/schedule"

interface ChatbotSettingsPageProps {
  params: {
    id: string
  }
}

export default function ChatbotSettingsPage({ params }: ChatbotSettingsPageProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Chatbot Settings</h1>

      <div className="space-y-8">
        <ChatbotSnapshots chatbotId={params.id} />
        <ChatbotSchedule chatbotId={params.id} />
      </div>
    </div>
  )
}

