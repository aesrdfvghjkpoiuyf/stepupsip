"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PieChart from "./pie-chart"
import { Download } from "lucide-react"
import { downloadSIPCalculatorPDF } from "@/lib/pdf-generator"

interface SIPResult {
  invested_amount: number
  growth_value: number
  maturity_amount: number
  stepup_invested_amount: number
  stepup_growth_value: number
  stepup_maturity_amount: number
}

interface ResultsDisplayProps {
  result: SIPResult
  sipAmount: number
  period: number
  interestRate: number
  stepupValue: number
}

function formatCurrency(value: number): string {
  return "Rs. " + Math.floor(value).toLocaleString("en-IN")
}

export default function ResultsDisplay({ result, sipAmount, period, interestRate, stepupValue }: ResultsDisplayProps) {
  const handleDownloadPDF = () => {
    downloadSIPCalculatorPDF({
      sipAmount,
      period,
      interestRate,
      stepupValue,
      invested_amount: result.invested_amount,
      growth_value: result.growth_value,
      maturity_amount: result.maturity_amount,
      stepup_invested_amount: result.stepup_invested_amount,
      stepup_growth_value: result.stepup_growth_value,
      stepup_maturity_amount: result.stepup_maturity_amount,
    })
  }

  return (
    <div className="space-y-6">
      {/* Pie Chart Section */}
      <Card className="p-6 bg-white border border-gray-200 flex flex-col items-center justify-center">
        <PieChart invested={result.stepup_invested_amount} growth={result.stepup_growth_value} />
      </Card>

      {/* Results Grid */}
      <Card className="p-6 bg-white border border-gray-200">
        <h3 className="text-gray-800 font-semibold mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Without Step Up */}
          <div>
            <p className="text-gray-600 text-sm mb-1">Total SIP Amount Invested with out step up</p>
            <p className="text-lg font-bold text-gray-900 mb-3">{formatCurrency(result.invested_amount)}</p>

            <p className="text-gray-600 text-sm mb-1">Total Growth with out step up</p>
            <p className="text-lg font-bold text-gray-900 mb-3">{formatCurrency(result.growth_value)}</p>

            <p className="text-gray-600 text-sm mb-1">Total Future Value</p>
            <p className="text-xs text-gray-500 mb-2">(Your SIP Investment Amount + Growth) with out step up</p>
            <p className="text-lg font-bold text-[#61D48A]">{formatCurrency(result.maturity_amount)}</p>
          </div>

          {/* With Step Up */}
          <div>
            <p className="text-gray-600 text-sm mb-1">Total SIP Amount Invested with step up</p>
            <p className="text-lg font-bold text-gray-900 mb-3">{formatCurrency(result.stepup_invested_amount)}</p>

            <p className="text-gray-600 text-sm mb-1">Total Growth with step up</p>
            <p className="text-lg font-bold text-gray-900 mb-3">{formatCurrency(result.stepup_growth_value)}</p>

            <p className="text-gray-600 text-sm mb-1">Total Future Value</p>
            <p className="text-xs text-gray-500 mb-2">(Your SIP Investment Amount + Growth) with step up</p>
            <p className="text-lg font-bold text-[#61D48A]">{formatCurrency(result.stepup_maturity_amount)}</p>
          </div>
        </div>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleDownloadPDF}
          className="bg-[#61D48A] hover:bg-[#1f2860] text-white px-6 py-2 rounded-md flex items-center gap-2"
        >
          <Download size={18} />
          Download PDF
        </Button>
      </div>
    </div>
  )
}
