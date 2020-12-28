/**
 * Возвращает объект с выполненными промисами.
 *
 * ```
 * { a: 1, b: Promise<2> }
 * =>
 * { a: 1, b: 2 }
 * ```
 */
export async function makeObjectSynchronous<T>(state: Record<string, T>) {
  let keys = Object.keys(state)
  let syncValues = await Promise.all(Object.values(state))

  return keys.reduce((acc, key, i) => ({ ...acc, [key]: syncValues[i] }), {})
}
