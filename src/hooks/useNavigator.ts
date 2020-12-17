import { useContext } from 'react'
import { NavigatorContext } from '../contexts'
import { APP_MUST_BE_WRAPPED_IN_ROUTER } from '../shared/errors'

/**
 * Возвращает объект (инстанс) навигатора.
 * */
export function useNavigator() {
  let navigator = useContext(NavigatorContext)

  if (navigator === null) {
    throw new SyntaxError(APP_MUST_BE_WRAPPED_IN_ROUTER)
  }

  return navigator
}
