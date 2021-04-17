import {ReactNode, isValidElement, cloneElement, Children} from 'react'
import {Epic, Root, View, Panel} from '@vkontakte/vkui'

export enum RootNodeType {
  Epic, Root, View
}

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
  if (!isValidElement(children)) return null

  if (isRoot(children))  return RootNodeType.Epic
  if (isView(children))  return RootNodeType.Root
  if (isPanel(children)) return RootNodeType.View

  return null
}

export function rootComponentBy(type: RootNodeType | null) {
  switch (type) {
    case RootNodeType.Epic: return Epic
    case RootNodeType.Root: return Root
    case RootNodeType.View: return View

    default: throw new Error('[RouterChildren]: Unexpected root type')
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
