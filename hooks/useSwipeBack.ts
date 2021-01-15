import { useHistory, useLocation, useRouter } from '.'
import { SerializedURLParams } from '../shared/types'

/** TODO */
function getPanelsHistoryByView(history: SerializedURLParams[], view: string) {
  let reversed = [...history].reverse()
  let bool = reversed.map(item => item.view === view)
  let incorrectIndex = bool.findIndex(b => !b)

  if (incorrectIndex >= 0) {
    return reversed
      .slice(0, incorrectIndex)
      .reduceRight((acc: string[], item) => [...acc, item.panel || ''], [])
  }

  return []
}

/** TODO */
function getPanelsHistory(history: SerializedURLParams[]) {
  return history.map(item => item.panel || '')
}

export function useSwipeBack() {
  let history = useHistory()
  let location = useLocation()
  let router = useRouter()

  return {
    history: location.view
      ? getPanelsHistoryByView(history, location.view)
      : getPanelsHistory(history),
    onSwipeBack: router.back,
  }
}
