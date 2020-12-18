import { useCallback } from 'react'
import { ApplicationStructure, HistoryItemState } from '../shared/types'
import { useNavigator } from '../hooks'
import { withoutValue, makeObjectSynchronous } from '../utils'

/**
 * Возвращает интерфейс для работы с навигацией приложения.
 */
export function useRouter() {
  let navigator = useNavigator()
  let excludeValues = [null, undefined, 'null', 'undefined']

  let push = useCallback(
    async (structure: ApplicationStructure, state: HistoryItemState = {}) => {
      let syncState = await makeObjectSynchronous(state)

      navigator.push(
        withoutValue(
          {
            ...navigator.convertSearchParams(navigator.location.search),
            ...structure,
          },
          ...excludeValues
        ),
        syncState
      )
    },
    [navigator.location.search]
  )

  let back = useCallback(() => {
    navigator.back()
  }, [])

  let replace = useCallback(
    (structure: ApplicationStructure, state: HistoryItemState = {}) => {
      navigator.replace(withoutValue(structure, ...excludeValues), state)
    },
    []
  )

  let go = useCallback((delta: number) => {
    navigator.go(delta)
  }, [])

  return { push, back, replace, go }
}
