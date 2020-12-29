import React, { FC, useCallback, useEffect, useState } from 'react'
import { PopoutContext } from '../../contexts'
import { Popout, PopoutOptions } from '../../shared/types'
import { useNavigator } from '../../hooks'

export let PopoutProvider: FC = ({ children }) => {
  let [currentPopout, setCurrentPopout] = useState<Popout>(null)
  let [
    currentPopoutOptions,
    setCurrentPopoutOptions,
  ] = useState<PopoutOptions | null>(null)
  let navigator = useNavigator()

  /**
   * Закрывает всплывающее окно.
   */
  let closePopout = useCallback(() => {
    setCurrentPopout(null)
    setCurrentPopoutOptions(null)
  }, [])

  /**
   * Устанавливает текущее всплывающее окно и его настройки.
   */
  let setPopout = useCallback(
    (popout: Popout, options: PopoutOptions = { handleBackButton: true }) => {
      setCurrentPopoutOptions(options)
      setCurrentPopout(popout)
    },
    []
  )

  /**
   * Обрабатывает сайд-эффекты.
   */
  useEffect(() => {
    // if close popout
    if (currentPopout === null) {
      if (currentPopoutOptions?.handleBackButton) {
        navigator.back()
      }

      return
    }

    // if set popout
    if (currentPopoutOptions?.handleBackButton) {
      navigator.duplicateRecord()
      navigator.createTask(closePopout)
    }

    return () => navigator.removeTask(closePopout)
  }, [currentPopout, currentPopoutOptions])

  return (
    <PopoutContext.Provider
      value={{ popout: currentPopout, setPopout, closePopout }}>
      {children}
    </PopoutContext.Provider>
  )
}
