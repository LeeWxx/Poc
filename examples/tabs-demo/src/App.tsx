import { createRef, useEffect, useMemo, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { captureScroll } from '@scroll-context/core'
import { useScrollSeam } from '@scroll-context/react'
import { TABS, type Tab } from './data/tabs'
import { TabPanel } from './components/TabPanel'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab['id']>('overview')
  const [collapsedByTab, setCollapsedByTab] = useState<Record<string, Record<string, boolean>>>({})

  const tabRefs = useMemo(() => {
    return TABS.reduce((acc, tab) => {
      acc[tab.id] = createRef<HTMLDivElement>()
      return acc
    }, {} as Record<Tab['id'], RefObject<HTMLDivElement | null>>)
  }, [])

  const activeRef = tabRefs[activeTab]

  useScrollSeam({
    hostId: `tabs-demo:${activeTab}`,
    ref: activeRef,
    autoCapture: false,
    deps: [activeTab],
  })

  const switchTab = (tabId: string) => {
    if (tabId === activeTab) return
    const currentRef = tabRefs[activeTab]?.current
    if (currentRef) {
      captureScroll(`tabs-demo:${activeTab}`, currentRef)
    }
    setActiveTab(tabId)
  }

  const toggleSection = (tabId: string, sectionId: string) => {
    setCollapsedByTab((state) => {
      const prev = state[tabId] ?? {}
      return {
        ...state,
        [tabId]: {
          ...prev,
          [sectionId]: !prev[sectionId],
        },
      }
    })
  }

  const prevTabRef = useRef(activeTab)
  useEffect(() => {
    const prev = prevTabRef.current
    if (prev !== activeTab) {
      setCollapsedByTab((state) => {
        if (!state[prev] || Object.keys(state[prev]).length === 0) {
          return state
        }
        return {
          ...state,
          [prev]: {},
        }
      })
    }
    prevTabRef.current = activeTab
  }, [activeTab])

  return (
    <div className="app">
      <header>
        <h1>Scroll Seam Demo</h1>
        <p>
          Scroll to any section, switch tabs, fold content, and confirm the scroll context
          returns to the same anchor when you come back.
        </p>
      </header>

      <div className="tab-bar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button${tab.id === activeTab ? ' active' : ''}`}
            onClick={() => switchTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="panel-stack">
        {TABS.map((tab) => {
          const tabCollapsed = collapsedByTab[tab.id] ?? {}
          return (
            <TabPanel
              key={tab.id}
              ref={tabRefs[tab.id]}
              tab={tab}
              collapsed={tabCollapsed}
              onToggleSection={(sectionId) => toggleSection(tab.id, sectionId)}
              isActive={tab.id === activeTab}
            />
          )
        })}
      </div>
    </div>
  )
}
