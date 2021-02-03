import { useCallback } from 'react'
import { ApplicationStructure, HistoryItemState } from '../shared/types'
import * as Utils from '../utils'
import * as Contexts from '../contexts'
import { useSafeContext } from '.'

/**
 * Значения, которые будут исключены (вместе с ключем)
 * при добавлении новой записи в историю.
 */
let excludeValues = [null, undefined, 'null', 'undefined']

/**
 * Возвращает интерфейс для работы с навигацией приложения.
 */
export function useRouter() {
  let navigator = useSafeContext(Contexts.Navigator)

  /**
   * Обрабатывает структуру перед добавлением в историю браузера.
   */
  function prepareStructure(structure: ApplicationStructure) {
    return Utils.withoutValue(
      {
        ...navigator.convertSearchParams(navigator.location.search),
        ...structure,
      },
      ...excludeValues
    )
  }

  let push = useCallback(
    async (structure: ApplicationStructure, state: HistoryItemState = {}) => {
      return navigator.push(prepareStructure(structure), state)
    },
    []
  )

  let back = useCallback(() => {
    return navigator.back()
  }, [])

  let replace = useCallback(
    async (structure: ApplicationStructure, state: HistoryItemState = {}) => {
      return navigator.replace(prepareStructure(structure), state)
    },
    []
  )

  let go = useCallback((delta: number) => navigator.go(delta), [])

  return { push, back, replace, go }
}
