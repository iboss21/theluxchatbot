"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"

export default function EmbedPreview() {
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string

  const position = searchParams.get("position") || "bottom-right"
  const theme = searchParams.get("theme") || "light"
  const primaryColor = searchParams.get("primaryColor") || "#7C3AED"
  const size = searchParams.get("size") || "medium"
  const autoOpen = searchParams.get("autoOpen") === "true"

  const [chatbot, setChatbot] = useState<any>(null)

  useEffect(() => {
    // Fetch chatbot data
    fetch(`/api/chatbots/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setChatbot(data)
      })
      .catch((err) => {
        console.error("Error fetching chatbot:", err)
      })
  }, [id])

  // Size mapping
  const sizeMap = {
    small: { width: 300, height: 400 },
    medium: { width: 350, height: 500 },
    large: { width: 400, height: 600 },
  }

  const { width, height } = sizeMap[size as keyof typeof sizeMap] || sizeMap.medium

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Chatbot Embed Preview</h1>
        <p className="mb-6">
          This is a preview of how your chatbot will appear when embedded on your website. The chatbot will be
          positioned in the <strong>{position}</strong> corner of the screen.
        </p>

        <div className="border rounded-lg p-4 bg-gray-50 mb-6">
          <h2 className="text-lg font-semibold mb-2">Embed Settings</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <strong>Chatbot:</strong> {chatbot?.name || id}
            </li>
            <li>
              <strong>Position:</strong> {position}
            </li>
            <li>
              <strong>Theme:</strong> {theme}
            </li>
            <li>
              <strong>Size:</strong> {size} ({width}x{height}px)
            </li>
            <li>
              <strong>Auto-open:</strong> {autoOpen ? "Yes" : "No"}
            </li>
          </ul>
        </div>

        <div className="relative border rounded-lg h-[500px] bg-gray-200 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">Website content would appear here</p>
          </div>

          {/* Chatbot toggle button */}
          <div
            className="absolute w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
            style={{
              backgroundColor: primaryColor,
              color: "white",
              ...(position === "bottom-right" && { bottom: "20px", right: "20px" }),
              ...(position === "bottom-left" && { bottom: "20px", left: "20px" }),
              ...(position === "top-right" && { top: "20px", right: "20px" }),
              ...(position === "top-left" && { top: "20px", left: "20px" }),
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>

          {/* Chatbot window (shown if autoOpen is true) */}
          {autoOpen && (
            <div
              className="absolute rounded-lg shadow-lg overflow-hidden"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                ...(position === "bottom-right" && { bottom: "20px", right: "20px" }),
                ...(position === "bottom-left" && { bottom: "20px", left: "20px" }),
                ...(position === "top-right" && { top: "20px", right: "20px" }),
                ...(position === "top-left" && { top: "20px", left: "20px" }),
                backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
              }}
            >
              <div
                className="h-12 flex items-center justify-between px-4"
                style={{ backgroundColor: primaryColor, color: "white" }}
              >
                <span className="font-medium">{chatbot?.name || "Chatbot"}</span>
                <button className="p-1 rounded-full hover:bg-black/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="p-4 flex-1 overflow-y-auto" style={{ height: "calc(100% - 96px)" }}>
                <div
                  className="mb-4 max-w-[80%] p-3 rounded-lg"
                  style={{ backgroundColor: `${primaryColor}20`, color: theme === "dark" ? "white" : "black" }}
                >
                  {chatbot?.welcomeMessage || "Hello! How can I help you today?"}
                </div>
              </div>
              <div
                className="h-16 border-t p-2 flex items-center"
                style={{ borderColor: theme === "dark" ? "#333" : "#eee" }}
              >
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 rounded-l-md border-r-0"
                  style={{
                    backgroundColor: theme === "dark" ? "#333" : "#f5f5f5",
                    color: theme === "dark" ? "white" : "black",
                    borderColor: theme === "dark" ? "#444" : "#ddd",
                  }}
                />
                <button className="px-3 py-2 rounded-r-md" style={{ backgroundColor: primaryColor, color: "white" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Note: This is a preview only. The actual embed will be responsive and adapt to your website's design.
        </p>
      </div>
    </div>
  )
}

