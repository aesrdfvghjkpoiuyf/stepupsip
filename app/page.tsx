"use client"
import SIPCalculator from "@/components/sip-calculator"

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <SIPCalculator />
      </div>
    </main>
  )
}
