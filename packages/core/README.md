# @scroll-context/core

Scroll Seam core primitives for capturing and restoring scroll position from semantic anchors instead of raw pixel offsets.

## Install

```bash
npm install @scroll-context/core
# or pnpm add @scroll-context/core
```

> The package is not published yet—add it directly to your workspace while iterating.

## Usage

Annotate anchor candidates with `data-scroll-key`. The helper stores the element closest to the viewport center along with its relative offset so the same context can be restored later.

```ts
import { captureScroll, restoreScroll } from '@scroll-context/core'

const hostId = 'dashboard'
const container = document.querySelector('.scroll-host')

// Call before the DOM changes (tab switch, filter change, etc.)
captureScroll(hostId, container ?? undefined)

/**
 * After the new DOM is rendered, restore by reusing the stored anchor key
 * and offset ratio from sessionStorage.
 */
restoreScroll(hostId, container ?? undefined)
```

### Lifecycle example

```ts
tabSwitcher.onBeforeChange(() => {
  captureScroll('reports', window)
})

tabSwitcher.onAfterChange(() => {
  restoreScroll('reports', window)
})
```

### How it works

1. Finds the `data-scroll-key` element closest to the viewport center.
2. Stores the anchor key, relative offset within the element, and scrollTop in `sessionStorage`.
3. When restoring, scrolls the matching element back into view and uses the saved offset to fine‑tune the final position.

`@scroll-context/react` wraps these helpers in hooks like `useScrollHost` and `useScrollAnchor`. Refer to that package once it is moved into this repo.
