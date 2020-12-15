import React, { FC } from 'react'
import { Navigator } from '../../base'
import { NavigatorContext } from '../../contexts'

/**
 * Проводит всему приложению доступ до навигатора.
 * */
export let NavigatorProvider: FC = ({ children }) => {
  return (
    <NavigatorContext.Provider value={new Navigator()}>
      {children}
    </NavigatorContext.Provider>
  )
}
