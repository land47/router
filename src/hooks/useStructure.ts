import { useEffect } from 'react'
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
  let search = useSearch(Object.keys(initial))
  let navigator = useNavigator()
  let router = useRouter()

  useEffect(() => {
    // Фикс повторного первого рендера приложения
    navigator.freeze()

    let hash = window.location.hash.slice(1)

    router.replace(initial, options)

    if (hash) {
      router.push(navigator.serialize(hash))
    }

    navigator.unfreeze()
  }, [])

  return Object.assign({ modal: null }, search || initial) as S
}
