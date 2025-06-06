export const up = async (db) => {
  // Create wizard_sessions table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS wizard_sessions (
      id UUID PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      step INTEGER NOT NULL DEFAULT 1,
      data JSONB NOT NULL DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // Create snapshots table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS snapshots (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      chatbot_id UUID NOT NULL,
      config_json JSONB NOT NULL,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // Create ab_tests table
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

  // Create schedules table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS schedules (
      chatbot_id UUID PRIMARY KEY,
      active_hours_json JSONB NOT NULL DEFAULT '{}',
      fallback_message TEXT,
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // Create analytics table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS analytics (
      id SERIAL PRIMARY KEY,
      message_id UUID NOT NULL,
      sentiment_score INTEGER,
      sentiment_label VARCHAR(50),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

  // Create predictions table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS predictions (
      chatbot_id UUID PRIMARY KEY,
      churn_risk INTEGER NOT NULL,
      suggestion TEXT,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      FOREIGN KEY (chatbot_id) REFERENCES chatbots(id) ON DELETE CASCADE
    )
  `)

  // Create dashboards table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS dashboards (
      user_id VARCHAR(255) PRIMARY KEY,
      layout_json JSONB NOT NULL DEFAULT '{}',
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)
}

export const down = async (db) => {
  await db.execute("DROP TABLE IF EXISTS dashboards")
  await db.execute("DROP TABLE IF EXISTS predictions")
  await db.execute("DROP TABLE IF EXISTS analytics")
  await db.execute("DROP TABLE IF EXISTS schedules")
  await db.execute("DROP TABLE IF EXISTS ab_tests")
  await db.execute("DROP TABLE IF EXISTS snapshots")
  await db.execute("DROP TABLE IF EXISTS wizard_sessions")
}

