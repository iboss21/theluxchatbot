"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Mail, MoreHorizontal, X, AlertTriangle, Shield, User, Crown } from "lucide-react"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { apiClient, type TeamMember, type Invitation } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

export default function TeamPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [team, setTeam] = useState<TeamMember[]>([])
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null)
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "viewer",
    tier: "free",
  })
  const [activeTab, setActiveTab] = useState("members")

  // Fetch team members and invitations
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const teamResponse = await apiClient.getTeamMembers()
        if (teamResponse.data) {
          setTeam(teamResponse.data)
        }

        const invitationsResponse = await apiClient.getPendingInvitations()
        if (invitationsResponse.data) {
          setInvitations(invitationsResponse.data)
        }
      } catch (error) {
        console.error("Failed to fetch team data:", error)
        toast({
          title: "Error",
          description: "Failed to load team data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  // Handle invite submission
  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inviteForm.email) {
      toast({
        title: "Error",
        description: "Email is required",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await apiClient.inviteTeamMember(inviteForm.email, inviteForm.role, inviteForm.tier)

      if (response.data) {
        setInvitations([...invitations, response.data])
        setInviteDialogOpen(false)
        setInviteForm({
          email: "",
          role: "viewer",
          tier: "free",
        })

        toast({
          title: "Success",
          description: `Invitation sent to ${inviteForm.email}`,
        })
      }
    } catch (error) {
      console.error("Failed to send invitation:", error)
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle member removal
  const handleRemoveMember = async () => {
    if (!memberToRemove) return

    try {
      const response = await apiClient.removeTeamMember(memberToRemove.id)

      if (response.data?.success) {
        setTeam(team.filter((member) => member.id !== memberToRemove.id))
        setRemoveDialogOpen(false)
        setMemberToRemove(null)

        toast({
          title: "Success",
          description: `${memberToRemove.name} has been removed from the team`,
        })
      }
    } catch (error) {
      console.error("Failed to remove team member:", error)
      toast({
        title: "Error",
        description: "Failed to remove team member. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle invitation cancellation
  const handleCancelInvitation = async (id: string) => {
    try {
      const response = await apiClient.cancelInvitation(id)

      if (response.data?.success) {
        setInvitations(invitations.filter((inv) => inv.id !== id))

        toast({
          title: "Success",
          description: "Invitation has been cancelled",
        })
      }
    } catch (error) {
      console.error("Failed to cancel invitation:", error)
      toast({
        title: "Error",
        description: "Failed to cancel invitation. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle role change
  const handleRoleChange = async (memberId: string, newRole: string) => {
    try {
      const response = await apiClient.updateTeamMember(memberId, { role: newRole as any })

      if (response.data) {
        setTeam(team.map((member) => (member.id === memberId ? { ...member, role: newRole as any } : member)))

        toast({
          title: "Success",
          description: "Team member role updated",
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
  const handleTierChange = async (memberId: string, newTier: string) => {
    try {
      const response = await apiClient.updateTeamMember(memberId, { tier: newTier as any })

      if (response.data) {
        setTeam(team.map((member) => (member.id === memberId ? { ...member, tier: newTier as any } : member)))

        toast({
          title: "Success",
          description: "Team member tier updated",
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
          <Skeleton className="h-10 w-40" />
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
        <h1 className="text-3xl font-bold">Team Management</h1>
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500">
              <Plus className="mr-2 h-4 w-4" /> Invite Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your team. They'll receive an email with instructions.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInvite}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="colleague@example.com"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <Select
                    value={inviteForm.role}
                    onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {inviteForm.role === "admin"
                      ? "Admins have full access to all features and can manage team members."
                      : inviteForm.role === "editor"
                        ? "Editors can create and modify chatbots, but cannot manage team members."
                        : "Viewers can only view chatbots and analytics, but cannot make changes."}
                  </p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="tier" className="text-sm font-medium">
                    Subscription Tier
                  </label>
                  <Select
                    value={inviteForm.tier}
                    onValueChange={(value) => setInviteForm({ ...inviteForm, tier: value })}
                  >
                    <SelectTrigger id="tier">
                      <SelectValue placeholder="Select a tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {inviteForm.tier === "enterprise"
                      ? "Enterprise tier includes unlimited chatbots, priority support, and advanced features."
                      : inviteForm.tier === "professional"
                        ? "Professional tier includes up to 10 chatbots and standard support."
                        : "Free tier includes up to 3 chatbots with basic features."}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setInviteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Send Invitation</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="members" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="invitations">Pending Invitations</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <Card className="backdrop-blur-md bg-card/30 border border-border">
            <CardHeader>
              <CardTitle>Team Members ({team.length})</CardTitle>
              <CardDescription>Manage your team members and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              {team.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No team members found. Invite someone to get started.
                </div>
              ) : (
                <div className="space-y-4">
                  {team.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span>{member.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">
                          {member.lastActive
                            ? `Last active: ${new Date(member.lastActive).toLocaleDateString()}`
                            : "Never logged in"}
                        </div>
                        <div className="flex gap-2">
                          {getRoleBadge(member.role)}
                          {getTierBadge(member.tier)}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Manage Member</DropdownMenuLabel>

                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Change Role</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  <DropdownMenuRadioGroup
                                    value={member.role}
                                    onValueChange={(value) => handleRoleChange(member.id, value)}
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
                                    value={member.tier}
                                    onValueChange={(value) => handleTierChange(member.id, value)}
                                  >
                                    <DropdownMenuRadioItem value="enterprise">Enterprise</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="professional">Professional</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="free">Free</DropdownMenuRadioItem>
                                  </DropdownMenuRadioGroup>
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() => {
                                setMemberToRemove(member)
                                setRemoveDialogOpen(true)
                              }}
                              className="text-red-500 focus:text-red-500"
                            >
                              <X className="mr-2 h-4 w-4" />
                              <span>Remove</span>
                            </DropdownMenuItem>
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

        <TabsContent value="invitations">
          <Card className="backdrop-blur-md bg-card/30 border border-border">
            <CardHeader>
              <CardTitle>Pending Invitations ({invitations.length})</CardTitle>
              <CardDescription>Manage your pending team invitations</CardDescription>
            </CardHeader>
            <CardContent>
              {invitations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No pending invitations at this time.</div>
              ) : (
                <div className="space-y-4">
                  {invitations.map((invitation) => (
                    <div
                      key={invitation.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-background/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{invitation.email}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Invited: {new Date(invitation.invitedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                          {getRoleBadge(invitation.role)}
                          {getTierBadge(invitation.tier)}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleCancelInvitation(invitation.id)}>
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Remove Member Dialog */}
      <Dialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {memberToRemove?.name} from your team? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemoveMember}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

