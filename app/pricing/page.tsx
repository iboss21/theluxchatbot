import type { Metadata } from "next"
import { PageLayout } from "@/components/layouts/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pricing | TheLUX Chat",
  description:
    "Explore TheLUX Chat pricing plans - from free starter options to enterprise solutions. Find the perfect plan for your business needs.",
  openGraph: {
    title: "Pricing | TheLUX Chat",
    description:
      "Explore TheLUX Chat pricing plans - from free starter options to enterprise solutions. Find the perfect plan for your business needs.",
    url: "https://theluxchat.com/pricing",
    type: "website",
  },
}

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out TheLUX Chat",
      price: "$0",
      duration: "forever",
      features: [
        "1 chatbot",
        "500 messages per month",
        "Basic analytics",
        "Standard chatbot templates",
        "Email support",
        "Community forum access",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "For growing businesses and teams",
      price: "$49",
      duration: "per month",
      features: [
        "5 chatbots",
        "10,000 messages per month",
        "Advanced analytics",
        "All chatbot templates",
        "Custom branding",
        "Knowledge base integration",
        "Priority email support",
        "API access",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Business",
      description: "For larger businesses with advanced needs",
      price: "$199",
      duration: "per month",
      features: [
        "20 chatbots",
        "50,000 messages per month",
        "Advanced analytics with exports",
        "Custom chatbot development",
        "Multi-channel deployment",
        "Advanced integrations",
        "Phone and email support",
        "Dedicated account manager",
        "SLA guarantees",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      price: "Custom",
      duration: "",
      features: [
        "Unlimited chatbots",
        "Custom message volume",
        "Custom analytics and reporting",
        "Custom development services",
        "On-premise deployment option",
        "Advanced security features",
        "24/7 premium support",
        "Dedicated success team",
        "Custom SLA and uptime guarantees",
        "Training and onboarding",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <PageLayout
      title="Simple, Transparent Pricing"
      description="Choose the plan that's right for your business. All plans include core features with different limits and capabilities."
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan, index) => (
          <Card key={index} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
            {plan.popular && (
              <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.duration && <span className="text-sm text-muted-foreground"> / {plan.duration}</span>}
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href={plan.name === "Enterprise" ? "/contact" : "/signup"} className="w-full">
                <Button variant={plan.popular ? "default" : "outline"} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Frequently Asked Questions</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Can I upgrade or downgrade my plan?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged the prorated
              amount for the remainder of your billing cycle. When you downgrade, the new pricing will take effect at
              the start of your next billing cycle.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">What happens if I exceed my message limit?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              If you exceed your monthly message limit, you'll be charged a small fee for each additional message. We'll
              notify you when you're approaching your limit so you can upgrade if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Do you offer discounts for annual billing?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes, we offer a 20% discount when you choose annual billing for any of our paid plans. This option is
              available during signup or in your billing settings.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Is there a free trial for paid plans?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes, all paid plans come with a 14-day free trial. No credit card is required to start your trial, and you
              can downgrade to the Free plan before the trial ends if you decide not to continue.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Do you offer special pricing for startups or nonprofits?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Yes, we offer special pricing for eligible startups and nonprofit organizations. Please contact our sales
              team to learn more about our startup and nonprofit programs.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">What payment methods do you accept?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and bank
              transfers for annual plans. Enterprise customers can also pay by invoice with net-30 terms.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 rounded-lg border bg-card p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Need a custom solution?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Our enterprise plan is tailored to your specific needs. Contact our sales team to discuss your requirements
          and get a custom quote.
        </p>
        <div className="mt-8">
          <Link href="/contact">
            <Button size="lg">Contact Sales</Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}

