import {useState, useEffect} from 'react'
import type {Location, LocationState} from '../util/RouterLocation'
import {getCurrentLocation, getLocationState} from '../util/RouterLocation'
import {listeners} from '../util/RouterLocation'
import type {History} from '../util/RouterHistory'
import config from '../util/RouterConfig'
import {isForward, isBack, getCurrentHistoryItem} from '../util/RouterHistory'

export function useLocation(forceRoot = config.as): Location {
  const [location, setLocation] = useState<Location>(
    getCurrentLocation(forceRoot)
  )

  useEffect(() => {
    function updater() {
      setLocation(getCurrentLocation(forceRoot))
    }

    listeners.add(updater)
    return () => void listeners.delete(updater)
  }, [])

  return location
}

export function useLocationState(): LocationState {
  const [state, setState] = useState(getLocationState)

  useEffect(() => {
    function updater() {
      setState(state => state ? state : getLocationState())
    }

    listeners.add(updater)
    return () => void listeners.delete(updater)
  }, [])

  return state
}

export function useHistory(): History {
  const [history, setHistory] = useState<History>([
    getCurrentHistoryItem()
  ])

  useEffect(() => {
    function updater() {
      const current = getCurrentHistoryItem()

      setHistory(h => {
        if (isBack(current, h)) {
          const backIndex = h.findIndex(
            e => e.state.__router.index == current.state.__router.index
          )
          const history = [...h]

          history.splice(backIndex + 1, 1)
          return history
        }

        if (isForward(current, h)) {
          return [...h, current]
        }

        return history
      })
    }

    listeners.add(updater)
    return () => void listeners.delete(updater)
  }, [])

  return history
}
