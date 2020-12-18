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
  let entries = keys.map((key, i) => [key, syncValues[i]])

  return Object.fromEntries(entries)
}
