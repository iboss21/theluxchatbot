export const up = async (db) => {
  // ===== Core Chatbot Management =====

  // Chatbots table (if not already exists)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS chatbots (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      purpose TEXT,
      style VARCHAR(50),
      personality_json JSONB DEFAULT '{}',
      platforms_json JSONB DEFAULT '[]',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // Wizard sessions
  await db.execute(`
    CREATE TABLE IF NOT EXISTS wizard_sessions (
      id UUID PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      step INTEGER NOT NULL DEFAULT 1,
      data JSONB NOT NULL DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // Snapshots
  await db.execute(`
    CREATE TABLE IF NOT EXISTS snapshots (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      chatbot_id UUID NOT NULL,
      config_json JSONB NOT NULL,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // A/B Tests
  await db.execute(`
    CREATE TABLE IF NOT EXISTS ab_tests (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      chatbot_id UUID NOT NULL,
      snapshot_a UUID NOT NULL,
      snapshot_b UUID NOT NULL,
      start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      end_date TIMESTAMP WITH TIME ZONE,
      status VARCHAR(50) DEFAULT 'active',
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE,
      FOREIGN KEY (snapshot_a) REFERENCES snapshots(id) ON DELETE CASCADE,
      FOREIGN KEY (snapshot_b) REFERENCES snapshots(id) ON DELETE CASCADE
    )
  `)

  // Schedules
  await db.execute(`
    CREATE TABLE IF NOT EXISTS schedules (
      chatbot_id UUID PRIMARY KEY,
      active_hours_json JSONB NOT NULL DEFAULT '{}',
      fallback_message TEXT,
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // Templates
  await db.execute(`
    CREATE TABLE IF NOT EXISTS templates (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      category VARCHAR(50) NOT NULL,
      config_json JSONB NOT NULL,
      is_premium BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // Messages
  await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      chatbot_id UUID NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      is_bot BOOLEAN NOT NULL,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // ===== Analytics =====

  // Analytics
  await db.execute(`
    CREATE TABLE IF NOT EXISTS analytics (
      id SERIAL PRIMARY KEY,
      message_id UUID NOT NULL,
      sentiment_score INTEGER,
      sentiment_label VARCHAR(50),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // Predictions
  await db.execute(`
    CREATE TABLE IF NOT EXISTS predictions (
      chatbot_id UUID PRIMARY KEY,
      churn_risk INTEGER NOT NULL,
      suggestion TEXT,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // Dashboards
  await db.execute(`
    CREATE TABLE IF NOT EXISTS dashboards (
      user_id VARCHAR(255) PRIMARY KEY,
      layout_json JSONB NOT NULL DEFAULT '{}',
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // ===== User Engagement =====

  // Feedback
  await db.execute(`
    CREATE TABLE IF NOT EXISTS feedback (
      id SERIAL PRIMARY KEY,
      chatbot_id UUID NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      rating VARCHAR(50) NOT NULL,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // Points
  await db.execute(`
    CREATE TABLE IF NOT EXISTS points (
      user_id VARCHAR(255) PRIMARY KEY,
      balance INTEGER NOT NULL DEFAULT 0,
      transactions_json JSONB NOT NULL DEFAULT '[]',
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // User Features
  await db.execute(`
    CREATE TABLE IF NOT EXISTS user_features (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      feature VARCHAR(100) NOT NULL,
      activated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(user_id, feature)
    )
  `)

  // Recommendations
  await db.execute(`
    CREATE TABLE IF NOT EXISTS recommendations (
      id SERIAL PRIMARY KEY,
      chatbot_id UUID NOT NULL,
      suggestion TEXT NOT NULL,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // ===== AI & Chatbot Enhancements =====

  // Voice Settings
  await db.execute(`
    CREATE TABLE IF NOT EXISTS voice_settings (
      chatbot_id UUID PRIMARY KEY,
      language VARCHAR(50) DEFAULT 'English',
      pitch INTEGER DEFAULT 50,
      speed FLOAT DEFAULT 1.0,
      emotion VARCHAR(50) DEFAULT 'Neutral',
      custom_voice_id VARCHAR(100),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // Languages
  await db.execute(`
    CREATE TABLE IF NOT EXISTS languages (
      chatbot_id UUID NOT NULL,
      language_code VARCHAR(10) NOT NULL,
      is_enabled BOOLEAN DEFAULT TRUE,
      custom_responses_json JSONB DEFAULT '{}',
      PRIMARY KEY (chatbot_id, language_code),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // Sessions
  await db.execute(`
    CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      chatbot_id UUID NOT NULL,
      messages_json JSONB NOT NULL DEFAULT '[]',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(user_id, chatbot_id),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // Intents
  await db.execute(`
    CREATE TABLE IF NOT EXISTS intents (
      id SERIAL PRIMARY KEY,
      message_id UUID NOT NULL,
      intent VARCHAR(100) NOT NULL,
      confidence FLOAT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // ===== Team Collaboration =====

  // Team
  await db.execute(`
    CREATE TABLE IF NOT EXISTS team (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      status VARCHAR(50) NOT NULL,
      invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(user_id)
    )
  `)

  // Activity Logs
  await db.execute(`
    CREATE TABLE IF NOT EXISTS logs (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      action TEXT NOT NULL,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // ===== Security & Compliance =====

  // Update Users table for 2FA
  await db.execute(`
    ALTER TABLE users 
    ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS two_factor_secret VARCHAR(255)
  `)

  // Security Logs
  await db.execute(`
    CREATE TABLE IF NOT EXISTS security_logs (
      id SERIAL PRIMARY KEY,
      type VARCHAR(100) NOT NULL,
      ip VARCHAR(50),
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // IP Rules
  await db.execute(`
    CREATE TABLE IF NOT EXISTS ip_rules (
      ip VARCHAR(50) PRIMARY KEY,
      action VARCHAR(50) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // ===== User Experience =====

  // Onboarding
  await db.execute(`
    CREATE TABLE IF NOT EXISTS onboarding (
      user_id VARCHAR(255) PRIMARY KEY,
      completed BOOLEAN NOT NULL DEFAULT FALSE,
      completed_at TIMESTAMP WITH TIME ZONE
    )
  `)

  // Update Users table for theme
  await db.execute(`
    ALTER TABLE users 
    ADD COLUMN IF NOT EXISTS theme VARCHAR(50) DEFAULT 'dark'
  `)

  // Notifications
  await db.execute(`
    CREATE TABLE IF NOT EXISTS notifications (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      type VARCHAR(50) NOT NULL,
      message TEXT NOT NULL,
      read BOOLEAN NOT NULL DEFAULT FALSE,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // ===== Monetization & Growth =====

  // Marketplace Items
  await db.execute(`
    CREATE TABLE IF NOT EXISTS marketplace_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      developer_id VARCHAR(255) NOT NULL,
      type VARCHAR(50) NOT NULL,
      name VARCHAR(255) NOT NULL,
      price INTEGER NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      developer_earnings INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // User Items
  await db.execute(`
    CREATE TABLE IF NOT EXISTS user_items (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      item_id UUID NOT NULL,
      purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(user_id, item_id),
      FOREIGN KEY (item_id) REFERENCES marketplace_items(id) ON DELETE CASCADE
    )
  `)

  // Usage
  await db.execute(`
    CREATE TABLE IF NOT EXISTS usage (
      user_id VARCHAR(255) PRIMARY KEY,
      interactions INTEGER NOT NULL DEFAULT 0,
      overage_fee FLOAT NOT NULL DEFAULT 0,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // Affiliates
  await db.execute(`
    CREATE TABLE IF NOT EXISTS affiliates (
      user_id VARCHAR(255) PRIMARY KEY,
      referral_link VARCHAR(255) NOT NULL,
      earnings FLOAT NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // ===== Integrations =====

  // Integrations
  await db.execute(`
    CREATE TABLE IF NOT EXISTS integrations (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      api_name VARCHAR(100) NOT NULL,
      token TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(user_id, api_name)
    )
  `)

  // Custom Code
  await db.execute(`
    CREATE TABLE IF NOT EXISTS custom_code (
      id SERIAL PRIMARY KEY,
      chatbot_id UUID NOT NULL,
      code_type VARCHAR(50) NOT NULL,
      code TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(chatbot_id, code_type),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // Webhooks
  await db.execute(`
    CREATE TABLE IF NOT EXISTS webhooks (
      id SERIAL PRIMARY KEY,
      chatbot_id UUID NOT NULL,
      url TEXT NOT NULL,
      events JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // ===== Community & Support =====

  // Spotlight
  await db.execute(`
    CREATE TABLE IF NOT EXISTS spotlight (
      chatbot_id UUID PRIMARY KEY,
      votes INTEGER NOT NULL DEFAULT 0,
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // Votes
  await db.execute(`
    CREATE TABLE IF NOT EXISTS votes (
      id SERIAL PRIMARY KEY,
      chatbot_id UUID NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(chatbot_id, user_id),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // Support Chats
  await db.execute(`
    CREATE TABLE IF NOT EXISTS support_chats (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      messages_json JSONB NOT NULL DEFAULT '[]',
      status VARCHAR(50) NOT NULL DEFAULT 'open',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(user_id)
    )
  `)

  // ===== Admin Tools =====

  // Features
  await db.execute(`
    CREATE TABLE IF NOT EXISTS features (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      enabled BOOLEAN NOT NULL DEFAULT TRUE,
      user_id VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(name, user_id)
    )
  `)

  // Revenue
  await db.execute(`
    CREATE TABLE IF NOT EXISTS revenue (
      id SERIAL PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      amount FLOAT NOT NULL,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // Interactions
  await db.execute(`
    CREATE TABLE IF NOT EXISTS interactions (
      id SERIAL PRIMARY KEY,
      chatbot_id UUID NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      snapshot_id UUID,
      step INTEGER NOT NULL DEFAULT 1,
      engagement INTEGER,
      completed BOOLEAN NOT NULL DEFAULT FALSE,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE,
      FOREIGN KEY (snapshot_id) REFERENCES snapshots(id) ON DELETE SET NULL
    )
  `)
}

export const down = async (db) => {
  // Drop tables in reverse order to avoid foreign key constraints
  await db.execute("DROP TABLE IF EXISTS interactions")
  await db.execute("DROP TABLE IF EXISTS revenue")
  await db.execute("DROP TABLE IF EXISTS features")
  await db.execute("DROP TABLE IF EXISTS support_chats")
  await db.execute("DROP TABLE IF EXISTS votes")
  await db.execute("DROP TABLE IF EXISTS spotlight")
  await db.execute("DROP TABLE IF EXISTS webhooks")
  await db.execute("DROP TABLE IF EXISTS custom_code")
  await db.execute("DROP TABLE IF EXISTS integrations")
  await db.execute("DROP TABLE IF EXISTS affiliates")
  await db.execute("DROP TABLE IF EXISTS usage")
  await db.execute("DROP TABLE IF EXISTS user_items")
  await db.execute("DROP TABLE IF EXISTS marketplace_items")
  await db.execute("DROP TABLE IF EXISTS notifications")
  await db.execute("DROP TABLE IF EXISTS onboarding")
  await db.execute("DROP TABLE IF EXISTS ip_rules")
  await db.execute("DROP TABLE IF EXISTS security_logs")
  await db.execute("DROP TABLE IF EXISTS logs")
  await db.execute("DROP TABLE IF EXISTS team")
  await db.execute("DROP TABLE IF EXISTS intents")
  await db.execute("DROP TABLE IF EXISTS sessions")
  await db.execute("DROP TABLE IF EXISTS languages")
  await db.execute("DROP TABLE IF EXISTS voice_settings")
  await db.execute("DROP TABLE IF EXISTS recommendations")
  await db.execute("DROP TABLE IF EXISTS user_features")
  await db.execute("DROP TABLE IF EXISTS points")
  await db.execute("DROP TABLE IF EXISTS feedback")
  await db.execute("DROP TABLE IF EXISTS dashboards")
  await db.execute("DROP TABLE IF EXISTS predictions")
  await db.execute("DROP TABLE IF EXISTS analytics")
  await db.execute("DROP TABLE IF EXISTS messages")
  await db.execute("DROP TABLE IF EXISTS templates")
  await db.execute("DROP TABLE IF EXISTS schedules")
  await db.execute("DROP TABLE IF EXISTS ab_tests")
  await db.execute("DROP TABLE IF EXISTS snapshots")
  await db.execute("DROP TABLE IF EXISTS wizard_sessions")
  await db.execute("DROP TABLE IF EXISTS chatbots")

  // Revert column additions
  await db.execute("ALTER TABLE users DROP COLUMN IF EXISTS two_factor_enabled")
  await db.execute("ALTER TABLE users DROP COLUMN IF EXISTS two_factor_secret")
  await db.execute("ALTER TABLE users DROP COLUMN IF EXISTS theme")
}

