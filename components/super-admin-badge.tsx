"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap } from "lucide-react"

export function SuperAdminBadge() {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [hasUnlimitedAccess, setHasUnlimitedAccess] = useState(false)

  useEffect(() => {
    // Check if user is logged in and has super admin privileges
    const checkAdminStatus = () => {
      try {
        const userData = localStorage.getItem("lux_user")
        if (!userData) return

        const user = JSON.parse(userData)
        setIsSuperAdmin(user.role === "super_admin")
        setHasUnlimitedAccess(user.tier === "unlimited" || user.role === "super_admin")
      } catch (error) {
        console.error("Error checking admin status:", error)
      }
    }

    checkAdminStatus()
    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener("storage", checkAdminStatus)
    return () => window.removeEventListener("storage", checkAdminStatus)
  }, [])

  if (!isSuperAdmin && !hasUnlimitedAccess) return null

  return (
    <div className="flex gap-2">
      {isSuperAdmin && (
        <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-400/30">
          <Shield className="h-3 w-3 mr-1" /> Super Admin
        </Badge>
      )}
      {hasUnlimitedAccess && (
        <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-amber-400/30">
          <Zap className="h-3 w-3 mr-1" /> Unlimited Access
        </Badge>
      )}
    </div>
  )
}

