/**
 * Возвращает тип аргумента.
 *
 * ```typescript
 * checkType([]) // 'array'
 * checkType({}) // 'object'
 * checkType(true) // 'boolean'
 * checkType('hello') // 'string'
 * checkType(123) // 'number'
 * checkType(Symbol()) // 'symbol'
 * checkType(100n) // 'bigint'
 * ```
 */
export const checkType = (o: unknown) =>
  Object.prototype.toString
    .call(o)
    .replace(/\[|object\s|\]/g, '')
    .toLowerCase()
