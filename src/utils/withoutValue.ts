export function withoutValue<V, T extends Record<string, any>>(
  obj: T,
  value: V
) {
  return Object.fromEntries(Object.entries(obj).filter(e => e[1] !== value))
}
