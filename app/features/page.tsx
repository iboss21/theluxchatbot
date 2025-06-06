import type { Metadata } from "next"
import { PageLayout } from "@/components/layouts/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Features | TheLUX Chat",
  description:
    "Explore the powerful features of TheLUX Chat - from AI-powered conversations to advanced analytics and seamless integrations.",
  openGraph: {
    title: "Features | TheLUX Chat",
    description:
      "Explore the powerful features of TheLUX Chat - from AI-powered conversations to advanced analytics and seamless integrations.",
    url: "https://theluxchat.com/features",
    type: "website",
  },
}

export default function FeaturesPage() {
  const featureCategories = [
    {
      title: "Conversation Intelligence",
      description: "Create natural, engaging conversations with your customers",
      features: [
        "Advanced natural language understanding",
        "Context-aware responses",
        "Sentiment analysis",
        "Entity recognition",
        "Multi-language support",
        "Voice recognition and text-to-speech",
      ],
    },
    {
      title: "Customization & Design",
      description: "Tailor your chatbot to match your brand and use cases",
      features: [
        "Drag-and-drop conversation builder",
        "Custom chatbot personalities",
        "Branded chat interface",
        "Conditional logic flows",
        "Rich media support (images, videos, carousels)",
        "Custom CSS and JavaScript",
      ],
    },
    {
      title: "Integration & Deployment",
      description: "Connect with your existing tools and reach customers everywhere",
      features: [
        "API-first architecture",
        "Webhook support",
        "Pre-built integrations with popular platforms",
        "Multi-channel deployment",
        "Mobile SDK for iOS and Android",
        "Embeddable web widget",
      ],
    },
    {
      title: "Analytics & Optimization",
      description: "Measure performance and continuously improve your chatbot",
      features: [
        "Comprehensive analytics dashboard",
        "Conversation funnel analysis",
        "User journey mapping",
        "A/B testing capabilities",
        "Automated performance reports",
        "Custom event tracking",
      ],
    },
    {
      title: "Security & Compliance",
      description: "Enterprise-grade security for your data and conversations",
      features: [
        "SOC 2 Type II compliance",
        "GDPR and CCPA compliance",
        "End-to-end encryption",
        "Role-based access control",
        "Data retention policies",
        "Audit logs and compliance reporting",
      ],
    },
    {
      title: "Support & Training",
      description: "Get the help you need to succeed with TheLUX Chat",
      features: [
        "24/7 technical support",
        "Comprehensive documentation",
        "Video tutorials and webinars",
        "Dedicated customer success manager (Enterprise)",
        "Regular product updates",
        "Active community forum",
      ],
    },
  ]

  return (
    <PageLayout
      title="Powerful Features for Exceptional Chatbots"
      description="TheLUX Chat offers a comprehensive set of features to help you build, deploy, and optimize AI-powered chatbots that deliver exceptional customer experiences."
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featureCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Feature Spotlight</h2>
        <p className="mt-4 text-muted-foreground">
          Take a closer look at some of our most powerful and unique features that set TheLUX Chat apart from other
          chatbot platforms.
        </p>

        <div className="mt-8 space-y-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">AI Voice Assistant</h3>
              <p className="mt-2 text-muted-foreground">
                Our AI Voice Assistant feature enables natural voice conversations with your chatbot, making
                interactions more accessible and convenient for your customers.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Natural-sounding voice synthesis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Accurate speech recognition</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Multiple voice options and accents</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Voice emotion detection</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="aspect-video rounded-lg bg-card"></div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-muted p-4 md:order-2">
              <div className="aspect-video rounded-lg bg-card"></div>
            </div>
            <div className="md:order-1">
              <h3 className="text-xl font-semibold">Knowledge Base Integration</h3>
              <p className="mt-2 text-muted-foreground">
                Connect your chatbot to your existing knowledge base to provide accurate, consistent answers to customer
                questions without manual programming.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Automatic content indexing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Semantic search capabilities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Content relevance scoring</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Automatic updates when content changes</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Conversation Analytics</h3>
              <p className="mt-2 text-muted-foreground">
                Gain deep insights into your chatbot conversations to understand customer needs, identify improvement
                opportunities, and measure ROI.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Conversation flow visualization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Drop-off point identification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Topic clustering and trend analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Customer satisfaction scoring</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="aspect-video rounded-lg bg-card"></div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

