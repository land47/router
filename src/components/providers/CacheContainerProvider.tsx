import React, { FC } from 'react'
import { CacheContainerContext } from '../../contexts'
import { CacheContainer } from '../../base'

export let CacheContainerProvider: FC = ({ children }) => {
  return (
    <CacheContainerContext.Provider value={new CacheContainer()}>
      {children}
    </CacheContainerContext.Provider>
  )
}
