import React, { FC, useState } from 'react'
import * as Base from '../base'
import * as Contexts from '../contexts'
import { SerializedURLParams } from '../shared/types'

let navigator = new Base.Navigator()
let linker = new Base.Linker(navigator)

/** Оборачивает приложение в необходимые провайдеры. */
export let Router: FC = ({ children }) => {
  let globalHistoryState = useState<SerializedURLParams[]>([])

  return (
    <Contexts.Navigator.Provider value={navigator}>
      <Contexts.Linker.Provider value={linker}>
        <Contexts.History.Provider value={globalHistoryState}>
          {children}
        </Contexts.History.Provider>
      </Contexts.Linker.Provider>
    </Contexts.Navigator.Provider>
  )
}
