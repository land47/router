import { useEffect } from 'react'
import bridge from '@vkontakte/vk-bridge'
import { useHistory, useLocation, useRouter } from '.'
import { SerializedURLParams } from '../shared/types'

/**
 * Возвращает историю переходов по панелям для определённого
 * значения (id) ключа (by).
 *
 * В этом примере вернёт историю перехода по панелям
 * для `story` с id `home`:
 * ```typescript
 * getPanelsHistoryBy([...], 'story', 'home')
 * ```
 */
function getPanelsHistoryBy(
  history: SerializedURLParams[],
  by: string,
  id: string
) {
  let reversed = [...history].reverse()
  let booleans = reversed.map(item => item[by] === id)
  let incorrectIndex = booleans.findIndex(b => !b)

  return reversed
    .slice(0, incorrectIndex >= 0 ? incorrectIndex : reversed.length)
    .reduceRight((acc: string[], item) => [...acc, item.panel || ''], [])
}

/** Возвращает историю переходов по всем панелям */
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
    history: location.story
      ? getPanelsHistoryBy(history, 'story', location.story) : location.view
      ? getPanelsHistoryBy(history, 'view', location.view) : getPanelsHistory(history),
    onSwipeBack: router.back,
  }
}
