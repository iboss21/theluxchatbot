"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface EmbedAnalyticsProps {
  chatbotId: string
}

// Mock data for the analytics
const generateMockData = () => {
  // Daily sessions for the past week
  const dailySessions = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      sessions: Math.floor(Math.random() * 100) + 20,
    }
  })

  // User satisfaction data
  const satisfactionData = [
    { name: "Very Satisfied", value: Math.floor(Math.random() * 30) + 40 },
    { name: "Satisfied", value: Math.floor(Math.random() * 20) + 20 },
    { name: "Neutral", value: Math.floor(Math.random() * 10) + 10 },
    { name: "Dissatisfied", value: Math.floor(Math.random() * 5) + 5 },
    { name: "Very Dissatisfied", value: Math.floor(Math.random() * 5) },
  ]

  // Conversation completion rate
  const completionRate = Math.floor(Math.random() * 30) + 70

  // Average session duration in seconds
  const avgSessionDuration = Math.floor(Math.random() * 120) + 60

  // Messages per conversation
  const messagesPerConversation = Math.floor(Math.random() * 5) + 3

  // Top user locations
  const topLocations = [
    { country: "United States", percentage: Math.floor(Math.random() * 30) + 40 },
    { country: "United Kingdom", percentage: Math.floor(Math.random() * 10) + 10 },
    { country: "Canada", percentage: Math.floor(Math.random() * 10) + 5 },
    { country: "Australia", percentage: Math.floor(Math.random() * 5) + 5 },
    { country: "Germany", percentage: Math.floor(Math.random() * 5) + 3 },
  ]

  // Device breakdown
  const deviceBreakdown = [
    { name: "Desktop", value: Math.floor(Math.random() * 30) + 40 },
    { name: "Mobile", value: Math.floor(Math.random() * 30) + 30 },
    { name: "Tablet", value: Math.floor(Math.random() * 10) + 5 },
  ]

  return {
    dailySessions,
    satisfactionData,
    completionRate,
    avgSessionDuration,
    messagesPerConversation,
    topLocations,
    deviceBreakdown,
  }
}

export function EmbedAnalytics({ chatbotId }: EmbedAnalyticsProps) {
  const [timeRange, setTimeRange] = useState("7days")
  const [activeTab, setActiveTab] = useState("overview")
  const [analyticsData, setAnalyticsData] = useState(generateMockData())
  const [loading, setLoading] = useState(true)

  // Colors for the charts
  const COLORS = ["#7C3AED", "#9F7AEA", "#C4B5FD", "#DDD6FE", "#EDE9FE"]

  useEffect(() => {
    // Simulate loading data
    setLoading(true)
    setTimeout(() => {
      setAnalyticsData(generateMockData())
      setLoading(false)
    }, 1000)
  }, [timeRange, chatbotId])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Embed Analytics</CardTitle>
          <CardDescription>Loading analytics data...</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <CardTitle>Embed Analytics</CardTitle>
          <CardDescription>View performance metrics for your embedded chatbot</CardDescription>
        </div>
        <div className="w-full sm:w-[180px]">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="feedback">User Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-3xl font-bold">{analyticsData.completionRate}%</div>
                  <p className="text-sm text-muted-foreground">Conversations completed successfully</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Avg. Session Duration</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-3xl font-bold">{formatTime(analyticsData.avgSessionDuration)}</div>
                  <p className="text-sm text-muted-foreground">Time spent in conversation</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Messages Per Session</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-3xl font-bold">{analyticsData.messagesPerConversation}</div>
                  <p className="text-sm text-muted-foreground">Average messages exchanged</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Daily Sessions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.dailySessions} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sessions" fill="#7C3AED" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Top User Locations</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    {analyticsData.topLocations.map((location, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{location.country}</span>
                        <div className="flex items-center">
                          <div className="w-[100px] bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${location.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{location.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Device Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.deviceBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {analyticsData.deviceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">User Satisfaction</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.satisfactionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {analyticsData.satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Recent Feedback</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex justify-between">
                      <div className="font-medium">Anonymous User</div>
                      <div className="text-sm text-muted-foreground">2 days ago</div>
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Very Satisfied
                      </span>
                    </div>
                    <p className="mt-2 text-sm">
                      The chatbot was very helpful and answered all my questions quickly. Great experience!
                    </p>
                  </div>

                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex justify-between">
                      <div className="font-medium">Anonymous User</div>
                      <div className="text-sm text-muted-foreground">3 days ago</div>
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Neutral
                      </span>
                    </div>
                    <p className="mt-2 text-sm">
                      It was okay, but I had to ask multiple times to get the information I needed.
                    </p>
                  </div>

                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex justify-between">
                      <div className="font-medium">Anonymous User</div>
                      <div className="text-sm text-muted-foreground">5 days ago</div>
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Satisfied
                      </span>
                    </div>
                    <p className="mt-2 text-sm">
                      The chatbot was helpful for basic questions. Would be nice if it could handle more complex
                      queries.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Add default export
export default EmbedAnalytics

