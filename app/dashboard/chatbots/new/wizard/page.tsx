"use client"

import { ChatbotWizard } from "@/components/chatbot-wizard/wizard"

export default function ChatbotWizardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create a New Chatbot</h1>
      <ChatbotWizard />
    </div>
  )
}

