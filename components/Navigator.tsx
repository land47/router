import { FC, ReactElement } from 'react'
import { ApplicationStructure } from '../shared/types'
import { useStructure } from '../hooks'
import * as Utils from '../utils'

export type NavigatorProps = {
  story?: string
  view?: string
  panel?: string
  children: (structure: ApplicationStructure) => ReactElement
}

export let Navigator: FC<NavigatorProps> = ({
  story,
  view,
  panel,
  children,
}) => {
  let structure = useStructure({ story, view, panel })
  return Utils.isObjectEmpty(structure) ? null : children(structure)
}
