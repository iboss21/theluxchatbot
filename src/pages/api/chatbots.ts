import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Return a sample response for now
    res.status(200).json({
      status: "ok",
      message: "Chatbots API ready!",
      chatbots: [
        { id: "lux-1", name: "Crystal Luxe", style: "Professional" },
        { id: "lux-2", name: "Neon Pulse", style: "Casual" },
        { id: "lux-3", name: "Royal Aura", style: "Elegant" },
      ],
    })
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}

