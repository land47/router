import {useState, useEffect} from 'react'
import type {Location} from '../util/RouterLocation'
import {getCurrentLocation} from '../util/RouterLocation'
import {listeners} from '../util/RouterLocation'
import config from '../util/RouterConfig'
import type {AnyDict} from '../util/RouterSharedTypes'

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

export function useRouteState(): AnyDict {
  const [state, setState] = useState(window.history.state)

  useEffect(() => {
    function updater() {
      setState(window.history.state)
    }

    listeners.add(updater)
    return () => void listeners.delete(updater)
  }, [])

  return state
}
