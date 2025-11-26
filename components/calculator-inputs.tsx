"use client"

import { Card } from "@/components/ui/card"

interface CalculatorInputsProps {
  sipAmount: number
  setSipAmount: (value: number) => void
  period: number
  setPeriod: (value: number) => void
  interestRate: number
  setInterestRate: (value: number) => void
  stepupValue: number
  setStepupValue: (value: number) => void
}

export default function CalculatorInputs({
  sipAmount,
  setSipAmount,
  period,
  setPeriod,
  interestRate,
  setInterestRate,
  stepupValue,
  setStepupValue,
}: CalculatorInputsProps) {
  return (
    <Card className="p-6 bg-white border border-gray-200">
      {/* SIP Amount Input */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <label className="text-gray-800 font-medium text-sm">How much you can invest through monthly SIP? (Rs)</label>
          <span className="text-[#61D48A] font-bold text-lg">{sipAmount.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000000"
          step="10000"
          value={sipAmount}
          onChange={(e) => setSipAmount(Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#61D48A]"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0</span>
          <span>25L</span>
          <span>50L</span>
          <span>75L</span>
          <span>1 Cr</span>
        </div>
      </div>

      {/* Period Input */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <label className="text-gray-800 font-medium text-sm">How many months will you continue the SIP?</label>
          <span className="text-[#61D48A] font-bold text-lg">{period}</span>
        </div>
        <input
          type="range"
          min="0"
          max="999"
          step="1"
          value={period}
          onChange={(e) => setPeriod(Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#61D48A]"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0</span>
          <span>250</span>
          <span>500</span>
          <span>750</span>
          <span>999</span>
        </div>
      </div>

      {/* Interest Rate Input */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <label className="text-gray-800 font-medium text-sm">What rate of return do you expect? (% per annum)</label>
          <span className="text-[#61D48A] font-bold text-lg">{interestRate.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="5"
          max="20"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#61D48A]"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>5</span>
          <span>7.5</span>
          <span>10</span>
          <span>12.5</span>
          <span>15</span>
          <span>17.5</span>
          <span>20</span>
        </div>
      </div>

      {/* Step Up Value Input */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <label className="text-gray-800 font-medium text-sm">
            How much percentage step up monthly SIP? (% per annum)
          </label>
          <span className="text-[#61D48A] font-bold text-lg">{stepupValue}</span>
        </div>
        <input
          type="range"
          min="0"
          max="60"
          step="1"
          value={stepupValue}
          onChange={(e) => setStepupValue(Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#61D48A]"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0</span>
          <span>15</span>
          <span>30</span>
          <span>45</span>
          <span>60</span>
        </div>
      </div>
    </Card>
  )
}
