"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark", // Changed default to dark
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark", // Changed default to dark
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  // Initialize with defaultTheme, will be updated from localStorage in useEffect
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  // Safe localStorage access only on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(storageKey) as Theme | null
      if (savedTheme) {
        setTheme(savedTheme)
      }
    }
  }, [storageKey])

  useEffect(() => {
    if (typeof window === "undefined") return

    const root = window.document.documentElement

    // Remove any existing theme classes
    root.classList.remove("light", "dark")

    // Always apply dark theme for now to fix the issue
    root.classList.add("dark")

    // Store the theme preference
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, theme)
      }
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

