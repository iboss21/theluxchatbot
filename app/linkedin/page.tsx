import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Redirecting to LinkedIn | TheLUX Chat",
  description: "Redirecting to TheLUX Chat's LinkedIn profile.",
}

export default function LinkedInRedirect() {
  redirect("https://linkedin.com/company/theluxchat")
  return null
}

