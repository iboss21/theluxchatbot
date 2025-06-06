import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Redirecting to Discord | TheLUX Chat",
  description: "Redirecting to TheLUX Chat's Discord server.",
}

export default function DiscordRedirect() {
  redirect("https://discord.gg/theluxchat")
  return null
}

