import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { snapshotA, snapshotB } = await request.json()

    if (!snapshotA || !snapshotB) {
      return NextResponse.json({ error: "Both snapshot IDs are required" }, { status: 400 })
    }

    // Create a new A/B test
    const testResult = await db.query(
      `INSERT INTO ab_tests (chatbot_id, snapshot_a, snapshot_b) 
       VALUES ($1, $2, $3) RETURNING id`,
      [id, snapshotA, snapshotB],
    )

    const testId = testResult.rows[0].id

    return NextResponse.json({ testId })
  } catch (error) {
    console.error("Error creating A/B test:", error)
    return NextResponse.json({ error: "Failed to create A/B test" }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { searchParams } = new URL(request.url)
    const testId = searchParams.get("testId")

    if (testId) {
      // Get a specific test
      const testResult = await db.query(
        `SELECT * FROM ab_tests 
         WHERE id = $1 AND chatbot_id = $2`,
        [testId, id],
      )

      if (testResult.rows.length === 0) {
        return NextResponse.json({ error: "Test not found" }, { status: 404 })
      }

      const test = testResult.rows[0]

      // Get engagement metrics for both snapshots
      // This is a simplified example - in a real app, you'd have more sophisticated metrics
      const engagementA = await db.query(
        `SELECT AVG(engagement) as avg_engagement 
         FROM interactions 
         WHERE chatbot_id = $1 AND snapshot_id = $2`,
        [id, test.snapshot_a],
      )

      const engagementB = await db.query(
        `SELECT AVG(engagement) as avg_engagement 
         FROM interactions 
         WHERE chatbot_id = $1 AND snapshot_id = $2`,
        [id, test.snapshot_b],
      )

      return NextResponse.json({
        test,
        results: {
          snapshotA: {
            engagement: engagementA.rows[0]?.avg_engagement || 0,
          },
          snapshotB: {
            engagement: engagementB.rows[0]?.avg_engagement || 0,
          },
        },
      })
    } else {
      // Get all tests for this chatbot
      const tests = await db.query(
        `SELECT * FROM ab_tests 
         WHERE chatbot_id = $1 
         ORDER BY start_date DESC`,
        [id],
      )

      return NextResponse.json({ tests: tests.rows })
    }
  } catch (error) {
    console.error("Error fetching A/B test:", error)
    return NextResponse.json({ error: "Failed to fetch A/B test" }, { status: 500 })
  }
}

