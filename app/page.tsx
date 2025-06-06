"use client"

import { HeroGeometric } from "/src/components/ui/shape-landing-hero"
import { Bot, Zap, Shield, BarChart3, Globe } from "lucide-react"
import Link from "next/link"
import { RainbowButton } from "/src/components/ui/rainbow-button"
import { GlowingEffect } from "/src/components/ui/glowing-effect"
import { Footer } from "@/components/ui/large-name-footer"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container z-40 absolute top-0 left-0 right-0">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                <span className="text-cyan-400">Lux</span>
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Chat</span>
              </span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Testimonials
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <RainbowButton onClick={() => (window.location.href = "/signup")}>Get Started</RainbowButton>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroGeometric
          badge="Premium Chatbots"
          title1="Premium Chatbots"
          title2="With a Touch of Luxe"
          description="Create stunning AI chatbots with our 21st.dev-inspired Glassmorphic UI. Deploy in minutes, scale to millions."
        />

        <section id="features" className="container py-20 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                Supreme Features
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, customize, and deploy AI chatbots that stand out from the crowd.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot className="h-10 w-10 text-primary" />,
                title: "AI Personality Engine",
                description:
                  "Define your chatbot's personality with sliders or presets. Fine-tune behavior with uploaded datasets or live feedback loops.",
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Lux Speed",
                description:
                  "Leverage Vercel's serverless edge network for sub-100ms chatbot response times. Blazing fast, always.",
              },
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Enterprise-Grade Security",
                description:
                  "Fortified against prompt injection, XSS, CSRF, and API abuse with real-time threat detection.",
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-primary" />,
                title: "Lux Insights",
                description:
                  "AI-powered analytics with sentiment analysis, user drop-off points, and predictive suggestions.",
              },
              {
                icon: <Globe className="h-10 w-10 text-primary" />,
                title: "One-Click Social Amplification",
                description:
                  "Instant chatbot deployment to Instagram, WhatsApp, TikTok, and web embeds via Vercel edge functions.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="relative backdrop-blur-md bg-card/30 border border-border rounded-xl p-6 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300"
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="container py-20 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                Pricing Plans
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Scale as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "Perfect for individuals and small projects",
                features: ["1 chatbot", "500 interactions/month", "Basic Lux styles", "Community support"],
                cta: "Get Started",
                href: "/signup?plan=starter",
                highlighted: false,
              },
              {
                name: "Professional",
                price: "$19",
                period: "/month",
                description: "For growing businesses and teams",
                features: [
                  "5 chatbots",
                  "50,000 interactions/month",
                  "Lux Voice",
                  "Full analytics suite",
                  "Priority support",
                  "Custom branding",
                ],
                cta: "Get Started",
                href: "/signup?plan=professional",
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "$79",
                period: "/month",
                description: "For large organizations and agencies",
                features: [
                  "Unlimited chatbots",
                  "500,000 interactions/month",
                  "Lux Concierge setup",
                  "White-label (custom domain)",
                  "Team collaboration",
                  "Advanced security controls",
                  "24/7 priority support",
                ],
                cta: "Contact Sales",
                href: "/contact",
                highlighted: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`backdrop-blur-md bg-card/30 rounded-xl ${
                  plan.highlighted ? "border-primary/50 shadow-[0_0_20px_rgba(0,255,255,0.2)]" : "border-border"
                } border p-6 relative`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary mr-2 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center py-2 rounded-lg transition-colors ${
                    plan.highlighted
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                      : "bg-card hover:bg-muted text-foreground"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="container py-20 md:py-32">
          <div className="backdrop-blur-md bg-card/30 border border-border p-8 md:p-12 text-center max-w-4xl mx-auto overflow-hidden relative rounded-xl">
            {/* Background glow effect */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Your <span className="text-primary">Luxurious</span> Chatbot?
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses elevating their customer experience with LuxChat's premium chatbot platform.
            </p>

            <div>
              <RainbowButton onClick={() => (window.location.href = "/signup")}>Get Started Now</RainbowButton>
              <p className="mt-4 text-muted-foreground text-sm">No credit card required for free plan</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

