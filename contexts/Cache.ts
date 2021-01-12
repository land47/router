import { createContext } from 'react'
import * as Base from '../base'

export let Cache = createContext<Base.Cache<unknown, unknown> | null>(null)
