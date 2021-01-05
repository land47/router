import React, { FC, useCallback } from 'react'
import { EventCatcher } from '../common'
import { useRouter } from '../../hooks'
import { ApplicationStructure, HistoryItemState } from '../../shared/types'

export type LinkProps = {
  href: ApplicationStructure
  replace?: boolean
  params?: HistoryItemState<any>
}

/**
 * Компонент-обертка над хуком ``useRouter``, который полностью
 * повторяет его API.
 * */
export let Link: FC<LinkProps> = ({ children, href, replace, params = {} }) => {
  let router = useRouter()

  let onClickHandler = useCallback(() => {
    if (replace) {
      return router.replace(href, params)
    }

    router.push(href, params)
  }, [])

  return (
    <EventCatcher type='click' handler={onClickHandler}>
      {children}
    </EventCatcher>
  )
}
