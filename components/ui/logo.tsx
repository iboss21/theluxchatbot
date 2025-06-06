import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  href?: string | null // Make href nullable
  linkClassName?: string
}

export function Logo({
  size = "md",
  className = "",
  href = null, // Default to null instead of '/'
  linkClassName = "",
}: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  }

  const logo = (
    <span className={`font-bold ${sizeClasses[size]} ${className}`}>
      <span className="text-cyan-400">Lux</span>
      <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Chat</span>
    </span>
  )

  if (href) {
    return (
      <Link href={href} className={`flex items-center space-x-2 ${linkClassName}`}>
        {logo}
      </Link>
    )
  }

  return logo
}

