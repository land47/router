import { useCallback } from 'react'
import { ApplicationStructure, HistoryItemState } from '../shared/types'
import { useLocation, useNavigator } from '../hooks'
import { withoutValue } from '../utils'

/**
 * Возвращает интерфейс для работы с навигацией приложения.
 * */
export function useRouter() {
  let navigator = useNavigator()
  let location = useLocation()

  let push = useCallback(
    <T>(structure: ApplicationStructure, state: HistoryItemState<T> = {}) => {
      navigator.push(
        withoutValue({ ...location, ...structure }, undefined),
        state
      )
    },
    []
  )

  let back = useCallback(() => {
    navigator.back()
  }, [])

  let replace = useCallback(
    <T>(structure: ApplicationStructure, state: HistoryItemState<T> = {}) => {
      navigator.replace(withoutValue(structure, undefined), state)
    },
    []
  )

  return { push, back, replace }
}
