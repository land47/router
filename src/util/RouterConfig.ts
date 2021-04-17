import type {RootNodeType} from './RouterChildren'

export type RouterConfig = {
  as: RootNodeType | null,
  block: boolean
}

const config: RouterConfig = {
  as: null,
  block: false,
}

export default config
