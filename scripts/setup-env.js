// This script sets up environment variables for the build process
const fs = require("fs")
const path = require("path")

// Create a .env.local file with dummy values for build time
const envContent = `
# This file is generated automatically for build time
# These values are only used during build and will be replaced by actual values in production
NEXT_PUBLIC_API_URL=https://example.com/api
DATABASE_URL=postgresql://dummy:dummy@dummy.neon.tech/dummy
POSTGRES_URL=postgresql://dummy:dummy@dummy.neon.tech/dummy
`

// Write the file
fs.writeFileSync(path.join(process.cwd(), ".env.local"), envContent)
console.log("Created .env.local file with dummy values for build")

