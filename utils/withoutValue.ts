export function withoutValue<V, T extends Record<string, any>>(
  obj: T,
  ...values: V[]
) {
  return Object.fromEntries(
    Object.entries(obj).filter(e => !values.includes(e[1]))
  )
}
