import type { Metadata } from "next"
import { PageLayout } from "@/components/layouts/page-layout"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Templates | TheLUX Chat",
  description:
    "Browse our collection of pre-built chatbot templates for various industries and use cases. Get started quickly with customizable templates.",
  openGraph: {
    title: "Templates | TheLUX Chat",
    description:
      "Browse our collection of pre-built chatbot templates for various industries and use cases. Get started quickly with customizable templates.",
    url: "https://theluxchat.com/templates",
    type: "website",
  },
}

export default function TemplatesPage() {
  const templates = [
    {
      title: "Customer Support",
      description: "Handle common customer inquiries and support requests",
      image: "/placeholder.svg?height=400&width=600",
      category: "Support",
      popularity: "Popular",
    },
    {
      title: "Lead Generation",
      description: "Qualify leads and book meetings with your sales team",
      image: "/placeholder.svg?height=400&width=600",
      category: "Sales",
      popularity: "Popular",
    },
    {
      title: "E-commerce Assistant",
      description: "Help customers find products and complete purchases",
      image: "/placeholder.svg?height=400&width=600",
      category: "E-commerce",
      popularity: "Popular",
    },
    {
      title: "Appointment Booking",
      description: "Schedule appointments and send reminders",
      image: "/placeholder.svg?height=400&width=600",
      category: "Scheduling",
      popularity: "",
    },
    {
      title: "FAQ Bot",
      description: "Answer frequently asked questions about your business",
      image: "/placeholder.svg?height=400&width=600",
      category: "Support",
      popularity: "",
    },
    {
      title: "Product Recommendation",
      description: "Recommend products based on customer preferences",
      image: "/placeholder.svg?height=400&width=600",
      category: "E-commerce",
      popularity: "",
    },
    {
      title: "Event Registration",
      description: "Register attendees for events and webinars",
      image: "/placeholder.svg?height=400&width=600",
      category: "Events",
      popularity: "",
    },
    {
      title: "HR Assistant",
      description: "Answer employee questions and provide resources",
      image: "/placeholder.svg?height=400&width=600",
      category: "HR",
      popularity: "",
    },
    {
      title: "Restaurant Ordering",
      description: "Take food orders and reservations",
      image: "/placeholder.svg?height=400&width=600",
      category: "Hospitality",
      popularity: "",
    },
  ]

  const categories = ["All", "Support", "Sales", "E-commerce", "Scheduling", "Events", "HR", "Hospitality"]

  return (
    <PageLayout
      title="Chatbot Templates"
      description="Get started quickly with our pre-built templates for various industries and use cases. Customize them to fit your specific needs."
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

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative">
              <Image
                src={template.image || "/placeholder.svg"}
                alt={template.title}
                width={600}
                height={400}
                className="aspect-[3/2] object-cover"
              />
              <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium">
                {template.category}
              </div>
              {template.popularity && (
                <div className="absolute right-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
                  {template.popularity}
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Link href={`/templates/${template.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <Button variant="outline">Preview</Button>
              </Link>
              <Link href={`/dashboard/chatbots/new?template=${template.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <Button>Use Template</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Industry-Specific Templates</h2>
        <p className="mt-4 text-muted-foreground">
          Explore templates designed specifically for your industry. These templates include industry-specific language,
          workflows, and integrations.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/templates/industries/healthcare"
            className="group rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
          >
            <h3 className="text-lg font-semibold group-hover:text-primary">Healthcare</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              HIPAA-compliant templates for patient support and scheduling
            </p>
          </Link>
          <Link
            href="/templates/industries/finance"
            className="group rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
          >
            <h3 className="text-lg font-semibold group-hover:text-primary">Finance</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Secure templates for banking, insurance, and financial services
            </p>
          </Link>
          <Link
            href="/templates/industries/education"
            className="group rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
          >
            <h3 className="text-lg font-semibold group-hover:text-primary">Education</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Templates for student support, admissions, and course information
            </p>
          </Link>
          <Link
            href="/templates/industries/real-estate"
            className="group rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
          >
            <h3 className="text-lg font-semibold group-hover:text-primary">Real Estate</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Templates for property inquiries, showings, and agent connections
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-16 rounded-lg border bg-card p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Need a custom template?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Don't see a template that fits your needs? Our team can create a custom template tailored to your specific
          requirements.
        </p>
        <div className="mt-8">
          <Link href="/contact">
            <Button size="lg">Request Custom Template</Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}

