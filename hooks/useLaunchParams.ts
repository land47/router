import { useMemo } from 'react'

/**
 * Возвращает параметры запуска в виде объекта.
 *
 * ```typescript
 * let launchParams = useLaunchParams() // { any: value, ... }
 * let str = launchParams + '' // ?any=value&...
 * ```
 */
export function useLaunchParams() {
  // prettier-ignore
  let serialized = useMemo(() => Object.fromEntries(new URLSearchParams(window.location.search)), [])

  return {
    ...serialized,
    [Symbol.toPrimitive]: () => window.location.search,
  }
}
