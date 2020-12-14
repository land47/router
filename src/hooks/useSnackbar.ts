import { useContext } from 'react'
import { SnackbarContext } from '../contexts'

export function useSnackbar() {
  let snackbar = useContext(SnackbarContext)

  if (snackbar === null) {
    throw new SyntaxError('The application must be wrapped in <Router />')
  }

  return snackbar
}
