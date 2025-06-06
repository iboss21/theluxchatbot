const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Set environment variables for build time
process.env.NODE_ENV = "production"
process.env.NEXT_TELEMETRY_DISABLED = "1"

// Set a valid placeholder database URL for build time
process.env.DATABASE_URL = "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder?sslmode=require"

// Log the start of the build process
console.log("Starting build process with environment setup...")

// Function to remove a directory recursively
function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    console.log(`Removing directory: ${dirPath}`)
    try {
      // Use rm -rf for more reliable directory removal
      execSync(`rm -rf ${dirPath}`)
      console.log(`Successfully deleted ${dirPath} using rm -rf`)
    } catch (error) {
      console.error(`Error removing directory ${dirPath}:`, error)
    }
  } else {
    console.log(`Folder does not exist: ${dirPath}`)
  }
}

// Remove conflicting directories
console.log("Starting aggressive pages directory removal")
removeDirectory(path.join(process.cwd(), "pages"))
removeDirectory(path.join(process.cwd(), "src/pages"))
console.log("Pages directory removal completed")

// List remaining TypeScript files for debugging
console.log("Remaining .ts and .tsx files:")
try {
  const files = execSync('find . -name "*.ts" -o -name "*.tsx" | grep -v "node_modules" | sort').toString()
  console.log(files)
} catch (error) {
  console.error("Error listing TypeScript files:", error)
}

// Create a special build-time version of the not-found page
const notFoundDir = path.join(process.cwd(), "app")
const notFoundPath = path.join(notFoundDir, "not-found.tsx")
const notFoundBackupPath = path.join(notFoundDir, "not-found.tsx.bak")

// Backup the original not-found page if it exists
if (fs.existsSync(notFoundPath)) {
  console.log("Backing up original not-found page")
  fs.copyFileSync(notFoundPath, notFoundBackupPath)
}

// Run the Next.js build
try {
  console.log("Running Next.js build...")
  execSync("next build", { stdio: "inherit" })
  console.log("Build completed successfully")
} catch (error) {
  console.error("Build failed:", error)
  process.exit(1)
} finally {
  // Restore the original not-found page if it was backed up
  if (fs.existsSync(notFoundBackupPath)) {
    console.log("Restoring original not-found page")
    fs.copyFileSync(notFoundBackupPath, notFoundPath)
    fs.unlinkSync(notFoundBackupPath)
  }
}

