const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

console.log("Starting aggressive pages directory removal")

// Function to recursively delete a directory
function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    console.log(`Deleting folder: ${folderPath}`)

    try {
      // Try using rm -rf first (works on Linux/macOS)
      execSync(`rm -rf "${folderPath}"`)
      console.log(`Successfully deleted ${folderPath} using rm -rf`)
      return
    } catch (error) {
      console.log(`rm -rf failed, falling back to manual deletion: ${error.message}`)
    }

    // Manual deletion as fallback
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
        console.log(`Deleted file: ${curPath}`)
      }
    })

    fs.rmdirSync(folderPath)
    console.log(`Deleted empty directory: ${folderPath}`)
  } else {
    console.log(`Folder does not exist: ${folderPath}`)
  }
}

// Get the absolute path to the pages directory
const pagesDir = path.join(process.cwd(), "pages")

// Delete the pages directory
deleteFolderRecursive(pagesDir)

// Create src directory if it doesn't exist
const srcDir = path.join(process.cwd(), "src")
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir)
  console.log(`Created src directory: ${srcDir}`)
}

// Delete the src/pages directory if it exists
const srcPagesDir = path.join(srcDir, "pages")
deleteFolderRecursive(srcPagesDir)

console.log("Pages directory removal completed")

// List all remaining .ts and .tsx files for debugging
try {
  console.log("Remaining .ts and .tsx files:")
  const result = execSync('find . -type f -name "*.ts" -o -name "*.tsx" | grep -v node_modules').toString()
  console.log(result)
} catch (error) {
  console.log("Error listing files:", error.message)
}

