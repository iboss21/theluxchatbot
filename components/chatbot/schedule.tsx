"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface ScheduleProps {
  chatbotId: string
}

interface DaySchedule {
  enabled: boolean
  start: string
  end: string
}

interface ActiveHours {
  [day: string]: DaySchedule
}

export function ChatbotSchedule({ chatbotId }: ScheduleProps) {
  const [activeHours, setActiveHours] = useState<ActiveHours>({
    monday: { enabled: true, start: "09:00", end: "17:00" },
    tuesday: { enabled: true, start: "09:00", end: "17:00" },
    wednesday: { enabled: true, start: "09:00", end: "17:00" },
    thursday: { enabled: true, start: "09:00", end: "17:00" },
    friday: { enabled: true, start: "09:00", end: "17:00" },
    saturday: { enabled: false, start: "09:00", end: "17:00" },
    sunday: { enabled: false, start: "09:00", end: "17:00" },
  })
  const [fallbackMessage, setFallbackMessage] = useState(
    "I'm currently offline. I'll be back during business hours to assist you!",
  )
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSchedule()
  }, [chatbotId])

  const fetchSchedule = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/chatbots/${chatbotId}/schedule`)

      if (!response.ok) throw new Error("Failed to fetch schedule")

      const data = await response.json()

      if (data.activeHours && Object.keys(data.activeHours).length > 0) {
        setActiveHours(data.activeHours)
      }

      if (data.fallbackMessage) {
        setFallbackMessage(data.fallbackMessage)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch schedule. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveSchedule = async () => {
    try {
      setSaving(true)

      const response = await fetch(`/api/chatbots/${chatbotId}/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activeHours,
          fallbackMessage,
        }),
      })

      if (!response.ok) throw new Error("Failed to save schedule")

      toast({
        title: "Success",
        description: "Schedule saved successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save schedule. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDayToggle = (day: string) => {
    setActiveHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
      },
    }))
  }

  const handleTimeChange = (day: string, field: "start" | "end", value: string) => {
    setActiveHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }))
  }

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chatbot Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading schedule...</div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Active Hours</h3>

              <div className="space-y-4">
                {days.map((day) => (
                  <div key={day.key} className="flex items-center space-x-4">
                    <div className="w-32">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={activeHours[day.key].enabled}
                          onCheckedChange={() => handleDayToggle(day.key)}
                        />
                        <Label>{day.label}</Label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={activeHours[day.key].start}
                        onChange={(e) => handleTimeChange(day.key, "start", e.target.value)}
                        disabled={!activeHours[day.key].enabled}
                        className="border rounded p-1"
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={activeHours[day.key].end}
                        onChange={(e) => handleTimeChange(day.key, "end", e.target.value)}
                        disabled={!activeHours[day.key].enabled}
                        className="border rounded p-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fallbackMessage">Offline Message</Label>
              <Textarea
                id="fallbackMessage"
                placeholder="Message to display when the chatbot is offline"
                value={fallbackMessage}
                onChange={(e) => setFallbackMessage(e.target.value)}
              />
            </div>

            <Button onClick={saveSchedule} disabled={saving}>
              {saving ? "Saving..." : "Save Schedule"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

