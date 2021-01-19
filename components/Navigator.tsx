import { FC, ReactElement } from 'react'
import { ApplicationStructure } from '../shared/types'
import { useStructure } from '../hooks'
import * as Utils from '../utils'

export type NavigatorProps = {
  children: (structure: ApplicationStructure) => ReactElement
  story?: string
  view?: string
  panel?: string
  unstableHandleHash: boolean
}

export let Navigator: FC<NavigatorProps> = ({
  story,
  view,
  panel,
  unstableHandleHash = false,
  children: render,
}) => {
  let structure = useStructure({ story, view, panel }, unstableHandleHash)
  return Utils.isObjectEmpty(structure) ? null : render(structure)
}
