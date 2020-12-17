import { useEffect, useMemo } from 'react'
import { ApplicationStructure, HistoryItemState } from '../shared/types'
import { useNavigator, useRouter, useSearch } from '../hooks'

/**
 * Устанавливает структуру приложения и обновляет значения
 * в случае перехода на другое состояние навигации.
 * */
export function useStructure<S extends ApplicationStructure, T>(
  initial: S,
  options: HistoryItemState<T> = {}
) {
  let search = useSearch(Object.keys(initial), 800)
  let navigator = useNavigator()
  let router = useRouter()

  useEffect(() => {
    let hash = window.location.hash.slice(1)

    // Фикс повторного первого рендера приложения
    navigator.freezeLifecycle()
    router.replace(initial, options)
    navigator.unfreezeLifecycle()

    if (hash) {
      router.push(navigator.convertSearchParams(hash))
    }
  }, [])

  let structure = useMemo(() => {
    return Object.assign({ modal: null }, search || initial)
  }, [search, initial])

  return structure as S
}
