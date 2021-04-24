import type {FC, ReactNode} from 'react'
import {Suspense, useEffect, useMemo} from 'react'
import {notifyAboutLocationChange} from '../util/RouterLocation'
import {rootNodeForChildren, rootComponentBy, build} from '../util/RouterChildren'
import {useLocation} from '../hooks/RouterHooks'
import config from '../util/RouterConfig'
import {getPreviousLocation} from '../util/RouterHistory'

export type Props = {
  fallback: ReactNode
}

export const View: FC<Props> = ({
  children, fallback,
}) => {
  const root = useMemo(() => (config.as = rootNodeForChildren(children)), [])
  const RootComponent = useMemo(() => rootComponentBy(root), [])
  const nextRenderLocation = useLocation()
  const currentRenderLocation = getPreviousLocation()

  useEffect(() => {
    window.addEventListener('popstate', notifyAboutLocationChange)

    return () => {
      window.removeEventListener('popstate', notifyAboutLocationChange)
    }
  }, [])

  const app = (
    <RootComponent>
      {children}
    </RootComponent>
  )

  return <>
    <Suspense
      fallback={
        <Suspense fallback={null}>
          {build(app, fallback, currentRenderLocation)}
        </Suspense>
      }
    >
      {build(app, fallback, nextRenderLocation)}
    </Suspense>
  </>
}
