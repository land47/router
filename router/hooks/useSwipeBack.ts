import { useEffect } from 'react'
import bridge from '@vkontakte/vk-bridge'
import { useHistory, useLocation, useRouter } from '.'
import { SerializedURLParams } from '../shared/types'

/** TODO */
function getPanelsHistoryByView(history: SerializedURLParams[], view: string) {
  let reversed = [...history].reverse()
  let bool = reversed.map(item => item.view === view)
  let incorrectIndex = bool.findIndex(b => !b)

  return reversed
    .slice(0, incorrectIndex >= 0 ? incorrectIndex : reversed.length)
    .reduceRight((acc: string[], item) => [...acc, item.panel || ''], [])
}

/** TODO */
function getPanelsHistory(history: SerializedURLParams[]) {
  return history.map(item => item.panel || '')
}

export function useSwipeBack() {
  let history = useHistory()
  let location = useLocation()
  let router = useRouter()

  useEffect(() => {
    if (history.length > 1) {
      return void bridge.send('VKWebAppDisableSwipeBack')
    }

    bridge.send('VKWebAppEnableSwipeBack')
  }, [history])

  return {
    history: location.view
      ? getPanelsHistoryByView(history, location.view)
      : getPanelsHistory(history),
    onSwipeBack: router.back,
  }
}
