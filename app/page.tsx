import { Suspense } from "react"
import FlashBillEmbed from "./components/flash-bill-embed"

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">FlashBill Payment</h1>
        <Suspense fallback={<div className="animate-pulse bg-gray-200 rounded-lg h-96" />}>
          <FlashBillEmbed />
        </Suspense>
      </div>
    </div>
  )
}
