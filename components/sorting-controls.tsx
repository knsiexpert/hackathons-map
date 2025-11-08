"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SortingControlsProps {
  sortOrder: "asc" | "desc"
  setSortOrder: (order: "asc" | "desc") => void
  filterStatus: string | null
  setFilterStatus: (status: string | null) => void
  totalCount: number
}

const statusOptions = [
  { value: "nadchodzący", label: "📅 Nadchodzące" },
  { value: "rejestracja_trwa", label: "✍️ Trwa rejestracja" },
  { value: "rejestracja_wkrotce", label: "⏰ Rejestracja wkrótce" },
  { value: "zakończony", label: "✅ Zakończone" },
  { value: "planowany", label: "🔮 Planowane" },
]

export default function SortingControls({
  sortOrder,
  setSortOrder,
  filterStatus,
  setFilterStatus,
  totalCount,
}: SortingControlsProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Sort Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <span className="font-semibold text-foreground text-sm">Sortowanie:</span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={sortOrder === "asc" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortOrder("asc")}
                className="text-xs whitespace-nowrap"
              >
                📈 Od najstarszych
              </Button>
              <Button
                variant={sortOrder === "desc" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortOrder("desc")}
                className="text-xs whitespace-nowrap"
              >
                📉 Od najnowszych
              </Button>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            Wyników: <span className="font-semibold">{totalCount}</span>
          </span>
        </div>

        {/* Status Filters */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-foreground text-sm">Filtr statusu:</span>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={filterStatus === null ? "default" : "outline"}
              className="cursor-pointer hover:shadow-md transition-all"
              onClick={() => setFilterStatus(null)}
            >
              ⭐ Wszystkie
            </Badge>
            {statusOptions.map((option) => (
              <Badge
                key={option.value}
                variant={filterStatus === option.value ? "default" : "outline"}
                className="cursor-pointer hover:shadow-md transition-all"
                onClick={() => setFilterStatus(option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
