"use client"
import { Logo } from "@/components/logo"

export default function LogoPreview() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 gap-8 p-4">
      <div className="glass p-8 rounded-lg flex flex-col items-center gap-6">
        <h2 className="text-white text-xl">New Logo</h2>
        <Logo size="lg" />
      </div>

      <div className="flex gap-8 flex-wrap justify-center">
        <div className="glass p-6 rounded-lg flex flex-col items-center">
          <h3 className="text-white mb-4">Small</h3>
          <Logo size="sm" />
        </div>

        <div className="glass p-6 rounded-lg flex flex-col items-center">
          <h3 className="text-white mb-4">Medium</h3>
          <Logo size="md" />
        </div>

        <div className="glass p-6 rounded-lg flex flex-col items-center">
          <h3 className="text-white mb-4">Large</h3>
          <Logo size="lg" />
        </div>
      </div>

      <div className="glass p-6 rounded-lg max-w-md">
        <h3 className="text-white mb-4 text-center">In Context</h3>
        <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
          <Logo />
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

