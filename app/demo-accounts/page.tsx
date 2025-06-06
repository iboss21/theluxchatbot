"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShieldAlert, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/ui/logo"

export default function DemoAccountsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="glass-card w-full max-w-md p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Logo size="lg" />
          </Link>
          <p className="text-muted-foreground mt-2">Choose a demo account</p>
        </div>

        <div className="space-y-4 mb-6">
          <Link
            href="/login?demo=admin"
            className="glass-button-secondary w-full flex items-center justify-center gap-2"
          >
            <ShieldAlert className="h-5 w-5" />
            <span>Admin Account</span>
            <ArrowRight className="h-4 w-4 ml-auto" />
          </Link>

          <Link
            href="/login?demo=editor"
            className="glass-button-secondary w-full flex items-center justify-center gap-2"
          >
            <User className="h-5 w-5" />
            <span>Editor Account</span>
            <ArrowRight className="h-4 w-4 ml-auto" />
          </Link>

          <Link
            href="/login?demo=viewer"
            className="glass-button-secondary w-full flex items-center justify-center gap-2"
          >
            <User className="h-5 w-5" />
            <span>Viewer Account</span>
            <ArrowRight className="h-4 w-4 ml-auto" />
          </Link>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">Or</span>
          </div>
        </div>

        <div className="space-y-4">
          <Link href="/login" className="glass-button w-full flex items-center justify-center gap-2">
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link href="/signup" className="glass-button-secondary w-full flex items-center justify-center gap-2">
            <span>Create Account</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

