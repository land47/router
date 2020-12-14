import { createContext } from 'react'
import { SnackbarControls } from '../shared/types'

export let SnackbarContext = createContext<SnackbarControls | null>(null)
