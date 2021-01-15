import { createContext } from 'react'
import { SerializedURLParams } from '../shared/types'

export let History = createContext<
  [SerializedURLParams[], (history: SerializedURLParams[]) => void] | null
>(null)
