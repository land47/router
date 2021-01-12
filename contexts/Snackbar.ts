import { createContext } from 'react'
import * as Base from '../base'

export let Snackbar = createContext<Base.Snackbar | null>(null)
