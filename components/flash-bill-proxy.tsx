"use client"

import { useState } from "react"
import { Loader2, ExternalLink, RefreshCw, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function FlashBillProxy() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const flashBillUrl = "https://flashbill.flashmobile.id/B1D74332A846C81896B391794929B8B0A59157"
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(flashBillUrl)}`

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
    const iframe = document.querySelector("iframe")
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  const openInNewTab = () => {
    window.open(flashBillUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Proxy Mode:</strong> Using server-side proxy to bypass CORS restrictions in development.
        </AlertDescription>
      </Alert>

      <div className="relative w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg border z-10">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm text-gray-600">Loading via proxy...</p>
            </div>
          </div>
        )}

        {hasError && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <ExternalLink className="h-5 w-5" />
                Proxy Failed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                The proxy couldn't load the FlashBill page. The website might have additional security measures.
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
        )}

        {!hasError && (
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-gray-50 border-b">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-sm text-gray-600 truncate mx-4">flashbill.flashmobile.id (via proxy)</div>
              <Button variant="ghost" size="sm" onClick={openInNewTab} className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>

            <iframe
              src={proxyUrl}
              className="w-full h-[600px] md:h-[700px] lg:h-[800px]"
              onLoad={handleLoad}
              onError={handleError}
              title="FlashBill Payment Page (Proxied)"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
              loading="lazy"
            />
          </div>
        )}

        <div className="mt-4 text-center">
          <Button variant="outline" onClick={openInNewTab} className="flex items-center gap-2 mx-auto bg-transparent">
            <ExternalLink className="h-4 w-4" />
            Open in Full Screen
          </Button>
        </div>
      </div>
    </div>
  )
}
