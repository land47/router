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
  let excludeValues = [null, undefined, 'null', 'undefined']

  let push = useCallback(
    <T>(structure: ApplicationStructure, state: HistoryItemState<T> = {}) => {
      navigator.push(
        withoutValue({ ...location, ...structure }, ...excludeValues),
        state
      )
    },
    [location]
  )

  let back = useCallback(() => {
    navigator.back()
  }, [])

  let replace = useCallback(
    <T>(structure: ApplicationStructure, state: HistoryItemState<T> = {}) => {
      navigator.replace(withoutValue(structure, ...excludeValues), state)
    },
    []
  )

  let go = useCallback((delta: number) => {
    navigator.go(delta)
  }, [])

  return { push, back, replace, go }
}
