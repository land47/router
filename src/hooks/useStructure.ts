import { useEffect, useMemo } from 'react'
import { ApplicationStructure, HistoryItemState } from '../shared/types'
import { useNavigator, useRouter, useSearch } from '../hooks'

/**
 * Устанавливает структуру приложения и обновляет значения
 * в случае перехода на другое состояние навигации.
 */
export function useStructure<S extends ApplicationStructure, T>(
  initial: S,
  options: HistoryItemState<T> = {}
) {
  let search = useSearch(Object.keys(initial))
  let navigator = useNavigator()
  let router = useRouter()

  useEffect(() => {
    let hash = window.location.hash.slice(1)

    // Фикс повторного первого рендера приложения
    navigator.freezeLifecycle()
    router.replace(initial, options).then(() => {
      navigator.unfreezeLifecycle()

      if (hash) {
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

  let structure = useMemo(() => {
    return Object.assign({ modal: null }, search || initial)
  }, [search, initial])

  return structure as { modal: null | string } & S
}
