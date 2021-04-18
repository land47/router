import {RootNodeType} from './RouterChildren'
import {batch} from './RouterBatch'
import {startTransition} from './RouterStartTransition'
import type {AnyFn} from './RouterSharedTypes'

export const listeners = new Set<AnyFn>()

export const notify = () => {
  startTransition(() =>
    batch(() => {
      listeners.forEach(fn => fn())
    })
  )
}

export type Location = {
  [K in 'activeStory' | 'activeView' | 'activePanel']?: string
}

export function getCurrentLocation(root: RootNodeType | null): Location {
  const path = window.location.pathname.split(/(?=\/)/)
  const hash = window.location.hash
    ? window.location.hash.replace('#', '/').split(/(?=\/)/)
    : ''

  const location = {} as Location

  if (root == null) {
    throw new Error('[RouterLocation]: Root element is null or undefined')
  }

  if (root == RootNodeType.Epic) {
    location.activeStory = (hash || path)[0] || '/'
    location.activeView  = (hash || path)[1] || '/'
    location.activePanel = (hash || path)[2] || '/'
  }

  if (root == RootNodeType.View) {
    location.activePanel = (hash || path)[0] || '/'
  }

  if (root == RootNodeType.Root) {
    location.activeView  = (hash || path)[0] || '/'
    location.activePanel = (hash || path)[1] || '/'
  }

  return location
}
