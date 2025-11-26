"use client"

import { useState, useCallback, useEffect } from "react"
import { Card } from "@/components/ui/card"
import CalculatorInputs from "./calculator-inputs"
import ResultsDisplay from "./results-display"

interface SIPResult {
  status: number
  status_msg: string
  sip_amount: number
  interest_rate: number
  period: number
  sip_stepup_value: number
  invested_amount: number
  growth_value: number
  maturity_amount: number
  stepup_invested_amount: number
  stepup_growth_value: number
  stepup_maturity_amount: number
}

const API_KEY = "f1a1d4ea-2999-46e2-94a8-c77be61ee709"
const API_URL = "https://mfapi.advisorkhoj.com/calc/getSIPCalcStepUpResult"

export default function SIPCalculator() {
  const [sipAmount, setSipAmount] = useState(25000)
  const [period, setPeriod] = useState(120)
  const [interestRate, setInterestRate] = useState(12.5)
  const [stepupValue, setStepupValue] = useState(10)
  const [result, setResult] = useState<SIPResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCalculation = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        key: API_KEY,
        sip_amount: sipAmount.toString(),
        interest_rate: interestRate.toString(),
        period: period.toString(),
        sip_stepup_value: stepupValue.toString(),
      })

      const response = await fetch(`${API_URL}?${params}`)
      const data = await response.json()

      if (data.status === 200) {
        setResult(data)
      } else {
        setError("Failed to calculate SIP results")
      }
    } catch (err) {
      setError("Error fetching calculation. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [sipAmount, period, interestRate, stepupValue])

  // Fetch calculation on component mount and when values change
  useEffect(() => {
    const timer = setTimeout(fetchCalculation, 500)
    return () => clearTimeout(timer)
  }, [sipAmount, period, interestRate, stepupValue, fetchCalculation])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Inputs */}
      <div className="lg:col-span-1">
        <CalculatorInputs
          sipAmount={sipAmount}
          setSipAmount={setSipAmount}
          period={period}
          setPeriod={setPeriod}
          interestRate={interestRate}
          setInterestRate={setInterestRate}
          stepupValue={stepupValue}
          setStepupValue={setStepupValue}
        />
      </div>

      {/* Right Column - Results */}
      <div className="lg:col-span-2">
        {loading && (
          <Card className="p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Calculating...</p>
            </div>
          </Card>
        )}
        {error && (
          <Card className="p-8 bg-red-50">
            <p className="text-red-600">{error}</p>
          </Card>
        )}
        {result && !loading && (
          <ResultsDisplay
            result={result}
            sipAmount={sipAmount}
            period={period}
            interestRate={interestRate}
            stepupValue={stepupValue}
          />
        )}
      </div>
    </div>
  )
}
