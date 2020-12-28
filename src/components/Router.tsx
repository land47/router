import React, { FC } from 'react'
import {
  LaunchParamsProvider,
  NavigatorProvider,
  SnackbarProvider,
  CacheContainerProvider,
} from './providers'

/**
 * Оборачивает приложение в необходимые провайдеры.
 * */
export let Router: FC = ({ children }) => {
  return (
    <CacheContainerProvider>
      <LaunchParamsProvider>
        <NavigatorProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </NavigatorProvider>
      </LaunchParamsProvider>
    </CacheContainerProvider>
  )
}
