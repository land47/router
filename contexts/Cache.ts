import { createContext } from 'react'
import * as Base from '../base'

export let CacheContainer = createContext<Base.Cache<unknown, unknown> | null>(
  null
)
