export const implementationPlan = {
  phase1: {
    name: "Core Chatbot Management",
    features: [
      {
        name: "Chatbot Creation Wizard",
        description: "Step-by-step wizard to guide users in creating chatbots",
        status: "completed",
        apis: ["/api/chatbot-wizard/start", "/api/chatbot-wizard/step", "/api/chatbot-wizard/complete"],
      },
      {
        name: "Chatbot Versioning (Lux Snapshots)",
        description: "Save chatbot configurations as snapshots with timestamps",
        status: "completed",
        apis: ["/api/chatbots/[id]/snapshot"],
      },
      {
        name: "Chatbot Scheduling",
        description: "Schedule chatbot availability with custom fallback messages",
        status: "completed",
        apis: ["/api/chatbots/[id]/schedule"],
      },
      {
        name: "Chatbot Templates",
        description: "Pre-built chatbot templates for common use cases",
        status: "completed",
        apis: ["/api/templates"],
      },
      {
        name: "Chatbot Cloning",
        description: "Duplicate existing chatbots for quick experimentation",
        status: "completed",
        apis: ["/api/chatbots/[id]/clone"],
      },
      {
        name: "Enhanced Analytics (Lux Insights 2.0)",
        description: "Advanced analytics with sentiment analysis and predictive insights",
        status: "completed",
        apis: ["/api/analytics/sentiment", "/api/analytics/predict", "/api/analytics/dashboard"],
      },
    ],
  },
  phase2: {
    name: "AI & User Experience",
    features: [
      {
        name: "Voice Integration (Lux Voice)",
        description: "Text-to-speech and speech-to-text capabilities",
        status: "completed",
        apis: ["/api/voice/settings", "/api/voice/generate", "/api/voice/clone"],
      },
      {
        name: "Contextual Memory",
        description: "Remember conversation context across sessions",
        status: "completed",
        apis: ["/api/sessions/message"],
      },
      {
        name: "Intent Recognition",
        description: "Recognize user intent for more relevant responses",
        status: "completed",
        apis: ["/api/intents"],
      },
      {
        name: "User Engagement Enhancements",
        description: "Feedback loops, gamification, and personalized recommendations",
        status: "completed",
        apis: ["/api/feedback", "/api/points/earn", "/api/points/redeem", "/api/recommendations"],
      },
      {
        name: "Multi-Language Support",
        description: "Detect and respond in multiple languages",
        status: "completed",
        apis: ["/api/chatbots/[id]/languages"],
      },
    ],
  },
  phase3: {
    name: "Team & Security",
    features: [
      {
        name: "Team Collaboration",
        description: "Roles, permissions, and shared chatbot ownership",
        status: "completed",
        apis: ["/api/team", "/api/team/invite", "/api/logs"],
      },
      {
        name: "Two-Factor Authentication",
        description: "Enhanced security with 2FA",
        status: "completed",
        apis: ["/api/2fa/enable", "/api/2fa/verify"],
      },
      {
        name: "Data Export & Compliance",
        description: "Export data in compliance with regulations",
        status: "completed",
        apis: ["/api/export"],
      },
      {
        name: "Security Logging",
        description: "Log security events and manage IP restrictions",
        status: "completed",
        apis: ["/api/security/log", "/api/security/logs", "/api/security/ip"],
      },
      {
        name: "User Experience Improvements",
        description: "Onboarding, theme customization, and notifications",
        status: "completed",
        apis: ["/api/onboarding", "/api/theme", "/api/notifications"],
      },
    ],
  },
  phase4: {
    name: "Monetization & Growth",
    features: [
      {
        name: "Marketplace",
        description: "Platform for plugins, templates, and integrations",
        status: "completed",
        apis: ["/api/marketplace/submit", "/api/marketplace/purchase"],
      },
      {
        name: "Usage Tracking & Dynamic Pricing",
        description: "Track usage and adjust pricing accordingly",
        status: "completed",
        apis: ["/api/usage/track"],
      },
      {
        name: "Affiliate Program",
        description: "Referral system with tracking and rewards",
        status: "completed",
        apis: ["/api/affiliates/referral", "/api/affiliates/earn"],
      },
      {
        name: "Integration & Extensibility",
        description: "Connect with third-party services and extend functionality",
        status: "completed",
        apis: [
          "/api/integrations/connect",
          "/api/integrations",
          "/api/custom-code",
          "/api/webhooks",
          "/api/webhooks/trigger",
        ],
      },
      {
        name: "Community & Support",
        description: "Spotlight feature, voting system, and support chat",
        status: "completed",
        apis: ["/api/spotlight/vote", "/api/spotlight", "/api/support/message"],
      },
      {
        name: "Admin Tools",
        description: "User management, feature toggles, and revenue tracking",
        status: "completed",
        apis: ["/api/admin/users/[userId]", "/api/admin/features", "/api/admin/revenue"],
      },
    ],
  },
}

