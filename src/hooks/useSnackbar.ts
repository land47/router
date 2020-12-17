import { useContext } from 'react'
import { SnackbarContext } from '../contexts'
import { APP_MUST_BE_WRAPPED_IN_ROUTER } from '../shared/errors'

export function useSnackbar() {
  let snackbar = useContext(SnackbarContext)

  if (snackbar === null) {
    throw new SyntaxError(APP_MUST_BE_WRAPPED_IN_ROUTER)
  }

  return snackbar
}
