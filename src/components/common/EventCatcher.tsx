import React, { FC, useEffect, useRef } from 'react'

export type EventCatcherProps = {
  type: keyof HTMLElementEventMap
  handler(): void | PromiseLike<void>
}

export let EventCatcher: FC<EventCatcherProps> = ({
  type,
  handler,
  children,
}) => {
  let catcher = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (catcher.current === null) {
      throw new Error('[EventCatcher] Something went wrong...')
    }

    catcher.current.addEventListener(type, handler)
    return () => catcher.current?.removeEventListener(type, handler)
  }, [])

  return <div ref={catcher}>{children}</div>
}
