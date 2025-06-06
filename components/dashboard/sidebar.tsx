"use client"

import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
}

export function Sidebar({ open, setOpen, children }: SidebarProps) {
  return (
    <motion.div
      className="h-full flex-shrink-0 overflow-hidden bg-black/90"
      initial={{ width: open ? "240px" : "60px" }}
      animate={{ width: open ? "240px" : "60px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
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
    <div className={cn("h-full py-4 flex flex-col bg-black/90 border-r border-white/5", className)} style={style}>
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
  open?: boolean
  className?: string
  onClick?: () => void
}

export function SidebarLink({ link, open = true, className, onClick }: SidebarLinkProps) {
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-3 group/sidebar py-2 px-3 mx-2 rounded-md transition-all duration-200",
        "hover:bg-white/10",
        className,
      )}
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
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="text-neutral-200 text-sm whitespace-pre overflow-hidden text-ellipsis"
          >
            {link.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  )
}

