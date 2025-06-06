const fs = require("fs")
const path = require("path")

// Files to rename
const filesToRename = ["pages/api/chatbots.ts", "pages/dashboard.tsx", "pages/demo-accounts.tsx", "pages/index.tsx"]

// Function to safely rename a file
function safeRename(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath)
    const newPath = `${fullPath}.bak`

    if (fs.existsSync(fullPath)) {
      console.log(`Renaming file: ${filePath} to ${filePath}.bak`)
      fs.renameSync(fullPath, newPath)
      return true
    } else {
      console.log(`File does not exist: ${filePath}`)
      return false
    }
  } catch (error) {
    console.error(`Error renaming file ${filePath}:`, error)
    return false
  }
}

// Rename each file
let renamedCount = 0
filesToRename.forEach((file) => {
  if (safeRename(file)) {
    renamedCount++
  }
})

console.log(`File renaming completed. Renamed ${renamedCount} files.`)

// If we couldn't rename any files, create empty app directory files to ensure they exist
if (renamedCount === 0) {
  console.log("No files were renamed. Creating empty app directory files to ensure they exist.")

  const appFiles = ["app/api/chatbots/route.ts", "app/dashboard/page.tsx", "app/demo-accounts/page.tsx", "app/page.tsx"]

  appFiles.forEach((file) => {
    try {
      const fullPath = path.join(process.cwd(), file)
      const dirPath = path.dirname(fullPath)

      // Create directory if it doesn't exist
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }

      // Create empty file if it doesn't exist
      if (!fs.existsSync(fullPath)) {
        console.log(`Creating empty file: ${file}`)

        // Add appropriate content based on file type
        let content = ""
        if (file.endsWith("route.ts")) {
          content = `
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'API route working' });
}

export async function POST() {
  return NextResponse.json({ message: 'API route working' });
}
`
        } else if (file.endsWith("page.tsx")) {
          content = `
export default function Page() {
  return <div>This page is working</div>;
}
`
        }

        fs.writeFileSync(fullPath, content)
      }
    } catch (error) {
      console.error(`Error creating file ${file}:`, error)
    }
  })
}

