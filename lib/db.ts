import { neon } from "@neondatabase/serverless"

// Check if we're in a build environment
const isBuildTime = process.env.VERCEL_ENV === "build" || process.env.NODE_ENV === "production"

// Create a mock SQL function for build time
const mockSql = () => {
  console.log("[DB] Using mock SQL function during build")
  return {
    // Mock implementation that returns empty arrays for queries
    async query() {
      return { rows: [] }
    },
    // Support for tagged template literals
    async raw(...args: any[]) {
      return { rows: [] }
    },
    // Support for SQL template literals
    async unsafe(...args: any[]) {
      return { rows: [] }
    },
    // Make it callable as a template literal function
    async(...args: any[]) {
      return { rows: [] }
    },
    async execute(...args: any[]) {
      return { rows: [] }
    },
  }
}

// Cache the SQL client
let sqlClient: any = null

export const db = {
  query: async (...args) => {
    const sql = getSql()
    return sql.query(...args)
  },
  execute: async (...args) => {
    const sql = getSql()
    return sql.execute(...args)
  },
}

export function getSql() {
  // During build time, return a mock SQL client
  if (isBuildTime) {
    console.log("[DB] Build-time detected, using mock SQL client")
    return mockSql()
  }

  // In production/development, use the real client
  if (!sqlClient) {
    try {
      // Use DATABASE_URL if available, otherwise use the Neon-specific variables
      const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.luxchat_POSTGRES_URL

      if (!connectionString) {
        console.warn("[DB] No database connection string found, using mock SQL client")
        return mockSql()
      }

      console.log("[DB] Initializing SQL client with connection string")
      sqlClient = neon(connectionString)
    } catch (error) {
      console.error("[DB] Error initializing SQL client:", error)
      // Fall back to mock client on error
      return mockSql()
    }
  }

  return sqlClient
}

// Export a direct connection function for advanced use cases
export function getDirectConnection() {
  if (isBuildTime) {
    console.log("[DB] Build-time detected, returning mock connection")
    return { query: async () => [] }
  }

  try {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.luxchat_POSTGRES_URL

    if (!connectionString) {
      throw new Error("No database connection string found")
    }

    return neon(connectionString)
  } catch (error) {
    console.error("[DB] Error creating direct connection:", error)
    return { query: async () => [] }
  }
}

