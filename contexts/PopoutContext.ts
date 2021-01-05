import { createContext } from 'react'
import { PopoutControls } from '../shared/types'

export let PopoutContext = createContext<PopoutControls | null>(null)
