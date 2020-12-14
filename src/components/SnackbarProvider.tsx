import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { SnackbarContext } from '../contexts'
import { SnackbarControls } from '../shared/types'

/**
 * Во избежание лишних рендеров проводим элементы управления
 * снэкбаром отдельным компонентом.
 * */
let ControlsProvider: FC<{ controls: SnackbarControls }> = memo(
  ({ controls, children }) => {
    return (
      <SnackbarContext.Provider value={controls}>
        {children}
      </SnackbarContext.Provider>
    )
  },
  () => true
)

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
      <ControlsProvider controls={{ setSnackbar, closeSnackbar }}>
        {children}
      </ControlsProvider>
    </>
  )
}
