import type { Metadata } from "next"
import { PageLayout } from "@/components/layouts/page-layout"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, Clock, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog | TheLUX Chat",
  description:
    "Stay up-to-date with the latest news, tutorials, and insights about AI chatbots, conversational AI, and customer experience.",
  openGraph: {
    title: "Blog | TheLUX Chat",
    description:
      "Stay up-to-date with the latest news, tutorials, and insights about AI chatbots, conversational AI, and customer experience.",
    url: "https://theluxchat.com/blog",
    type: "website",
  },
}

export default function BlogPage() {
  const featuredPost = {
    title: "The Future of Customer Service: AI Chatbots in 2025 and Beyond",
    excerpt:
      "Explore how AI chatbots are transforming customer service and what to expect in the coming years as the technology continues to evolve.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "March 15, 2025",
    readTime: "8 min read",
    author: "Sarah Johnson",
    authorRole: "Chief AI Officer",
    slug: "future-of-customer-service-ai-chatbots",
    category: "Industry Insights",
  }

  const recentPosts = [
    {
      title: "How to Design Conversational Flows That Convert",
      excerpt:
        "Learn the principles of effective conversation design to create chatbots that engage users and drive conversions.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 10, 2025",
      readTime: "6 min read",
      author: "Michael Chen",
      slug: "design-conversational-flows-that-convert",
      category: "Tutorials",
    },
    {
      title: "5 Ways to Integrate Your Chatbot with Your CRM",
      excerpt:
        "Discover how to connect your chatbot with your CRM system to provide personalized customer experiences and streamline data collection.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 5, 2025",
      readTime: "5 min read",
      author: "Jessica Lee",
      slug: "integrate-chatbot-with-crm",
      category: "Integration",
    },
    {
      title: "Case Study: How Acme Corp Increased Conversions by 45% with TheLUX Chat",
      excerpt:
        "Learn how Acme Corp implemented TheLUX Chat to transform their customer experience and dramatically increase conversion rates.",
      image: "/placeholder.svg?height=400&width=600",
      date: "February 28, 2025",
      readTime: "7 min read",
      author: "David Wilson",
      slug: "case-study-acme-corp-increased-conversions",
      category: "Case Studies",
    },
    {
      title: "The Role of Emotion in AI Conversations",
      excerpt:
        "Explore how emotional intelligence in chatbots can create more engaging and effective customer interactions.",
      image: "/placeholder.svg?height=400&width=600",
      date: "February 20, 2025",
      readTime: "9 min read",
      author: "Emily Rodriguez",
      slug: "role-of-emotion-in-ai-conversations",
      category: "AI Research",
    },
    {
      title: "10 Chatbot Metrics You Should Be Tracking",
      excerpt:
        "Discover the key performance indicators that will help you measure and optimize your chatbot's performance.",
      image: "/placeholder.svg?height=400&width=600",
      date: "February 15, 2025",
      readTime: "6 min read",
      author: "Alex Thompson",
      slug: "chatbot-metrics-to-track",
      category: "Analytics",
    },
    {
      title: "Building Multilingual Chatbots: Best Practices",
      excerpt: "Learn how to create chatbots that can effectively communicate with users in multiple languages.",
      image: "/placeholder.svg?height=400&width=600",
      date: "February 10, 2025",
      readTime: "7 min read",
      author: "Sofia Garcia",
      slug: "building-multilingual-chatbots",
      category: "Development",
    },
  ]

  const categories = [
    "All",
    "Tutorials",
    "Case Studies",
    "Industry Insights",
    "AI Research",
    "Development",
    "Analytics",
    "Integration",
  ]

  return (
    <PageLayout
      title="Blog"
      description="Insights, tutorials, and news about AI chatbots, conversational AI, and customer experience."
      showCTA={false}
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              index === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mb-16">
        <Link href={`/blog/${featuredPost.slug}`}>
          <Card className="overflow-hidden">
            <div className="relative">
              <Image
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title}
                width={1200}
                height={600}
                className="aspect-[2/1] object-cover"
              />
              <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Featured
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium">
                {featuredPost.category}
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">{featuredPost.title}</CardTitle>
              <CardDescription className="text-base">{featuredPost.excerpt}</CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      </div>

      <h2 className="mb-8 text-2xl font-bold tracking-tighter sm:text-3xl">Recent Articles</h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {recentPosts.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug}`}>
            <Card className="h-full overflow-hidden transition-colors hover:bg-muted/50">
              <div className="relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="aspect-[3/2] object-cover"
                />
                <div className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium">
                  {post.category}
                </div>
              </div>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-muted">
          Load More Articles
        </button>
      </div>

      <div className="mt-16 rounded-lg border bg-card p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Subscribe to Our Newsletter</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Get the latest articles, tutorials, and news about AI chatbots and conversational AI delivered straight to
            your inbox.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md border bg-background px-4 py-2 text-sm"
            />
            <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

