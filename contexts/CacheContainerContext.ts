import { createContext } from 'react'
import { CacheContainer } from '../base'

export let CacheContainerContext = createContext<CacheContainer<
  unknown,
  unknown
> | null>(null)
