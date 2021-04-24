import {RootNodeType} from './RouterChildren'
import {batch} from './RouterBatch'
import {startTransition} from './RouterStartTransition'
import type {AnyFn, AnyDict} from './RouterSharedTypes'
import type {RouterState} from './RouterState'

export type Location = {
  [K in 'activeStory' | 'activeView' | 'activePanel']?: string
}
export type LocationState = AnyDict
export type LocationInternalState = LocationState & {
  __router: RouterState
}

export const listeners = new Set<AnyFn>()
export const notifyAboutLocationChange = () => {
  startTransition(() =>
    batch(() => {
      listeners.forEach(fn => fn())
    })
  )
}

export function getLocationByPath(path: string, root: RootNodeType | null): Location {
  const parsedPath = path.split(/(?=\/)/)
  const location = {} as Location

  if (root == null) {
    throw new Error('[RouterLocation]: Root element is null or undefined')
  }

  if (root == RootNodeType.Epic) {
    location.activeStory = (parsedPath)[0] || '/'
    location.activeView  = (parsedPath)[1] || '/'
    location.activePanel = (parsedPath)[2] || '/'
  }

  if (root == RootNodeType.View) {
    location.activePanel = (parsedPath)[0] || '/'
  }

  if (root == RootNodeType.Root) {
    location.activeView  = (parsedPath)[0] || '/'
    location.activePanel = (parsedPath)[1] || '/'
  }

  return location
}

export function getCurrentLocation(root: RootNodeType | null): Location {
  return getLocationByPath(
    window.location.hash || window.location.pathname,
    root
  )
}

export function getLocationState(): LocationState {
  const state = {
    ...(window.history.state || {})
  }

  delete state.__router
  return state
}
