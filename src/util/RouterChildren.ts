import {ReactNode, isValidElement, cloneElement, Children, ReactElement} from 'react'
import {Epic, Root, View, Panel} from '@vkontakte/vkui'
import type {Location} from './RouterLocation'
import {onTransition, history, onSwipeBack} from './RouterSwipeback'

export enum RootNodeType {
  Epic, Root, View
}

export const isEpic = (node: ReactNode) => (
  isValidElement(node) && node.type == Epic
)

export const isRoot = (node: ReactNode) => (
  isValidElement(node) && node.type == Root
)

export const isView = (node: ReactNode) => (
  isValidElement(node) && node.type == View
)

export const isPanel = (node: ReactNode) => (
  isValidElement(node) && node.type == Panel
)

export function rootNodeForChildren(children: ReactNode): RootNodeType | null {
  if (Array.isArray(children))   return rootNodeForChildren(children[0])
  if (!isValidElement(children)) return null

  if (isRoot(children))  return RootNodeType.Epic
  if (isView(children))  return RootNodeType.Root
  if (isPanel(children)) return RootNodeType.View

  return RootNodeType.View
}

export function rootComponentBy(type: RootNodeType | null): any {
  switch (type) {
    case RootNodeType.Epic: return Epic
    case RootNodeType.Root: return Root
    case RootNodeType.View: return View
    default: return View
  }
}

/*
 * Recursive React.Children.map
 */
export function map(
  children: ReactNode,
  fn: (el: ReactNode, i: number) => ReactNode
): ReactNode {
  return Children.map(children, (child, i) => {
    if (isValidElement(child)) {
      if (child.props.children) {
        child = cloneElement(child, {
          children: map(child.props.children, fn)
        })
      }

      return fn(child, i)
    }

    return child
  })
}

function findActiveChildren(el: ReactElement, id: unknown) {
  return Children
    .toArray(el.props.children)
    .find((child: any) => child.props.id == id)
}

export function build(
  children: ReactNode,
  fallback: ReactNode,
  nextLocation: Location,
) {
  const _exhaustiveCheck = {
    ...nextLocation
  }

  const mapped = map(children, el => {
    if (!isValidElement(el)) {
      return el
    }

    if (isView(el)) {
      if (findActiveChildren(el, nextLocation.activePanel)) {
        delete _exhaustiveCheck.activePanel
      }

      return cloneElement(el, {activePanel: nextLocation.activePanel})
    }

    if (isRoot(el)) {
      if (findActiveChildren(el, nextLocation.activeView)) {
        delete _exhaustiveCheck.activeView
      }

      return cloneElement(el, {activeView: nextLocation.activeView})
    }

    if (isEpic(el)) {
      if (findActiveChildren(el, nextLocation.activeStory)) {
        delete _exhaustiveCheck.activeStory
      }

      return cloneElement(el, {activeStory: nextLocation.activeStory})
    }

    return el
  })

  if (
    'activePanel' in _exhaustiveCheck ||
    'activeView'  in _exhaustiveCheck ||
    'activeStory' in _exhaustiveCheck
  ) {
    return fallback
  }

  return mapped
}
