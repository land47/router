import {transition} from './RouterTransition'

export type TransitionParams = {
  isBack: boolean
  from: string
  to: string
}

/**
 * Should be passed to ViewProps.history
 */
export const history: string[] = [window.location.pathname]

/**
 * Should be passed to ViewProps.onTransition
 */
export const onTransition = (params: TransitionParams) => {
  if (params.isBack) {
    history.pop()
  } else {
    history.push(params.to)
  }
}

/**
 * Should be passed to ViewProps.onSwipeBack
 */
export const onSwipeBack = () => {
  transition(-1)
}
