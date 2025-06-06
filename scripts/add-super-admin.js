// This script adds a super admin user directly to the database
// Run with: node scripts/add-super-admin.js

const { neon } = require("@neondatabase/serverless")
const crypto = require("crypto")
const { v4: uuidv4 } = require("uuid")
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function addSuperAdmin() {
  try {
    console.log("🔐 TheLUX Chat Super Admin Creator 🔐")
    console.log("=======================================")

    // Get database connection string
    const dbUrl = await question("Enter database connection URL: ")
    if (!dbUrl) {
      console.error("Database URL is required")
      return
    }

    // Connect to database
    const sql = neon(dbUrl)
    console.log("Connected to database")

    // Get user details
    const email = await question("Enter email for super admin: ")
    const name = await question("Enter name for super admin: ")
    const password = await question("Enter password for super admin: ")

    if (!email || !password || !name) {
      console.error("Email, password, and name are required")
      return
    }

    // Generate user ID and hash password
    const userId = uuidv4()
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")

    // Check if users table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `

    const usersTableExists = tableCheck[0]?.exists

    if (!usersTableExists) {
      console.log("Users table doesn't exist, creating it...")

      // Create users table
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          password_hash TEXT NOT NULL,
          password_salt TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'user',
          tier TEXT NOT NULL DEFAULT 'free',
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
          is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          login_count INTEGER NOT NULL DEFAULT 0,
          last_login TIMESTAMP
        );
      `

      console.log("Created users table")
    }

    // Check if user_permissions table exists
    const permissionsTableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'user_permissions'
      );
    `

    const permissionsTableExists = permissionsTableCheck[0]?.exists

    if (!permissionsTableExists) {
      console.log("User permissions table doesn't exist, creating it...")

      // Create permissions table
      await sql`
        CREATE TABLE IF NOT EXISTS user_permissions (
          id SERIAL PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          permission TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          UNIQUE(user_id, permission)
        );
      `

      console.log("Created user_permissions table")
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      console.log("User already exists, upgrading to super admin...")

      // Update existing user
      await sql`
        UPDATE users 
        SET role = 'super_admin', 
            tier = 'unlimited', 
            name = ${name}, 
            password_hash = ${hash}, 
            password_salt = ${salt},
            updated_at = NOW()
        WHERE email = ${email}
      `

      // Delete existing permissions
      await sql`
        DELETE FROM user_permissions WHERE user_id = ${existingUser[0].id}
      `

      // Add super admin permissions
      await sql`
        INSERT INTO user_permissions (user_id, permission)
        VALUES 
          (${existingUser[0].id}, 'bypass_limits'),
          (${existingUser[0].id}, 'manage_all_users'),
          (${existingUser[0].id}, 'access_all_features'),
          (${existingUser[0].id}, 'view_analytics'),
          (${existingUser[0].id}, 'manage_billing')
      `

      console.log(`\n✅ User ${email} upgraded to super admin successfully!`)
    } else {
      console.log("Creating new super admin user...")

      // Insert new user
      await sql`
        INSERT INTO users (
          id, email, name, password_hash, password_salt, 
          role, tier, is_email_verified, is_active
        ) VALUES (
          ${userId}, ${email}, ${name}, ${hash}, ${salt},
          'super_admin', 'unlimited', TRUE, TRUE
        )
      `

      // Add super admin permissions
      await sql`
        INSERT INTO user_permissions (user_id, permission)
        VALUES 
          (${userId}, 'bypass_limits'),
          (${userId}, 'manage_all_users'),
          (${userId}, 'access_all_features'),
          (${userId}, 'view_analytics'),
          (${userId}, 'manage_billing')
      `

      console.log(`\n✅ Super admin ${email} created successfully!`)
    }

    console.log("\nSuper Admin Details:")
    console.log("-------------------")
    console.log(`Email: ${email}`)
    console.log(`Name: ${name}`)
    console.log(`Role: super_admin`)
    console.log(`Tier: unlimited`)
    console.log("\nYou can now log in with these credentials.")
  } catch (error) {
    console.error("\n❌ Error:", error)
  } finally {
    rl.close()
  }
}

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer)
    })
  })
}

addSuperAdmin()

