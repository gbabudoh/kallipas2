'use client'

import { useState, useMemo } from 'react'
import { Calculator, TrendingDown } from 'lucide-react'

type Props = {
  askingPrice: number
  currency: string
}

function parseAskingPrice(price: string): number {
  // Strip currency symbols and commas, parse number
  const n = parseFloat(price.replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}

export default function MortgageCalculator({ askingPrice, currency }: Props) {
  const [deposit, setDeposit] = useState(20)
  const [rate, setRate] = useState(5.5)
  const [term, setTerm] = useState(25)

  const { monthly, totalRepayable, totalInterest, loanAmount } = useMemo(() => {
    const loan = askingPrice * (1 - deposit / 100)
    const r = rate / 100 / 12
    const n = term * 12
    if (r === 0) {
      const m = loan / n
      return { monthly: m, totalRepayable: loan, totalInterest: 0, loanAmount: loan }
    }
    const m = loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const total = m * n
    return {
      monthly: m,
      totalRepayable: total,
      totalInterest: total - loan,
      loanAmount: loan,
    }
  }, [askingPrice, deposit, rate, term])

  const fmt = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
    if (n >= 1_000)     return `${Math.round(n).toLocaleString()}`
    return Math.round(n).toString()
  }

  const depositAmount = askingPrice * (deposit / 100)

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-[#0eaa99]/10 rounded-xl flex items-center justify-center">
          <Calculator className="w-4 h-4 text-[#0eaa99]" />
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">Estimate</p>
          <h3 className="font-black text-slate-900 tracking-tight">Mortgage Calculator</h3>
        </div>
      </div>

      {askingPrice === 0 ? (
        <p className="text-sm text-slate-400 font-medium">Price not available for calculation.</p>
      ) : (
        <>
          {/* Result */}
          <div className="bg-[#0eaa99]/5 border border-[#0eaa99]/15 rounded-2xl p-5 mb-6 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#0eaa99] mb-1">
              Monthly Repayment
            </p>
            <p className="text-4xl font-black tracking-tight text-slate-900">
              {currency} {fmt(monthly)}
            </p>
            <p className="text-[10px] font-bold text-slate-400 mt-1">
              {term} yr · {rate}% APR · {deposit}% deposit
            </p>
          </div>

          {/* Sliders */}
          <div className="space-y-5">

            {/* Deposit */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deposit</label>
                <span className="text-[10px] font-black text-slate-700">
                  {deposit}% — {currency} {fmt(depositAmount)}
                </span>
              </div>
              <input
                type="range" min={5} max={50} step={5} value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
                className="w-full accent-[#0eaa99] h-1.5 rounded-full"
              />
              <div className="flex justify-between text-[9px] text-slate-300 font-black mt-1">
                <span>5%</span><span>50%</span>
              </div>
            </div>

            {/* Interest rate */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Interest Rate</label>
                <span className="text-[10px] font-black text-slate-700">{rate.toFixed(1)}%</span>
              </div>
              <input
                type="range" min={1} max={12} step={0.25} value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-[#0eaa99] h-1.5 rounded-full"
              />
              <div className="flex justify-between text-[9px] text-slate-300 font-black mt-1">
                <span>1%</span><span>12%</span>
              </div>
            </div>

            {/* Term */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mortgage Term</label>
                <span className="text-[10px] font-black text-slate-700">{term} years</span>
              </div>
              <input
                type="range" min={5} max={35} step={5} value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full accent-[#0eaa99] h-1.5 rounded-full"
              />
              <div className="flex justify-between text-[9px] text-slate-300 font-black mt-1">
                <span>5 yr</span><span>35 yr</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-slate-50">
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Loan Amount</p>
              <p className="font-black text-slate-800 text-sm">{currency} {fmt(loanAmount)}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Total Interest</p>
              <p className="font-black text-slate-800 text-sm flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-rose-400" />
                {currency} {fmt(totalInterest)}
              </p>
            </div>
            <div className="col-span-2 bg-slate-50 rounded-xl p-3">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Total Repayable</p>
              <p className="font-black text-slate-800">{currency} {fmt(totalRepayable)}</p>
            </div>
          </div>

          <p className="text-[9px] font-bold text-slate-300 mt-4 leading-relaxed">
            For illustrative purposes only. Consult a qualified mortgage advisor for a personalised quote.
          </p>
        </>
      )}
    </div>
  )
}
