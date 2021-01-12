import { useEffect, useState } from 'react'
import { SerializedURLParams } from '../shared/types'
import { useSafeContext } from '.'
import * as Contexts from '../contexts'

/**
 * Подписывается на изменения URL-параметров, и если в них
 * найден один ключ из переданного массива ключей, то обновляет состояние,
 * возвращая представление URL-параметров в виде объекта.
 *
 * ```
 * let search = useSearch(['panel'])
 *
 * // URL Search: ?panel=info&view=home
 * // search = { panel: 'info' }
 * ```
 */
export function useSearch<K extends string[]>(keys: K) {
  let navigator = useSafeContext(Contexts.Navigator)
  let [searchParams, setSearchParams] = useState<SerializedURLParams<K>>()

  useEffect(() => {
    navigator.createListener(keys, setSearchParams)
    return () => navigator.removeListener(keys, setSearchParams)
  }, [])

  return searchParams
}
