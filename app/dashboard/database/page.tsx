import type { Metadata } from "next"
import { Database, Table, BarChart3, RefreshCw, Download, Lock, Search, Copy } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export const metadata: Metadata = {
  title: "Database | TheLUX.app",
  description: "Database management and insights",
}

export default function DatabasePage() {
  // This would be fetched from the API in a real implementation
  const tables = [
    {
      name: "users",
      rowCount: 2456,
      size: "12.3 MB",
      lastModified: "2025-03-28",
      status: "healthy",
    },
    {
      name: "conversations",
      rowCount: 12853,
      size: "45.7 MB",
      lastModified: "2025-03-29",
      status: "healthy",
    },
    {
      name: "messages",
      rowCount: 98245,
      size: "156.2 MB",
      lastModified: "2025-03-29",
      status: "healthy",
    },
    {
      name: "chatbots",
      rowCount: 24,
      size: "0.8 MB",
      lastModified: "2025-03-25",
      status: "healthy",
    },
    {
      name: "feedback",
      rowCount: 3291,
      size: "4.5 MB",
      lastModified: "2025-03-29",
      status: "healthy",
    },
    {
      name: "tokens",
      rowCount: 42876,
      size: "28.1 MB",
      lastModified: "2025-03-29",
      status: "syncing",
    },
  ]

  const recentQueries = [
    {
      id: "q1",
      sql: "SELECT user_id, COUNT(*) FROM conversations GROUP BY user_id HAVING COUNT(*) > 10",
      runtime: "54ms",
      timestamp: "10 minutes ago",
    },
    {
      id: "q2",
      sql: "UPDATE users SET status = 'active' WHERE last_login > NOW() - INTERVAL '30 days'",
      runtime: "128ms",
      timestamp: "1 hour ago",
    },
    {
      id: "q3",
      sql: "SELECT date_trunc('day', created_at) as day, COUNT(*) FROM messages GROUP BY day ORDER BY day DESC LIMIT 14",
      runtime: "87ms",
      timestamp: "3 hours ago",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs">Healthy</span>
      case "syncing":
        return (
          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-xs flex items-center">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> Syncing
          </span>
        )
      case "warning":
        return <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">Warning</span>
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Database</h1>
            <p className="text-white/70 mt-1">Manage your data and run custom queries</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-2 text-sm bg-white/10 rounded-md hover:bg-white/20 transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-2 text-sm bg-lux-cyan text-black rounded-md hover:bg-lux-cyan/80 transition-colors">
              <Database className="h-4 w-4" />
              <span>New Query</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Table className="h-5 w-5 mr-2 text-lux-cyan" />
                  Tables
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input type="text" placeholder="Search tables..." className="glass-input pl-10" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                        Rows
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                        Last Modified
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-white/50 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {tables.map((table) => (
                      <tr key={table.name} className="hover:bg-white/5">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{table.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white/70">
                          {table.rowCount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white/70">{table.size}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-white/70">{table.lastModified}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{getStatusBadge(table.status)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                          <button className="px-2 py-1 text-xs bg-white/10 rounded-md hover:bg-white/20 transition-colors mr-2">
                            Query
                          </button>
                          <button className="px-2 py-1 text-xs bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                            Export
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card p-4">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-lux-cyan" />
                Database Insights
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-card p-3 text-center">
                  <div className="text-lg font-bold">{tables.length}</div>
                  <div className="text-sm text-white/50">Tables</div>
                </div>
                <div className="glass-card p-3 text-center">
                  <div className="text-lg font-bold">
                    {tables.reduce((acc, table) => acc + table.rowCount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-white/50">Total Rows</div>
                </div>
                <div className="glass-card p-3 text-center">
                  <div className="text-lg font-bold">247.6 MB</div>
                  <div className="text-sm text-white/50">Total Size</div>
                </div>
                <div className="glass-card p-3 text-center">
                  <div className="text-lg font-bold">5 mins</div>
                  <div className="text-sm text-white/50">Last Backup</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-medium">Storage Usage</h3>
                  <span className="text-xs text-white/50">78% of 10 GB quota</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-lux-cyan" style={{ width: "78%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-card p-4">
              <h2 className="text-lg font-semibold text-white mb-4">Recent Queries</h2>

              <div className="space-y-3">
                {recentQueries.map((query) => (
                  <div key={query.id} className="glass-card p-3 hover:bg-white/5 transition-colors">
                    <div className="text-xs font-mono text-white/70 bg-black/30 p-2 rounded-md overflow-x-auto whitespace-nowrap">
                      {query.sql}
                    </div>
                    <div className="flex justify-between items-center mt-2 text-xs text-white/50">
                      <span>Runtime: {query.runtime}</span>
                      <span>{query.timestamp}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="px-2 py-1 text-xs bg-white/10 rounded-md hover:bg-white/20 transition-colors flex-1 text-center">
                        Run Again
                      </button>
                      <button className="px-2 py-1 text-xs bg-white/10 rounded-md hover:bg-white/20 transition-colors flex-1 text-center">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 text-sm text-lux-cyan border border-lux-cyan/30 rounded-md hover:bg-lux-cyan/10 transition-colors">
                View All Queries
              </button>
            </div>

            <div className="glass-card p-4">
              <h2 className="text-lg font-semibold text-white mb-3">Database Actions</h2>

              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 text-sm bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    <span>Backup Database</span>
                  </div>
                  <span className="text-xs text-white/50">Now</span>
                </button>

                <button className="w-full flex items-center justify-between p-3 text-sm bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                  <div className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    <span>Run Migrations</span>
                  </div>
                  <span className="text-xs text-white/50">v2.4.1</span>
                </button>

                <button className="w-full flex items-center justify-between p-3 text-sm bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Manage Access</span>
                  </div>
                  <span className="text-xs text-white/50">3 users</span>
                </button>
              </div>
            </div>

            <div className="glass-card p-4">
              <h2 className="text-lg font-semibold text-white mb-3">Connection Info</h2>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-white/50 mb-1">Host</div>
                  <div className="p-2 bg-black/30 rounded-md text-sm flex justify-between items-center">
                    <code className="text-white/80">db.thelux.app</code>
                    <button className="text-white/50 hover:text-white">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/50 mb-1">Port</div>
                  <div className="p-2 bg-black/30 rounded-md text-sm">
                    <code className="text-white/80">5432</code>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/50 mb-1">Database</div>
                  <div className="p-2 bg-black/30 rounded-md text-sm">
                    <code className="text-white/80">luxdb_production</code>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/50 mb-1">Connection String</div>
                  <div className="p-2 bg-black/30 rounded-md text-sm flex justify-between items-center">
                    <code className="text-white/80">postgresql://user:****@db.thelux.app:5432/luxdb_production</code>
                    <button className="text-white/50 hover:text-white">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

