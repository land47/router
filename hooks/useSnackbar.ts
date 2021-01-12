import { ReactNode } from 'react'
import { useSafeContext } from '.'
import * as Contexts from '../contexts'

export function useSnackbar() {
  let snackbar = useSafeContext(Contexts.Snackbar)

  return {
    setSnackbar: (node: ReactNode) => snackbar.set(node),
    closeSnackbar: () => snackbar.close(),
  }
}
