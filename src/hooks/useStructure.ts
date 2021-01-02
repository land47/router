import { useEffect, useMemo } from 'react'
import { ApplicationStructure, HistoryItemState } from '../shared/types'
import { useNavigator, usePopout, useRouter, useSearch } from '../hooks'
import { areObjectsEqual } from '../utils'

/**
 * Устанавливает структуру приложения и обновляет значения
 * в случае перехода на другое состояние навигации.
 */
export function useStructure<S extends ApplicationStructure, T>(
  initial: S,
  options: HistoryItemState<T> = {}
) {
  let search = useSearch(Object.keys(initial)) as S
  let navigator = useNavigator()
  let router = useRouter()
  let { popout } = usePopout()

  useEffect(() => {
    let hash = window.location.hash.slice(1)

    // Фикс повторного первого рендера приложения
    navigator.freezeLifecycle()
    router.replace(initial, options).then(() => {
      navigator.unfreezeLifecycle()

      if (hash) {
        if (areObjectsEqual(navigator.convertSearchParams(hash), initial)) {
          return
        }

        let original = navigator.convertSearchParams(hash)
        let params = { ...original }

        // Удаляем из параметров данные о структуре приложения
        delete params.panel
        delete params.view
        delete params.story

        router.push(original, params)
      }
    })
  }, [])

  return useMemo(() => ({ modal: null, ...(search || initial), popout }), [
    search,
    initial,
  ])
}
