import { useCallback } from 'react'
import { ApplicationStructure, HistoryItemState } from '../shared/types'
import { useCache, useNavigator } from './index'
import {
  withoutValue,
  makeObjectSynchronous,
  replaceFunctionsWithResult,
} from '../utils'

/**
 * Значения, которые будут исключены (вместе с ключем)
 * при добавлении новой записи в историю.
 */
let excludeValues = [null, undefined, 'null', 'undefined']

/**
 * Возвращает интерфейс для работы с навигацией приложения.
 */
export function useRouter() {
  let navigator = useNavigator()
  let cache = useCache<unknown, HistoryItemState>()

  /**
   * Возвращает обработанное состояние. Кэширует, обрабатывает асинхронные
   * значения параметров.
   */
  async function prepareState(state: HistoryItemState) {
    let key = state.key

    if (!key) {
      return makeObjectSynchronous(replaceFunctionsWithResult(state))
    }

    if (cache.has(key)) {
      return cache.get(key)
    }

    let prepared = replaceFunctionsWithResult(state)
    let sync = makeObjectSynchronous(prepared)
    cache.set(key, sync)

    return sync
  }

  /**
   * Добавляет новую запись в историю, кэшируя параметры и обрабатывая асинхронные.
   * Для кэширования нужно передать свойство ``key`` в параметрах.
   *
   * Обычный пример:
   * ```typescript
   * router.push({ panel: 'profile' })
   * ```
   *
   * Пример с передачей параметров:
   * ```typescript
   * router.push({ panel: 'profile' }, { name: 'Anton' })
   * ```
   *
   * Пример с передачей асинхронных параметров (fetchUser возвращает промис):
   * ```typescript
   * router.push({ panel: 'profile' }, { user: fetchUser })
   * ```
   *
   * Пример с кэшированием параметров:
   * ```typescript
   * router.push({ panel: 'profile' }, { user: fetchUser, key: 'unique_key' })
   * ```
   */
  let push = useCallback(
    async (structure: ApplicationStructure, state: HistoryItemState = {}) => {
      navigator.push(
        withoutValue(
          {
            ...navigator.convertSearchParams(navigator.location.search),
            ...structure,
          },
          ...excludeValues
        ),
        await prepareState(state)
      )
    },
    [navigator.location.search]
  )

  let back = useCallback(() => {
    navigator.back()
  }, [])

  let replace = useCallback(
    async (structure: ApplicationStructure, state: HistoryItemState = {}) => {
      navigator.replace(
        withoutValue(structure, ...excludeValues),
        await prepareState(state)
      )
    },
    []
  )

  let go = useCallback((delta: number) => {
    navigator.go(delta)
  }, [])

  return { push, back, replace, go }
}
