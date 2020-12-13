import { useEffect, useState } from 'react'
import { SerializedURLParams } from '../shared/types'
import { useNavigator } from '../hooks'

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
 * */
export function useSearch<K extends string[]>(keys: K) {
  let navigator = useNavigator()
  let [searchParams, setSearchParams] = useState<SerializedURLParams<K>>()

  useEffect(() => {
    navigator.createListener(keys, setSearchParams)
    return () => navigator.removeListener(keys, setSearchParams)
  }, [])

  return searchParams
}
