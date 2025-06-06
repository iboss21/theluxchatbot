"use client"

import { motion } from "framer-motion"
import { Database, Brain, CreditCard, BarChart2, Users } from "lucide-react"

const roadmapItems = [
  {
    icon: <Database className="h-8 w-8 text-primary" />,
    title: "Database Integration",
    description:
      "Connect to Neon.tech or Supabase for data persistence, user management, and chatbot configuration storage.",
    comingSoon: false,
  },
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "AI Model Integration",
    description:
      "Implement OpenAI and HuggingFace model connections with fine-tuning capabilities and model switching.",
    comingSoon: false,
  },
  {
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    title: "Payment Processing",
    description: "Add Stripe integration for subscription management, usage-based billing, and payment analytics.",
    comingSoon: true,
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
    title: "Analytics Engine",
    description:
      "Build out the full analytics dashboard with charts, user behavior tracking, and conversion optimization.",
    comingSoon: true,
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Team Collaboration",
    description: "Implement role-based access control, shared workspaces, and collaborative chatbot editing.",
    comingSoon: true,
  },
]

export function Roadmap() {
  return (
    <section id="roadmap" className="container py-20 md:py-32">
      <div className="text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
            Development Roadmap
          </span>
        </motion.h2>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our plan to build the ultimate SaaS chatbot platform
        </motion.p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border/60" />

        <div className="space-y-12 md:space-y-24">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Center dot */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div className="h-8 w-8 rounded-full border-4 border-background bg-primary flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-background" />
                </div>
              </div>

              <div className={`grid md:grid-cols-2 gap-8 ${index % 2 === 0 ? "" : "md:rtl"}`}>
                <div
                  className={`glass-card p-6 ${index % 2 === 0 ? "md:text-right" : "md:text-left md:col-start-2"} md:ltr`}
                >
                  <div className="flex items-center gap-4 mb-4 md:justify-end">
                    <div className={`${index % 2 === 1 ? "md:order-last" : ""}`}>{item.icon}</div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  {item.comingSoon && (
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                      Coming Soon
                    </div>
                  )}
                </div>
                <div className="hidden md:block" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

