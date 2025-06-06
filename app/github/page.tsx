import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Redirecting to GitHub | TheLUX Chat",
  description: "Redirecting to TheLUX Chat's GitHub repository.",
}

export default function GitHubRedirect() {
  redirect("https://github.com/theluxchat")
  return null
}

