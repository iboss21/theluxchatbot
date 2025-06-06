"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Copy, ExternalLink, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import type { Chatbot } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"
import { useRouter, useSearchParams } from "next/navigation"

export default function ChatbotsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const refreshParam = searchParams.get("refresh")

  const [loading, setLoading] = useState(true)
  const [chatbots, setChatbots] = useState<Chatbot[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [chatbotToDelete, setChatbotToDelete] = useState<Chatbot | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  // Fetch chatbots
  const fetchChatbots = async () => {
    setLoading(true)
    try {
      // Use a cache-busting query parameter to ensure we get fresh data
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/chatbots?t=${timestamp}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch chatbots: ${response.status}`)
      }

      const data = await response.json()
      console.log("Fetched chatbots:", data)
      setChatbots(data)
    } catch (error) {
      console.error("Failed to fetch chatbots:", error)
      toast({
        title: "Error",
        description: "Failed to load chatbots. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchChatbots()
  }, [])

  // If we have a refresh parameter, refresh the data
  useEffect(() => {
    if (refreshParam) {
      fetchChatbots()
    }
  }, [refreshParam])

  // Handle manual refresh
  const handleRefresh = () => {
    setRefreshing(true)
    fetchChatbots()
  }

  // Filter chatbots based on search query
  const filteredChatbots = chatbots.filter(
    (bot) =>
      bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bot.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle chatbot deletion
  const handleDeleteClick = (chatbot: Chatbot) => {
    setChatbotToDelete(chatbot)
    setDeleteDialogOpen(true)
  }

  // Confirm deletion
  const confirmDelete = async () => {
    if (!chatbotToDelete) return

    try {
      const response = await fetch(`/api/chatbots/${chatbotToDelete.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setChatbots(chatbots.filter((bot) => bot.id !== chatbotToDelete.id))
        setDeleteDialogOpen(false)
        setChatbotToDelete(null)

        toast({
          title: "Success",
          description: `${chatbotToDelete.name} has been deleted`,
        })
      } else {
        throw new Error("Failed to delete chatbot")
      }
    } catch (error) {
      console.error("Failed to delete chatbot:", error)
      toast({
        title: "Error",
        description: "Failed to delete chatbot. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Navigate to create new chatbot
  const handleCreateNew = () => {
    router.push("/dashboard/chatbots/new/wizard")
  }

  if (loading) {
    return (
      <div className="container p-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Chatbots</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={refreshing} title="Refresh chatbots">
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
          <Button onClick={handleCreateNew} className="bg-gradient-to-r from-cyan-500 to-purple-500">
            <Plus className="mr-2 h-4 w-4" /> Create New Chatbot
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chatbots..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="md:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      {filteredChatbots.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No chatbots found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery ? "Try a different search term" : "Create your first chatbot to get started"}
          </p>
          {!searchQuery && (
            <Button onClick={handleCreateNew} className="bg-gradient-to-r from-cyan-500 to-purple-500">
              <Plus className="mr-2 h-4 w-4" /> Create New Chatbot
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChatbots.map((chatbot) => (
            <div
              key={chatbot.id}
              className="backdrop-blur-md bg-card/30 border border-border rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3
                    className="text-xl font-bold cursor-pointer hover:text-primary"
                    onClick={() => router.push(`/dashboard/chatbots/${chatbot.id}`)}
                  >
                    {chatbot.name}
                  </h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/chatbots/${chatbot.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/chatbots/new?duplicate=${chatbot.id}`)}>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Duplicate</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        <span>View Live</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-500 focus:text-red-500"
                        onClick={() => handleDeleteClick(chatbot)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">{chatbot.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-muted-foreground">
                    <span>{chatbot.messages} messages</span>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      chatbot.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {chatbot.status === "active" ? "Active" : "Inactive"}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Updated {new Date(chatbot.lastUpdated).toLocaleDateString()}
                  </div>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary hover:underline"
                    onClick={() => router.push(`/dashboard/chatbots/${chatbot.id}`)}
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chatbot</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{chatbotToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

