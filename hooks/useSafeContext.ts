import { Context, useContext } from 'react'
import { APP_MUST_BE_WRAPPED_IN_ROUTER } from '../shared/errors'

export function useSafeContext<T>(context: Context<T>) {
  let value = useContext(context)

  if (value === null) {
    throw new SyntaxError(APP_MUST_BE_WRAPPED_IN_ROUTER)
  }

  return value as Exclude<T, null>
}
