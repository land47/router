import type {AnyFn} from './RouterSharedTypes'
import {batch} from './RouterBatch'
import type {Location} from './RouterLocation'
import {getCurrentLocation} from './RouterLocation'
import {startTransition} from './RouterStartTransition'
import type {RootNodeType} from './RouterChildren'
import config from './RouterConfig'

export type History = Location[]
export type HistoryListener = AnyFn

export const listeners = new Set<HistoryListener>()

export const notify = () => {
  if (config.block) {
    return
  }

  startTransition(() =>
    batch(() => {
      listeners.forEach(fn => fn())
    })
  )
}

export const history = [] as History
export const updateHistory = (root: RootNodeType | null = config.as) => {
  history.push(getCurrentLocation(root))
}
