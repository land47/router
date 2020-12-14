import { useEffect } from 'react'
import { ApplicationStructure } from '../shared/types'
import { useNavigator, useRouter, useSearch } from '../hooks'

/**
 * Устанавливает структуру приложения и обновляет значения
 * в случае перехода на другое состояние навигации.
 * */
export function useStructure<S extends ApplicationStructure>(initial: S) {
  let search = useSearch(Object.keys(initial))
  let navigator = useNavigator()
  let router = useRouter()

  useEffect(() => {
    // Фикс повторного первого рендера приложения
    navigator.freeze()

    let hash = window.location.hash.slice(1)

    router.replace(initial)

    if (hash) {
      router.push(navigator.serialize(hash))
    }

    navigator.unfreeze()
  }, [])

  return Object.assign({ modal: null }, search || initial) as S
}
