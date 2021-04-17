import {ReactNode, isValidElement, cloneElement, Children} from 'react'
import {Epic, Root, View, Panel} from '@vkontakte/vkui'
import type {Location} from './RouterLocation'

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

export function rootComponentBy(type: RootNodeType | null) {
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
): React.ReactNode {
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

export function builder(children: ReactNode, location: Location) {
  return map(children, el => {
    const {
      activePanel, activeView, activeStory
    } = location

    if (!isValidElement(el)) {
      return el
    }

    if (isView(el)) return cloneElement(el, {activePanel})
    if (isRoot(el)) return cloneElement(el, {activeView})
    if (isEpic(el)) return cloneElement(el, {activeStory})

    return el
  })
}
