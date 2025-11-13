import { useEffect, useLayoutEffect } from 'react'
import type { DependencyList, RefObject } from 'react'
import { captureScroll, restoreScroll } from '@scroll-context/core'

export interface UseScrollSeamOptions {
  hostId: string
  ref?: RefObject<HTMLElement | null>
  container?: HTMLElement | Window | null
  deps?: DependencyList
  enabled?: boolean
  autoCapture?: boolean
}

const resolveRoot = (
  ref?: RefObject<HTMLElement | null>,
  container?: HTMLElement | Window | null,
) => container ?? ref?.current ?? window

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useScrollSeam({
  hostId,
  ref,
  container,
  deps = [],
  enabled = true,
  autoCapture = true,
}: UseScrollSeamOptions) {
  useIsomorphicLayoutEffect(() => {
    if (!enabled) return
    const root = resolveRoot(ref, container)
    restoreScroll(hostId, root)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, hostId, container, ref, ...deps])

  useIsomorphicLayoutEffect(() => {
    return () => {
      if (!enabled || !autoCapture) return
      const root = resolveRoot(ref, container)
      captureScroll(hostId, root)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, hostId, container, ref, autoCapture, ...deps])
}
