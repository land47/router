import React, { FC } from 'react'
import {
  LaunchParamsProvider,
  NavigatorProvider,
  SnackbarProvider,
  CacheProvider,
} from './providers'

/**
 * Оборачивает приложение в необходимые провайдеры.
 * */
export let Router: FC = ({ children }) => {
  return (
    <CacheProvider>
      <LaunchParamsProvider>
        <NavigatorProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </NavigatorProvider>
      </LaunchParamsProvider>
    </CacheProvider>
  )
}
