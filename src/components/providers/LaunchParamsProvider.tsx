import React, { FC, useMemo } from 'react'
import { LaunchParamsContext } from '../../contexts'

/**
 * Проводит всему приложению доступ до параметров запуска.
 * */
export let LaunchParamsProvider: FC = ({ children }) => {
  let search = useMemo(() => window.location.search, [])

  return (
    <LaunchParamsContext.Provider value={{ search }}>
      {children}
    </LaunchParamsContext.Provider>
  )
}
