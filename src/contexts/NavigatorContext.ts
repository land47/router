import { createContext } from 'react'
import { Navigator } from '../base'

export let NavigatorContext = createContext<Navigator | null>(null)
