import React, { FC } from 'react'
import {
  NavigatorProvider,
  SnackbarProvider,
  CacheContainerProvider,
  PopoutProvider,
} from './providers'

/**
 * Оборачивает приложение в необходимые провайдеры.
 */
export let Router: FC = ({ children }) => {
  return (
    <CacheContainerProvider>
      <NavigatorProvider>
        <SnackbarProvider>
          <PopoutProvider>{children}</PopoutProvider>
        </SnackbarProvider>
      </NavigatorProvider>
    </CacheContainerProvider>
  )
}
