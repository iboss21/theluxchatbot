import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Redirecting to X | TheLUX Chat",
  description: "Redirecting to TheLUX Chat's X (formerly Twitter) profile.",
}

export default function XRedirect() {
  redirect("https://x.com/theluxchat")
  return null
}

