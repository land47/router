import {getRouterState} from './RouterState'
import type {Location, LocationInternalState} from './RouterLocation'
import {getLocationState, getCurrentLocation, getLocationByPath} from './RouterLocation'
import {history} from './RouterSwipeback'
import config from './RouterConfig'

export type HistoryItem = {
  location: Location,
  state: LocationInternalState
}

export type History = HistoryItem[]

export function isBack(next: HistoryItem, history: History) {
  return Boolean(
    history.find(item => next.state.__router.index == item.state.__router.index)
  )
}

export function isForward(next: HistoryItem, history: History) {
  if (history.length == 0) {
    return true
  }

  return !isBack(next, history)
}

export function getCurrentHistoryItem(): HistoryItem {
  const currentRouterState = getRouterState()
  const currentLocationState = getLocationState()
  const currentLocation = getCurrentLocation(config.as)

  return {
    location: currentLocation,
    state: {
      ...currentLocationState,
      __router: currentRouterState
    }
  }
}

export function getPreviousLocation(): Location {
  const previous = history.slice(-1)[0]

  return previous
    ? getLocationByPath(previous, config.as)
    : getCurrentLocation(config.as)
}
