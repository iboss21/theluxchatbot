"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Check, Copy, ExternalLink, Info } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

interface EmbedCodeGeneratorProps {
  chatbotId: string
  chatbotName: string
  primaryColor: string
  theme: string
}

export function EmbedCodeGenerator({ chatbotId, chatbotName, primaryColor, theme }: EmbedCodeGeneratorProps) {
  const [position, setPosition] = useState<"bottom-right" | "bottom-left" | "top-right" | "top-left">("bottom-right")
  const [size, setSize] = useState<"small" | "medium" | "large">("medium")
  const [autoOpen, setAutoOpen] = useState(false)
  const [delay, setDelay] = useState(3)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [customDomain, setCustomDomain] = useState("")
  const [trackAnalytics, setTrackAnalytics] = useState(true)
  const [collectUserFeedback, setCollectUserFeedback] = useState(true)
  const [feedbackTiming, setFeedbackTiming] = useState(5)

  // Base URL for the chatbot embed script
  const baseUrl =
    typeof window !== "undefined" ? `${window.location.protocol}//${window.location.host}` : "https://thelux.app"

  // Generate the embed code
  const generateEmbedCode = () => {
    const sizeMap = {
      small: { width: 300, height: 400 },
      medium: { width: 350, height: 500 },
      large: { width: 400, height: 600 },
    }

    const { width, height } = sizeMap[size]
    const scriptUrl = customDomain
      ? `https://${customDomain}/api/embed/${chatbotId}.js`
      : `${baseUrl}/api/embed/${chatbotId}.js`

    return `<!-- TheLUX Chatbot Widget -->
<script>
(function(w, d, s, o) {
  w.TheLUXChatbot = o;
  var js = d.createElement(s);
  js.src = "${scriptUrl}";
  js.async = 1;
  js.defer = 1;
  js.dataset.position = "${position}";
  js.dataset.theme = "${theme}";
  js.dataset.primaryColor = "${primaryColor}";
  js.dataset.width = "${width}";
  js.dataset.height = "${height}";
  js.dataset.autoOpen = "${autoOpen}";
  js.dataset.autoOpenDelay = "${delay}";
  js.dataset.trackAnalytics = "${trackAnalytics}";
  js.dataset.collectFeedback = "${collectUserFeedback}";
  js.dataset.feedbackTiming = "${feedbackTiming}";
  d.getElementsByTagName("head")[0].appendChild(js);
})(window, document, "script", {});
</script>
<!-- End TheLUX Chatbot Widget -->`
  }

  const embedCode = generateEmbedCode()

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(embedCode)
      .then(() => {
        setCopied(true)
        toast({
          title: "Copied to clipboard",
          description: "The embed code has been copied to your clipboard.",
        })
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        toast({
          title: "Failed to copy",
          description: "Please try again or copy the code manually.",
          variant: "destructive",
        })
      })
  }

  const previewUrl = `${baseUrl}/embed/preview/${chatbotId}?position=${position}&theme=${theme}&primaryColor=${encodeURIComponent(primaryColor)}&size=${size}&autoOpen=${autoOpen}`

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Website Embed</CardTitle>
        <CardDescription>Generate code to embed your chatbot on your website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic Settings</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics & Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Select value={position} onValueChange={(value: any) => setPosition(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Size</Label>
                  <Select value={size} onValueChange={(value: any) => setSize(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoOpen">Auto-open chat</Label>
                    <p className="text-sm text-muted-foreground">Automatically open the chat after page load</p>
                  </div>
                  <Switch id="autoOpen" checked={autoOpen} onCheckedChange={setAutoOpen} />
                </div>

                {autoOpen && (
                  <div className="space-y-2">
                    <Label>Delay (seconds)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        min={1}
                        max={30}
                        value={delay}
                        onChange={(e) => setDelay(Number.parseInt(e.target.value) || 3)}
                      />
                      <span className="text-sm text-muted-foreground">seconds</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label>Preview</Label>
                <div className="border rounded-md bg-muted p-2 h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Preview how your chatbot will appear on your website
                    </p>
                    <Button variant="outline" size="sm" onClick={() => window.open(previewUrl, "_blank")}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customDomain">Custom Domain (Enterprise Only)</Label>
                <Input
                  id="customDomain"
                  placeholder="chatbot.yourdomain.com"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Use your own domain for the chatbot embed script (requires Enterprise plan)
                </p>
              </div>

              <div className="p-4 border rounded-md bg-amber-50 dark:bg-amber-950 flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-800 dark:text-amber-300">Custom Domain Setup</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    To use a custom domain, you'll need to add a CNAME record pointing to{" "}
                    <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">cname.thelux.app</code> in your DNS
                    settings. Contact support for assistance with this setup.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>JavaScript API</Label>
                <div className="p-4 bg-muted rounded-md font-mono text-sm">
                  <p>// Open the chatbot programmatically</p>
                  <p>window.TheLUXChatbot.open();</p>
                  <p className="mt-2">// Close the chatbot</p>
                  <p>window.TheLUXChatbot.close();</p>
                  <p className="mt-2">// Toggle the chatbot</p>
                  <p>window.TheLUXChatbot.toggle();</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use these JavaScript methods to control your chatbot programmatically
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="trackAnalytics">Track Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Collect usage data to improve your chatbot performance
                  </p>
                </div>
                <Switch id="trackAnalytics" checked={trackAnalytics} onCheckedChange={setTrackAnalytics} />
              </div>

              {trackAnalytics && (
                <div className="p-4 border rounded-md bg-muted">
                  <h4 className="font-medium mb-2">Analytics Collected:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Session duration</li>
                    <li>• Message count</li>
                    <li>• User location (country only)</li>
                    <li>• Device type</li>
                    <li>• Conversation completion rate</li>
                  </ul>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="collectUserFeedback">Collect User Feedback</Label>
                  <p className="text-sm text-muted-foreground">Ask users to rate their experience with your chatbot</p>
                </div>
                <Switch
                  id="collectUserFeedback"
                  checked={collectUserFeedback}
                  onCheckedChange={setCollectUserFeedback}
                />
              </div>

              {collectUserFeedback && (
                <div className="space-y-2">
                  <Label>Ask for feedback after</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      min={1}
                      max={20}
                      value={feedbackTiming}
                      onChange={(e) => setFeedbackTiming(Number.parseInt(e.target.value) || 5)}
                    />
                    <span className="text-sm text-muted-foreground">messages</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The chatbot will ask for feedback after this many messages
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Embed Code</Label>
            <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8">
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <Textarea
            readOnly
            value={embedCode}
            className="font-mono text-xs h-[150px]"
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
          <p className="text-sm text-muted-foreground">
            Copy and paste this code into your website's HTML, just before the closing &lt;/body&gt; tag.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Your chatbot ID: <code className="bg-muted p-1 rounded">{chatbotId}</code>
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(`${baseUrl}/dashboard/chatbots/${chatbotId}/test`, "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Test Chatbot
        </Button>
      </CardFooter>
    </Card>
  )
}

// Add default export
export default EmbedCodeGenerator

