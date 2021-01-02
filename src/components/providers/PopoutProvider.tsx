import React, { FC, useCallback, useState } from 'react'
import { PopoutContext } from '../../contexts'
import { Popout, PopoutOptions } from '../../shared/types'
import { useNavigator } from '../../hooks'

let defaultOptions: PopoutOptions = {
  handleBackButton: true,
}

export let PopoutProvider: FC = ({ children }) => {
  let [state, setState] = useState<{ popout: Popout }>({
    popout: null,
  })
  let navigator = useNavigator()

  /**
   * Показывает всплывающее окно.
   */
  let setPopout = useCallback(
    (popout: Popout, options: PopoutOptions = defaultOptions) => {
      setState({ popout })

      if (options.handleBackButton) {
        navigator
          .push(
            navigator.convertSearchParams(navigator.location.search),
            options
          )
          .then(() => navigator.createPhantomTask(closePopout))
      }
    },
    []
  )

  /**
   * Закрывает текущее всплывающее окно.
   */
  let closePopout = useCallback(
    (historyBack: boolean = navigator.history.state.handleBackButton) => {
      setState({ popout: null })

      if (historyBack) {
        navigator.back()
      }
    },
    []
  )

  return (
    <PopoutContext.Provider
      value={{
        popout: state.popout,
        setPopout,
        // prettier-ignore
        closePopout: () => closePopout(navigator.history.state.handleBackButton)
      }}>
      {children}
    </PopoutContext.Provider>
  )
}
