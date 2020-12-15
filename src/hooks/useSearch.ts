import { useEffect, useState } from 'react'
import { SerializedURLParams } from '../shared/types'
import { useNavigator } from '../hooks'
import { useThrottledState } from '@unexp/use-throttled-state'

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
export function useSearch<K extends string[]>(keys: K, throttleMs: number = 0) {
  let navigator = useNavigator()

  // fix: троттлинг для фикса #1
  // https://github.com/profilemyprofile/router/issues/1
  let [searchParams, setSearchParams] = useThrottledState<
    SerializedURLParams<K> | undefined
  >(void 0, throttleMs)

  useEffect(() => {
    navigator.createListener(keys, setSearchParams)
    return () => navigator.removeListener(keys, setSearchParams)
  }, [])

  return searchParams
}
