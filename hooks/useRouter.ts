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
   * Кэширует состояние.
   */
  function cacheState(state: HistoryItemState) {
    cache.set(state.key, state)
  }

  /**
  * Обрабатывает состояние записи.
  */
  async function prepareState(state: HistoryItemState) {
    if (cache.has(state.key)) {
      return cache.get(state.key)
    }

    let prepared = await makeObjectSynchronous(replaceFunctionsWithResult(state))

    if (state.key) {
      cacheState(prepared)
    }

    return prepared
  }

  /**
   * Обрабатывает структуру перед добавлением в историю браузера.
   */
  function prepareStructure(structure: ApplicationStructure) {
    return withoutValue(
      {
        ...navigator.convertSearchParams(navigator.location.search),
        ...structure,
      },
      ...excludeValues
    )
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
      return navigator.push(prepareStructure(structure), await prepareState(state))
    },
    []
  )

  let back = useCallback(() => {
    return navigator.back()
  }, [])

  let replace = useCallback(
    async (structure: ApplicationStructure, state: HistoryItemState = {}) => {
      return navigator.replace(prepareStructure(structure), await prepareState(state))
    },
    []
  )

  let go = useCallback((delta: number) => {
    navigator.go(delta)
  }, [])

  return { push, back, replace, go }
}
