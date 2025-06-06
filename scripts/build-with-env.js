const { execSync } = require("child_process")

// Set environment variables for build
process.env.VERCEL_ENV = "build"
process.env.NODE_ENV = "production"
process.env.NEXT_TELEMETRY_DISABLED = "1"

// Set a placeholder database URL to prevent connection errors
process.env.DATABASE_URL = "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder"
process.env.POSTGRES_URL = "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder"

console.log("Running build with environment variables:")
console.log("VERCEL_ENV:", process.env.VERCEL_ENV)
console.log("NODE_ENV:", process.env.NODE_ENV)
console.log("DATABASE_URL:", process.env.DATABASE_URL)

try {
  // First remove the pages directory
  console.log("Removing pages directories...")
  execSync("rm -rf pages src/pages", { stdio: "inherit" })

  // Run the Next.js build
  console.log("Running Next.js build...")
  execSync("next build", {
    stdio: "inherit",
    env: {
      ...process.env,
      VERCEL_ENV: "build",
      NODE_ENV: "production",
      DATABASE_URL: "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder",
      POSTGRES_URL: "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder",
    },
  })
} catch (error) {
  console.error("Build failed:", error.message)
  process.exit(1)
}

