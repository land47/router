import {useState, useEffect} from 'react'
import type {Location} from '../util/RouterLocation'
import {getCurrentLocation} from '../util/RouterLocation'
import type {History} from '../util/RouterHistory'
import {listeners, history} from '../util/RouterHistory'
import config from '../util/RouterConfig'

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

export function useHistory(): History {
  const [, forceUpdate] = useState([])

  useEffect(() => {
    function updater() {
      forceUpdate([])
    }

    listeners.add(updater)
    return () => void listeners.delete(updater)
  }, [])

  return history
}
