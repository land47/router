import { useCallback } from 'react'
import { ApplicationStructure, HistoryItemState } from '../shared/types'
import { useCache, useNavigator } from '../hooks'
import { withoutValue, makeObjectSynchronous } from '../utils'

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
  let cache = useCache()

  async function prepareState(
    structure: ApplicationStructure,
    state: HistoryItemState
  ) {
    // prettier-ignore
    let stateFromCache = cache.load(
      (structure.panel || '' + structure.view || '' + structure.story || '' + state.key) || Symbol(),
      state
    ) as HistoryItemState

    return makeObjectSynchronous(stateFromCache)
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
   * router.push({ panel: 'profile' }, { user: fetchUser() })
   * ```
   *
   * Пример с кэшированием параметров:
   * ```typescript
   * router.push({ panel: 'profile' }, { user: fetchUser(), _meta: { key: 1 } })
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
        await prepareState(structure, state)
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
        await prepareState(structure, state)
      )
    },
    []
  )

  let go = useCallback((delta: number) => {
    navigator.go(delta)
  }, [])

  return { push, back, replace, go }
}
