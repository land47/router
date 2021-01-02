import { checkType } from './checkType'

/**
 * ```typescript
 * // functions
 * let fetchUser = async () => {...}
 * let num = () => 16
 *
 * { a: 1, user: fetchUser } => { a: 1, user: Promise<user> }
 * { b: 1, age: num } => { b: 1, age: 16 }
 * ```
 */
export function replaceFunctionsWithResult<O extends Record<string, unknown>>(
  object: O
) {
  // prettier-ignore
  let entriesOfFunctions = Object.entries(object)
    .filter(([, value]) =>
      checkType(value) === 'function' || checkType(value) === 'asyncfunction'
    ) as [string, () => unknown][]

  return {
    ...object,
    ...Object.fromEntries(
      entriesOfFunctions.map(([key, func]) => [key, func()])
    ),
  }
}
