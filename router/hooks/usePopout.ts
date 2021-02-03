import { ReactNode } from 'react'
import { useSafeContext } from '.'
import * as Contexts from '../contexts'

export let usePopout = () => {
  let linker = useSafeContext(Contexts.Linker)

  return {
    setPopout: (node: ReactNode) => linker.push(node, 'popout'),
    closePopout: () => linker.back(),
    popout: linker.getCurrent('popout') as ReactNode,
  }
}
