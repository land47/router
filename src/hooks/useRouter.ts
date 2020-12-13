import { useCallback } from 'react'
import { ApplicationStructure } from '../shared/types'
import { useLocation, useNavigator } from '../hooks'
import { withoutValue } from '../utils'

/**
 * Возвращает интерфейс для работы с навигацией приложения.
 * */
export function useRouter() {
  let navigator = useNavigator()
  let location = useLocation()

  let push = useCallback((structure: ApplicationStructure) => {
    navigator.push(withoutValue({ ...location, ...structure }, undefined))
  }, [])

  let back = useCallback(() => {
    navigator.back()
  }, [])

  let replace = useCallback((structure: ApplicationStructure) => {
    navigator.replace(withoutValue({ ...location, ...structure }, undefined))
  }, [])

  return { push, back, replace }
}
