"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon, CheckCircledIcon } from "@radix-ui/react-icons"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [connectionError, setConnectionError] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setConnectionError(false)
    setSuccess(false)

    try {
      // First, check if we can connect to the server at all
      const pingResponse = await fetch("/api/ping", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Short timeout to quickly detect connection issues
        signal: AbortSignal.timeout(5000),
      }).catch((err) => {
        console.error("Ping failed:", err)
        throw new Error("CONNECTION_ERROR")
      })

      if (!pingResponse.ok) {
        throw new Error("CONNECTION_ERROR")
      }

      // If ping succeeds, attempt login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Handle successful login
      setSuccess(true)

      // Store token in localStorage
      localStorage.setItem("authToken", data.data.token)
      localStorage.setItem("user", JSON.stringify(data.data.user))

      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (err: any) {
      console.error("Login error:", err)

      if (err.message === "CONNECTION_ERROR") {
        setConnectionError(true)
      } else {
        setError(err.message || "Failed to login. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  // Special case for demo login
  const handleDemoLogin = async () => {
    setEmail("demo@thelux.app")
    setPassword("demo123")

    // Submit the form after setting the values
    setTimeout(() => {
      handleSubmit(new Event("submit") as any)
    }, 100)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login to LuxChat</CardTitle>
        <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        {connectionError && (
          <Alert variant="destructive" className="mb-4">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>
              Failed to connect to the server. Please check your internet connection or try again later.
              {process.env.NODE_ENV === "development" && (
                <p className="text-xs mt-1">
                  If you're in development mode, make sure your API routes and database are properly configured.
                </p>
              )}
            </AlertDescription>
          </Alert>
        )}

        {error && !connectionError && (
          <Alert variant="destructive" className="mb-4">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Login Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
            <CheckCircledIcon className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Login successful. Redirecting to dashboard...</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-500">Don't have an account?</span>{" "}
              <Link href="/signup" className="text-sm text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="relative w-full mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={handleDemoLogin} disabled={loading}>
          Try Demo Account
        </Button>
      </CardFooter>
    </Card>
  )
}

