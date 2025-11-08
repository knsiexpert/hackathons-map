import { type Hackathon, getStatusBadge, formatDate } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const gradients = [
  "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 hover:shadow-orange-500/50",
  "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/50",
  "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 hover:shadow-purple-500/50",
  "bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 hover:shadow-pink-500/50",
  "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 hover:shadow-green-500/50",
  "bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 hover:shadow-cyan-500/50",
]

export default function HackathonCard({ hackathon, colorIndex = 0, onClick }: { hackathon: Hackathon; colorIndex?: number; onClick?: () => void }) {
  const statusBadge = getStatusBadge(hackathon.status)
  const gradientClass = gradients[colorIndex % gradients.length]

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-primary/20 cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent">
            {hackathon.kategoria}
          </Badge>
          <Badge className={statusBadge.className}>{statusBadge.label}</Badge>
        </div>
        <CardTitle className="text-lg line-clamp-2">{hackathon.nazwa}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        <CardDescription className="line-clamp-3 text-sm">{hackathon.opis}</CardDescription>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-primary font-semibold">📍 Termin:</span>
            <span className="text-foreground">
              {formatDate(hackathon.data_odbycia)}
              {hackathon.data_odbycia_do && <> – {formatDate(hackathon.data_odbycia_do)}</>}
            </span>
          </div>

          {hackathon.status !== "zakończony" && hackathon.data_rejestracji_od && hackathon.data_rejestracji_do && (
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold">📝 Rejestracja:</span>
              <span className="text-foreground text-xs">
                {formatDate(hackathon.data_rejestracji_od)} – {formatDate(hackathon.data_rejestracji_do)}
              </span>
            </div>
          )}
        </div>

        <Button className={`mt-auto ${gradientClass} text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300 border-0`}>
          Szczegóły →
        </Button>
      </CardContent>
    </Card>
  )
}
