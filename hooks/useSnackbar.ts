import { ReactNode, useEffect } from 'react'
import { useNavigator, useSafeContext } from '.'
import * as Contexts from '../contexts'

export function useSnackbar() {
  let snackbar = useSafeContext(Contexts.Snackbar)
  let navigator = useNavigator()

  // Закрывает снэкбар при переходе на другое состояние навигации
  useEffect(() => navigator.createPhantomTask(snackbar.close), [])

  return {
    setSnackbar: (node: ReactNode) => snackbar.set(node),
    closeSnackbar: () => snackbar.close(),
  }
}
