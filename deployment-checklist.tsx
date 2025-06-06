"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Check, Clipboard, Terminal, Rocket, Zap, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function DeploymentChecklist() {
  const [activeTab, setActiveTab] = useState("prep")
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-2">
          TheLux.app Vercel Deployment
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Your step-by-step guide to deploy a 21st.dev-inspired, Glassmorphic masterpiece onto Vercel's serverless
          galaxy
        </p>
      </div>

      <Tabs defaultValue="prep" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="prep" className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span>Pre-Deployment</span>
          </TabsTrigger>
          <TabsTrigger value="deploy" className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            <span>Deployment</span>
          </TabsTrigger>
          <TabsTrigger value="verify" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Verification</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prep" className="space-y-4">
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-cyan-500" />
                Code Check
              </CardTitle>
              <CardDescription>Verify your project structure and key files before deployment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium">Project Structure</div>
                <div className="bg-black/20 p-3 rounded-md font-mono text-sm">
                  thelux-app/
                  <br />
                  ├── vercel.json
                  <br />
                  ├── next.config.js
                  <br />
                  ├── src/
                  <br />│ ├── pages/
                  <br />│ │ ├── index.tsx
                  <br />│ │ └── api/
                  <br />│ │ ├── chatbots.ts
                  <br />│ │ └── finetune.ts
                  <br />│ ├── components/
                  <br />│ │ ├── GlassCard.tsx
                  <br />│ │ └── LuxPreview.tsx
                  <br />│ └── styles/
                  <br />│ └── globals.css
                  <br />
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium">Quick Test Command</div>
                <div className="relative">
                  <pre className="bg-black/20 p-3 rounded-md font-mono text-sm">npm run build && npm start</pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => copyToClipboard("npm run build && npm start", "test-cmd")}
                  >
                    {copied === "test-cmd" ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-cyan-500" />
                Environment Variables
              </CardTitle>
              <CardDescription>Double-check your environment variables before deployment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-black/20 p-3 rounded-md font-mono text-sm whitespace-pre-wrap">
                  NEON_DB_URL=postgres://user:password@neon.tech/thelux?sslmode=require
                  <br />
                  OPENAI_API_KEY=sk-xxx
                  <br />
                  HUGGINGFACE_API_KEY=hf-xxx
                  <br />
                  ELEVENLABS_API_KEY=el-xxx
                  <br />
                  VERCEL_URL=https://thelux-app.vercel.app
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() =>
                    copyToClipboard(
                      "NEON_DB_URL=postgres://user:password@neon.tech/thelux?sslmode=require\nOPENAI_API_KEY=sk-xxx\nHUGGINGFACE_API_KEY=hf-xxx\nELEVENLABS_API_KEY=el-xxx\nVERCEL_URL=https://thelux-app.vercel.app",
                      "env-vars",
                    )
                  }
                >
                  {copied === "env-vars" ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </Button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Remember to add these to your Vercel project settings after deployment
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-cyan-500" />
                Git Commit (Optional)
              </CardTitle>
              <CardDescription>Commit your changes to link your repo to Vercel for auto-deploys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-black/20 p-3 rounded-md font-mono text-sm">
                  git add .<br />
                  git commit -m "Ready for Vercel supremacy"
                  <br />
                  git push
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() =>
                    copyToClipboard('git add .\ngit commit -m "Ready for Vercel supremacy"\ngit push', "git-cmd")
                  }
                >
                  {copied === "git-cmd" ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab("deploy")}>
                Continue to Deployment
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="deploy" className="space-y-4">
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-purple-500" />
                Deploy with Vercel CLI
              </CardTitle>
              <CardDescription>Deploy your project to Vercel using the CLI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium">Production Deployment Command</div>
                <div className="relative">
                  <pre className="bg-black/20 p-3 rounded-md font-mono text-sm">vercel --prod</pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => copyToClipboard("vercel --prod", "deploy-cmd")}
                  >
                    {copied === "deploy-cmd" ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium">Expected Output</div>
                <pre className="bg-black/20 p-3 rounded-md font-mono text-sm whitespace-pre-wrap">
                  Vercel CLI 28.20.0
                  <br />
                  {">"} Building project "thelux-app"
                  <br />
                  {">"} Deploying to production...
                  <br />
                  {">"} Success! Deployed to https://thelux-app.vercel.app
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-purple-500" />
                Domain Configuration
              </CardTitle>
              <CardDescription>Set up your custom domain for TheLux.app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium">DNS Configuration</div>
                <div className="bg-black/20 p-3 rounded-md font-mono text-sm">
                  CNAME: cname.vercel-dns.com
                  <br />
                  TXT: _vercel.thelux.app (token from Vercel)
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium">Verify DNS Propagation</div>
                <div className="relative">
                  <pre className="bg-black/20 p-3 rounded-md font-mono text-sm">dig thelux.app +short</pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => copyToClipboard("dig thelux.app +short", "dns-cmd")}
                  >
                    {copied === "dns-cmd" ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab("verify")}>
                Continue to Verification
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="verify" className="space-y-4">
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Performance Check
              </CardTitle>
              <CardDescription>Verify your application's performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium">Speed Test Command</div>
                <div className="relative">
                  <pre className="bg-black/20 p-3 rounded-md font-mono text-sm">
                    curl -w "%{"{time_total}"}\n" https://thelux.app/api/chatbots
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() =>
                      copyToClipboard('curl -w "%{time_total}\\n" https://thelux.app/api/chatbots', "speed-cmd")
                    }
                  >
                    {copied === "speed-cmd" ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/50">
                  Goal
                </Badge>
                <span className="text-sm">Response time under 100ms</span>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                UI/UX Verification
              </CardTitle>
              <CardDescription>Check that your 21st.dev-inspired UI is working correctly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Hero card: Glassmorphic, translucent, cyan glow on hover</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Lux Preview: Real-time response in 21st.dev widget</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Dashboard: Draggable tiles, neon accents</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Troubleshooting
              </CardTitle>
              <CardDescription>Common issues and their solutions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium">Check Logs</div>
                <div className="relative">
                  <pre className="bg-black/20 p-3 rounded-md font-mono text-sm">
                    vercel logs thelux-app.vercel.app --prod
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => copyToClipboard("vercel logs thelux-app.vercel.app --prod", "logs-cmd")}
                  >
                    {copied === "logs-cmd" ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium">Common Issues</div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div>
                      <span className="font-medium">Timeout Error:</span>
                      <span className="text-sm text-muted-foreground"> Bump maxDuration to 15s in vercel.json</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div>
                      <span className="font-medium">404 Error:</span>
                      <span className="text-sm text-muted-foreground"> Check rewrites in vercel.json</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div>
                      <span className="font-medium">Database Connection Failed:</span>
                      <span className="text-sm text-muted-foreground"> Verify NEON_DB_URL in Vercel dashboard</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="default"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                TheLux.app Is Served! 🎉
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

