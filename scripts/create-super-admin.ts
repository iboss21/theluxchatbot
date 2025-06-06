import fetch from "node-fetch"
import * as readline from "readline"
import * as dotenv from "dotenv"

// Load environment variables
dotenv.config()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function createSuperAdmin() {
  try {
    // Get API URL from environment or use default
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    const setupToken = process.env.SETUP_TOKEN || "thelux-setup-token"

    console.log("🔐 TheLUX Chat Super Admin Creator 🔐")
    console.log("=======================================")
    console.log("This script will create a super admin user with unlimited access.")
    console.log("This user will bypass all pricing tiers and restrictions.")
    console.log("=======================================\n")

    // Get user input
    const email = await question("Enter email for super admin: ")
    const name = await question("Enter name for super admin: ")
    const password = await question("Enter password for super admin: ")

    console.log("\nCreating super admin user...")

    // Call the API to create the super admin
    const response = await fetch(`${apiUrl}/api/admin/create-super-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-setup-token": setupToken,
      },
      body: JSON.stringify({ email, name, password }),
    })

    const result = await response.json()

    if (response.ok && result.success) {
      console.log("\n✅ Super admin created successfully!")
      console.log("\nSuper Admin Details:")
      console.log("-------------------")
      console.log(`Email: ${result.user.email}`)
      console.log(`Name: ${result.user.name}`)
      console.log(`Role: ${result.user.role}`)
      console.log(`Tier: ${result.user.tier}`)
      console.log("\nYou can now log in with these credentials.")
    } else {
      console.error("\n❌ Failed to create super admin:")
      console.error(result.error || "Unknown error")
    }
  } catch (error) {
    console.error("\n❌ Error:", error)
  } finally {
    rl.close()
  }
}

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer)
    })
  })
}

createSuperAdmin()

