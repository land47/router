import { useContext } from 'react'
import { LaunchParamsContext } from '../contexts'
import { APP_MUST_BE_WRAPPED_IN_ROUTER } from '../shared/errors'

export function useLaunchParams() {
  let context = useContext(LaunchParamsContext)

  if (context === null) {
    throw new Error(APP_MUST_BE_WRAPPED_IN_ROUTER)
  }

  return {
    search: context.search,
    serialized: Object.fromEntries(new URLSearchParams(context.search)),
  }
}
