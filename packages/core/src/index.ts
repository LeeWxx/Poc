export type Snapshot = {
  anchorKey?: string
  offsetRatio?: number
  scrollTop: number
}

const PREFIX = 'scrollseam:'

const defaultSelector = '[data-scroll-key]'

const safeSessionStorage =
  typeof window !== 'undefined' && window.sessionStorage ? window.sessionStorage : undefined

function storageKey(hostId: string) {
  return PREFIX + hostId
}

type AnchorCandidate = {
  key: string
  score: number
  offsetRatio: number
}

function computeCurrentAnchor(root: HTMLElement | Window): AnchorCandidate | null {
  const viewport = window
  const centerY = viewport.innerHeight / 2
  const rootEl = root instanceof Window ? document.documentElement : root
  const candidates = rootEl.querySelectorAll(defaultSelector)

let best: AnchorCandidate | null = null

  candidates.forEach((el) => {
    const rect = (el as HTMLElement).getBoundingClientRect()
    const key = el.getAttribute('data-scroll-key')
    if (!key) return

    const elementCenter = (rect.top + rect.bottom) / 2
    const dist = Math.abs(centerY - elementCenter)
    const centerScore = 1 - Math.min(dist / centerY, 1)

    const rootScrollTop = root instanceof Window ? window.scrollY : root.scrollTop
    const relativeTop = rect.top + rootScrollTop
    const offsetRatio = rect.height
      ? (rootScrollTop + centerY - relativeTop) / rect.height
      : 0

    if (!best || centerScore > best.score) {
      best = { key, score: centerScore, offsetRatio }
    }
  })

  return best
}

function getScrollTop(root: HTMLElement | Window) {
  return root instanceof Window ? window.scrollY : root.scrollTop
}

export function captureScroll(hostId: string, root?: HTMLElement | Window | null) {
  if (!root || !safeSessionStorage) return
  const anchor = computeCurrentAnchor(root)
  const snap: Snapshot = {
    anchorKey: anchor?.key,
    offsetRatio: anchor?.offsetRatio,
    scrollTop: getScrollTop(root),
  }
  try {
    safeSessionStorage.setItem(storageKey(hostId), JSON.stringify(snap))
  } catch {
    // ignore
  }
}

export function restoreScroll(hostId: string, root?: HTMLElement | Window | null) {
  if (!root || !safeSessionStorage) return
  const raw = safeSessionStorage.getItem(storageKey(hostId))
  if (!raw) return

  let snap: Snapshot
  try {
    snap = JSON.parse(raw) as Snapshot
  } catch {
    return
  }

  const fallback = () => {
    if (root instanceof Window) {
      window.scrollTo({ top: 0 })
    } else if (typeof root.scrollTo === 'function') {
      root.scrollTo({ top: 0 })
    } else {
      root.scrollTop = 0
    }
  }

  if (!snap.anchorKey) {
    fallback()
    return
  }

  const selector = `[data-scroll-key="${CSS.escape(snap.anchorKey)}"]`
  const el = document.querySelector(selector) as HTMLElement | null
  if (!el) {
    fallback()
    return
  }

  el.scrollIntoView({ block: 'center' })

  if (snap.offsetRatio != null) {
    const rect = el.getBoundingClientRect()
    const rootEl = root instanceof Window ? document.documentElement : root
    const rootTop = rootEl.getBoundingClientRect().top
    const current = getScrollTop(root)
    const target =
      current +
      (rect.top - rootTop) +
      rect.height * snap.offsetRatio -
      rootEl.clientHeight / 2

    if (root instanceof Window) {
      window.scrollTo({ top: target })
    } else {
      root.scrollTo({ top: target })
    }
  }
}
