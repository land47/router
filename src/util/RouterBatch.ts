import {unstable_batchedUpdates} from 'react-dom'
import type {AnyFn} from './RouterSharedTypes'

const fake = (scope: AnyFn) => scope()
const batch = (
  typeof unstable_batchedUpdates == 'function'
    ? unstable_batchedUpdates
    : fake
)

export {batch}
