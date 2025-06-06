"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { formatDistanceToNow } from "date-fns"

interface Snapshot {
  id: string
  config_json: any
  timestamp: string
}

interface SnapshotsProps {
  chatbotId: string
}

export function ChatbotSnapshots({ chatbotId }: SnapshotsProps) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [selectedSnapshots, setSelectedSnapshots] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("snapshots")

  useEffect(() => {
    fetchSnapshots()
  }, [chatbotId])

  const fetchSnapshots = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/chatbots/${chatbotId}/snapshot`)

      if (!response.ok) throw new Error("Failed to fetch snapshots")

      const data = await response.json()
      setSnapshots(data.snapshots || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch snapshots. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createSnapshot = async () => {
    try {
      setCreating(true)

      // Fetch current chatbot config
      const configResponse = await fetch(`/api/chatbots/${chatbotId}`)

      if (!configResponse.ok) throw new Error("Failed to fetch chatbot config")

      const configData = await configResponse.json()

      // Create snapshot
      const response = await fetch(`/api/chatbots/${chatbotId}/snapshot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: configData.chatbot }),
      })

      if (!response.ok) throw new Error("Failed to create snapshot")

      toast({
        title: "Success",
        description: "Snapshot created successfully!",
      })

      // Refresh snapshots
      fetchSnapshots()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create snapshot. Please try again.",
        variant: "destructive",
      })
    } finally {
      setCreating(false)
    }
  }

  const restoreSnapshot = async (snapshotId: string) => {
    try {
      setLoading(true)

      // Get snapshot config
      const snapshot = snapshots.find((s) => s.id === snapshotId)

      if (!snapshot) throw new Error("Snapshot not found")

      // Update chatbot with snapshot config
      const response = await fetch(`/api/chatbots/${chatbotId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: snapshot.config_json }),
      })

      if (!response.ok) throw new Error("Failed to restore snapshot")

      toast({
        title: "Success",
        description: "Snapshot restored successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restore snapshot. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createABTest = async () => {
    try {
      if (selectedSnapshots.length !== 2) {
        toast({
          title: "Error",
          description: "Please select exactly 2 snapshots for A/B testing.",
          variant: "destructive",
        })
        return
      }

      setLoading(true)

      const response = await fetch(`/api/chatbots/${chatbotId}/ab-test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          snapshotA: selectedSnapshots[0],
          snapshotB: selectedSnapshots[1],
        }),
      })

      if (!response.ok) throw new Error("Failed to create A/B test")

      const data = await response.json()

      toast({
        title: "Success",
        description: "A/B test created successfully!",
      })

      // Reset selection
      setSelectedSnapshots([])

      // Switch to A/B tests tab
      setActiveTab("abtests")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create A/B test. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleSnapshotSelection = (snapshotId: string) => {
    setSelectedSnapshots((prev) => {
      if (prev.includes(snapshotId)) {
        return prev.filter((id) => id !== snapshotId)
      } else {
        // Limit to 2 selections for A/B testing
        if (prev.length >= 2) {
          return [prev[1], snapshotId]
        } else {
          return [...prev, snapshotId]
        }
      }
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Chatbot Versions</CardTitle>
        <Button onClick={createSnapshot} disabled={creating}>
          {creating ? "Creating..." : "Create Snapshot"}
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="snapshots" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="snapshots">Snapshots</TabsTrigger>
            <TabsTrigger value="abtests">A/B Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="snapshots">
            {loading ? (
              <div className="text-center py-4">Loading snapshots...</div>
            ) : snapshots.length === 0 ? (
              <div className="text-center py-4">No snapshots yet. Create your first snapshot!</div>
            ) : (
              <div className="space-y-4">
                {selectedSnapshots.length > 0 && (
                  <div className="flex items-center justify-between bg-muted p-4 rounded-md">
                    <div>
                      <span className="font-medium">{selectedSnapshots.length}/2</span> snapshots selected
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedSnapshots([])}>
                        Clear
                      </Button>
                      <Button size="sm" onClick={createABTest} disabled={selectedSnapshots.length !== 2}>
                        Create A/B Test
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {snapshots.map((snapshot) => (
                    <div
                      key={snapshot.id}
                      className={`p-4 border rounded-md ${
                        selectedSnapshots.includes(snapshot.id) ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Snapshot from {new Date(snapshot.timestamp).toLocaleString()}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(snapshot.timestamp), { addSuffix: true })}
                          </p>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm" onClick={() => toggleSnapshotSelection(snapshot.id)}>
                            {selectedSnapshots.includes(snapshot.id) ? "Deselect" : "Select"}
                          </Button>
                          <Button size="sm" onClick={() => restoreSnapshot(snapshot.id)}>
                            Restore
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="abtests">
            <div className="text-center py-4">
              A/B tests will be displayed here. Select two snapshots to create a test.
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

