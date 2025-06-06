import type { Metadata } from "next"
import { PageLayout } from "@/components/layouts/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Book, Code, FileText, Lightbulb, MessageSquare, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Documentation | TheLUX Chat",
  description:
    "Comprehensive documentation for TheLUX Chat - guides, tutorials, API references, and best practices for building exceptional AI chatbots.",
  openGraph: {
    title: "Documentation | TheLUX Chat",
    description:
      "Comprehensive documentation for TheLUX Chat - guides, tutorials, API references, and best practices for building exceptional AI chatbots.",
    url: "https://theluxchat.com/documentation",
    type: "website",
  },
}

export default function DocumentationPage() {
  const docCategories = [
    {
      title: "Getting Started",
      description: "Everything you need to start building with TheLUX Chat",
      icon: <Zap className="h-8 w-8 text-primary" />,
      links: [
        { title: "Quick Start Guide", href: "/documentation/quick-start" },
        { title: "Platform Overview", href: "/documentation/platform-overview" },
        { title: "Creating Your First Chatbot", href: "/documentation/first-chatbot" },
        { title: "Understanding the Dashboard", href: "/documentation/dashboard" },
      ],
    },
    {
      title: "Guides & Tutorials",
      description: "Step-by-step instructions for common tasks",
      icon: <Book className="h-8 w-8 text-primary" />,
      links: [
        { title: "Building Conversation Flows", href: "/documentation/conversation-flows" },
        { title: "Integrating with Your Website", href: "/documentation/website-integration" },
        { title: "Setting Up Knowledge Base", href: "/documentation/knowledge-base" },
        { title: "Training Your Chatbot", href: "/documentation/training" },
      ],
    },
    {
      title: "API Reference",
      description: "Detailed documentation for our REST API",
      icon: <Code className="h-8 w-8 text-primary" />,
      links: [
        { title: "Authentication", href: "/documentation/api/authentication" },
        { title: "Chatbot Management", href: "/documentation/api/chatbots" },
        { title: "Conversations", href: "/documentation/api/conversations" },
        { title: "Analytics", href: "/documentation/api/analytics" },
      ],
    },
    {
      title: "SDKs & Libraries",
      description: "Official client libraries for popular languages",
      icon: <FileText className="h-8 w-8 text-primary" />,
      links: [
        { title: "JavaScript SDK", href: "/documentation/sdk/javascript" },
        { title: "Python SDK", href: "/documentation/sdk/python" },
        { title: "React Components", href: "/documentation/sdk/react" },
        { title: "Mobile SDKs", href: "/documentation/sdk/mobile" },
      ],
    },
    {
      title: "Best Practices",
      description: "Tips and recommendations for optimal results",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      links: [
        { title: "Conversation Design", href: "/documentation/best-practices/conversation-design" },
        { title: "Chatbot Personality", href: "/documentation/best-practices/personality" },
        { title: "Error Handling", href: "/documentation/best-practices/error-handling" },
        { title: "Performance Optimization", href: "/documentation/best-practices/performance" },
      ],
    },
    {
      title: "Support & Community",
      description: "Get help and connect with other developers",
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      links: [
        { title: "FAQs", href: "/documentation/faqs" },
        { title: "Community Forum", href: "https://community.theluxchat.com" },
        { title: "Support Tickets", href: "/support" },
        { title: "Release Notes", href: "/documentation/releases" },
      ],
    },
  ]

  return (
    <PageLayout
      title="Documentation"
      description="Everything you need to build, deploy, and optimize your AI chatbots with TheLUX Chat."
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {docCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="mb-4">{category.icon}</div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      {link.title}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Popular Documentation</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">
              <Link href="/documentation/quick-start" className="hover:text-primary hover:underline">
                Quick Start Guide
              </Link>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get up and running with TheLUX Chat in less than 10 minutes. This guide covers account setup, creating
              your first chatbot, and deploying it to your website.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">
              <Link href="/documentation/api/authentication" className="hover:text-primary hover:underline">
                API Authentication
              </Link>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Learn how to authenticate with the TheLUX Chat API using API keys, OAuth, or JWT tokens. Includes code
              examples for various programming languages.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">
              <Link href="/documentation/knowledge-base" className="hover:text-primary hover:underline">
                Knowledge Base Integration
              </Link>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect your chatbot to your existing knowledge base to provide accurate, consistent answers to customer
              questions without manual programming.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">
              <Link href="/documentation/sdk/react" className="hover:text-primary hover:underline">
                React Components
              </Link>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Easily integrate TheLUX Chat into your React applications with our official React components. Includes
              customization options and theming.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 rounded-lg border bg-card p-8">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left">
          <div className="md:flex-1">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Need help with implementation?</h2>
            <p className="mt-4 text-muted-foreground">
              Our team of experts is ready to help you implement TheLUX Chat in your business. Schedule a consultation
              to discuss your specific needs and get personalized guidance.
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:ml-6">
            <Link href="/contact">
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Schedule Consultation
              </button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

