"use client"

import { useState, useEffect } from "react"
import { Loader2, ExternalLink, RefreshCw, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function FlashBillEmbed() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isDevelopment, setIsDevelopment] = useState(false)
  const flashBillUrl = "https://flashbill.flashmobile.id/B1D74332A846C81896B391794929B8B0A59157"

  useEffect(() => {
    setIsDevelopment(process.env.NODE_ENV === "development")
  }, [])

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setHasError(false)
    // Force iframe reload by changing key
    const iframe = document.querySelector("iframe")
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  const openInNewTab = () => {
    window.open(flashBillUrl, "_blank", "noopener,noreferrer")
  }

  // Show CORS warning in development
  if (isDevelopment && hasError) {
    return (
      <div className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>CORS Error in Development</strong>
            <br />
            The FlashBill website blocks embedding in local development due to CORS policy.
          </AlertDescription>
        </Alert>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Info className="h-5 w-5" />
              Development Mode Solutions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Option 1: Open in New Tab (Recommended)</h4>
                <Button onClick={openInNewTab} className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Open FlashBill Payment
                </Button>
              </div>

              <div>
                <h4 className="font-medium mb-2">Option 2: Use Browser with Disabled Security</h4>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <p className="mb-2">Start Chrome with disabled web security:</p>
                  <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                    chrome --disable-web-security --user-data-dir="/tmp/chrome_dev"
                  </code>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Option 3: Deploy to Production</h4>
                <p className="text-sm text-gray-600">
                  The iframe will work properly when deployed to production (Vercel, Netlify, etc.)
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" onClick={handleRefresh} className="flex items-center gap-2 bg-transparent">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (hasError) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <ExternalLink className="h-5 w-5" />
            Unable to Load FlashBill
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            The FlashBill page couldn't be loaded in the embedded view. This might be due to security restrictions.
          </p>
          <div className="flex gap-2">
            <Button onClick={openInNewTab} className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Open in New Tab
            </Button>
            <Button variant="outline" onClick={handleRefresh} className="flex items-center gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="relative w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg border z-10">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600">Loading FlashBill...</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-3 bg-gray-50 border-b">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-600 truncate mx-4">flashbill.flashmobile.id</div>
          <Button variant="ghost" size="sm" onClick={openInNewTab} className="flex items-center gap-1">
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>

        <iframe
          src={flashBillUrl}
          className="w-full h-[600px] md:h-[700px] lg:h-[800px]"
          onLoad={handleLoad}
          onError={handleError}
          title="FlashBill Payment Page"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          loading="lazy"
        />
      </div>

      <div className="mt-4 text-center">
        <Button variant="outline" onClick={openInNewTab} className="flex items-center gap-2 mx-auto bg-transparent">
          <ExternalLink className="h-4 w-4" />
          Open in Full Screen
        </Button>
      </div>
    </div>
  )
}
