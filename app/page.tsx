"use client"

import { useState, useMemo, useEffect } from "react"
import Header from "@/components/header"
import HackathonCard from "@/components/hackathon-card"
import SortingControls from "@/components/sorting-controls"
import Footer from "@/components/footer"
import TabsNavigation from "@/components/tabs-navigation"
import CalendarView from "@/components/calendar-view"
import type { Hackathon } from "@/lib/types"

export default function Home() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([])
  const [activeTab, setActiveTab] = useState("calendar")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null)

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        // Dynamicznie wykryj czy jesteśmy na GitHub Pages
        const repoName = 'hackathons-calendar'
        const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io')
        const basePath = isGitHubPages ? `/${repoName}` : ''
        const address = isGitHubPages ? `https://knsiexpert.github.io/hackathons-calendar/hackathons.json` : '/hackathons-calendar/hackathons.json'
        const response = await fetch(address)
        if (!response.ok) {
          console.log("Failed to fetch hackathons.json")
          return
        }
        const data = await response.json()
        console.log("Loaded hackathons:", data.length)
        setHackathons(data)
      } catch (error) {
        console.log("Error loading hackathons:", error)
      }
    }

    fetchHackathons()
  }, [])

  const sortedAndFilteredHackathons = useMemo(() => {
    let filtered = hackathons

    if (filterStatus) {
      filtered = filtered.filter((h) => h.status === filterStatus)
    }

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.data_odbycia).getTime()
      const dateB = new Date(b.data_odbycia).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })
  }, [sortOrder, filterStatus, hackathons])

  const tabs = [
    { id: "calendar", label: "Kalendarz" },
    { id: "list", label: "Lista" },
  ]

  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-orange-500/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-l from-blue-500/25 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 py-12 pb-48 md:pb-12 relative z-10">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-orange-500/30 to-transparent rounded-full border border-orange-500/50 backdrop-blur-sm">
              <span className="text-orange-400 font-bold text-sm tracking-wider uppercase">Hackathons Calendar</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-balance bg-gradient-to-r from-white via-orange-400 to-blue-400 bg-clip-text text-transparent">
              Kalendarz Hackatonów
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto text-balance">
              Odkryj nadchodzące hackathony. Sortuj, filtruj i planuj swoją przygodę!
            </p>
          </div>

          <TabsNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="mt-8">
            {activeTab === "calendar" ? (
              <CalendarView hackathons={hackathons} />
            ) : (
              <>
                <SortingControls
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  totalCount={sortedAndFilteredHackathons.length}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-16 md:mb-0">
                  {sortedAndFilteredHackathons.length > 0 ? (
                    sortedAndFilteredHackathons.map((hackathon, index) => (
                      <HackathonCard 
                        key={hackathon.id} 
                        hackathon={hackathon} 
                        colorIndex={index}
                        onClick={() => setSelectedHackathon(hackathon)}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-lg text-muted-foreground">Brak hackatonów pasujących do wybranego filtra</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />

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
                <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-1">Data</p>
                <p className="text-sm text-gray-200 font-semibold">
                  {new Date(selectedHackathon.data_odbycia).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
                  {selectedHackathon.data_odbycia_do && <> – {new Date(selectedHackathon.data_odbycia_do).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}</>}
                </p>
              </div>

              {selectedHackathon.data_rejestracji_od && selectedHackathon.data_rejestracji_do && selectedHackathon.status !== "zakończony" && (
                <div>
                  <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-1">Rejestracja</p>
                  <p className="text-sm text-gray-200 font-semibold">
                    {new Date(selectedHackathon.data_rejestracji_od).toLocaleDateString("pl-PL", { day: "numeric", month: "long" })} – {new Date(selectedHackathon.data_rejestracji_do).toLocaleDateString("pl-PL", { day: "numeric", month: "long" })}
                  </p>
                </div>
              )}

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
              Zobacz więcej →
            </a>
          </div>
        </div>
      )}
    </>
  )
}
