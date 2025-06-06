"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Line, Bar, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { ArrowUpRight, ArrowDownRight, Filter } from "lucide-react"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

export function AnalyticsOverview() {
  const [timeRange, setTimeRange] = useState("7d")
  const [showFilters, setShowFilters] = useState(false)

  // Sample data for the charts
  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Total Conversations",
        data: [250, 320, 280, 500, 450, 650, 700],
        borderColor: "rgba(0, 255, 255, 1)",
        backgroundColor: "rgba(0, 255, 255, 0.1)",
        tension: 0.4,
      },
      {
        label: "Unique Users",
        data: [150, 200, 180, 300, 250, 400, 450],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        tension: 0.4,
      },
    ],
  }

  const barChartData = {
    labels: ["Crystal Luxe", "Neon Pulse", "Royal Aura"],
    datasets: [
      {
        label: "Total Messages",
        data: [1243, 856, 421],
        backgroundColor: "rgba(0, 255, 255, 0.8)",
      },
    ],
  }

  const pieChartData = {
    labels: ["Successful", "Needs Improvement", "Failed"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ["rgba(75, 192, 192, 0.8)", "rgba(255, 205, 86, 0.8)", "rgba(255, 99, 132, 0.8)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 205, 86, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
  }

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
  }

  const kpiData = [
    {
      title: "Total Conversations",
      value: "3,154",
      change: "+14.5%",
      positive: true,
    },
    {
      title: "Avg. Response Time",
      value: "1.2s",
      change: "-0.3s",
      positive: true,
    },
    {
      title: "User Satisfaction",
      value: "92%",
      change: "+5%",
      positive: true,
    },
    {
      title: "Conversion Rate",
      value: "24%",
      change: "-2%",
      positive: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          {["24h", "7d", "30d", "90d"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === range ? "bg-lux-cyan text-black" : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 text-white/70 hover:text-white"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="glass-card p-4 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-white/70 text-sm block mb-2">Chatbot</label>
              <select className="glass-input w-full">
                <option value="all">All Chatbots</option>
                <option value="crystal-luxe">Crystal Luxe</option>
                <option value="neon-pulse">Neon Pulse</option>
                <option value="royal-aura">Royal Aura</option>
              </select>
            </div>
            <div>
              <label className="text-white/70 text-sm block mb-2">Channel</label>
              <select className="glass-input w-full">
                <option value="all">All Channels</option>
                <option value="website">Website</option>
                <option value="mobile">Mobile App</option>
                <option value="api">API</option>
              </select>
            </div>
            <div>
              <label className="text-white/70 text-sm block mb-2">Custom Date</label>
              <div className="flex gap-2">
                <input type="date" className="glass-input w-full" />
                <input type="date" className="glass-input w-full" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <div key={index} className="glass-card p-4">
            <h3 className="text-white/70 text-sm">{kpi.title}</h3>
            <div className="flex items-end justify-between mt-2">
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className={`flex items-center text-sm ${kpi.positive ? "text-green-400" : "text-red-400"}`}>
                {kpi.positive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                <span>{kpi.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-4">
          <h3 className="text-white/70 text-sm mb-4">Conversations Over Time</h3>
          <div className="h-72">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>
        <div className="glass-card p-4">
          <h3 className="text-white/70 text-sm mb-4">Messages by Chatbot</h3>
          <div className="h-72">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-4">
          <h3 className="text-white/70 text-sm mb-4">Conversation Outcomes</h3>
          <div className="h-72">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
        <div className="col-span-2 glass-card p-4">
          <h3 className="text-white/70 text-sm mb-4">Recent Activity</h3>
          <div className="space-y-3 h-72 overflow-y-auto pr-2 custom-scrollbar">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex items-start p-3 bg-white/5 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-lux-cyan/20 flex items-center justify-center mr-3">
                  <span className="text-xs font-medium">U{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">User {100 + index}</div>
                    <div className="text-white/50 text-xs">{Math.floor(Math.random() * 60)} min ago</div>
                  </div>
                  <div className="text-sm text-white/70">
                    {
                      [
                        "Asked about pricing plans",
                        "Requested technical support",
                        "Completed onboarding",
                        "Reported an issue",
                        "Asked for feature details",
                        "Upgraded subscription",
                        "Shared feedback",
                        "Requested a demo",
                      ][index]
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

