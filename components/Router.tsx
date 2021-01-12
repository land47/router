import React, { FC, ReactNode, useEffect, useState } from 'react'
import * as Base from '../base'
import * as Contexts from '../contexts'

// LOGIC
let cache = new Base.Cache()
let navigator = new Base.Navigator()
let snackbar = new Base.Snackbar()
let linker = new Base.Linker(navigator)

/** Оборачивает приложение в необходимые провайдеры. */
export let Router: FC = ({ children }) => {
  let [snackbarNode, setSnackbarNode] = useState<ReactNode>(null)

  // snackbars tracking
  useEffect(() => snackbar.createListener(setSnackbarNode), [])

  return (
    <>
      {snackbarNode}
      <Contexts.Cache.Provider value={cache}>
        <Contexts.Navigator.Provider value={navigator}>
          <Contexts.Snackbar.Provider value={snackbar}>
            <Contexts.Linker.Provider value={linker}>
              {children}
            </Contexts.Linker.Provider>
          </Contexts.Snackbar.Provider>
        </Contexts.Navigator.Provider>
      </Contexts.Cache.Provider>
    </>
  )
}
