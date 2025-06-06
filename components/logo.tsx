"use client"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  }

  return (
    <div className={`font-bold ${sizeClasses[size]} ${className}`}>
      <span className="text-cyan-400">Lux</span>
      <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Chat</span>
    </div>
  )
}

