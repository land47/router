import { useEffect, useRef } from 'react'
import { useSafeContext } from '.'
import * as Contexts from '../contexts'

/**
 * Возвращает состояние (параметры) текущей записи в истории.
 */
export let useParams = () => {
  let navigator = useSafeContext(Contexts.Navigator)
  let captured = useRef({})

  useEffect(() => {
    captured.current = navigator.history.state
  }, [])

  return { ...navigator.history.state, ...captured.current }
}
