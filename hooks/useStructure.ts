import { ReactNode, useEffect } from 'react'
import { ApplicationStructure } from '../shared/types'
import { useLocation, usePopout, useNavigator } from '.'
import * as Utils from '../utils'

type Structure<S extends ApplicationStructure> = S & {
  modal: string | null
  popout: ReactNode
}

/**
 * Устанавливает структуру приложения и обновляет значения
 * в случае перехода на другое состояние навигации.
 */
export function useStructure<S extends ApplicationStructure, T>(
  initial: S
): Structure<S> {
  let navigator = useNavigator()
  let location = useLocation()
  let { popout } = usePopout()

  useEffect(() => {
    navigator.freezeLifecycle()
    navigator.replace(Utils.withoutValue(initial, undefined))
    navigator.unfreezeLifecycle()
  }, [])

  return {
    modal: null,
    popout,
    ...(Utils.isObjectEmpty(location) ? initial : location),
  } as Structure<S>
}
