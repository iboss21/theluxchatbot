"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal, Shield, User, Crown, X, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { apiClient, type User as ApiUser } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<ApiUser[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<ApiUser | null>(null)
  const [currentUser, setCurrentUser] = useState<ApiUser | null>(null)
  const [activeTab, setActiveTab] = useState("users")

  // Fetch users
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Get current user
        const currentUserResponse = await apiClient.getCurrentUser()
        if (currentUserResponse.data) {
          setCurrentUser(currentUserResponse.data)

          // Only admins can access this page
          if (currentUserResponse.data.role !== "admin") {
            window.location.href = "/dashboard"
            return
          }
        }

        // Get all users
        const usersResponse = await apiClient.getUsers()
        if (usersResponse.data) {
          setUsers(usersResponse.data)
        }
      } catch (error) {
        console.error("Failed to fetch users:", error)
        toast({
          title: "Error",
          description: "Failed to load users. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle role change
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await apiClient.updateUser(userId, { role: newRole as any })

      if (response.data) {
        setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole as any } : user)))

        toast({
          title: "Success",
          description: "User role updated",
        })
      }
    } catch (error) {
      console.error("Failed to update role:", error)
      toast({
        title: "Error",
        description: "Failed to update role. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle tier change
  const handleTierChange = async (userId: string, newTier: string) => {
    try {
      const response = await apiClient.updateUser(userId, { tier: newTier as any })

      if (response.data) {
        setUsers(users.map((user) => (user.id === userId ? { ...user, tier: newTier as any } : user)))

        toast({
          title: "Success",
          description: "User tier updated",
        })
      }
    } catch (error) {
      console.error("Failed to update tier:", error)
      toast({
        title: "Error",
        description: "Failed to update tier. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle user deletion
  const handleDeleteUser = async () => {
    if (!userToDelete) return

    try {
      const response = await apiClient.deleteUser(userToDelete.id)

      if (response.data?.success) {
        setUsers(users.filter((user) => user.id !== userToDelete.id))
        setDeleteDialogOpen(false)
        setUserToDelete(null)

        toast({
          title: "Success",
          description: `${userToDelete.name} has been deleted`,
        })
      }
    } catch (error) {
      console.error("Failed to delete user:", error)
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Render role badge
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30">
            <Shield className="h-3 w-3 mr-1" /> Admin
          </Badge>
        )
      case "editor":
        return (
          <Badge variant="default" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
            <User className="h-3 w-3 mr-1" /> Editor
          </Badge>
        )
      default:
        return (
          <Badge variant="default" className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">
            <User className="h-3 w-3 mr-1" /> Viewer
          </Badge>
        )
    }
  }

  // Render tier badge
  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "enterprise":
        return (
          <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-400/30">
            <Crown className="h-3 w-3 mr-1" /> Enterprise
          </Badge>
        )
      case "professional":
        return (
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-400/30">
            <Crown className="h-3 w-3 mr-1" /> Professional
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-500/20 text-gray-400 border-gray-400/30">
            Free
          </Badge>
        )
    }
  }

  if (loading) {
    return (
      <div className="container p-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-64" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40 mb-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System Status</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Card className="backdrop-blur-md bg-card/30 border border-border">
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
              <CardDescription>Manage users, roles, and subscription tiers</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? "No users found matching your search." : "No users found."}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">
                          {user.lastActive
                            ? `Last active: ${new Date(user.lastActive).toLocaleDateString()}`
                            : "Never logged in"}
                        </div>
                        <div className="flex gap-2">
                          {getRoleBadge(user.role)}
                          {getTierBadge(user.tier)}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Manage User</DropdownMenuLabel>

                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Change Role</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  <DropdownMenuRadioGroup
                                    value={user.role}
                                    onValueChange={(value) => handleRoleChange(user.id, value)}
                                  >
                                    <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="editor">Editor</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="viewer">Viewer</DropdownMenuRadioItem>
                                  </DropdownMenuRadioGroup>
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Crown className="mr-2 h-4 w-4" />
                                <span>Change Tier</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  <DropdownMenuRadioGroup
                                    value={user.tier}
                                    onValueChange={(value) => handleTierChange(user.id, value)}
                                  >
                                    <DropdownMenuRadioItem value="enterprise">Enterprise</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="professional">Professional</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="free">Free</DropdownMenuRadioItem>
                                  </DropdownMenuRadioGroup>
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuSeparator />

                            {user.id !== currentUser?.id && (
                              <DropdownMenuItem
                                onClick={() => {
                                  setUserToDelete(user)
                                  setDeleteDialogOpen(true)
                                }}
                                className="text-red-500 focus:text-red-500"
                              >
                                <X className="mr-2 h-4 w-4" />
                                <span>Delete User</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="backdrop-blur-md bg-card/30 border border-border">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current status of all system components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "API Server", status: "operational" },
                    { name: "Database", status: "operational" },
                    { name: "AI Models", status: "operational" },
                    { name: "Storage", status: "operational" },
                    { name: "Email Service", status: "operational" },
                  ].map((service) => (
                    <div
                      key={service.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                    >
                      <span className="font-medium">{service.name}</span>
                      <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-400/30">
                        <Check className="h-3 w-3 mr-1" /> Operational
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-card/30 border border-border">
              <CardHeader>
                <CardTitle>System Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "API Response Time", value: "87ms", change: "-5%" },
                    { name: "Database Queries", value: "1.2M/day", change: "+12%" },
                    { name: "Storage Usage", value: "42%", change: "+3%" },
                    { name: "AI Model Latency", value: "210ms", change: "-8%" },
                    { name: "Error Rate", value: "0.02%", change: "-15%" },
                  ].map((metric) => (
                    <div
                      key={metric.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                    >
                      <span className="font-medium">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span>{metric.value}</span>
                        <Badge
                          variant="outline"
                          className={
                            metric.change.startsWith("-")
                              ? "bg-green-500/20 text-green-400 border-green-400/30"
                              : "bg-blue-500/20 text-blue-400 border-blue-400/30"
                          }
                        >
                          {metric.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Delete User Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {userToDelete?.name}? This action cannot be undone and will remove all
              data associated with this user.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

