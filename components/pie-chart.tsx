"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
  invested: number
  growth: number
}

export default function PieChart({ invested, growth }: PieChartProps) {
  const data = {
    labels: ["Current Cost", "Future Cost"],
    datasets: [
      {
        data: [invested, growth],
        backgroundColor: ["#293895", "#9fcc3a"],
        borderColor: ["#1a2555", "#7da526"],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
  }

  return (
    <div className="w-full max-w-sm">
      <Pie data={data} options={options} />
    </div>
  )
}
