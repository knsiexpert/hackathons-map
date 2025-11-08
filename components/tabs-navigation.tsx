"use client"

interface Tab {
  id: string
  label: string
  icon?: string
}

interface TabsNavigationProps {
  tabs: Tab[]
  defaultTab?: string
  onTabChange: (tabId: string) => void
  activeTab: string
}

export default function TabsNavigation({ tabs, onTabChange, activeTab }: TabsNavigationProps) {
  return (
    <div className="flex gap-2 border-b border-border overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base whitespace-nowrap transition-colors border-b-2 ${
            activeTab === tab.id
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
