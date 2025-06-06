"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Loader2, ShieldAlert, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { apiClient } from "../../src/lib/api-client"
import { useToast } from "@/components/ui/use-toast"
import { Logo } from "@/components/ui/logo"

export default function LoginPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await apiClient.login(email, password)

      if (response.data) {
        // Store token consistently - use the same key name throughout the app
        localStorage.setItem("lux_token", response.data.token)
        localStorage.setItem("lux_user", JSON.stringify(response.data.user))

        toast({
          title: "Login successful",
          description: `Welcome back, ${response.data.user.name}!`,
        })

        // Navigate to dashboard using window.location for a full page refresh
        window.location.href = "/dashboard"
      } else {
        setError(response.error || "Invalid email or password")
      }
    } catch (error) {
      console.error("Login failed:", error)
      setError("An error occurred during login. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Demo account login
  const loginWithDemo = async (type: "admin" | "editor" | "viewer") => {
    setIsSubmitting(true)
    setError("")

    const demoCredentials = {
      admin: { email: "admin@luxchat.app", password: "admin1234" },
      editor: { email: "editor@luxchat.app", password: "editor1234" },
      viewer: { email: "viewer@luxchat.app", password: "viewer1234" },
    }

    try {
      const { email, password } = demoCredentials[type]

      // Show which credentials we're using (for debugging)
      console.log(`Attempting demo login with: ${email} / ${password}`)

      const response = await apiClient.login(email, password)

      if (response.data) {
        // Store token consistently - use the same key name throughout the app
        localStorage.setItem("lux_token", response.data.token)
        localStorage.setItem("lux_user", JSON.stringify(response.data.user))

        toast({
          title: "Demo Login",
          description: `Logged in as ${type} user`,
        })

        window.location.href = "/dashboard"
      } else {
        console.error("Demo login failed with error:", response.error)
        setError(response.error || "Demo login failed")
      }
    } catch (error) {
      console.error("Demo login failed with exception:", error)
      setError("Demo login failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="glass-card w-full max-w-md p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          {/* Use the Logo with href prop directly instead of wrapping in Link */}
          <Logo size="lg" href="/" className="inline-block" />
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <div className="space-y-4 mb-6">
          <button
            className="glass-button-secondary w-full flex items-center justify-center gap-2"
            onClick={() => loginWithDemo("admin")}
            disabled={isSubmitting}
          >
            <ShieldAlert className="h-5 w-5" />
            <span>Login as Admin (Demo)</span>
          </button>
          <button
            className="glass-button-secondary w-full flex items-center justify-center gap-2"
            onClick={() => loginWithDemo("editor")}
            disabled={isSubmitting}
          >
            <User className="h-5 w-5" />
            <span>Login as Editor (Demo)</span>
          </button>
          <button
            className="glass-button-secondary w-full flex items-center justify-center gap-2"
            onClick={() => loginWithDemo("viewer")}
            disabled={isSubmitting}
          >
            <User className="h-5 w-5" />
            <span>Login as Viewer (Demo)</span>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {error && <div className="bg-destructive/20 text-destructive p-3 rounded-md mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input w-full"
              placeholder="you@example.com"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input w-full"
              placeholder="••••••••"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="glass-button w-full flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

