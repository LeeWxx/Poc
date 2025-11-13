import { forwardRef } from 'react'
import type { Tab } from '../data/tabs'
import { SectionCard } from './SectionCard'

interface TabPanelProps {
  tab: Tab
  collapsed: Record<string, boolean>
  onToggleSection: (sectionId: string) => void
  isActive: boolean
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ tab, collapsed, onToggleSection, isActive }, ref) => {
    return (
      <div
        ref={ref}
        className={`panel${isActive ? ' active' : ' hidden'}`}
        aria-hidden={!isActive}
      >
        {tab.sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            collapsed={Boolean(collapsed[section.id])}
            toggle={onToggleSection}
          />
        ))}
      </div>
    )
  },
)

TabPanel.displayName = 'TabPanel'
