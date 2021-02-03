import { useEffect } from 'react'
import { useSafeContext } from '.'
import * as Contexts from '../contexts'

export function useHistory() {
  let [history, setHistory] = useSafeContext(Contexts.History)
  let navigator = useSafeContext(Contexts.Navigator)

  useEffect(() => {
    function updateHistory() {
      setHistory(navigator.historyItems)
    }

    navigator.createListener(['*'], updateHistory)
    return () => navigator.removeListener(['*'], updateHistory)
  }, [navigator.historyItems])

  return history
}
