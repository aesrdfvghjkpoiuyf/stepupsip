import jsPDF from "jspdf"
import "jspdf-autotable"

interface SIPData {
  sipAmount: number
  period: number
  interestRate: number
  stepupValue: number
  invested_amount: number
  growth_value: number
  maturity_amount: number
  stepup_invested_amount: number
  stepup_growth_value: number
  stepup_maturity_amount: number
}

function formatCurrency(value: number): string {
  return "Rs. " + value.toLocaleString("en-IN")
}

export function downloadSIPCalculatorPDF(data: SIPData) {
  const doc = new jsPDF()
  let yPosition = 20

  doc.setFontSize(28)
  doc.setTextColor(41, 56, 149) // Blue color
  doc.text("Fiscus Grow", 20, yPosition)
  doc.setTextColor(0, 0, 0) // Reset to black
  yPosition += 15

  // Title
  doc.setFontSize(24)
  doc.text("SIP Calculator", 20, yPosition)
  yPosition += 15

  // Your Input Values Section
  doc.setFontSize(14)
  doc.text("Your Input Values", 20, yPosition)
  yPosition += 10

  // Input Table
  const inputTableColumn = ["Name", "Value"]
  const inputTableRows = [
    ["How much you can invest through monthly SIP? (Rs)", formatCurrency(data.sipAmount)],
    ["How many months will you continue the SIP?", `${data.period} Months`],
    ["What rate of return do you expect? (% per annum)", `${data.interestRate}%`],
    ["How much percentage step up monthly SIP? (% per annum)", `${data.stepupValue}%`],
  ]

  doc.setFontSize(10)
  ;(doc as any).autoTable({
    startY: yPosition,
    head: [inputTableColumn],
    body: inputTableRows,
    theme: "grid",
    headStyles: {
      fillColor: [41, 56, 149], // Blue
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
  })

  yPosition = (doc as any).lastAutoTable.finalY + 15

  // Result Section
  doc.setFontSize(14)
  doc.text("Result", 20, yPosition)
  yPosition += 10

  // Result Table
  const resultTableColumn = ["Name", "Value"]
  const resultTableRows = [
    ["Total SIP Amount Invested", formatCurrency(data.invested_amount)],
    ["Total Growth", formatCurrency(data.growth_value)],
    ["Total Future Value (Your SIP Investment Amount + Growth)", formatCurrency(data.maturity_amount)],
    ["Total SIP Amount Invested with step up", formatCurrency(data.stepup_invested_amount)],
    ["Total Growth with step up", formatCurrency(data.stepup_growth_value)],
    ["Total Future Value with step up", formatCurrency(data.stepup_maturity_amount)],
  ]
  ;(doc as any).autoTable({
    startY: yPosition,
    head: [resultTableColumn],
    body: resultTableRows,
    theme: "grid",
    headStyles: {
      fillColor: [41, 56, 149], // Blue
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
  })

  // Save the PDF
  doc.save("SIP-Calculator-Report.pdf")
}
