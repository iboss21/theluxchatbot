import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // In a real app, you would fetch from your database
  // For now, we'll return mock analytics data

  const analytics = {
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
  }

  return NextResponse.json(analytics)
}

