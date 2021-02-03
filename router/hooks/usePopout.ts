import { ReactNode } from 'react'
import { useSafeContext } from '.'
import * as Contexts from '../contexts'

export let usePopout = () => {
  let linker = useSafeContext(Contexts.Linker)
  let linkerKey = 'popout'

  return {
    setPopout: (node: ReactNode) => linker.push(node, linkerKey),
    closePopout: () => linker.back(linkerKey),
    popout: linker.getCurrent(linkerKey) as ReactNode,
  }
}
