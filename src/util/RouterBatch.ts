import {unstable_batchedUpdates} from 'react-dom'
import type {AnyFn} from './RouterSharedTypes'

const fakeBatchedUpdates = (scope: AnyFn) => scope()
const batch = (
  typeof unstable_batchedUpdates == 'function'
    ? unstable_batchedUpdates
    : fakeBatchedUpdates
)

export {batch}
