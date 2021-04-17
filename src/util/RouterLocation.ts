import {RootNodeType} from './RouterChildren'

export type Location = {
  [K in 'activeStory' | 'activeView' | 'activePanel']?: string
}

export function getCurrentLocation(root: RootNodeType | null): Location {
  const path = window.location.pathname.split(/(?=\/)/)
  const location = {} as Location

  if (root == null) {
    throw new Error('[RouterLocation]: Root element is null or undefined')
  }

  if (root == RootNodeType.Epic) {
    location.activeStory = path[0] || '/'
    location.activeView  = path[1] || '/'
    location.activePanel = path[2] || '/'
  }

  if (root == RootNodeType.View) {
    location.activePanel = path[0] || '/'
  }

  if (root == RootNodeType.Root) {
    location.activeView  = path[0] || '/'
    location.activePanel = path[1] || '/'
  }

  return location
}
