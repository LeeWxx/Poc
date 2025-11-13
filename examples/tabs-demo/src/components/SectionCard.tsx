import type { Section } from '../data/tabs'

interface SectionCardProps {
  section: Section
  collapsed: boolean
  toggle: (id: string) => void
}

export function SectionCard({ section, collapsed, toggle }: SectionCardProps) {
  return (
    <article
      className={`section${collapsed ? ' collapsed' : ''}`}
      data-scroll-key={section.id}
    >
      <div className="section-header">
        <h2 className="section-title">{section.title}</h2>
        <button className="collapse-button" onClick={() => toggle(section.id)}>
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
      {!collapsed && <p className="section-body">{section.body}</p>}
    </article>
  )
}
