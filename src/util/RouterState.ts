export type RouterState = {
  index: number
}

export function getRouterDefaultState(): RouterState {
  return {
    index: 0
  }
}

export function getRouterState(): RouterState {
  const {
    __router = getRouterDefaultState()
  } = window.history.state || {}

  return __router
}
