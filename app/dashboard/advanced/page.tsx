import type { Metadata } from "next"
import { BarChart3, Users, Settings, Database, LineChart, CircleUser, Zap, Globe, Shield } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AnalyticsOverview } from "@/components/dashboard/analytics-overview"
import { AIPerformanceMetrics } from "@/components/dashboard/ai-performance-metrics"
import { KnowledgeBaseManager } from "@/components/dashboard/knowledge-base-manager"
import { IntegrationsPanel } from "@/components/dashboard/integrations-panel"
import { SecurityCompliance } from "@/components/dashboard/security-compliance"
import { TeamManagement } from "@/components/dashboard/team-management"
import { UserSegmentation } from "@/components/dashboard/user-segmentation"
import { ModelSettings } from "@/components/dashboard/model-settings"
import { APIUsageMetrics } from "@/components/dashboard/api-usage-metrics"

export const metadata: Metadata = {
  title: "Advanced Dashboard | TheLUX.app",
  description: "Advanced dashboard with comprehensive metrics and management tools",
}

export default function AdvancedDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">Advanced Dashboard</h1>
          <p className="text-white/70">Comprehensive tools and analytics for enterprise management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 col-span-full lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-lux-cyan" />
              Analytics Overview
            </h2>
            <AnalyticsOverview />
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-lux-cyan" />
              AI Performance
            </h2>
            <AIPerformanceMetrics />
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Settings className="mr-2 h-5 w-5 text-lux-cyan" />
              Model Settings
            </h2>
            <ModelSettings />
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Database className="mr-2 h-5 w-5 text-lux-cyan" />
              Knowledge Base
            </h2>
            <KnowledgeBaseManager />
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Globe className="mr-2 h-5 w-5 text-lux-cyan" />
              Integrations
            </h2>
            <IntegrationsPanel />
          </div>

          <div className="glass-card p-6 col-span-full lg:col-span-1">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Users className="mr-2 h-5 w-5 text-lux-cyan" />
              Team Management
            </h2>
            <TeamManagement />
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-lux-cyan" />
              Security & Compliance
            </h2>
            <SecurityCompliance />
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <LineChart className="mr-2 h-5 w-5 text-lux-cyan" />
              API Usage
            </h2>
            <APIUsageMetrics />
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <CircleUser className="mr-2 h-5 w-5 text-lux-cyan" />
              User Segmentation
            </h2>
            <UserSegmentation />
          </div>
        </div>
      </div>
    </div>
  )
}

