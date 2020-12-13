import { useEffect } from 'react'
import { ApplicationStructure } from '../shared/types'
import { useNavigator, useSearch } from '../hooks'
import { withoutValue } from '../utils'

/**
 * Устанавливает структуру приложения и обновляет значения
 * в случае перехода на другое состояние навигации.
 * */
export function useStructure<S extends ApplicationStructure>(initial: S) {
  let search = useSearch(Object.keys(initial))
  let navigator = useNavigator()

  useEffect(() => {
    let hash = window.location.hash.slice(1)

    navigator.replace(withoutValue(initial, undefined))

    if (hash) {
      navigator.push(navigator.serialize(hash))
    }
  }, [])

  return (search as S) || initial
}
