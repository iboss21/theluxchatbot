import type React from "react"
import { Footer } from "@/components/ui/large-name-footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  showCTA?: boolean
}

export function PageLayout({ children, title, description, showCTA = true }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="h-6 w-6" />
              <span className="inline-block font-bold">TheLUX Chat</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="/platform"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Platform
              </Link>
              <Link
                href="/features"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Pricing
              </Link>
              <Link
                href="/documentation"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Documentation
              </Link>
              <Link
                href="/templates"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Templates
              </Link>
              <Link
                href="/blog"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Blog
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-10 md:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h1>
            {description && (
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {description}
              </p>
            )}
          </div>
          <div className="mx-auto mt-8 max-w-5xl">{children}</div>
        </section>
        {showCTA && (
          <section className="bg-muted py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Ready to transform your customer experience?
                </h2>
                <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of businesses using TheLUX Chat to deliver exceptional AI-powered conversations.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/signup">
                    <Button size="lg">Get Started for Free</Button>
                  </Link>
                  <Link href="/documentation">
                    <Button variant="outline" size="lg">
                      View Documentation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

