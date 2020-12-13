import { useCallback } from 'react'
import { ApplicationStructure } from '../shared/types'
import { useNavigator } from '../hooks'
import { withoutValue } from '../utils'

/**
 * Возвращает интерфейс для работы с навигацией приложения.
 * */
export function useRouter() {
  let navigator = useNavigator()

  let push = useCallback((structure: ApplicationStructure) => {
    navigator.push(withoutValue(structure, undefined))
  }, [])

  let back = useCallback(() => {
    navigator.back()
  }, [])

  let replace = useCallback((structure: ApplicationStructure) => {
    navigator.replace(withoutValue(structure, undefined))
  }, [])

  return { push, back, replace }
}
