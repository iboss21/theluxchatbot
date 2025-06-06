"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, Users, MessageSquare, BarChart2, TrendingUp } from "lucide-react"

export default function AnalyticsPage() {
  const [analytics] = useState({
    summary: {
      totalInteractions: 2520,
      interactionsChange: 12.5,
      activeUsers: 487,
      activeUsersChange: 8.2,
      conversionRate: 3.8,
      conversionRateChange: -0.5,
    },
    chatbotPerformance: [
      {
        id: "lux-1",
        name: "Crystal Luxe",
        interactions: 1243,
        responseTime: 0.8,
        satisfactionRate: 92,
      },
      {
        id: "lux-2",
        name: "Neon Pulse",
        interactions: 856,
        responseTime: 0.6,
        satisfactionRate: 88,
      },
      {
        id: "lux-3",
        name: "Royal Aura",
        interactions: 421,
        responseTime: 0.9,
        satisfactionRate: 95,
      },
    ],
    interactionsOverTime: [
      { date: "2023-03-01", count: 78 },
      { date: "2023-03-02", count: 82 },
      { date: "2023-03-03", count: 91 },
      { date: "2023-03-04", count: 65 },
      { date: "2023-03-05", count: 59 },
      { date: "2023-03-06", count: 85 },
      { date: "2023-03-07", count: 93 },
      { date: "2023-03-08", count: 102 },
      { date: "2023-03-09", count: 110 },
      { date: "2023-03-10", count: 105 },
      { date: "2023-03-11", count: 98 },
      { date: "2023-03-12", count: 87 },
      { date: "2023-03-13", count: 92 },
      { date: "2023-03-14", count: 109 },
      { date: "2023-03-15", count: 115 },
    ],
    topQueries: [
      { query: "How do I reset my password?", count: 87 },
      { query: "What are your pricing plans?", count: 64 },
      { query: "How do I contact support?", count: 52 },
      { query: "Do you offer refunds?", count: 43 },
      { query: "How to upgrade my plan?", count: 38 },
    ],
    userSentiment: {
      positive: 68,
      neutral: 24,
      negative: 8,
    },
  })

  return (
    <div className="container p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Monitor your chatbot performance and user engagement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.summary.totalInteractions.toLocaleString()}</div>
            <div className="flex items-center text-sm mt-1">
              {analytics.summary.interactionsChange > 0 ? (
                <>
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">{analytics.summary.interactionsChange}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500">{Math.abs(analytics.summary.interactionsChange)}%</span>
                </>
              )}
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.summary.activeUsers.toLocaleString()}</div>
            <div className="flex items-center text-sm mt-1">
              {analytics.summary.activeUsersChange > 0 ? (
                <>
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">{analytics.summary.activeUsersChange}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500">{Math.abs(analytics.summary.activeUsersChange)}%</span>
                </>
              )}
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.summary.conversionRate}%</div>
            <div className="flex items-center text-sm mt-1">
              {analytics.summary.conversionRateChange > 0 ? (
                <>
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">{analytics.summary.conversionRateChange}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500">{Math.abs(analytics.summary.conversionRateChange)}%</span>
                </>
              )}
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">User Sentiment</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.userSentiment.positive}% Positive</div>
            <div className="w-full bg-muted h-2 rounded-full mt-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${analytics.userSentiment.positive}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Positive: {analytics.userSentiment.positive}%</span>
              <span>Neutral: {analytics.userSentiment.neutral}%</span>
              <span>Negative: {analytics.userSentiment.negative}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Chatbot Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.chatbotPerformance.map((bot) => (
                <div key={bot.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{bot.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {bot.interactions.toLocaleString()} interactions
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{bot.satisfactionRate}%</div>
                    <div className="text-sm text-muted-foreground">{bot.responseTime}s avg. response</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topQueries.map((query, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 text-xs font-medium">
                      {index + 1}
                    </div>
                    <div className="font-medium">{query.query}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{query.count} times</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactions Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-end">
            {analytics.interactionsOverTime.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full max-w-[30px] bg-primary/80 hover:bg-primary transition-colors rounded-t-sm"
                  style={{
                    height: `${(day.count / Math.max(...analytics.interactionsOverTime.map((d) => d.count))) * 200}px`,
                  }}
                ></div>
                <div className="text-xs text-muted-foreground mt-2 rotate-45 origin-left">
                  {new Date(day.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

