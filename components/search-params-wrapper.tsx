"use client"

import type React from "react"

import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchParamsWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function SearchParamsWrapper({ children, fallback }: SearchParamsWrapperProps) {
  return <Suspense fallback={fallback || <SearchParamsFallback />}>{children}</Suspense>
}

function SearchParamsFallback() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  )
}
