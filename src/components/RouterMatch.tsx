import {FC, useEffect, useMemo, ReactNode} from 'react'
import {notify, listeners, updateHistory} from '../util/RouterHistory'
import {rootNodeForChildren, rootComponentBy, build} from '../util/RouterChildren'
import {useLocation} from '../hooks/RouterHooks'
import config from '../util/RouterConfig'

export type Props = {
  fallback: ReactNode
}

export const View: FC<Props> = ({
  children, fallback,
}) => {
  const root = useMemo(() => (config.as = rootNodeForChildren(children)), [])
  const RootComponent = useMemo(() => rootComponentBy(root), [])
  const location = useLocation(root)

  useEffect(() => {
    listeners.add(updateHistory)
    window.addEventListener('popstate', notify)

    return () => {
      listeners.delete(updateHistory)
      window.removeEventListener('popstate', notify)
    }
  }, [])
  console.log(location)
  return <>
    {build(<RootComponent>{children}</RootComponent>, location, fallback)}
  </>
}
