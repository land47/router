import React, { FC } from 'react'
import {
  LaunchParamsProvider,
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
      <LaunchParamsProvider>
        <NavigatorProvider>
          <SnackbarProvider>
            <PopoutProvider>{children}</PopoutProvider>
          </SnackbarProvider>
        </NavigatorProvider>
      </LaunchParamsProvider>
    </CacheContainerProvider>
  )
}
