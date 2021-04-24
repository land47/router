import type {RootNodeType} from './RouterChildren'
import type {Location} from './RouterLocation'

export type RouterConfig = {
  as: RootNodeType | null,
  lastLocation: Location | null
}

const config: RouterConfig = {
  as: null,
  lastLocation: null
}

export default config
