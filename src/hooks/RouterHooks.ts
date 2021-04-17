import {useState, useEffect} from 'react'
import type {Location} from '../util/RouterLocation'
import {getCurrentLocation} from '../util/RouterLocation'
import type {History} from '../util/RouterHistory'
import {listeners, history} from '../util/RouterHistory'
import config from '../util/RouterConfig'
import {block, unblock} from '../util/RouterBlockingMode'

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

export function useBlock() {
  const [isBlock, setIsBlock] = useState(config.block)

  useEffect(() => {
    if (isBlock) {
      return void block()
    }

    unblock()
  }, [isBlock])

  return [
    isBlock,
    setIsBlock,
  ] as const
}

export function useRouteState() {
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
