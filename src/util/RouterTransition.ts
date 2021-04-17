import {ReactElement, isValidElement} from 'react'
import config from './RouterConfig'

export type TransitionOptions = {
  replace?: boolean
}

export function transition(delta: number): void
export function transition(path: string, state?: any): void
export function transition(path: string, state?: any, options?: TransitionOptions): void
export function transition(
  to: string | number,
  state?: any,
  options?: TransitionOptions
) {
  if (config.block) {
    return
  }

  if (typeof to == 'number') {
    return window.history.go(to)
  }

  if (options && options.replace) {
    window.history.replaceState(state, document.title, to)
  } else {
    window.history.pushState(state, document.title, to)
  }

  window.dispatchEvent(new Event('popstate'))
}
