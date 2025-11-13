# @scroll-context/react

React hook helpers for wiring up the `@scroll-context/core` runtime.

## Install

```bash
npm install @scroll-context/core @scroll-context/react
```

## Usage

```tsx
import { useRef, useState } from 'react'
import { captureScroll } from '@scroll-context/core'
import { useScrollSeam } from '@scroll-context/react'

function Dashboard() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [tab, setTab] = useState('metrics')

  useScrollSeam({
    hostId: `dashboard:${tab}`,
    ref: scrollRef,
    deps: [tab],
  })

  const switchTab = (next: string) => {
    captureScroll(`dashboard:${tab}`, scrollRef.current)
    setTab(next)
  }

  return (
    <>
      <TabBar value={tab} onChange={switchTab} />
      <div ref={scrollRef} className="scroll-area">
        {sections.map((section) => (
          <section key={section.id} data-scroll-key={section.id}>
            {section.title}
          </section>
        ))}
      </div>
    </>
  )
}
```

- `useScrollSeam`: pass a `ref` (or `container`) and it will invoke `captureScroll`/`restoreScroll` for you whenever the dependencies change. Put tab/filter keys in `deps` so the context is saved and restored whenever the layout re-renders.

### Options

| option | type | default | explanation |
| --- | --- | --- | --- |
| `hostId` | `string` | (required) | Namespace for the scroll snapshots. |
| `ref` / `container` | `RefObject` / HTMLElement | `undefined` | Target scroll host. |
| `deps` | `DependencyList` | `[]` | Triggers capture/restore when values change. |
| `enabled` | `boolean` | `true` | Toggle the hook without tearing down the component. |
| `autoCapture` | `boolean` | `true` | Set to `false` if you plan to manually call `captureScroll` before a disruptive layout change (e.g., hiding a tab). |

`autoCapture` remains `true` for most screens. Only disable it when you explicitly capture scroll state yourself (as in the example above) to ensure the snapshot is taken before the DOM changes.
