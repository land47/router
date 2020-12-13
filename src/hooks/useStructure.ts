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
    navigator.replace(withoutValue(initial, undefined))
  }, [])

  return (search as S) || initial
}
