import { useContext } from 'react'
import { PopoutContext } from '../contexts'
import { APP_MUST_BE_WRAPPED_IN_ROUTER } from '../shared/errors'

export function usePopout() {
  let controls = useContext(PopoutContext)

  if (controls === null) {
    throw new SyntaxError(APP_MUST_BE_WRAPPED_IN_ROUTER)
  }

  return controls
}
