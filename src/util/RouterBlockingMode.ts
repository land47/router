import config from './RouterConfig'

export function block() {
  config.block = true
}

export function unblock() {
  config.block = false
}
