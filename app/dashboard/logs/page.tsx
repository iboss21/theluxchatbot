import type { Metadata } from "next"
import { Clock, AlertCircle, Info, Download, Filter, RefreshCw } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export const metadata: Metadata = {
  title: "System Logs | TheLUX.app",
  description: "System logs and activity monitoring",
}

export default function LogsPage() {
  // This would normally be fetched from an API
  const logs = [
    {
      id: "log1",
      timestamp: "2025-03-29T05:42:32Z",
      level: "error",
      source: "api",
      message: "Rate limit exceeded for API key lux_sk_4f3a***",
      details: "429 Too Many Requests",
    },
    {
      id: "log2",
      timestamp: "2025-03-29T05:39:18Z",
      level: "info",
      source: "auth",
      message: "User john@example.com logged in",
      details: "IP: 192.168.1.1",
    },
    {
      id: "log3",
      timestamp: "2025-03-29T05:35:47Z",
      level: "warning",
      source: "chatbot",
      message: "Crystal Luxe chatbot response timeout",
      details: "Request ID: 38f2a1c9",
    },
    {
      id: "log4",
      timestamp: "2025-03-29T05:30:22Z",
      level: "info",
      source: "system",
      message: "Scheduled database backup completed",
      details: "Size: 482MB",
    },
    {
      id: "log5",
      timestamp: "2025-03-29T05:28:05Z",
      level: "error",
      source: "integration",
      message: "Slack integration connection failed",
      details: "Invalid token",
    },
    {
      id: "log6",
      timestamp: "2025-03-29T05:25:11Z",
      level: "info",
      source: "chatbot",
      message: "New chatbot 'Support Assistant' created",
      details: "Owner: sarah@example.com",
    },
    {
      id: "log7",
      timestamp: "2025-03-29T05:20:38Z",
      level: "warning",
      source: "billing",
      message: "Account approaching token limit",
      details: "92% of monthly allocation used",
    },
    {
      id: "log8",
      timestamp: "2025-03-29T05:15:42Z",
      level: "info",
      source: "auth",
      message: "Password reset requested",
      details: "User: mike@example.com",
    },
    {
      id: "log9",
      timestamp: "2025-03-29T05:10:19Z",
      level: "error",
      source: "api",
      message: "Invalid parameter in API request",
      details: "Missing required field: 'max_tokens'",
    },
    {
      id: "log10",
      timestamp: "2025-03-29T05:05:50Z",
      level: "info",
      source: "system",
      message: "System update completed",
      details: "Version 2.4.1",
    },
  ]

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      case "info":
        return <Info className="h-4 w-4 text-blue-400" />
      default:
        return <Info className="h-4 w-4 text-white/50" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-6 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">System Logs</h1>
          <p className="text-white/70">Monitor system activity and troubleshoot issues</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-2 text-sm bg-white/10 rounded-md hover:bg-white/20 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <select className="glass-input text-sm px-3 py-2">
              <option value="all">All Sources</option>
              <option value="api">API</option>
              <option value="auth">Auth</option>
              <option value="chatbot">Chatbots</option>
              <option value="system">System</option>
              <option value="integration">Integrations</option>
              <option value="billing">Billing</option>
            </select>
            <select className="glass-input text-sm px-3 py-2">
              <option value="all">All Levels</option>
              <option value="error">Errors</option>
              <option value="warning">Warnings</option>
              <option value="info">Info</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-white/70 hover:text-white transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-white/70 hover:text-white transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="glass-card">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white/70 flex items-center">
                      <Clock className="h-3 w-3 mr-2 text-white/40" />
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        {getLevelIcon(log.level)}
                        <span className="ml-2 capitalize">{log.level}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 bg-white/10 rounded-md text-xs capitalize">{log.source}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">{log.message}</td>
                    <td className="px-4 py-3 text-sm text-white/50">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-3 px-4 border-t border-white/10 flex items-center justify-between">
            <div className="text-sm text-white/50">Showing 10 of 1,342 logs</div>
            <div className="flex gap-1">
              <button className="px-3 py-1 text-sm bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-lux-cyan/80 text-black rounded-md hover:bg-lux-cyan transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

