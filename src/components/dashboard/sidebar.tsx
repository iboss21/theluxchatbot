"use client"

import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
}

export function Sidebar({ open, setOpen, children }: SidebarProps) {
  return (
    <div
      className="h-full flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out"
      style={{ width: open ? "300px" : "60px" }}
    >
      {children}
    </div>
  )
}

export function SidebarBody({
  className,
  children,
  style,
}: {
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div className={cn("h-full px-4 py-4 flex flex-col bg-neutral-100 dark:bg-neutral-800", className)} style={style}>
      {children}
    </div>
  )
}

interface SidebarLinkProps {
  link: {
    label: string
    href: string
    icon: React.ReactNode
    onClick?: () => void
  }
  className?: string
  onClick?: () => void
}

export function SidebarLink({ link, className, onClick }: SidebarLinkProps) {
  return (
    <Link
      href={link.href}
      className={cn("flex items-center justify-start gap-2 group/sidebar py-2", className)}
      onClick={(e) => {
        if (link.onClick) {
          e.preventDefault()
          link.onClick()
        }
        if (onClick) {
          onClick()
        }
      }}
    >
      {link.icon}
      <span className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre overflow-hidden text-ellipsis">
        {link.label}
      </span>
    </Link>
  )
}

