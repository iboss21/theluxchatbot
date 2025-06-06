import type React from "react"
import "./globals.css"
import { ThemeProvider } from "../components/theme-provider"
import { AppProvider } from "../src/lib/app-context"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"

// Add an import for the custom styles at the top of the file
import "@/styles/custom-scrollbar.css"

export const metadata: Metadata = {
  title: "LuxChat - Premium Chatbots",
  description: "Create stunning AI chatbots with our 21st.dev-inspired Glassmorphic UI.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="dark">
        <ThemeProvider defaultTheme="dark" attribute="class">
          <AppProvider>
            {children}
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

