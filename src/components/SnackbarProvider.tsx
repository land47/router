import React, { FC, useCallback, useEffect, useState } from 'react'
import { SnackbarContext } from '../contexts'

/**
 * Проводит всему приложению доступ до управления снэкбарами.
 * */
export let SnackbarProvider: FC = ({ children }) => {
  let [snackbar, setSnackbar] = useState(null)

  let closeSnackbar = useCallback(() => {
    setSnackbar(null)
  }, [])

  /**
   * Закрывает снэкбар при переходе на другое состояние истории.
   * Вроде как улучшает UX, но это не точно...
   * */
  useEffect(() => {
    window.addEventListener('popstate', closeSnackbar)
    return () => window.removeEventListener('popstate', closeSnackbar)
  }, [])

  return (
    <>
      {snackbar}

      <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
        {children}
      </SnackbarContext.Provider>
    </>
  )
}
