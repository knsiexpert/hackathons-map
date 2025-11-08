export interface Hackathon {
  id: string
  nazwa: string
  opis: string
  data_rejestracji_od: string
  data_rejestracji_do: string
  data_odbycia: string
  data_odbycia_do?: string
  link: string
  kategoria: string
  status: "nadchodzący" | "rejestracja_trwa" | "rejestracja_wkrotce" | "zakończony" | "planowany"
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function getStatusBadge(status: Hackathon["status"]): { label: string; className: string } {
  const statusMap: Record<Hackathon["status"], { label: string; className: string }> = {
    nadchodzący: {
      label: "📅 Nadchodzący",
      className: "bg-blue-500/10 text-blue-700 border-blue-200 dark:text-blue-400 dark:border-blue-800",
    },
    rejestracja_trwa: {
      label: "✍️ Trwa rejestracja",
      className: "bg-green-500/10 text-green-700 border-green-200 dark:text-green-400 dark:border-green-800",
    },
    rejestracja_wkrotce: {
      label: "⏰ Rejestracja wkrótce",
      className: "bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800",
    },
    zakończony: {
      label: "✅ Zakończony",
      className: "bg-gray-500/10 text-gray-700 border-gray-200 dark:text-gray-400 dark:border-gray-800",
    },
    planowany: {
      label: "🔮 Planowany",
      className: "bg-purple-500/10 text-purple-700 border-purple-200 dark:text-purple-400 dark:border-purple-800",
    },
  }

  return statusMap[status] || {
    label: status || "Nieznany",
    className: "bg-gray-500/10 text-gray-700 border-gray-200 dark:text-gray-400 dark:border-gray-800",
  }
}
