import { ApplicationStructure } from '../shared/types'
import { useSearch } from '../hooks'

/**
 * Устанавливает структуру приложения и обновляет значения
 * в случае перехода на другое состояние навигации.
 * */
export function useStructure<S extends ApplicationStructure>(initial: S) {
  let search = useSearch(Object.keys(initial))
  return (search as S) || initial
}
