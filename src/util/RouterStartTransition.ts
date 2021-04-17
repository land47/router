// @ts-ignore
import {unstable_startTransition} from 'react'
import {AnyFn} from './RouterSharedTypes'

const fakeStartTransition = (scope: AnyFn) => scope()
const startTransition = (
  typeof unstable_startTransition == 'function'
    ? unstable_startTransition
    : fakeStartTransition
)

export {startTransition}
