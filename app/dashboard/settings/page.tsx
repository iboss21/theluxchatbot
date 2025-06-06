"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Globe, Bell, Shield, Key, Trash, Plus } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card className="backdrop-blur-md bg-card/30 border border-border">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input defaultValue="Demo User" className="glass-input w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input defaultValue="demo@example.com" className="glass-input w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input defaultValue="TheLUX Inc." className="glass-input w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <Input defaultValue="https://thelux.app" className="glass-input w-full" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card className="backdrop-blur-md bg-card/30 border border-border mt-6">
            <CardHeader>
              <CardTitle className="text-red-500">Danger Zone</CardTitle>
              <CardDescription>Irreversible account actions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Deleting your account will remove all of your data and cannot be undone.
              </p>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" /> Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="backdrop-blur-md bg-card/30 border border-border">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Email Notifications", "Push Notifications", "In-App Notifications"].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                    <div>
                      <h3 className="font-medium">{item}</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about chatbot activity and updates
                      </p>
                    </div>
                    <div className="flex items-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={index !== 2} className="sr-only peer" />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500">
                <Save className="mr-2 h-4 w-4" /> Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="backdrop-blur-md bg-card/30 border border-border">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Password</label>
                    <Input type="password" className="glass-input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <Input type="password" className="glass-input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                    <Input type="password" className="glass-input w-full" />
                  </div>
                </div>
                <Button className="mt-4 bg-gradient-to-r from-cyan-500 to-purple-500">Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="backdrop-blur-md bg-card/30 border border-border">
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for programmatic access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Production API Key</h3>
                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                      Active
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Input value="lux_api_••••••••••••••••••••••••" readOnly className="glass-input font-mono" />
                    <Button variant="outline">Copy</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Created on March 15, 2023 • Last used 2 days ago</p>
                </div>
              </div>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" /> Generate New API Key
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

