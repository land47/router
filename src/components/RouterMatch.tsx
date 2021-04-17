import {FC, useEffect, useMemo} from 'react'
import {notify, listeners, updateHistory} from '../util/RouterHistory'
import {rootNodeForChildren, rootComponentBy, builder} from '../util/RouterChildren'
import {useLocation} from '../hooks/RouterHooks'
import config from '../util/RouterConfig'

export const View: FC = ({
  children
}) => {
  const root = useMemo(() => rootNodeForChildren(children), [])
  const RootComponent = useMemo(() => rootComponentBy(root), [])
  const location = useLocation(root)
  config.as = root

  useEffect(() => {
    listeners.add(updateHistory)
    window.addEventListener('popstate', notify)

    return () => {
      listeners.delete(updateHistory)
      window.removeEventListener('popstate', notify)
    }
  }, [])

  return <>
    {builder(<RootComponent>{children}</RootComponent>, location)}
  </>
}
