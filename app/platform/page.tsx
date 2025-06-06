import type { Metadata } from "next"
import { PageLayout } from "@/components/layouts/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Platform | TheLUX Chat",
  description:
    "Discover the TheLUX Chat platform - a comprehensive AI chatbot solution for businesses of all sizes. Learn how our platform can transform your customer interactions.",
  openGraph: {
    title: "Platform | TheLUX Chat",
    description:
      "Discover the TheLUX Chat platform - a comprehensive AI chatbot solution for businesses of all sizes. Learn how our platform can transform your customer interactions.",
    url: "https://theluxchat.com/platform",
    type: "website",
  },
}

export default function PlatformPage() {
  return (
    <PageLayout
      title="The Complete AI Chatbot Platform"
      description="TheLUX Chat provides a comprehensive platform for building, deploying, and managing AI-powered chatbots that deliver exceptional customer experiences."
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Intuitive Dashboard</CardTitle>
            <CardDescription>Manage all your chatbots from a single, user-friendly interface</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="TheLUX Chat Dashboard"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Our intuitive dashboard gives you complete control over your chatbots, with real-time analytics,
              conversation logs, and performance metrics all in one place.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Advanced AI Engine</CardTitle>
            <CardDescription>Powered by state-of-the-art language models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="TheLUX Chat AI Engine"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Our advanced AI engine understands natural language, learns from conversations, and continuously improves
              to provide more accurate and helpful responses.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Seamless Integration</CardTitle>
            <CardDescription>Connect with your existing tools and workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="TheLUX Chat Integrations"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Integrate TheLUX Chat with your CRM, help desk, e-commerce platform, and other business tools to create a
              unified customer experience.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Platform Architecture</h2>
        <p className="mt-4 text-muted-foreground">
          TheLUX Chat is built on a scalable, secure, and reliable architecture that ensures optimal performance and
          availability.
        </p>

        <div className="mt-8 rounded-lg border bg-card p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Cloud-Native Infrastructure</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>Deployed on industry-leading cloud providers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>Auto-scaling to handle traffic spikes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>Global CDN for low-latency responses</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>99.9% uptime SLA for enterprise customers</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Security & Compliance</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>SOC 2 Type II certified</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>GDPR and CCPA compliant</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>End-to-end encryption for all data</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>Regular security audits and penetration testing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Platform Capabilities</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-xl font-semibold">Natural Language Processing</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our advanced NLP capabilities allow your chatbot to understand customer intent, extract entities, and
              maintain context throughout conversations.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-xl font-semibold">Multi-Channel Support</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Deploy your chatbot across multiple channels including your website, mobile app, Facebook Messenger,
              WhatsApp, and more.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-xl font-semibold">Analytics & Insights</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Gain valuable insights into customer behavior, conversation patterns, and chatbot performance to
              continuously improve your customer experience.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-xl font-semibold">Human Handoff</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Seamlessly transfer conversations from your chatbot to human agents when needed, with full context and
              conversation history.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

