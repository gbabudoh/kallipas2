const BANDS = [
  { grade: 'A', range: '92–100', colour: 'bg-green-600',    width: 'w-[55%]' },
  { grade: 'B', range: '81–91',  colour: 'bg-green-500',    width: 'w-[62%]' },
  { grade: 'C', range: '69–80',  colour: 'bg-lime-500',     width: 'w-[70%]' },
  { grade: 'D', range: '55–68',  colour: 'bg-yellow-400',   width: 'w-[78%]' },
  { grade: 'E', range: '39–54',  colour: 'bg-orange-400',   width: 'w-[85%]' },
  { grade: 'F', range: '21–38',  colour: 'bg-orange-600',   width: 'w-[90%]' },
  { grade: 'G', range: '1–20',   colour: 'bg-red-600',      width: 'w-full'  },
]

type Props = {
  current: string  // e.g. 'C'
  potential: string
}

export default function EPCRating({ current, potential }: Props) {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Energy Performance</p>
      <h3 className="font-black text-slate-900 tracking-tight mb-6">EPC Rating</h3>

      <div className="space-y-1.5">
        {BANDS.map(({ grade, range, colour, width }) => {
          const isCurrent   = grade === current
          const isPotential = grade === potential

          return (
            <div key={grade} className="flex items-center gap-3">
              {/* Bar */}
              <div className={`${width} ${colour} h-7 rounded-r-lg flex items-center px-3 relative`}>
                <span className="text-white text-[11px] font-black">{grade}</span>
                <span className="text-white/70 text-[9px] font-bold ml-2">{range}</span>
              </div>

              {/* Markers */}
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                {isCurrent && (
                  <span className="px-2 py-0.5 bg-slate-950 text-white rounded-md">Current</span>
                )}
                {isPotential && (
                  <span className="px-2 py-0.5 bg-[#0eaa99] text-white rounded-md">Potential</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-[9px] font-bold text-slate-300 mt-5 leading-relaxed">
        Energy performance ratings are indicative. A full EPC report is available upon request.
      </p>
    </div>
  )
}
