import { db } from "../lib/db"
import * as completeSchema from "../lib/db-migrations/001-complete-schema"

async function runMigrations() {
  try {
    console.log("Starting database migrations...")

    // Run the complete schema migration
    await completeSchema.up(db)

    console.log("Database migrations completed successfully!")
  } catch (error) {
    console.error("Error running migrations:", error)
    process.exit(1)
  }
}

runMigrations()

