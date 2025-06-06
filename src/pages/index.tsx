"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"

export default function DashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the App Router dashboard
    router.replace("/dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Dashboard...</h1>
        <p className="text-muted-foreground">Please wait while we redirect you to the new dashboard.</p>
      </div>
    </div>
  )
}

