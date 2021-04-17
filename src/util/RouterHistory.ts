import type {AnyFn} from './RouterSharedTypes'
import {batch} from './RouterBatch'
import type {Location} from './RouterLocation'
import {getCurrentLocation} from './RouterLocation'
import {startTransition} from './RouterStartTransition'
import type {RootNodeType} from './RouterChildren'

export type History = Location[]
export type HistoryListener = AnyFn

export const listeners = new Set<HistoryListener>()

export const notify = () => {
  batch(() => {
    listeners.forEach(fn => fn())
  })
}

export const notifyWithTransition = () => {
  startTransition(notify)
}


export const history = [] as History
export const updateHistory = (root: RootNodeType) => {
  history.push(getCurrentLocation(root))
}
