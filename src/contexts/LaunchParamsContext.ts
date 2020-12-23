import { createContext } from 'react'
import { LaunchParamsControls } from '../shared/types'

export let LaunchParamsContext = createContext<LaunchParamsControls | null>(
  null
)
