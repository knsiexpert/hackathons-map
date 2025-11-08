"use client"

import { useState, useMemo } from "react"
import { ExternalLink } from "lucide-react"
import type { Hackathon } from "@/lib/types"

interface CalendarViewProps {
  hackathons: Hackathon[]
}

export default function CalendarView({ hackathons }: CalendarViewProps) {
  const now = new Date()
  const [currentYear, setCurrentYear] = useState(now.getFullYear())
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null)

  const monthNames = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Pażdziernik",
    "Listopad",
    "Grudzień",
  ]

  const hackathonsByMonth = useMemo(() => {
    const grouped = new Map<number, Hackathon[]>()

    hackathons.forEach((hackathon) => {
      const date = new Date(hackathon.data_odbycia)
      if (date.getFullYear() === currentYear) {
        const month = date.getMonth()
        if (!grouped.has(month)) {
          grouped.set(month, [])
        }
        grouped.get(month)!.push(hackathon)
      }
    })

    return grouped
  }, [hackathons, currentYear])

  const sortedMonths = useMemo(() => {
    const months = Array.from(hackathonsByMonth.entries())
      .map(([month, events]) => ({
        month,
        events: events.sort((a, b) => new Date(a.data_odbycia).getTime() - new Date(b.data_odbycia).getTime()),
      }))
      .sort((a, b) => a.month - b.month)
    return months
  }, [hackathonsByMonth])

  const handlePrevYear = () => setCurrentYear(currentYear - 1)
  const handleNextYear = () => setCurrentYear(currentYear + 1)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("pl-PL", { day: "numeric", month: "long" })
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-12 gap-4">
        <button
          onClick={handlePrevYear}
          className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold transition-all duration-200 text-sm tracking-wider rounded-lg shadow-lg hover:shadow-orange-500/50 hover:shadow-2xl"
        >
          ← {currentYear - 1}
        </button>

        <h2 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-white via-orange-400 to-blue-400 bg-clip-text tracking-tighter">
          {currentYear}
        </h2>

        <button
          onClick={handleNextYear}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold transition-all duration-200 text-sm tracking-wider rounded-lg shadow-lg hover:shadow-blue-500/50 hover:shadow-2xl"
        >
          {currentYear + 1} →
        </button>
      </div>

      {sortedMonths.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-orange-500/20 p-12 text-center rounded-lg">
          <p className="text-muted-foreground text-lg">No hackathons in {currentYear}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMonths.map(({ month, events }) => (
            <div
              key={month}
              className="group relative bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400/60 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <h3 className="text-sm font-black text-transparent bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text mb-4 uppercase tracking-widest relative z-10">
                {monthNames[month]}
              </h3>
              <div className="space-y-3 relative z-10">
                {events.map((hackathon) => {
                  const date = new Date(hackathon.data_odbycia)
                  const day = date.getDate()

                  return (
                    <button
                      key={hackathon.id}
                      onClick={() => setSelectedHackathon(hackathon)}
                      className="w-full text-left px-4 py-3 bg-gradient-to-r from-gray-800/40 to-gray-700/20 hover:from-orange-600/30 hover:to-orange-500/20 border border-gray-700/50 hover:border-orange-500/60 rounded-lg transition-all duration-200 group/item text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-white text-xs shadow-lg">
                          {day}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white group-hover/item:text-orange-300 transition-colors truncate">
                            {hackathon.nazwa}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{hackathon.kategoria}</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedHackathon && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start md:items-center justify-center p-4 pt-20 md:pt-4 z-40 overflow-y-auto"
          onClick={() => setSelectedHackathon(null)}
        >
          <div 
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-orange-500/50 shadow-2xl shadow-orange-500/20 max-w-lg w-full p-6 md:p-8 rounded-lg relative my-8 max-h-[85vh] md:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none"></div>

            <div className="flex items-start justify-between mb-6 relative z-10">
              <h2 className="text-2xl font-black bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent flex-1 pr-4 uppercase tracking-tight">
                {selectedHackathon.nazwa}
              </h2>
              <button
                onClick={() => setSelectedHackathon(null)}
                className="text-gray-400 hover:text-orange-400 transition-colors flex-shrink-0 text-2xl w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6 border-t border-b border-orange-500/20 py-6 relative z-10">
              <div>
                <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-1">Data </p>
                <p className="text-sm text-gray-200 font-semibold">
                  {formatDate(selectedHackathon.data_odbycia)} – {formatDate(selectedHackathon.data_odbycia_do)}
                </p>
              </div>

              <div>
                <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-1">Kategoria</p>
                <p className="text-sm text-gray-200 font-semibold">{selectedHackathon.kategoria}</p>
              </div>

              <div>
                <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-1">Status</p>
                <p className="text-sm text-gray-200 font-semibold capitalize">{selectedHackathon.status}</p>
              </div>

              <div>
                <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-2">Opis</p>
                <p className="text-sm text-gray-300 leading-relaxed">{selectedHackathon.opis}</p>
              </div>
            </div>

            <a
              href={selectedHackathon.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black rounded-lg transition-all duration-200 text-sm uppercase tracking-wider shadow-lg hover:shadow-orange-500/50 hover:shadow-xl relative z-10"
            >
              Szczegóły
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
