import React, { FC } from 'react'
import {
  LaunchParamsProvider,
  NavigatorProvider,
  SnackbarProvider,
} from './providers'

/**
 * Оборачивает приложение в необходимые провайдеры.
 * */
export let Router: FC = ({ children }) => {
  return (
    <LaunchParamsProvider>
      <NavigatorProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </NavigatorProvider>
    </LaunchParamsProvider>
  )
}
