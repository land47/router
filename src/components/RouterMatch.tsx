import {FC, useEffect} from 'react'
import {notifyWithTransition, listeners, updateHistory} from '../util/RouterHistory'
import {rootNodeForChildren, rootComponentBy} from '../util/RouterChildren'
import {useLocation} from '../hooks/RouterHooks'
import config from '../util/RouterConfig'

export const View: FC = ({
  children
}) => {
  const root = rootNodeForChildren(children)
  const RootComponent = rootComponentBy(root)
  const location = useLocation(root)

  useEffect(() => {
    config.as = root

    listeners.add(updateHistory)
    window.addEventListener('popstate', notifyWithTransition)

    return () => {
      listeners.delete(updateHistory)
      window.removeEventListener('popstate', notifyWithTransition)
    }
  }, [])

  return <RootComponent>
    {children}
  </RootComponent>
}
