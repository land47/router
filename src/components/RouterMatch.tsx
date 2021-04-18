import {FC, ReactNode, useEffect, useMemo} from 'react'
import {notify} from '../util/RouterLocation'
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
    window.addEventListener('popstate', notify)

    return () => {
      window.removeEventListener('popstate', notify)
    }
  }, [])

  return <>
    {build(<RootComponent>{children}</RootComponent>, location, fallback)}
  </>
}
